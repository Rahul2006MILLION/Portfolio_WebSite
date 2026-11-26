import React from "react";
import { researchData } from "@/data/research";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/Icons";
import { ArrowUpRight } from "lucide-react";

export function ResearchSection() {
  return (
    <section id="research" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/[0.06] bg-[#060913]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          number="06"
          tag="SCIENTIFIC INVESTIGATION"
          title="RESEARCH & THEORETICAL INQUIRY"
          description="Investigating confidence calibration across multilingual LLM distributions, semantic entropy in uncertainty quantification, and runtime provenance reference monitors."
          badge="PRIORITIZED RESEARCH"
        />

        <div className="space-y-8">
          {researchData.map((paper, idx) => (
            <article
              key={paper.id}
              className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-10 transition-colors hover:border-[#d4af37]/40"
            >
              {/* Telemetry Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-4 mb-6 font-mono text-xs text-[#94A3B8]">
                <div className="flex items-center gap-3">
                  <span className="text-[#d4af37] font-semibold">RESEARCH TOPIC // 0{idx + 1}</span>
                  <span className="text-[#64748B]">|</span>
                  <span className="text-white uppercase">{paper.title}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-0.5 text-[10px] text-[#e5c158] font-semibold">
                    {paper.implementationStatus.includes("Implemented") ? "CODEBASE IMPLEMENTED" : "RESEARCH PROTOTYPE"}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                {paper.title}
              </h3>

              {/* Research Framework Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1: Research Problem */}
                <div className="rounded-lg border border-white/[0.06] bg-[#060913] p-5">
                  <div className="flex items-center gap-2 font-mono text-xs text-red-400 uppercase mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    <span>RESEARCH PROBLEM</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-sans">
                    {paper.researchProblem}
                  </p>
                </div>

                {/* 2: Proposed Approach */}
                <div className="rounded-lg border border-white/[0.06] bg-[#060913] p-5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#d4af37] uppercase mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                    <span>PROPOSED APPROACH</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-sans">
                    {paper.proposedApproach}
                  </p>
                </div>

                {/* 3: Experimental Methodology */}
                <div className="rounded-lg border border-white/[0.06] bg-[#060913] p-5">
                  <div className="flex items-center gap-2 font-mono text-xs text-blue-400 uppercase mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>EXPERIMENTAL METHOD</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-sans">
                    {paper.experimentalMethodology}
                  </p>
                </div>
              </div>

              {/* Implementation Status & Note */}
              <div className="mt-6 rounded-md border border-white/[0.06] bg-[#060913]/70 p-4 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#94A3B8]">
                  <div>
                    <span className="text-[#d4af37] font-semibold uppercase">STATUS: </span>
                    <span className="text-white">{paper.implementationStatus}</span>
                  </div>
                  {paper.note && (
                    <div className="text-[11px] text-[#64748B]">
                      {paper.note}
                    </div>
                  )}
                </div>
              </div>

              {/* Key Findings */}
              <div className="mt-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] block mb-3">
                  OBSERVATIONS & VERIFIED FINDINGS:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {paper.keyFindings.map((finding, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-xs text-[#CBD5E1] bg-[#060913] p-3 rounded border border-white/[0.04]"
                    >
                      <span className="text-[#d4af37] font-mono mt-0.5">▸</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack & Action Links */}
              <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {paper.technologies.map((tech) => (
                    <Badge key={tech} variant="mono" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 font-mono text-xs">
                  <a
                    href={paper.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-sm bg-[#d4af37] px-4 py-2 font-bold text-[#060913] hover:bg-[#e5c158] transition-colors"
                  >
                    <GithubIcon size={14} />
                    <span>VERIFY REPOSITORY CODE</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
