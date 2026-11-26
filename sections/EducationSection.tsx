import React from "react";
import { educationData } from "@/data/education";
import { Chapter, container, sectionPad } from "@/components/ui/Chapter";
import { CountUp } from "@/components/motion/CountUp";

/**
 * Animated timeline: the spine draws itself with scroll (data-draw), each milestone's node lights
 * up as it arrives, the year floats behind in outline type (parallax), scores count up to their
 * exact values and coursework chips cascade in.
 */
export function EducationSection() {
  return (
    <section id="education" className={sectionPad} aria-labelledby="education-title">
      <div className={container}>
        <Chapter index="02" label="Education" title={<span id="education-title">Where I learned the <em className="italic">fundamentals</em>.</span>} />
        <ol className="relative">
          {/* spine: faint track + a line that draws with scroll */}
          <span aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-ink/15 sm:left-[calc(25%+7px)]" />
          <span aria-hidden="true" data-draw="y" className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-ink sm:left-[calc(25%+7px)]" />
          {educationData.map((e) => {
            const year = e.period.match(/\d{4}/g)?.pop() ?? "";
            return (
              <li
                key={e.id}
                className="group/edu relative grid gap-3 pb-24 pl-10 last:pb-0 sm:grid-cols-4 sm:gap-10 sm:pl-0"
                data-reveal
                style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}
              >
                {/* node: rings out once when the milestone arrives */}
                <span aria-hidden="true" className="absolute left-0 top-1.5 h-[15px] w-[15px] sm:left-[calc(25%)]">
                  <span className="absolute inset-0 rounded-full border border-ink/40 bg-sage-200" />
                  <span
                    className={`absolute inset-[4px] scale-0 rounded-full transition-transform delay-300 duration-700 ease-[var(--ease-cinematic)] group-[.is-in]/edu:scale-100 ${
                      e.status === "In Progress" ? "bg-ink" : "bg-ink/50"
                    }`}
                  />
                  <span className="absolute -inset-2 rounded-full border border-ink/40 opacity-0 group-[.is-in]/edu:animate-[ping_1.6s_ease-out_0.35s_1]" />
                </span>

                {/* outlined year drifting behind */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 right-0 select-none font-serif text-[clamp(90px,14vw,220px)] leading-none text-ink/10 text-outline"
                  data-parallax="0.25"
                >
                  {year}
                </span>

                <div className="eyebrow text-[10.5px] text-ink-muted sm:pt-1 sm:pr-6 sm:text-right">
                  <span className="inline-block transition-[letter-spacing] duration-1000 ease-[var(--ease-cinematic)] group-[.is-in]/edu:tracking-[0.22em]">
                    {e.period}
                  </span>
                  <span className="mt-1 block normal-case tracking-normal">{e.status}</span>
                </div>
                <div className="relative sm:col-span-3 sm:pl-12">
                  <h3 className="font-serif text-[clamp(28px,3vw,42px)] leading-tight text-ink">{e.institution}</h3>
                  <p className="mt-2 text-[15px] text-ink-soft">
                    {e.degree}
                    {e.specialization && <> · {e.specialization}</>}
                  </p>
                  <p className="mt-5 inline-flex items-baseline gap-3 rounded-full border border-ink/20 bg-sage-100/40 px-4 py-2 backdrop-blur-[2px]">
                    <span className="eyebrow text-[9.5px] text-ink-muted">{e.scoreType}</span>
                    <CountUp value={e.score} duration={1.8} className="font-serif text-[30px] leading-none text-ink" />
                  </p>
                  {e.description && <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">{e.description}</p>}
                  {e.coursework && (
                    <ul className="stagger mt-5 flex flex-wrap gap-2">
                      {e.coursework.map((c, k) => (
                        <li key={c} style={{ "--i": k } as React.CSSProperties} className="rounded-full bg-ink/[0.06] px-3 py-1 text-[12.5px] text-ink-soft">
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
