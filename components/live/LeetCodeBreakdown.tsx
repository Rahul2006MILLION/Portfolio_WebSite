"use client";

import React from "react";
import { useLeetCodeSolved } from "@/lib/leetcode/clientStore";
import { CountUp } from "@/components/motion/CountUp";

/**
 * Live Easy / Medium / Hard split of the solved count (same /api/leetcode data as the total).
 * The bar grows into place when its [data-reveal] parent enters the viewport. Renders nothing
 * until real data is available — never placeholder numbers.
 */
export function LeetCodeBreakdown() {
  const s = useLeetCodeSolved();
  if (s.status !== "ready") return null;
  const { easy, medium, hard } = s.stats.breakdown;
  const total = easy + medium + hard;
  if (total === 0) return null;
  const parts = [
    { label: "Easy", n: easy, cls: "bg-[#7fcbc1]" },
    { label: "Medium", n: medium, cls: "bg-amber" },
    { label: "Hard", n: hard, cls: "bg-[#e39468]" },
  ];
  return (
    <span className="mt-5 block" aria-label={`Live from LeetCode: ${easy} easy, ${medium} medium, ${hard} hard`}>
      <span aria-hidden="true" className="flex h-2 overflow-hidden rounded-full bg-current/10">
        {parts.map((p, i) =>
          p.n > 0 ? (
            <span
              key={p.label}
              className={`lc-bar h-full ${p.cls}`}
              style={{ "--w": `${(p.n / total) * 100}%`, "--d": `${0.3 + i * 0.15}s` } as React.CSSProperties}
            />
          ) : null
        )}
      </span>
      <span aria-hidden="true" className="mt-2.5 flex justify-between text-[12px]">
        {parts.map((p) => (
          <span key={p.label} className="flex items-center gap-1.5 opacity-80">
            <span className={`h-1.5 w-1.5 rounded-full ${p.cls}`} />
            {p.label} <CountUp key={p.n} value={p.n} />
          </span>
        ))}
      </span>
    </span>
  );
}
