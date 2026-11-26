"use client";

import React from "react";
import { ProjectItem } from "@/types/portfolio";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  return (
    <article
      data-cursor="interactive"
      data-cursor-label="VIEW"
      onClick={() => onOpenDetails(project)}
      className="group relative flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-8 transition-all duration-300 hover:border-[#d4af37]/40 hover:bg-[#0E1528] cursor-pointer shadow-lg shadow-black/40"
    >
      {/* Top Telemetry Bar */}
      <div>
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.04] pb-4 mb-6 font-mono text-[11px] text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            <span className="text-[#F8FAFC] font-semibold uppercase">{project.category}</span>
          </div>
          <span className="text-[#64748B]">{project.year}</span>
        </div>

        {/* Project Title & Short Description */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#F8FAFC] group-hover:text-[#d4af37] transition-colors leading-snug">
            {project.title}
          </h3>
          <div className="rounded-full border border-white/[0.08] p-2 text-[#94A3B8] group-hover:border-[#d4af37]/40 group-hover:text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Key Metrics / Highlights if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-md border border-white/[0.04] bg-[#060913] p-3">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <span className="font-mono text-[10px] text-[#64748B] uppercase block">
                  {metric.label}
                </span>
                <span className="font-mono text-xs font-bold text-[#F8FAFC] tracking-tight">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Reported Benchmark / Verification Note */}
        {project.reportedNote && (
          <div className="mt-4 flex items-start gap-2 rounded border border-white/[0.05] bg-[#060913]/60 p-2.5 font-mono text-[11px] text-[#94A3B8]">
            <span className="text-[#d4af37] font-bold">NOTE:</span>
            <span className="line-clamp-2">{project.reportedNote}</span>
          </div>
        )}
      </div>

      {/* Bottom Footer: Technologies and Actions */}
      <div className="mt-8 pt-6 border-t border-white/[0.04]">
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="mono" size="sm">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge variant="mono" size="sm">
              +{project.technologies.length - 5}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs font-mono">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(project);
            }}
            className="flex items-center gap-1.5 text-[#e5c158] hover:text-[#d4af37] hover:underline uppercase tracking-wider font-semibold"
          >
            <span>DEEP DIVE SPEC</span>
            <span>→</span>
          </button>

          <div className="flex items-center gap-3 text-[#94A3B8]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`GitHub repository for ${project.title}`}
                className="hover:text-white transition-colors"
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Live demo for ${project.title}`}
                className="hover:text-white transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
