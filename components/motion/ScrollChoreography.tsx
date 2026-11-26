"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsapConfig";

/**
 * One place for every scroll-linked (scrubbed) effect on the page, declared with data attributes:
 *   data-panel            dark panel grows into place (scale + corner radius) as it arrives
 *   data-parallax="0.2"   drifts vertically at a different speed than the page
 *   data-scrub-x="-25"    slides horizontally (in %) while it crosses the viewport
 *   data-draw="y|x"       a line that draws itself across its parent's scroll range
 * Everything is transform/opacity only, and only runs when the visitor allows motion.
 */
export function ScrollChoreography() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((el) => {
        // data-panel="top": only the top corners are rounded (the panel continues into the footer)
        const r = (v: string) =>
          el.dataset.panel === "top" ? { borderTopLeftRadius: v, borderTopRightRadius: v } : { borderRadius: v };
        gsap.fromTo(
          el,
          { scale: 0.94, ...r("72px"), transformOrigin: "50% 0%" },
          {
            scale: 1,
            ...r(window.innerWidth < 640 ? "28px" : "40px"),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 25%", scrub: 0.5 },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.2");
        gsap.fromTo(
          el,
          { yPercent: speed * 100 },
          {
            yPercent: -speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scrub-x]").forEach((el) => {
        const to = parseFloat(el.dataset.scrubX || "-20");
        gsap.fromTo(
          el,
          { xPercent: 0 },
          {
            xPercent: to,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.4 },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
        const axis = el.dataset.draw === "x" ? "scaleX" : "scaleY";
        gsap.fromTo(
          el,
          { [axis]: 0 },
          {
            [axis]: 1,
            ease: "none",
            transformOrigin: axis === "scaleX" ? "0% 50%" : "50% 0%",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top 75%", end: "bottom 60%", scrub: 0.4 },
          }
        );
      });
    });

    // The pinned Experience story adds scroll height only after hydration, so the browser's own
    // scroll restoration would land too early on reload. Restore manually once layout is final.
    const KEY = `scroll:${location.pathname}`;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const save = () => {
      try {
        sessionStorage.setItem(KEY, String(window.scrollY));
      } catch {}
    };
    window.addEventListener("pagehide", save);

    let restored = false;
    const restore = () => {
      if (restored) return;
      restored = true;
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number | Element, o?: object) => void } }).__lenis;
      const jump = (y: number | Element) =>
        lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : typeof y === "number" ? window.scrollTo(0, y) : y.scrollIntoView();
      const hashTarget = location.hash ? document.querySelector(location.hash) : null;
      let saved: number | null = null;
      try {
        const v = sessionStorage.getItem(KEY);
        saved = v === null ? null : Number(v);
        sessionStorage.removeItem(KEY);
      } catch {}
      if (hashTarget) jump(hashTarget);
      else if (saved && Number.isFinite(saved)) jump(saved);
    };

    // fonts and late images change section heights: recompute trigger positions once settled
    const refresh = () => {
      ScrollTrigger.refresh();
      restore();
    };
    if (document.readyState === "complete") requestAnimationFrame(refresh);
    else window.addEventListener("load", refresh);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("pagehide", save);
      mm.revert();
    };
  }, []);

  return null;
}
