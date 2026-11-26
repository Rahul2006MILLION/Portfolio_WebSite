import React from "react";
import { researchData } from "@/data/research";
import { Chapter, container, sectionPad } from "@/components/ui/Chapter";
import { GithubIcon } from "@/components/ui/Icons";
import { splitWords } from "@/components/motion/split";

export function ResearchSection() {
  return (
    <section id="research" className={sectionPad} aria-labelledby="research-title">
      <div className={container}>
        <Chapter
          index="06"
          label="Research"
          title={<span id="research-title">Open <em className="italic">questions</em> I&apos;m working on.</span>}
          intro="Each entry states its implementation status plainly, including what is not finished yet."
        />
        <div className="space-y-28 sm:space-y-36">
          {researchData.map((r, i) => {
            const stages = [
              { label: "Problem", text: r.researchProblem },
              { label: "Approach", text: r.proposedApproach },
              { label: "Method", text: r.experimentalMethodology },
              { label: "Status", text: r.implementationStatus },
            ];
            return (
              <article key={r.id} className="relative" aria-labelledby={`${r.id}-title`}>
                {/* giant outlined index, drifting slower than the page */}
                <span
                  aria-hidden="true"
                  data-parallax="0.3"
                  className="pointer-events-none absolute -top-16 right-0 select-none font-serif text-[clamp(120px,20vw,300px)] leading-none text-ink/[0.08] text-outline"
                >
                  R{String(i + 1).padStart(2, "0")}
                </span>

                <div data-reveal className="relative">
                  <p className="eyebrow flex items-center gap-4 text-[10px] text-ink-muted">
                    <span>Study R{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="draw-x h-px w-24 bg-current opacity-40" />
                    <span>Research</span>
                  </p>
                </div>
                <h3
                  id={`${r.id}-title`}
                  data-reveal
                  aria-label={r.title}
                  className="sw-host relative mt-6 max-w-[22ch] font-serif text-[clamp(34px,4.6vw,72px)] leading-[0.98] text-ink"
                >
                  {splitWords(r.title)}
                </h3>

                {/* process line: draws itself, then each stage arrives in order */}
                <div data-reveal className="relative mt-14">
                  <div aria-hidden="true" className="relative hidden h-px lg:block">
                    <span className="absolute inset-0 bg-ink/15" />
                    <span className="draw-x absolute inset-0 bg-ink [transition-duration:2.2s!important]" />
                  </div>
                  <ol className="stagger grid gap-8 lg:grid-cols-4 lg:gap-10">
                    {stages.map((st, k) => (
                      <li key={st.label} style={{ "--i": k * 4 } as React.CSSProperties} className="group/stage relative lg:pt-8">
                        <span aria-hidden="true" className="absolute -top-[5px] left-0 hidden h-[9px] w-[9px] rounded-full bg-ink transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover/stage:scale-[1.8] lg:block" />
                        <p className="eyebrow flex items-center gap-2 text-[9.5px] text-ink-muted">
                          <span className="font-mono">{String(k + 1).padStart(2, "0")}</span> {st.label}
                        </p>
                        <p
                          className={`mt-3 text-[14.5px] leading-relaxed ${
                            st.label === "Status" ? "rounded-2xl border border-ink/20 bg-sage-50/40 p-4 text-ink" : "text-ink-soft transition-colors duration-500 group-hover/stage:text-ink"
                          }`}
                        >
                          {st.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div data-reveal className="relative mt-14 grid gap-8 border-t border-ink/20 pt-8 lg:grid-cols-12">
                  <h4 className="eyebrow text-[10px] text-ink-muted lg:col-span-3">Findings so far</h4>
                  <ul className="stagger space-y-3 lg:col-span-9">
                    {r.keyFindings.map((f, k) => (
                      <li key={f} style={{ "--i": k * 2 } as React.CSSProperties} className="group/find flex gap-4 font-serif text-[clamp(19px,1.7vw,24px)] leading-snug text-ink">
                        <span aria-hidden="true" className="mt-[0.6em] h-px w-6 shrink-0 bg-ink/60 transition-[width,background-color] duration-500 ease-[var(--ease-cinematic)] group-hover/find:w-10 group-hover/find:bg-ink" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:col-span-9 lg:col-start-4">
                    <a
                      href={r.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="press eyebrow inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[10px] text-cream hover:-translate-y-0.5"
                    >
                      <GithubIcon size={13} /> Repository ↗
                    </a>
                    {r.note && <span className="text-[13px] text-ink-muted">{r.note}</span>}
                    <span className="basis-full text-[13px] text-ink-muted">{r.technologies.join(" · ")}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
