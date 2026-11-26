"use client";

import { useEffect, useRef } from "react";

/**
 * A soft light that follows the cursor across its parent (a dark panel). Decorative,
 * pointer-events: none, fine pointers only; updates CSS variables, never React state.
 */
export function PanelGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("section") ?? el?.parentElement;
    if (!el || !host) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      el.style.setProperty("--gx", `${x - r.left}px`);
      el.style.setProperty("--gy", `${y - r.top}px`);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const enter = () => el.classList.add("is-on");
    const leave = () => el.classList.remove("is-on");
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="panel-glow" />;
}
