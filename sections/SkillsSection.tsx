"use client";

import React, { useState } from "react";
import { skillCategoriesData } from "@/data/skills";
import { Chapter, container, sectionPad } from "@/components/ui/Chapter";
import { CountUp } from "@/components/motion/CountUp";
import { Tilt } from "@/components/motion/Tilt";

/**
 * Skills as an interactive field:
 *  - a kinetic belt of every skill name drifts in opposite directions as you scroll
 *  - hovering a group spotlights it (cursor light) and quiets the others
 *  - pills cascade in; hovering one reveals its documented tag in the group caption
 *    (tags come from data/skills.ts — no invented proficiency levels)
 */
export function SkillsSection() {
  const all = skillCategoriesData.flatMap((g) => g.skills.map((s) => s.name));
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];

  return (
    <section id="skills" className={`${sectionPad} overflow-hidden`} aria-labelledby="skills-title">
      <div className={container}>
        <Chapter
          index="04"
          label="Skills"
          title={<span id="skills-title">The <em className="italic">toolkit</em>.</span>}
          intro="Filled pills are the tools I use most and can go deepest on. Hover any skill to see where it fits."
        />
      </div>

      {/* kinetic belt */}
      <div aria-hidden="true" className="relative -mx-5 mb-20 select-none space-y-2 sm:-mx-10 lg:-mx-16">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden whitespace-nowrap">
            <div
              data-scrub-x={r === 0 ? "-28" : "28"}
              className={`inline-block font-serif text-[clamp(44px,7vw,110px)] leading-[1.05] ${r === 0 ? "text-ink/80" : "-translate-x-[28%] text-ink/30 text-outline"}`}
            >
              {[...row, ...row].map((name, k) => (
                <span key={k} className="mx-[0.35em]">
                  {name}
                  <span className="mx-[0.35em] text-amber-deep/60">✦</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={container}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 [&:has(.skill-group:hover)_.skill-group:not(:hover)]:opacity-45">
          {skillCategoriesData.map((g, i) => (
            <SkillGroup key={g.id} group={g} delay={0.06 * (i % 3)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ group: g, delay }: { group: (typeof skillCategoriesData)[number]; delay: number }) {
  const [focus, setFocus] = useState<{ name: string; tag?: string } | null>(null);
  return (
    <div data-reveal style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}>
      <Tilt
        max={3}
        className="skill-group spotlight h-full rounded-[24px] border border-ink/15 bg-sage-50/35 p-6 transition-[opacity,transform] duration-500 sm:p-7"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-[28px] leading-tight text-ink">{g.title}</h3>
          <span className="font-mono text-[11px] text-ink-muted">{g.categoryNumber}</span>
        </div>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{g.description}</p>
        <ul className="stagger mt-5 flex flex-wrap gap-2" onMouseLeave={() => setFocus(null)}>
          {g.skills.map((s, k) => (
            <li key={s.name} style={{ "--i": k } as React.CSSProperties}>
              <button
                type="button"
                onMouseEnter={() => setFocus({ name: s.name, tag: s.levelTag })}
                onFocus={() => setFocus({ name: s.name, tag: s.levelTag })}
                onBlur={() => setFocus(null)}
                className={`rounded-full px-3 py-1.5 text-[13px] transition-[transform,background-color,color,box-shadow] duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 ${
                  s.isKeySkill
                    ? "bg-ink text-cream hover:shadow-[0_8px_20px_-10px_rgba(25,29,22,0.7)]"
                    : "border border-ink/30 text-ink hover:border-ink hover:bg-ink/[0.06]"
                }`}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex min-h-[2.75rem] items-center justify-between border-t border-ink/15 pt-4 text-[12.5px]" aria-live="polite">
          <span className="truncate text-ink-soft">
            {focus ? (
              <>
                <span className="text-ink">{focus.name}</span>
                {focus.tag && <span className="text-ink-muted"> — {focus.tag}</span>}
              </>
            ) : (
              <span className="text-ink-muted">Hover a skill</span>
            )}
          </span>
          <span className="eyebrow shrink-0 text-[9.5px] text-ink-muted">
            <CountUp value={g.skills.length} /> tools
          </span>
        </div>
      </Tilt>
    </div>
  );
}
