"use client";

/**
 * WebGL renderer for the hero character (lazy-loaded, client only).
 *
 * The approved render is a single flat image, so there is no mesh or rig to rotate. Instead the
 * image is split into layers in a fragment shader:
 *   - base layer: the render with the irises painted out of the eye openings
 *   - eyeball layer: the reconstructed iris discs, moved inside the eye openings and clipped by
 *     the real eyelids (mask), shaded by the upper lid, foreshortened when looking sideways
 *   - eyelids: a blink slides the real lash line down over the eye
 *   - relief: a depth map gives the head a few pixels of per-pixel parallax (nose moves more
 *     than the ears), so the face turns slightly towards the pointer instead of sliding as a card
 */

import { useEffect, useRef } from "react";
import {
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  NoBlending,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from "three";
import rig from "./characterRig.json";
import { GazeController } from "./gaze";

const ASSETS = {
  base: "/character/rahul-character-base.webp",
  maps: "/character/rahul-character-maps.png",
  irisLeft: "/character/rahul-iris-left.png",
  irisRight: "/character/rahul-iris-right.png",
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uBase;
  uniform sampler2D uMaps;
  uniform sampler2D uIrisL;
  uniform sampler2D uIrisR;
  uniform vec2 uSize;        // texture size in px
  uniform vec2 uParallax;    // -1..1
  uniform float uParallaxPx; // max relief shift in px
  uniform vec2 uMax;         // max iris offset px

  uniform vec4 uEyeL;        // cx, cy, texRadius, unused
  uniform vec4 uEyeR;
  uniform vec3 uUpL; uniform vec3 uLoL;
  uniform vec3 uUpR; uniform vec3 uLoR;
  uniform vec2 uRangeL; uniform vec2 uRangeR;
  uniform vec3 uLidL; uniform vec3 uLidR;
  uniform vec2 uOffL; uniform vec2 uOffR;
  uniform float uBlink;

  vec2 toUv(vec2 px) { return vec2(px.x / uSize.x, 1.0 - px.y / uSize.y); }
  float quad(vec3 c, float x, float cx) { float d = x - cx; return c.x * d * d + c.y * d + c.z; }

  // returns rgb of the eye region for one eye; 'lidCover' reports eyelid coverage
  vec3 eye(vec2 px, vec3 baseCol, float shadow, vec4 E, vec3 up3, vec3 lo3, vec2 range,
           vec3 lidCol, vec2 off, sampler2D irisTex, out float lidCover) {
    // iris disc, foreshortened as the eyeball turns sideways
    vec2 q = (px - (E.xy + off)) / E.z;
    q.x /= 1.0 - 0.14 * abs(off.x) / uMax.x;
    q.y /= 1.0 - 0.10 * abs(off.y) / uMax.y;
    vec4 iris = vec4(0.0);
    if (abs(q.x) < 1.0 && abs(q.y) < 1.0) {
      iris = texture2D(irisTex, vec2(q.x * 0.5 + 0.5, 1.0 - (q.y * 0.5 + 0.5)));
    }
    vec3 col = mix(baseCol, iris.rgb, iris.a) * shadow;

    // blink: the upper lid travels from its rest curve down to the lower lid
    float up = quad(up3, px.x, E.x);
    float lo = quad(lo3, px.x, E.x);
    float lid = mix(up, lo + 2.0, uBlink);
    float dd = lid - px.y;                       // distance above the moving lid edge
    // as the lid closes it also swallows the resting lash line above the eye
    float top = up - 2.5 - 5.0 * uBlink;
    float inBand = step(range.x - 1.5, px.x) * step(px.x, range.y + 1.5)
                 * step(top, px.y) * step(px.y, lo + 2.0);
    lidCover = 0.0;
    if (uBlink > 0.01 && dd > 0.0 && inBand > 0.5) {
      vec3 lidColor;
      if (dd < 2.4) {
        // the real lash line, carried down with the lid
        vec2 src = vec2(px.x, up - 0.5 - dd);
        lidColor = texture2D(uBase, toUv(src)).rgb;
      } else {
        float shade = 0.86 + 0.14 * smoothstep(2.4, 10.0, dd);
        float corner = 1.0 - 0.08 * smoothstep(0.55, 1.0, abs(px.x - E.x) / (0.5 * (range.y - range.x)));
        lidColor = lidCol * 1.07 * shade * corner;
      }
      col = lidColor;
      lidCover = smoothstep(0.0, 0.8, dd) * smoothstep(top, top + 2.5, px.y);
    }
    return col;
  }

  void main() {
    vec2 px0 = vec2(vUv.x, 1.0 - vUv.y) * uSize;
    float depth = texture2D(uMaps, vUv).g;
    vec2 px = px0 - uParallax * (depth - 0.5) * uParallaxPx;
    vec2 uv = toUv(px);

    vec4 base = texture2D(uBase, uv);
    vec4 maps = texture2D(uMaps, uv);
    vec3 col = base.rgb;

    float midX = 0.5 * (uEyeL.x + uEyeR.x);
    bool leftSide = px.x < midX;
    bool nearEyes = abs(px.y - 0.5 * (uEyeL.y + uEyeR.y)) < 40.0;

    if (nearEyes) {
      float lidCover;
      vec3 e;
      if (leftSide) {
        e = eye(px, base.rgb, maps.b, uEyeL, uUpL, uLoL, uRangeL, uLidL, uOffL, uIrisL, lidCover);
      } else {
        e = eye(px, base.rgb, maps.b, uEyeR, uUpR, uLoR, uRangeR, uLidR, uOffR, uIrisR, lidCover);
      }
      float m = max(maps.r, lidCover);
      col = mix(col, e, m);
    }

    // base is uploaded premultiplied (clean hair edges), eye pixels are opaque
    gl_FragColor = vec4(col, base.a);
  }
`;

interface Props {
  onReady?: () => void;
  onFail?: () => void;
}

export default function CharacterCanvas({ onReady, onFail }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(onReady);
  const failRef = useRef(onFail);

  useEffect(() => {
    readyRef.current = onReady;
    failRef.current = onFail;
  }, [onReady, onFail]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      failRef.current?.();
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const { left: L, right: R } = rig.eyes;
    const v3 = (a: number[]) => new Vector3(a[0], a[1], a[2]);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: false,
      blending: NoBlending,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uBase: { value: null },
        uMaps: { value: null },
        uIrisL: { value: null },
        uIrisR: { value: null },
        uSize: { value: new Vector2(rig.width, rig.height) },
        uParallax: { value: new Vector2() },
        uParallaxPx: { value: 7.0 },
        uMax: { value: new Vector2(rig.maxOffset[0], rig.maxOffset[1]) },
        uEyeL: { value: new Vector4(L.center[0], L.center[1], L.irisTexRadius, 0) },
        uEyeR: { value: new Vector4(R.center[0], R.center[1], R.irisTexRadius, 0) },
        uUpL: { value: v3(L.upper) },
        uLoL: { value: v3(L.lower) },
        uUpR: { value: v3(R.upper) },
        uLoR: { value: v3(R.lower) },
        uRangeL: { value: new Vector2(L.xRange[0], L.xRange[1]) },
        uRangeR: { value: new Vector2(R.xRange[0], R.xRange[1]) },
        uLidL: { value: v3(L.lidColor) },
        uLidR: { value: v3(R.lidColor) },
        uOffL: { value: new Vector2() },
        uOffR: { value: new Vector2() },
        uBlink: { value: 0 },
      },
    });
    const mesh = new Mesh(new PlaneGeometry(1, 1), material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const gaze = new GazeController(
      { width: rig.width, eyes: { left: L as never, right: R as never }, maxOffset: rig.maxOffset as [number, number], viewDepth: 260 },
      coarse
    );

    // --- pointer wiring (window-wide: the eyes follow the cursor anywhere on the page) ---
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") gaze.setPointer({ x: e.clientX, y: e.clientY });
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") gaze.setPointer({ x: e.clientX, y: e.clientY }, true);
    };
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) gaze.setPointer(null);
    };
    const onBlur = () => gaze.setPointer(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("blur", onBlur);

    // --- sizing ---
    let rect = canvas.getBoundingClientRect();
    const resize = () => {
      rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) renderer.setSize(rect.width, rect.height, false);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // --- render loop, only while on screen and tab visible ---
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let loaded = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden || !loaded) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      rect = canvas.getBoundingClientRect();
      const g = gaze.update(dt, rect, { x: window.innerWidth, y: window.innerHeight });
      const u = material.uniforms;
      (u.uOffL.value as Vector2).set(g.left.x, g.left.y);
      (u.uOffR.value as Vector2).set(g.right.x, g.right.y);
      (u.uParallax.value as Vector2).set(g.parallax.x, g.parallax.y);
      u.uBlink.value = g.blink;
      if (process.env.NODE_ENV !== "production") {
        // dev-only: lets automated checks freeze a blink, e.g. canvas.__debugBlink = 0.6
        const forced = (canvas as HTMLCanvasElement & { __debugBlink?: number }).__debugBlink;
        if (typeof forced === "number") u.uBlink.value = forced;
      }
      renderer.render(scene, camera);
      // exposed for automated checks / debugging; cheap property writes
      canvas.dataset.gaze = `${g.left.x.toFixed(2)},${g.left.y.toFixed(2)},${g.right.x.toFixed(2)},${g.right.y.toFixed(2)}`;
      canvas.dataset.blink = g.blink.toFixed(2);
      raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const onVis = () => !document.hidden && kick();
    document.addEventListener("visibilitychange", onVis);

    // --- textures ---
    const loader = new TextureLoader();
    const load = (url: string, mip: boolean, premultiply = false) =>
      new Promise<Texture>((resolve, reject) =>
        loader.load(
          url,
          (t) => {
            t.generateMipmaps = mip;
            t.premultiplyAlpha = premultiply;
            t.minFilter = mip ? LinearMipmapLinearFilter : LinearFilter;
            t.magFilter = LinearFilter;
            t.anisotropy = 4;
            t.needsUpdate = true;
            resolve(t);
          },
          undefined,
          reject
        )
      );
    let disposed = false;
    const textures: Texture[] = [];
    Promise.all([load(ASSETS.base, true, true), load(ASSETS.maps, false), load(ASSETS.irisLeft, true), load(ASSETS.irisRight, true)])
      .then(([base, maps, il, ir]) => {
        textures.push(base, maps, il, ir);
        if (disposed) return;
        const u = material.uniforms;
        u.uBase.value = base;
        u.uMaps.value = maps;
        u.uIrisL.value = il;
        u.uIrisR.value = ir;
        loaded = true;
        resize();
        renderer.render(scene, camera);
        readyRef.current?.();
        kick();
      })
      .catch(() => failRef.current?.());

    const onLost = (e: Event) => {
      e.preventDefault();
      failRef.current?.();
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      textures.forEach((t) => t.dispose());
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
