"use client";

import React from "react";
import { ProjectItem } from "@/types/portfolio";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/Icons";
import { ExternalLink, BookOpen, CheckCircle, Cpu, Layers, AlertCircle } from "lucide-react";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      categoryTag={`SYS // ${project.category} · ${project.year}`}
      maxWidth="4xl"
    >
      <div className="space-y-8 font-sans">
        {/* Quick Summary Banner */}
        <p className="text-base sm:text-lg text-[#F8FAFC] leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Verification Note if present */}
        {project.reportedNote && (
          <div className="rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/5 p-4 font-mono text-xs text-[#e5c158] flex items-start gap-2.5">
            <AlertCircle size={16} className="text-[#d4af37] flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-white block mb-0.5">VERIFIED REPORTED NOTE:</strong>
              {project.reportedNote}
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-lg border border-white/[0.08] bg-[#060913] p-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="border-l border-[#d4af37] pl-3 py-1">
                <span className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider block">
                  {m.label}
                </span>
                <span className="font-mono text-lg font-bold text-[#F8FAFC]">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Problem Statement & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-white/[0.06] bg-[#0A0F1D] p-5">
            <div className="flex items-center gap-2 font-mono text-xs text-red-400 uppercase mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <span>THE PROBLEM STATEMENT</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-[#0A0F1D] p-5">
            <div className="flex items-center gap-2 font-mono text-xs text-[#d4af37] uppercase mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
              <span>THE ARCHITECTURAL SOLUTION</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* My Individual Contribution */}
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-5">
          <h4 className="font-mono text-xs tracking-wider text-[#d4af37] uppercase mb-2 flex items-center gap-2">
            <Layers size={14} />
            <span>MY INDIVIDUAL ROLE & TECHNICAL CONTRIBUTION</span>
          </h4>
          <p className="text-sm text-[#F8FAFC] leading-relaxed">
            {project.contribution}
          </p>
        </div>

        {/* Key Technical Features */}
        <div>
          <h4 className="font-mono text-xs tracking-wider text-[#94A3B8] uppercase mb-3 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#d4af37]" />
            <span>ENGINEERED CAPABILITIES & HIGHLIGHTS</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.keyFeatures.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 rounded border border-white/[0.04] bg-[#060913] p-3 text-xs text-[#94A3B8]"
              >
                <span className="text-[#d4af37] font-mono mt-0.5">▸</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div>
          <h4 className="font-mono text-xs tracking-wider text-[#94A3B8] uppercase mb-3 flex items-center gap-2">
            <Cpu size={14} />
            <span>TECHNOLOGY STACK & RUNTIMES</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="mono">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            <span>STATUS: {project.status}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-sm bg-[#d4af37] px-4 py-2 text-[#060913] font-bold hover:bg-[#e5c158] transition-colors"
              >
                <GithubIcon size={15} />
                <span>GITHUB REPOSITORY</span>
              </a>
            )}

            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-sm border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[#F8FAFC] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                <BookOpen size={15} />
                <span>DOCUMENTATION</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-sm border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-[#e5c158] font-semibold hover:bg-[#d4af37] hover:text-[#060913] transition-colors"
              >
                <ExternalLink size={15} />
                <span>LAUNCH DEMO</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
