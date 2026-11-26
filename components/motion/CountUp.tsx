"use client";

import React, { useEffect, useRef } from "react";

/**
 * Counts a number up when it scrolls into view and always settles on the exact original text.
 * Works on strings like "9.35", "95.84%", "11+", "4,050" or "100 Days": the first number is
 * animated, everything around it (prefix, suffix, separators, decimals) is preserved.
 * Server-renders the final value, so no-JS, reduced motion and crawlers see the real number,
 * and the box keeps its final width while counting (no layout shift).
 */
const NUM = /(-?\d[\d,]*(?:\.\d+)?)/;

export function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: string | number;
  duration?: number;
  className?: string;
}) {
  const text = String(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = text.match(NUM);
    if (!el || !m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raw = m[1];
    const target = parseFloat(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const grouped = raw.includes(",");
    const [before, after] = [text.slice(0, m.index), text.slice((m.index ?? 0) + raw.length)];
    const fmt = (n: number) =>
      before +
      n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouped }) +
      after;

    // already on screen when we mount (e.g. above the fold): leave it alone, no flash
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    el.style.minWidth = `${el.offsetWidth}px`;
    el.textContent = fmt(0);

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / (duration * 1000));
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // easeOutExpo
          el.textContent = p < 1 ? fmt(target * eased) : text; // final frame: exact original text
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = text;
      el.style.minWidth = "";
    };
  }, [text, duration]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className ?? ""}`}>
      {text}
    </span>
  );
}
