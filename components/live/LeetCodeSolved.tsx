"use client";

import React from "react";
import { useLeetCodeSolved } from "@/lib/leetcode/clientStore";
import { CountUp } from "@/components/motion/CountUp";

/**
 * Renders the live phrase, e.g. "150+ Problems Solved". The number always comes from LeetCode
 * (fresh, or the last successfully fetched value); with no data at all it says so instead of
 * showing a number.
 */
export function LeetCodeSolved() {
  const s = useLeetCodeSolved();

  if (s.status === "ready") {
    const { solved, fetchedAt, stale, breakdown } = s.stats;
    const when = new Date(fetchedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
    return (
      <span
        data-leetcode-solved={solved}
        data-stale={stale || undefined}
        title={`Live from LeetCode — Easy ${breakdown.easy} · Medium ${breakdown.medium} · Hard ${breakdown.hard}. ${stale ? "Last updated" : "Updated"} ${when}.`}
      >
        <CountUp key={solved} value={`${solved}+`} /> Problems Solved
      </span>
    );
  }

  if (s.status === "unavailable") {
    return <span data-leetcode-solved="unavailable">Solved count unavailable right now</span>;
  }

  return (
    <span aria-busy="true" data-leetcode-solved="loading" className="inline-block animate-pulse opacity-60">
      Loading solved count…
    </span>
  );
}
