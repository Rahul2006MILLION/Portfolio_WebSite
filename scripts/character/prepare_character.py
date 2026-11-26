"""
Prepare the hero character assets from the approved character render.

Input:  scripts/character/source.webp  (the approved 1536x1024 RGBA render)
Output: public/character/
          rahul-character.webp       original render, cropped (static / no-WebGL fallback)
          rahul-character-base.webp  same crop with the irises painted out of the eye openings
          rahul-character-maps.png   R = eye-opening mask, G = relief depth, B = lid shadow
          rahul-iris-left.png        reconstructed full iris disc (left eye on screen)
          rahul-iris-right.png       reconstructed full iris disc (right eye on screen)
        components/character/characterRig.json  geometry the shader needs (pixel coords of the crop)

Nothing here invents a new face: every colour in the outputs is taken from the source render.
The only reconstructed pixels are (a) the sclera hidden behind each iris and (b) the slivers of
iris hidden under the eyelids, both filled from neighbouring pixels of the same image.

Run:  python3 scripts/character/prepare_character.py
"""

from __future__ import annotations

import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "scripts" / "character" / "source.webp"
OUT = ROOT / "public" / "character"
RIG = ROOT / "components" / "character" / "characterRig.json"

# Crop box around the character (source pixels). Alpha bbox is x 257..1298, y 21..1023.
CROP = (250, 0, 1306, 1024)

# Measured in source pixels by sampling pixel columns through each eye: iris centre + radius.
EYES = {
    "left": {"center": (707.0, 340.5), "box": (660, 318, 752, 362)},
    "right": {"center": (849.0, 336.5), "box": (800, 312, 905, 358)},
}
IRIS_R = 17.3
PUPIL_R = 6.5


def lum(rgb: np.ndarray) -> np.ndarray:
    return rgb.mean(-1)


def is_sclera(rgb: np.ndarray) -> np.ndarray:
    # The render is warm-graded, so "white" sclera is low red-blue spread rather than pure white.
    return (lum(rgb) > 120) & ((rgb[..., 0] - rgb[..., 2]) < 75)


def is_skin(rgb: np.ndarray) -> np.ndarray:
    return (lum(rgb) > 110) & ((rgb[..., 0] - rgb[..., 2]) >= 75)


def fit_quadratic(xs, ys, cx):
    x = np.asarray(xs, float) - cx
    a, b, c = np.polyfit(x, np.asarray(ys, float), 2)
    return float(a), float(b), float(c)


def eval_q(q, x, cx):
    a, b, c = q
    d = x - cx
    return a * d * d + b * d + c


def analyse_eye(rgb: np.ndarray, spec: dict):
    cx, cy = spec["center"]
    x0, y0, x1, y1 = spec["box"]
    reg = rgb[y0:y1, x0:x1]
    scl = is_sclera(reg)
    # keep the largest sclera blobs (left + right of iris), drop specks on skin
    lab, n = ndimage.label(scl)
    sizes = ndimage.sum(scl, lab, range(1, n + 1))
    keep = np.zeros_like(scl)
    for i, s in enumerate(sizes, start=1):
        if s >= 12:
            keep |= lab == i
    scl = keep

    up_x, up_y, lo_x, lo_y = [], [], [], []
    cols = np.where(scl.any(0))[0]
    xmin, xmax = x0 + cols.min(), x0 + cols.max()
    for c in cols:
        x = x0 + c
        rows = np.where(scl[:, c])[0]
        if abs(x - cx) > IRIS_R + 1.5:
            up_x.append(x)
            up_y.append(y0 + rows.min() - 0.5)
        lo_x.append(x)
        lo_y.append(y0 + rows.max() + 0.5)
    # lower lid under the iris: first skin row below the iris centre
    for x in range(int(cx - IRIS_R + 3), int(cx + IRIS_R - 2)):
        col = reg[:, x - x0]
        skin = is_skin(col[None])[0]
        start = int(cy - y0 + 6)
        hit = np.where(skin[start:])[0]
        if len(hit):
            lo_x.append(x)
            lo_y.append(y0 + start + hit[0] - 0.5)
    upper = fit_quadratic(up_x, up_y, cx)
    lower = fit_quadratic(lo_x, lo_y, cx)
    return {
        "sclera": scl,
        "upper": upper,
        "lower": lower,
        "xmin": float(xmin) - 0.5,
        "xmax": float(xmax) + 0.5,
    }


