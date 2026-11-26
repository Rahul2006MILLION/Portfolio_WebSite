"use client";

import React from "react";
import { ProjectItem } from "@/types/portfolio";
import { Modal } from "@/components/ui/Modal";
import { GithubIcon } from "@/components/ui/Icons";
import { ExternalLink, BookOpen, CheckCircle, Cpu, Layers, AlertCircle } from "lucide-react";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const has = (v?: string | null) => typeof v === "string" && v.trim().length > 0;

/** Small uppercase section label with an icon or dot, in the site's eyebrow style. */
function Label({ children, icon, dot }: { children: React.ReactNode; icon?: React.ReactNode; dot?: string }) {
  return (
    <h4 className="eyebrow mb-3 flex items-center gap-2 text-[10px] text-ink-muted">
      {dot && <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
      {icon}
      <span>{children}</span>
    </h4>
  );
}

/**
 * The one project-detail view used by every project card, styled with the portfolio's own
 * sage / moss / cream tokens. Layout is fixed; only the selected project's own data changes.
 * Any section without verified data for that project is omitted rather than shown empty.
 */
export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null;
  const showProblem = has(project.problemStatement);
  const showSolution = has(project.solution);
  const features = project.keyFeatures?.filter(has) ?? [];
  const techs = project.technologies?.filter(has) ?? [];
  const metrics = project.metrics?.filter((m) => has(m.label) && has(m.value)) ?? [];

  const card = "rounded-[18px] border border-ink/12 bg-cream/40 p-5";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      categoryTag={`${project.category} · ${project.year}`}
      maxWidth="4xl"
    >
      <div className="space-y-8">
        {/* Summary */}
        {has(project.shortDescription) && (
          <p className="font-serif text-[clamp(20px,2.2vw,26px)] leading-snug text-ink">{project.shortDescription}</p>
        )}

        {/* Verification / status disclosure */}
        {has(project.reportedNote) && (
          <div className="flex items-start gap-3 rounded-[18px] border border-amber-deep/30 bg-amber/15 p-4 text-[13.5px] leading-relaxed text-ink">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-deep" aria-hidden="true" />
            <div>
              <strong className="eyebrow mb-1 block text-[9.5px] text-ink">Verified reported note</strong>
              {project.reportedNote}
            </div>
          </div>
        )}

        {/* Metadata cards */}
        {metrics.length > 0 && (
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {metrics.map((m, i) => (
              <div key={i} className="rounded-[16px] border border-ink/12 bg-cream/40 px-4 py-3">
                <dt className="eyebrow text-[9px] text-ink-muted">{m.label}</dt>
                <dd className="mt-1.5 font-serif text-[20px] leading-tight text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Problem & architectural solution */}
        {(showProblem || showSolution) && (
          <div className={`grid grid-cols-1 gap-4 ${showProblem && showSolution ? "md:grid-cols-2" : ""}`}>
            {showProblem && (
              <section className={card}>
                <Label dot="bg-amber-deep">The problem statement</Label>
                <p className="text-[14.5px] leading-relaxed text-ink-soft">{project.problemStatement}</p>
              </section>
            )}
            {showSolution && (
              <section className={card}>
                <Label dot="bg-moss">The architectural solution</Label>
                <p className="text-[14.5px] leading-relaxed text-ink-soft">{project.solution}</p>
              </section>
            )}
          </div>
        )}

        {/* Individual role — the one moss block, for hierarchy */}
        {has(project.contribution) && (
          <section className="rounded-[18px] bg-moss p-5 text-cream sm:p-6">
            <h4 className="eyebrow mb-3 flex items-center gap-2 text-[10px] text-amber">
              <Layers size={13} aria-hidden="true" />
              <span>My individual role &amp; technical contribution</span>
            </h4>
            <p className="text-[14.5px] leading-relaxed text-cream/90">{project.contribution}</p>
          </section>
        )}

        {/* Key features */}
        {features.length > 0 && (
          <section>
            <Label icon={<CheckCircle size={13} className="text-moss" aria-hidden="true" />}>Engineered capabilities &amp; highlights</Label>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-[14px] border border-ink/10 bg-cream/30 p-3.5 text-[13.5px] leading-relaxed text-ink-soft"
                >
                  <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-moss" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Technology stack */}
        {techs.length > 0 && (
          <section>
            <Label icon={<Cpu size={13} className="text-moss" aria-hidden="true" />}>Technology stack &amp; runtimes</Label>
            <ul className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <li
                  key={tech}
                  className="tag rounded-full border border-ink/25 bg-cream/25 px-3 py-1 text-[12.5px] text-ink [--accent:#3b4234]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Status + links */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
          {has(project.status) ? (
            <p className="flex items-center gap-2 text-[13px] text-ink-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-moss" />
              <span className="eyebrow text-[9.5px]">Status</span>
              <span className="text-ink">{project.status}</span>
            </p>
          ) : (
            <span />
          )}

          <div className="flex flex-wrap items-center gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="press eyebrow inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[10px] text-cream hover:bg-moss"
              >
                <GithubIcon size={14} />
                <span>GitHub repository</span>
              </a>
            )}
            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="press eyebrow inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3 text-[10px] text-ink hover:border-ink hover:bg-ink/5"
              >
                <BookOpen size={14} />
                <span>Documentation</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="press eyebrow inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3 text-[10px] text-ink hover:border-ink hover:bg-ink/5"
              >
                <ExternalLink size={14} />
                <span>Live demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
