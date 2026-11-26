import React from "react";
import Image from "next/image";
import { achievementsData } from "@/data/achievements";
import { certificatesData } from "@/data/certificates";
import { Chapter, container, sectionPad } from "@/components/ui/Chapter";
import { LiveText } from "@/components/live/LiveText";
import { CountUp } from "@/components/motion/CountUp";
import { splitWords } from "@/components/motion/split";

const SPOTLIGHT_ID = "ach-visionx-2026-excellence";

/**
 * Achievements: the VisionX team award gets a spotlight (circling gold edge, certificate unveiled
 * by a curtain, word-by-word title) while staying labelled as a team award; the rest form a
 * timeline whose markers light up as they arrive. Badge numbers count up; the LeetCode count is
 * the live value.
 */
export function AchievementsSection() {
  const spotlight = achievementsData.find((a) => a.id === SPOTLIGHT_ID);
  const rest = achievementsData.filter((a) => a.id !== SPOTLIGHT_ID);
  const cert = certificatesData.find((c) => c.id === "cert-visionx-2026-excellence");

  return (
    <section id="achievements" className={sectionPad} aria-labelledby="achievements-title">
      <div className={container}>
        <Chapter index="07" label="Achievements" title={<span id="achievements-title">Leadership &amp; <em className="italic">consistency</em>.</span>} />

        {spotlight && (
          <article
            data-reveal
            aria-labelledby={`${spotlight.id}-title`}
            className="award-ring relative mb-20 grid gap-10 overflow-hidden rounded-[32px] bg-forest p-7 text-cream shadow-[0_40px_90px_-50px_rgba(10,14,8,0.9)] sm:p-10 lg:grid-cols-12 lg:p-14"
          >
            <div className="aurora opacity-40" aria-hidden="true">
              <span />
              <span />
            </div>
            <div className="relative lg:col-span-6">
              <div className="stagger flex flex-wrap items-center gap-3">
                <span style={{ "--i": 0 } as React.CSSProperties} className="eyebrow rounded-full bg-amber px-3 py-1.5 text-[9.5px] text-forest">
                  Team award
                </span>
                <span style={{ "--i": 1 } as React.CSSProperties} className="eyebrow text-[10px] text-cream-muted">
                  {spotlight.categoryLabel} · {spotlight.period}
                </span>
              </div>
              <h3
                id={`${spotlight.id}-title`}
                data-reveal
                aria-label={spotlight.title}
                className="sw-host mt-6 font-serif text-[clamp(36px,4.4vw,66px)] leading-[0.98]"
              >
                {splitWords(spotlight.title)}
              </h3>
              <p className="mt-3 text-[14px] text-cream-muted">{spotlight.organization}</p>
              <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-cream/90">{spotlight.description}</p>
              <ul className="stagger mt-6 space-y-2.5 text-[14px] leading-relaxed text-cream-muted">
                {spotlight.keyPoints.map((k, i) => (
                  <li key={k} style={{ "--i": i + 3 } as React.CSSProperties} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[9px] h-px w-4 shrink-0 bg-amber" />
                    <LiveText text={k} />
                  </li>
                ))}
              </ul>
            </div>
            {cert && (
              <div className="relative flex items-center lg:col-span-6">
                <a
                  href="#certifications"
                  className="curtain block w-full rotate-[-1.5deg] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-[var(--ease-cinematic)] hover:rotate-0 hover:scale-[1.02]"
                  aria-label="See the VisionX 2026 certificate in Certifications & Learning"
                >
                  <Image
                    src={cert.preview.thumb}
                    alt=""
                    width={900}
                    height={Math.round((900 * cert.preview.height) / cert.preview.width)}
                    unoptimized
                    className="h-auto w-full rounded-[10px]"
                  />
                </a>
              </div>
            )}
          </article>
        )}

        <ol className="relative">
          <span aria-hidden="true" className="absolute left-[5px] top-0 bottom-0 w-px bg-ink/15 lg:left-[calc(25%-20px)]" />
          <span aria-hidden="true" data-draw="y" className="absolute left-[5px] top-0 bottom-0 w-px origin-top bg-ink lg:left-[calc(25%-20px)]" />
          {rest.map((a) => (
            <li key={a.id} data-reveal className="group/ach relative grid gap-4 py-10 pl-8 lg:grid-cols-12 lg:gap-10 lg:pl-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-11 h-[11px] w-[11px] rounded-full border border-ink/50 bg-sage-200 transition-colors delay-300 duration-700 group-[.is-in]/ach:bg-ink lg:left-[calc(25%-25px)]"
              />
              <div className="eyebrow text-[10px] text-ink-muted lg:col-span-3 lg:pr-10 lg:text-right">
                {a.categoryLabel}
                <span className="mt-1 block normal-case tracking-normal">{a.period}</span>
                {a.badge && (
                  <span className="mt-3 inline-block rounded-full border border-ink/30 px-2.5 py-1 text-[9px] text-ink">
                    <CountUp value={a.badge} duration={1.4} />
                  </span>
                )}
              </div>
              <div className="lg:col-span-5">
                <h3 className="font-serif text-[clamp(26px,2.6vw,36px)] leading-[1.08] text-ink">{a.title}</h3>
                <p className="mt-2 text-[14px] text-ink-muted">{a.organization}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{a.description}</p>
              </div>
              <ul className="stagger space-y-2 text-[14px] leading-relaxed text-ink-soft lg:col-span-4">
                {a.keyPoints.map((k, i) => (
                  <li key={k} style={{ "--i": i } as React.CSSProperties} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[9px] h-px w-4 shrink-0 bg-ink/50" />
                    <span>
                      <LiveText text={k} />
                    </span>
                  </li>
                ))}
                {a.proofLink && (
                  <li style={{ "--i": a.keyPoints.length } as React.CSSProperties} className="pt-2">
                    <a href={a.proofLink} target="_blank" rel="noreferrer" className="eyebrow text-[10.5px] text-ink underline-offset-4 hover:underline">
                      Verify ↗
                    </a>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