def opening_mask(shape, spec, geo, ss=4):
    """Anti-aliased eye-opening mask in source pixel space (float 0..1)."""
    h, w = shape
    cx, cy = spec["center"]
    x0, y0, x1, y1 = spec["box"]
    mask = np.zeros((h, w), np.float32)
    # region-of-interest supersampled
    xs = (np.arange(x0 * ss, x1 * ss) + 0.5) / ss
    ys = (np.arange(y0 * ss, y1 * ss) + 0.5) / ss
    X, Y = np.meshgrid(xs, ys)
    up = eval_q(geo["upper"], X, cx)
    lo = eval_q(geo["lower"], X, cx)
    inside = (Y > up - 0.15) & (Y < lo - 0.35) & (X > geo["xmin"]) & (X < geo["xmax"])
    # constrain to where the eye actually is: sclera or iris disc (dilated a touch)
    sup = np.zeros((y1 - y0, x1 - x0), bool)
    sup |= geo["sclera"]
    yy, xx = np.mgrid[y0:y1, x0:x1]
    sup |= (xx + 0.5 - cx) ** 2 + (yy + 0.5 - cy) ** 2 <= (IRIS_R + 1.0) ** 2
    sup = ndimage.binary_dilation(sup, iterations=1)
    sup_up = np.kron(sup, np.ones((ss, ss), bool))
    inside &= sup_up
    m = inside.reshape(y1 - y0, ss, x1 - x0, ss).mean((1, 3))
    mask[y0:y1, x0:x1] = m
    return mask


def paint_out_iris(rgb, mask, spec, geo):
    """Replace iris pixels inside the opening with interpolated sclera (row-wise)."""
    out = rgb.copy()
    cx, cy = spec["center"]
    x0, y0, x1, y1 = spec["box"]
    h, w, _ = rgb.shape
    yy, xx = np.mgrid[0:h, 0:w]
    iris = ((xx + 0.5 - cx) ** 2 + (yy + 0.5 - cy) ** 2) <= (IRIS_R + 2.2) ** 2
    region = (mask > 0.01) & iris
    scl_full = np.zeros((h, w), bool)
    scl_full[y0:y1, x0:x1] = geo["sclera"]
    good = (mask > 0.5) & scl_full & ~iris
    filled = np.zeros((h, w), bool)
    for y in range(y0, y1):
        xs = np.where(region[y])[0]
        if not len(xs):
            continue
        lx = np.where(good[y, : xs.min()])[0]
        rx = np.where(good[y, xs.max() + 1 :])[0] + xs.max() + 1
        lcol = rgb[y, lx[-3:]].mean(0) if len(lx) else None
        rcol = rgb[y, rx[:3]].mean(0) if len(rx) else None
        if lcol is None and rcol is None:
            continue
        if lcol is None:
            lcol = rcol
        if rcol is None:
            rcol = lcol
        a, b = xs.min(), xs.max()
        for x in xs:
            t = (x - a) / max(1, b - a)
            out[y, x] = lcol * (1 - t) + rcol * t
            filled[y, x] = True
    # rows with no sclera at all on either side: copy from nearest filled row
    todo = region & ~filled
    if todo.any():
        idx = ndimage.distance_transform_edt(~filled, return_distances=False, return_indices=True)
        out[todo] = out[idx[0][todo], idx[1][todo]]
    # soften the painted patch so the interpolation streaks disappear
    patch = region.astype(np.float32)
    blurred = np.stack([ndimage.gaussian_filter(out[..., c], 1.2) for c in range(3)], -1)
    out = np.where(patch[..., None] > 0, blurred, out)
    # the upper lid casts a soft shadow on the eyeball; the source has it on the sclera sides,
    # interpolation already carries it, but deepen the top edge slightly where the iris used to be
    return out


