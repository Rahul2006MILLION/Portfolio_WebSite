import React from "react";
import { LiveText } from "@/components/live/LiveText";
import { LeetCodeBreakdown } from "@/components/live/LeetCodeBreakdown";
import { CountUp } from "@/components/motion/CountUp";
import { Tilt } from "@/components/motion/Tilt";
import { LEETCODE_SOLVED_TOKEN } from "@/lib/leetcode/token";
import { codingProfilesData } from "@/data/codingProfiles";
import { Chapter, container, sectionPad } from "@/components/ui/Chapter";

export function CodingProfilesSection() {
  return (
    <section id="coding" className={sectionPad} aria-labelledby="coding-title">
      <div className={container}>
        <Chapter index="09" label="Coding profiles" title={<span id="coding-title">Find me <em className="italic">elsewhere</em>.</span>} />
        <ul className="grid gap-4 md:grid-cols-3">
          {codingProfilesData.map((p, i) => (
            <li key={p.id} data-reveal style={{ "--reveal-delay": `${0.09 * i}s` } as React.CSSProperties}>
              <Tilt max={6} className="h-full">
              <a
                href={p.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="spotlight group flex h-full flex-col rounded-[28px] border border-ink/20 p-7 transition-colors duration-500 [--spot:rgba(231,185,111,0.18)] hover:bg-ink hover:text-cream"
              >
                <span className="flex items-baseline justify-between">
                  <span className="font-serif text-[40px] leading-none">{p.platform}</span>
                  <span aria-hidden="true" className="relative inline-block h-6 w-6 overflow-hidden text-xl leading-6">
                    <span className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:-translate-y-full group-hover:translate-x-full">↗</span>
                    <span className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:translate-x-0 group-hover:translate-y-0">↗</span>
                  </span>
                </span>
                <span className="mt-2 font-mono text-[12.5px] opacity-80">{p.handleOrRank}</span>
                <span className="mt-5 flex-1 text-[14px] leading-relaxed opacity-85"><LiveText text={p.tagline} /></span>
                <span className="mt-6 grid gap-2 border-t border-current/20 pt-5 text-[13px]">
                  {p.metrics.map((m) => (
                    <span key={m.label} className="flex justify-between gap-4">
                      <span className="opacity-70">{m.label}</span>
                      <span>{m.value.includes(LEETCODE_SOLVED_TOKEN) ? <LiveText text={m.value} /> : <CountUp value={m.value} />}</span>
                    </span>
                  ))}
                </span>
                {p.platform === "LeetCode" && <LeetCodeBreakdown />}
              </a>
              </Tilt>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
