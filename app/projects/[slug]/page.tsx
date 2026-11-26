import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections/Footer";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Cpu,
  Layers,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} // N. P. Rahul Jain Systems`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main id="main" className="relative z-10 mx-2 mt-24 mb-4 flex-1 rounded-[28px] bg-[#060913] px-4 pt-16 pb-20 text-[#F8FAFC] sm:mx-4 sm:rounded-[40px] sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#d4af37] transition-colors uppercase tracking-wider"
            >
              <ArrowLeft size={14} />
              <span>BACK TO SYSTEMS REPOSITORY</span>
            </Link>
          </div>

          {/* Header Dossier */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-12 mb-10 shadow-xl shadow-black/40">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-6 mb-8 font-mono text-xs text-[#94A3B8]">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
                <span className="text-white font-semibold uppercase">{project.category}</span>
                <span className="text-[#64748B]">|</span>
                <span>STATUS: {project.status}</span>
              </div>
              <span>YEAR // {project.year}</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#CBD5E1] leading-relaxed max-w-4xl font-sans">
              {project.shortDescription}
            </p>

            {/* Verification Note if available */}
            {project.reportedNote && (
              <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/5 p-4 font-mono text-xs text-[#e5c158] flex items-start gap-2.5">
                <AlertCircle size={16} className="text-[#d4af37] flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-white block mb-0.5">VERIFIED REPORTED NOTE:</strong>
                  {project.reportedNote}
                </div>
              </div>
            )}

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-lg border border-white/[0.06] bg-[#060913] p-5">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="border-l border-[#d4af37] pl-4 py-1">
                    <span className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider block">
                      {m.label}
                    </span>
                    <span className="font-mono text-xl font-bold text-white block mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-4 font-mono text-xs">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-sm bg-[#d4af37] px-6 py-3 font-bold text-[#060913] hover:bg-[#e5c158] transition-colors"
                >
                  <GithubIcon size={15} />
                  <span>VIEW ON GITHUB</span>
                </a>
              )}

              {project.docsUrl && (
                <a
                  href={project.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-sm border border-white/[0.12] bg-[#060913] px-6 py-3 text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
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
                  className="flex items-center gap-2 rounded-sm border border-[#d4af37]/40 bg-[#d4af37]/10 px-6 py-3 text-[#e5c158] hover:bg-[#d4af37] hover:text-[#060913] transition-colors"
                >
                  <ExternalLink size={15} />
                  <span>LIVE DEMO</span>
                </a>
              )}
            </div>
          </div>

          {/* Deep Dive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Problem, Solution, Features */}
            <div className="lg:col-span-8 space-y-8">
              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-white/[0.06] bg-[#0A0F1D] p-6">
                  <div className="flex items-center gap-2 font-mono text-xs text-red-400 uppercase mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    <span>THE PROBLEM STATEMENT</span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-[#0A0F1D] p-6">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#d4af37] uppercase mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                    <span>ARCHITECTURAL SOLUTION</span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* My Contribution */}
              <div className="rounded-lg border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-8">
                <h3 className="font-mono text-xs tracking-wider text-[#d4af37] uppercase mb-3 flex items-center gap-2">
                  <Layers size={15} />
                  <span>INDIVIDUAL ROLE & CORE CONTRIBUTIONS</span>
                </h3>
                <p className="text-base text-white leading-relaxed font-sans">
                  {project.contribution}
                </p>
              </div>

              {/* Key Features */}
              <div className="rounded-lg border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-8">
                <h3 className="font-mono text-xs tracking-wider text-[#94A3B8] uppercase mb-4 flex items-center gap-2">
                  <CheckCircle size={15} className="text-[#d4af37]" />
                  <span>KEY CAPABILITIES & IMPLEMENTATION HIGHLIGHTS</span>
                </h3>
                <ul className="space-y-3">
                  {project.keyFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded border border-white/[0.04] bg-[#060913] p-4 text-sm text-[#CBD5E1]"
                    >
                      <span className="text-[#d4af37] font-mono mt-0.5">▸</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 4 Cols: Tech Stack & System Telemetry */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-lg border border-white/[0.08] bg-[#0A0F1D] p-6">
                <h3 className="font-mono text-xs tracking-wider text-[#94A3B8] uppercase mb-4 flex items-center gap-2">
                  <Cpu size={15} className="text-[#d4af37]" />
                  <span>TECHNOLOGY MATRIX</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <Badge key={t} variant="mono">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.08] bg-[#0A0F1D] p-6 font-mono text-xs space-y-3 text-[#94A3B8]">
                <span className="text-[#d4af37] uppercase block font-semibold">
                  CENTRALIZED REPOSITORY
                </span>
                <p className="text-[11px] leading-relaxed">
                  All architecture notes and benchmark parameters are sourced from verified code in <code className="text-white">data/projects.ts</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