def lid_shadow(shape, spec, geo):
    h, w = shape
    cx, _ = spec["center"]
    x0, y0, x1, y1 = spec["box"]
    sh = np.ones((h, w), np.float32)
    yy, xx = np.mgrid[y0:y1, x0:x1].astype(np.float32)
    up = eval_q(geo["upper"], xx + 0.5, cx)
    d = np.clip(yy + 0.5 - up, 0, None)
    sh[y0:y1, x0:x1] = 1.0 - 0.5 * np.exp(-d / 2.6)
    return sh


def reconstruct_iris(rgb, mask, spec, out_size=96):
    """Full iris disc from the visible part; hidden slivers filled by rotating to visible angles."""
    cx, cy = spec["center"]
    ss = 4
    r_out = IRIS_R + 1.5
    x0, y0 = int(cx - r_out - 2), int(cy - r_out - 2)
    x1, y1 = int(cx + r_out + 3), int(cy + r_out + 3)
    crop = Image.fromarray(np.clip(rgb[y0:y1, x0:x1], 0, 255).astype(np.uint8))
    up = np.asarray(crop.resize(((x1 - x0) * ss, (y1 - y0) * ss), Image.BICUBIC), np.float32)
    mcrop = Image.fromarray((mask[y0:y1, x0:x1] * 255).astype(np.uint8))
    mup = np.asarray(mcrop.resize(((x1 - x0) * ss, (y1 - y0) * ss), Image.BILINEAR), np.float32) / 255
    # erode visibility so lash-line pixels are not mistaken for iris
    vis = ndimage.binary_erosion(mup > 0.85, iterations=ss * 2)

    ucx, ucy = (cx - x0) * ss, (cy - y0) * ss
    res = np.zeros((out_size, out_size, 4), np.float32)
    scale = (2 * r_out * ss) / out_size
    for j in range(out_size):
        for i in range(out_size):
            dx = (i + 0.5 - out_size / 2) * scale
            dy = (j + 0.5 - out_size / 2) * scale
            r = math.hypot(dx, dy)
            if r > r_out * ss:
                continue
            th = math.atan2(dy, dx)
            col = None
            for k in (0, 1, -1, 2, -2, 3, -3, 4, -4, 6, -6, 8, -8, 12):
                t2 = th + k * math.radians(15)
                sx, sy = ucx + r * math.cos(t2), ucy + r * math.sin(t2)
                ix, iy = int(sx), int(sy)
                if 0 <= iy < vis.shape[0] and 0 <= ix < vis.shape[1] and vis[iy, ix]:
                    col = up[iy, ix]
                    break
            if col is None:
                col = up[int(ucy), int(ucx)]
            rn = r / (IRIS_R * ss)
            a = float(np.clip((1.0 - rn) / 0.06 + 0.5, 0, 1))
            res[j, i, :3] = col
            res[j, i, 3] = a * 255
    img = Image.fromarray(np.clip(res, 0, 255).astype(np.uint8), "RGBA")
    return img, r_out


