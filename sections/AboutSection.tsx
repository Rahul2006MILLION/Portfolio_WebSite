import React from "react";
import { LiveText } from "@/components/live/LiveText";
import { CountUp } from "@/components/motion/CountUp";
import { splitWords } from "@/components/motion/split";
import { profileData } from "@/data/profile";
import { Chapter, container, sectionPad } from "@/components/ui/Chapter";

export function AboutSection() {
  return (
    <section id="about" className={sectionPad} aria-labelledby="about-title">
      <div className={container}>
        <Chapter
          index="01"
          label="About"
          title={
            <span id="about-title">
              Careful systems, <em className="italic">measured</em> honestly.
            </span>
          }
        />

        <div className="grid gap-12 lg:grid-cols-12">
          <p
            className="sw-host font-serif text-[clamp(24px,2.6vw,36px)] leading-[1.2] text-ink lg:col-span-5"
            data-reveal
            aria-label={profileData.tagline}
          >
            {splitWords(profileData.tagline)}
          </p>
          <div className="space-y-5 text-[15.5px] leading-[1.75] text-ink-soft lg:col-span-6 lg:col-start-7">
            {profileData.fullBio.map((p, i) => (
              <p key={i} data-reveal style={{ "--reveal-delay": `${0.06 * i}s` } as React.CSSProperties}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t border-line-light lg:grid-cols-4">
          {profileData.metrics.map((m, i) => (
            <div
              key={m.label}
              className="border-b border-line-light py-7 pr-4 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
              data-reveal
              style={{ "--reveal-delay": `${0.07 * i}s` } as React.CSSProperties}
            >
              <dt className="eyebrow text-[10px] text-ink-muted">{m.label}</dt>
              <dd className="mt-3 font-serif text-[clamp(30px,3.4vw,46px)] leading-none text-ink"><CountUp value={m.value} /></dd>
              {m.sublabel && <dd className="mt-2 text-[13px] text-ink-muted"><LiveText text={m.sublabel} /></dd>}
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <h3 className="eyebrow text-[10.5px] text-ink-muted lg:col-span-3" data-reveal>
            Current focus
          </h3>
          <ul className="lg:col-span-9">
            {profileData.focusAreas.map((f, i) => (
              <li
                key={f}
                className="group/focus flex items-baseline gap-5 border-b border-line-light py-4 text-[17px] text-ink"
                data-reveal
                style={{ "--reveal-delay": `${0.05 * i}s` } as React.CSSProperties}
              >
                <span className="font-mono text-[11px] text-ink-muted transition-colors group-hover/focus:text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover/focus:translate-x-2">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
