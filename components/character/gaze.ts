/**
 * Gaze + blink controller for the hero character.
 *
 * Pure logic (no DOM rendering): it is fed pointer events and a per-frame clock and produces
 * smoothed iris offsets for each eye, a head-parallax vector and a blink amount.
 * All eye math is done in character texture pixels so the limits match the painted eye openings.
 */

export interface Vec2 {
  x: number;
  y: number;
}

export interface EyeSpec {
  center: [number, number];
}

export interface GazeConfig {
  /** character texture width in px */
  width: number;
  eyes: { left: EyeSpec; right: EyeSpec };
  /** max iris travel in texture px (x, y) */
  maxOffset: [number, number];
  /** "distance" of the viewer plane in texture px; bigger = calmer eyes */
  viewDepth: number;
}

export interface GazeFrame {
  left: Vec2;
  right: Vec2;
  parallax: Vec2;
  blink: number;
}

type Mode = "pointer" | "idle";

const damp = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

export class GazeController {
  private cfg: GazeConfig;
  /** pointer in client px, or null when it is outside the viewport */
  private pointer: Vec2 | null = null;
  private mode: Mode;
  private lastPointerAt = -Infinity;
  private now = 0;

  // targets in normalised gaze space (-1..1 ellipse)
  private idleTarget: Vec2 = { x: 0, y: 0 };
  private nextIdleAt = 0.8;
  private touchFocusUntil = -Infinity;

  private cur: GazeFrame = {
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
    parallax: { x: 0, y: 0 },
    blink: 0,
  };

  private nextBlinkAt = 1.6 + Math.random() * 2.5;
  private blinkStart = -Infinity;
  private doubleBlink = false;

  constructor(cfg: GazeConfig, coarsePointer: boolean) {
    this.cfg = cfg;
    this.mode = coarsePointer ? "idle" : "pointer";
  }

  setPointer(p: Vec2 | null, fromTouch = false) {
    this.pointer = p;
    if (p) this.lastPointerAt = this.now;
    if (fromTouch && p) this.touchFocusUntil = this.now + 2.4;
  }

  /**
   * @param dt seconds since previous frame
   * @param rect on-screen box of the character (client px), used to place the eyes
   * @param viewport viewport size in client px
   */
  update(dt: number, rect: DOMRect, viewport: Vec2): GazeFrame {
    this.now += dt;
    const t = this.now;
    const { maxOffset } = this.cfg;
    const scale = rect.width / this.cfg.width; // client px per texture px
    const coarse = this.mode === "idle";

    // pointer is "live" if a mouse moved recently, or a touch asked for attention
    const pointerLive =
      this.pointer !== null &&
      ((!coarse && t - this.lastPointerAt < 8) || (coarse && t < this.touchFocusUntil));

    const targetFor = (eye: EyeSpec): Vec2 => {
      if (pointerLive && this.pointer) {
        const ex = rect.left + eye.center[0] * scale;
        const ey = rect.top + eye.center[1] * scale;
        const vx = (this.pointer.x - ex) / scale;
        const vy = (this.pointer.y - ey) / scale;
        const d = this.cfg.viewDepth;
        // direction to the pointer projected onto a sphere: atan-like, never exceeds 1
        const len = Math.sqrt(vx * vx + vy * vy + d * d);
        return { x: (vx / len) * maxOffset[0] * 1.15, y: (vy / len) * maxOffset[1] * 1.6 };
      }
      return { x: this.idleTarget.x * maxOffset[0], y: this.idleTarget.y * maxOffset[1] };
    };

    // idle wandering (touch devices, or a mouse that has been still for a while)
    if (!pointerLive && t > this.nextIdleAt) {
      const centre = Math.random() < 0.35;
      const ang = Math.random() * Math.PI * 2;
      const r = centre ? 0 : 0.35 + Math.random() * 0.45;
      this.idleTarget = { x: Math.cos(ang) * r, y: Math.sin(ang) * r * 0.7 };
      this.nextIdleAt = t + 1.4 + Math.random() * 2.6;
    }

    const clampEllipse = (v: Vec2): Vec2 => {
      const nx = v.x / maxOffset[0];
      const ny = v.y / maxOffset[1];
      const m = Math.hypot(nx, ny);
      return m > 1 ? { x: v.x / m, y: v.y / m } : v;
    };

    const tl = clampEllipse(targetFor(this.cfg.eyes.left));
    const tr = clampEllipse(targetFor(this.cfg.eyes.right));
    // both eyes share one rate so they always move together; mild convergence comes
    // from each eye aiming at the pointer from its own position
    const eyeRate = pointerLive ? 11 : 7;
    this.cur.left.x = damp(this.cur.left.x, tl.x, eyeRate, dt);
    this.cur.left.y = damp(this.cur.left.y, tl.y, eyeRate, dt);
    this.cur.right.x = damp(this.cur.right.x, tr.x, eyeRate, dt);
    this.cur.right.y = damp(this.cur.right.y, tr.y, eyeRate, dt);

    // head: follows the gaze direction a little, plus a slow breathing sway
    const gx = (this.cur.left.x + this.cur.right.x) / (2 * maxOffset[0]);
    const gy = (this.cur.left.y + this.cur.right.y) / (2 * maxOffset[1]);
    const pointerBias =
      pointerLive && this.pointer
        ? {
            x: Math.max(-1, Math.min(1, (this.pointer.x / viewport.x) * 2 - 1)),
            y: Math.max(-1, Math.min(1, (this.pointer.y / viewport.y) * 2 - 1)),
          }
        : { x: 0, y: 0 };
    const sway = { x: Math.sin(t * 0.37) * 0.18, y: Math.sin(t * 0.53 + 1.3) * 0.12 };
    const px = 0.55 * gx + 0.35 * pointerBias.x + sway.x;
    const py = 0.4 * gy + 0.25 * pointerBias.y + sway.y;
    this.cur.parallax.x = damp(this.cur.parallax.x, px, 2.4, dt);
    this.cur.parallax.y = damp(this.cur.parallax.y, py, 2.4, dt);

    this.cur.blink = this.blinkAmount(t);
    return this.cur;
  }

  private blinkAmount(t: number): number {
    if (t >= this.nextBlinkAt && t - this.blinkStart > 0.5) {
      this.blinkStart = t;
      this.doubleBlink = Math.random() < 0.18;
      this.nextBlinkAt = t + 2.6 + Math.random() * 3.8;
    }
    const one = (s: number) => {
      // close 75ms, hold 25ms, open 140ms
      if (s < 0 || s > 0.24) return 0;
      if (s < 0.075) return s / 0.075;
      if (s < 0.1) return 1;
      const o = (s - 0.1) / 0.14;
      return 1 - o * o * (3 - 2 * o);
    };
    const s = t - this.blinkStart;
    return Math.max(one(s), this.doubleBlink ? one(s - 0.3) : 0);
  }
}