def depth_map(h, w):
    """Smooth relief for subtle head parallax (crop pixel space). Higher = closer to camera."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    # head dome (face + hair), in crop coords
    hx, hy, rx, ry = 530.0, 360.0, 260.0, 330.0
    dome = 1 - ((xx - hx) / rx) ** 2 - ((yy - hy) / ry) ** 2
    dome = np.sqrt(np.clip(dome, 0, 1))
    # nose + mouth bump
    nose = np.exp(-(((xx - 535) / 34) ** 2 + ((yy - 400) / 52) ** 2))
    # ears sit back
    ears = np.exp(-(((np.abs(xx - 532) - 228) / 30) ** 2 + ((yy - 400) / 55) ** 2))
    head = np.clip(0.55 * dome + 0.28 * nose - 0.25 * ears, 0, 1)
    # head moves, the body barely does: weight falls off below the jaw
    weight = 1 - np.clip((yy - 560) / 160, 0, 1)
    d = 0.5 + (head - 0.25) * weight
    d = ndimage.gaussian_filter(d, 6)
    return np.clip(d, 0, 1)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    RIG.parent.mkdir(parents=True, exist_ok=True)
    src = Image.open(SRC).convert("RGBA")
    arr = np.asarray(src, np.float32)
    rgb, alpha = arr[..., :3], arr[..., 3]
    h, w = alpha.shape

    mask = np.zeros((h, w), np.float32)
    shadow = np.ones((h, w), np.float32)
    base = rgb.copy()
    rig_eyes = {}
    for name, spec in EYES.items():
        geo = analyse_eye(rgb, spec)
        m = opening_mask((h, w), spec, geo)
        mask = np.maximum(mask, m)
        base = paint_out_iris(base, m, spec, geo)
        shadow = np.minimum(shadow, lid_shadow((h, w), spec, geo))
        iris_img, r_out = reconstruct_iris(rgb, m, spec)
        iris_img.save(OUT / f"rahul-iris-{name}.png", optimize=True)

        cx, cy = spec["center"]
        # skin tone of the upper lid just above the lash line (for blinks)
        ux = np.arange(int(cx - 10), int(cx + 10))
        uy = (eval_q(geo["upper"], ux + 0.5, cx) - 9).astype(int)
        lid = rgb[uy, ux].mean(0) / 255.0
        lash = rgb[(eval_q(geo["upper"], ux + 0.5, cx) - 2).astype(int), ux].min(0) / 255.0
        ox = CROP[0]
        rig_eyes[name] = {
            "center": [cx - ox, cy - CROP[1]],
            "irisRadius": IRIS_R,
            "irisTexRadius": r_out,
            "pupilRadius": PUPIL_R,
            # quadratics y = a*(x-cx)^2 + b*(x-cx) + c, already in crop coordinates
            "upper": [geo["upper"][0], geo["upper"][1], geo["upper"][2] - CROP[1]],
            "lower": [geo["lower"][0], geo["lower"][1], geo["lower"][2] - CROP[1]],
            "xRange": [geo["xmin"] - ox, geo["xmax"] - ox],
            "lidColor": [round(float(c), 4) for c in lid],
            "lashColor": [round(float(c), 4) for c in lash],
        }

    x0, y0, x1, y1 = CROP
    cw, ch = x1 - x0, y1 - y0

    def crop(a):
        return a[y0:y1, x0:x1]

    # premultiply-safe: keep RGB where alpha is 0 from bleeding dark fringes
    orig = np.dstack([rgb, alpha])
    Image.fromarray(np.clip(crop(orig), 0, 255).astype(np.uint8), "RGBA").save(
        OUT / "rahul-character.webp", quality=90, method=6
    )
    based = np.dstack([base, alpha])
    Image.fromarray(np.clip(crop(based), 0, 255).astype(np.uint8), "RGBA").save(
        OUT / "rahul-character-base.webp", quality=92, method=6
    )
    depth = depth_map(ch, cw)
    maps = np.dstack(
        [
            crop(mask) * 255,
            depth * 255,
            crop(shadow) * 255,
            np.full((ch, cw), 255, np.float32),
        ]
    )
    Image.fromarray(np.clip(maps, 0, 255).astype(np.uint8), "RGBA").save(OUT / "rahul-character-maps.png", optimize=True)

    rig = {
        "width": cw,
        "height": ch,
        "eyes": rig_eyes,
        # neutral gaze in the source is straight at the viewer; keep these limits conservative
        "maxOffset": [9.5, 4.2],
    }
    RIG.write_text(json.dumps(rig, indent=2) + "\n")
    print(json.dumps(rig, indent=2))


if __name__ == "__main__":
    main()
