"use client";

import React, { useEffect, useRef, useState } from "react";
import { NAV_LINKS, scrollToHash } from "@/components/navigation/Navbar";

/**
 * Scroll progress + chapter rail. Desktop: a vertical rail on the left with chapter numbers;
 * the active one expands to its name. Mobile: a hairline progress bar at the top.
 * Hidden while the hero is on screen so the opening stays clean.
 */
export function SectionRail() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      const about = document.getElementById("about");
      setVisible(!!about && about.getBoundingClientRect().top < window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[55] h-[2px] lg:hidden">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-amber" />
      </div>
      <nav
        aria-label="Chapters"
        className={`fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-700 xl:block ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div aria-hidden="true" className="absolute left-[3px] top-1 bottom-1 w-px bg-current opacity-20 mix-blend-difference" />
        <div ref={fillRef} aria-hidden="true" className="absolute left-[3px] top-1 bottom-1 w-px origin-top scale-y-0 bg-amber" />
        <ol className="relative space-y-2.5">
          {NAV_LINKS.map((l) => {
            const on = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => scrollToHash(l.href) && e.preventDefault()}
                  aria-current={on ? "true" : undefined}
                  className="group flex items-center gap-3 text-cream mix-blend-difference"
                >
                  <span className={`block h-[7px] w-[7px] rounded-full border border-current transition-all duration-500 ${on ? "scale-125 bg-current" : "opacity-70 group-hover:opacity-100"}`} />
                  <span className={`font-mono text-[10px] tracking-[0.18em] transition-all duration-500 ${on ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
                    {l.index}
                  </span>
                  <span
                    className={`eyebrow overflow-hidden whitespace-nowrap text-[9.5px] transition-[max-width,opacity] duration-700 ease-[var(--ease-cinematic)] ${
                      "max-w-0 opacity-0 group-hover:max-w-[160px] group-hover:opacity-100 group-focus-visible:max-w-[160px] group-focus-visible:opacity-100"
                    }`}
                  >
                    {l.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
