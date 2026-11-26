"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import type { ProjectCategory, ProjectItem } from "@/types/portfolio";
import { Chapter, container } from "@/components/ui/Chapter";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { GithubIcon } from "@/components/ui/Icons";
import { CountUp } from "@/components/motion/CountUp";
import { Tilt } from "@/components/motion/Tilt";
import { splitWords } from "@/components/motion/split";
import { CATEGORY_ACCENT, ProjectVisual } from "@/components/projects/ProjectVisual";
import { gsap } from "@/lib/animations/gsapConfig";

const CATEGORIES: ProjectCategory[] = ["All", "AI / ML", "Research", "Robotics", "Software Engineering", "Web Development"];

export function ProjectsSection() {
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return projectsData.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.problemStatement.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)))
    );
  }, [category, query]);
  const featured = filtered.filter((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);
  const stackRef = useRef<HTMLOListElement>(null);
  const stackKey = featured.map((p) => p.id).join("|");

  // stacked chapters: as the next project slides up, the one underneath settles back and dims
  useEffect(() => {
    const list = stackRef.current;
    if (!list) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const items = Array.from(list.children) as HTMLElement[];
      items.slice(0, -1).forEach((li, i) => {
        // scale the sticky <li>, not the card: the card's own transform belongs to its reveal
        const dim = li.querySelector<HTMLElement>("[data-dim]");
        const next = items[i + 1];
        if (!dim) return;
        const st = { trigger: next, start: "top bottom", end: "top 20%", scrub: 0.5 };
        gsap.to(li, { scale: 0.92, transformOrigin: "50% 0%", ease: "none", scrollTrigger: st });
        gsap.to(dim, { opacity: 0.55, ease: "none", scrollTrigger: { ...st } });
      });
    });
    return () => mm.revert();
  }, [stackKey]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative z-10 mx-2 px-5 py-28 text-cream sm:mx-4 sm:px-10 sm:py-36 lg:px-16"
    >
      {/* the dark panel itself (animated on its own layer so fixed-position modals inside aren't affected) */}
      <div
        aria-hidden="true"
        data-panel
        className="absolute inset-0 -z-10 rounded-[28px] bg-forest shadow-[0_-30px_80px_-40px_rgba(10,14,8,0.6)] sm:rounded-[40px]"
      />
      <div className={container}>
        <Chapter
          tone="dark"
          index="05"
          label="Projects"
          title={<span id="projects-title">Selected <em className="italic">work</em>.</span>}
          intro={`${projectsData.length} projects across research, robotics, applied ML and full-stack engineering. Every number shown is the one reported in the project's own repository or write-up.`}
        />

        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between" data-reveal>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-[13px] transition-colors ${
                  category === c ? "bg-cream text-forest" : "border border-line-dark text-cream-muted hover:text-cream"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech…"
              className="w-full rounded-full border border-line-dark bg-transparent px-4 py-2.5 text-[14px] text-cream placeholder:text-cream-muted/70 focus:border-cream/60 focus:outline-none"
            />
          </label>
        </div>

        {filtered.length === 0 && <p className="py-16 text-center text-cream-muted">No projects match that filter.</p>}

        <ol ref={stackRef} className="space-y-6 lg:space-y-[12vh]">
          {featured.map((p, i) => (
            <li
              key={p.id}
              className="lg:sticky"
              style={{ top: `calc(10vh + ${i * 16}px)`, "--accent": CATEGORY_ACCENT[p.category] } as React.CSSProperties}
            >
              <article
                data-card
                data-reveal
                aria-labelledby={`${p.id}-title`}
                className="relative grid overflow-hidden rounded-[28px] border border-line-dark bg-forest-2 shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.7)] lg:min-h-[76vh] lg:grid-cols-12"
              >
                <div data-dim aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 bg-[#0b0e09] opacity-0" />
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-[var(--accent)] opacity-70" />

                <div className="relative flex flex-col p-7 sm:p-10 lg:col-span-7 lg:p-12">
                  <div className="flex items-center justify-between gap-4">
                    <span className="eyebrow text-[10px] text-[var(--accent)]">
                      {p.category} · {p.year}
                    </span>
                    <span className="font-serif text-[56px] leading-none text-cream/15 sm:text-[80px]">
                      <CountUp value={String(i + 1).padStart(2, "0")} duration={1.2} />
                    </span>
                  </div>
                  <h3
                    id={`${p.id}-title`}
                    className="sw-host mt-4 max-w-[20ch] font-serif text-[clamp(30px,3.6vw,54px)] leading-[1.02]"
                    data-reveal
                    aria-label={p.title}
                  >
                    {splitWords(p.title)}
                  </h3>
                  <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-cream-muted">{p.shortDescription}</p>

                  {p.metrics && (
                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line-dark pt-6 sm:grid-cols-3">
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="eyebrow text-[9px] text-cream-muted">{m.label}</dt>
                          <dd className="mt-1.5 font-serif text-[22px] leading-tight text-cream">
                            <CountUp value={m.value} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <ul className="stagger mt-7 flex flex-wrap gap-1.5">
                    {p.technologies.map((t, k) => (
                      <li key={t} style={{ "--i": k } as React.CSSProperties} className="rounded-full border border-line-dark px-2.5 py-1 text-[12px] text-cream-muted">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                    <button
                      type="button"
                      onClick={() => setSelected(p)}
                      className="eyebrow rounded-full bg-cream px-5 py-3 text-[10px] text-forest transition-colors hover:bg-[var(--accent)]"
                    >
                      Details ↗
                    </button>
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="eyebrow inline-flex items-center gap-2 rounded-full border border-line-dark px-5 py-3 text-[10px] text-cream transition-colors hover:border-cream/50"
                      >
                        <GithubIcon size={13} /> Repository
                      </a>
                    )}
                    <span className="text-[12.5px] text-cream-muted">{p.status}</span>
                  </div>
                </div>

                <div className="relative hidden border-l border-line-dark lg:col-span-5 lg:block">
                  <Tilt max={6} className="spotlight absolute inset-6 rounded-[20px] [--spot:rgba(255,255,255,0.06)]">
                    <div className="curtain h-full w-full rounded-[20px] bg-[#0f130c]">
                      <div className="h-full w-full">
                        <ProjectVisual category={p.category} seed={i} />
                      </div>
                    </div>
                  </Tilt>
                </div>
              </article>
            </li>
          ))}
        </ol>

        {others.length > 0 && (
          <>
            <h3 className="eyebrow mt-24 mb-5 text-[10.5px] text-cream-muted" data-reveal>More projects</h3>
            <ul className="grid gap-4 md:grid-cols-2">
              {others.map((p, i) => (
                <li
                  key={p.id}
                  data-reveal
                  style={{ "--reveal-delay": `${0.06 * (i % 2)}s`, "--accent": CATEGORY_ACCENT[p.category], "--spot": "rgba(255,255,255,0.06)" } as React.CSSProperties}
                >
                  <Tilt max={4} className="spotlight h-full rounded-2xl border border-line-dark bg-forest-2 transition-colors hover:border-[var(--accent)]/40">
                    <button type="button" onClick={() => setSelected(p)} className="group flex h-full w-full flex-col gap-2 p-6 text-left">
                      <span className="eyebrow flex items-center gap-2 text-[9.5px] text-[var(--accent)]">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                        {p.category} · {p.year}
                      </span>
                      <span className="font-serif text-2xl leading-tight">{p.title}</span>
                      <span className="text-[14px] leading-relaxed text-cream-muted">{p.shortDescription}</span>
                      <span className="eyebrow mt-auto pt-3 text-[9.5px] text-cream-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cream">
                        Details ↗
                      </span>
                    </button>
                  </Tilt>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-14 flex flex-wrap items-center gap-6" data-reveal>
          <Link href="/projects" className="eyebrow rounded-full bg-cream px-5 py-3 text-[10.5px] text-forest hover:bg-amber">
            All project pages
          </Link>
          <a href="https://github.com/Rahul2006MILLION" target="_blank" rel="noreferrer" className="eyebrow inline-flex items-center gap-2 text-[10.5px] text-cream-muted hover:text-cream">
            <GithubIcon size={14} /> GitHub ↗
          </a>
        </div>
      </div>

      <ProjectDetailModal project={selected} isOpen={selected !== null} onClose={() => setSelected(null)} />
    </section>
  );
}
