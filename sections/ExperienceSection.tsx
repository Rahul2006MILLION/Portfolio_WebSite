"use client";

import React, { useEffect, useRef } from "react";
import { experienceData } from "@/data/experience";
import { Chapter, container, sectionPad } from "@/components/ui/Chapter";
import { gsap } from "@/lib/animations/gsapConfig";

/**
 * Scroll-driven story. Desktop: the section pins and the internship's deliverables slide past
 * horizontally as chapters, with a progress line and a live "01 / 03" counter; each panel's
 * contents cascade in as it enters. Mobile / reduced motion: a vertical story with staggered reveals.
 */
export function ExperienceSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const x = experienceData[0];
  const total = x?.deliverables.length ?? 0;

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // horizontal layout only exists while the pinned animation does (see .h-story in globals.css)
      pin.classList.add("h-story");
      const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            if (countRef.current) {
              const n = Math.min(total, Math.floor(self.progress * total) + 1);
              countRef.current.textContent = String(n).padStart(2, "0");
            }
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        pin.classList.remove("h-story");
      };
    });
    return () => mm.revert();
  }, [total]);

  if (!x) return null;

  return (
    <section id="experience" className={sectionPad} aria-labelledby="experience-title">
      <div className={container}>
        <Chapter index="03" label="Experience" title={<span id="experience-title">Applied work, <em className="italic">shipped</em>.</span>} />
      </div>

      <div ref={pinRef} className="h-story-pin relative">
        <ol ref={trackRef} className="h-story-track mx-auto flex max-w-[1360px] flex-col gap-6 px-5 sm:px-10 lg:px-16">
          {/* opening panel: the role */}
          <li
            className="h-story-intro relative flex flex-col justify-between rounded-[28px] bg-ink p-8 text-cream sm:p-10"
            data-reveal
          >
            <div className="stagger">
              <p style={{ "--i": 0 } as React.CSSProperties} className="eyebrow text-[10px] text-amber">
                {x.period} · {x.type} · {x.location}
              </p>
              <h3 style={{ "--i": 1 } as React.CSSProperties} className="mt-6 font-serif text-[clamp(36px,4vw,60px)] leading-[0.98]">
                {x.role}
              </h3>
              <p style={{ "--i": 2 } as React.CSSProperties} className="mt-3 text-lg text-cream-muted">
                {x.company}
              </p>
            </div>
            <p className="mt-10 text-[15px] leading-relaxed text-cream-muted">{x.summary}</p>
            <p aria-hidden="true" className="h-story-hint eyebrow mt-8 hidden items-center gap-3 text-[9.5px] text-cream-muted">
              Scroll to follow the work <span className="inline-block animate-[float-y_2s_ease-in-out_infinite]">→</span>
            </p>
          </li>

          {x.deliverables.map((d, i) => (
            <li
              key={d.title}
              className="h-story-panel spotlight relative flex flex-col overflow-hidden rounded-[28px] border border-ink/15 bg-sage-50/50 p-8 backdrop-blur-[2px] sm:p-10"
              data-reveal
              style={{ "--spot": "rgba(25,29,22,0.07)" } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[200px] leading-none text-ink/[0.07] text-outline"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="stagger relative">
                <p style={{ "--i": 0 } as React.CSSProperties} className="eyebrow text-[10px] text-ink-muted">
                  Deliverable {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
                <h4 style={{ "--i": 1 } as React.CSSProperties} className="mt-5 max-w-[16ch] font-serif text-[clamp(30px,3vw,46px)] leading-[1.02] text-ink">
                  {d.title}
                </h4>
                <p style={{ "--i": 2 } as React.CSSProperties} className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft">
                  {d.description}
                </p>
                {d.metrics && (
                  <p style={{ "--i": 3 } as React.CSSProperties} className="mt-6 inline-block rounded-2xl bg-ink px-4 py-2.5 font-mono text-[12px] text-cream">
                    {d.metrics}
                  </p>
                )}
              </div>
              {d.technologies && (
                <ul className="stagger relative mt-auto flex flex-wrap gap-2 pt-8">
                  {d.technologies.map((t, k) => (
                    <li key={t} style={{ "--i": k + 4 } as React.CSSProperties} className="rounded-full border border-ink/25 px-3 py-1 text-[12.5px] text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>

        {/* progress (desktop pinned mode only) */}
        <div aria-hidden="true" className="h-story-progress mx-auto mt-10 hidden w-full max-w-[1360px] items-center gap-5 px-10">
          <span className="font-mono text-[11px] text-ink">
            <span ref={countRef}>01</span> / {String(total).padStart(2, "0")}
          </span>
          <span className="relative h-px flex-1 bg-ink/15">
            <span ref={barRef} className="absolute inset-0 origin-left scale-x-0 bg-ink" />
          </span>
        </div>
      </div>
    </section>
  );
}
