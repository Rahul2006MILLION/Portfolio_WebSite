"use client";

import React, { useState } from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { Magnetic } from "@/components/motion/Magnetic";
import { TextReveal } from "@/components/motion/TextReveal";
import {
  FileDown,
  ArrowDown,
  Mail,
  Send,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Modal } from "@/components/ui/Modal";

export function HeroSection() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-28 pb-16 px-4 sm:px-8 lg:px-16 overflow-hidden bg-[#060913]"
    >
      {/* 3D WebGL Background Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-55 pointer-events-auto">
        <HeroCanvas />
      </div>

      {/* Top Telemetry Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-4 font-mono text-xs tracking-wider text-[#94A3B8] uppercase">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4af37]" />
          </span>
          <span className="text-white font-medium">{profileData.statusBadge}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <GraduationCap size={13} className="text-[#d4af37]" />
            DAYANANDA SAGAR UNIVERSITY · BENGALURU
          </span>
        </div>
      </div>

      {/* Main Hero Centerpiece */}
      <div className="relative z-10 my-auto py-12 max-w-[1400px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Editorial Typography & Introductions */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Monospace Subtitle Tag */}
            <div className="flex items-center gap-2 mb-4 font-mono text-xs tracking-widest text-[#d4af37] uppercase">
              <span>PORTFOLIO</span>
              <span className="text-[#64748B]">{"//"}</span>
              <span>ENGINEER · RESEARCHER · DEVELOPER</span>
            </div>

            {/* Giant Monolithic Name */}
            <h1 className="font-sans font-black tracking-tighter text-[9vw] sm:text-[7.5vw] lg:text-[5.5vw] leading-[0.88] text-[#F8FAFC] uppercase select-none">
              <TextReveal type="words" delay={0.05}>
                {profileData.name}
              </TextReveal>
            </h1>

            {/* Role & Specialization */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 font-mono text-xs sm:text-sm tracking-wide text-[#94A3B8] uppercase">
              <span className="text-white font-semibold">
                {profileData.role}
              </span>
            </div>

            {/* Tagline / Professional Introduction */}
            <p className="mt-4 text-base sm:text-xl text-[#94A3B8] leading-relaxed max-w-2xl font-sans font-normal">
              {profileData.tagline}
            </p>

            {/* Academic Credential Pill */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-[#CBD5E1]">
              <span className="rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-1 text-[#e5c158] font-semibold">
                B.Tech CSE (AI & ML)
              </span>
              <span className="rounded-sm border border-white/[0.08] bg-[#0A0F1D] px-2.5 py-1 text-[#94A3B8]">
                CGPA: 9.35
              </span>
              <span className="rounded-sm border border-white/[0.08] bg-[#0A0F1D] px-2.5 py-1 text-[#94A3B8]">
                2024 — 2028
              </span>
              <span className="rounded-sm border border-white/[0.08] bg-[#0A0F1D] px-2.5 py-1 text-[#94A3B8] flex items-center gap-1">
                <MapPin size={11} className="text-[#d4af37]" />
                Bengaluru, India
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
              <Magnetic strength={0.2}>
                <a
                  href="#projects"
                  onClick={(e) => handleScrollTo(e, "#projects")}
                  className="rounded-sm bg-[#d4af37] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#060913] shadow-lg shadow-[#d4af37]/10 transition-all hover:bg-[#e5c158] hover:scale-[1.02] flex items-center gap-2"
                >
                  <span>EXPLORE MY WORK</span>
                  <ArrowDown size={14} />
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "#contact")}
                  className="rounded-sm border border-white/[0.12] bg-[#0A0F1D] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#F8FAFC] backdrop-blur-sm transition-all hover:border-[#d4af37] hover:text-[#d4af37] flex items-center gap-2"
                >
                  <span>CONTACT ME</span>
                  <Send size={14} />
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={() => setResumeModalOpen(true)}
                  className="rounded-sm border border-white/[0.08] bg-transparent px-5 py-3.5 font-mono text-xs uppercase tracking-wider text-[#94A3B8] transition-all hover:border-white/[0.2] hover:text-white flex items-center gap-2"
                >
                  <FileDown size={14} />
                  <span>DOSSIER / RESUME</span>
                </button>
              </Magnetic>
            </div>

            {/* Social Links & Metric Ticker */}
            <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#64748B] uppercase">CONNECT:</span>
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="rounded border border-white/[0.08] p-2 text-[#94A3B8] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="rounded border border-white/[0.08] p-2 text-[#94A3B8] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
                >
                  <LinkedinIcon size={16} />
                </a>
                <a
                  href={`mailto:${profileData.email}`}
                  aria-label="Email N. P. Rahul Jain"
                  className="rounded border border-white/[0.08] p-2 text-[#94A3B8] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
                >
                  <Mail size={16} />
                </a>
              </div>

              {/* Quick Telemetry Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-sm border border-white/[0.06] bg-[#0A0F1D] px-2.5 py-1 font-mono text-[10px] text-[#94A3B8]">
                  LLM CALIBRATION
                </span>
                <span className="rounded-sm border border-white/[0.06] bg-[#0A0F1D] px-2.5 py-1 font-mono text-[10px] text-[#94A3B8]">
                  MULTI-ROBOT FLEET
                </span>
                <span className="rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-1 font-mono text-[10px] text-[#e5c158]">
                  AI / ML RIGOR
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Photo Frame */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group max-w-sm w-full">
              {/* Outer Decorative Technical Hairline Frame */}
              <div className="absolute -inset-2 rounded-xl border border-white/[0.08] group-hover:border-[#d4af37]/30 transition-colors pointer-events-none" />

              {/* Corner Registration Markings */}
              <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-[#d4af37]" />
              <div className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-[#d4af37]" />
              <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-[#d4af37]" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-[#d4af37]" />

              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/[0.12] bg-[#0A0F1D]">
                <Image
                  src={profileData.photoUrl}
                  alt={profileData.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-0 bottom-0 p-5 font-mono text-xs">
                  <div className="flex items-center justify-between border-t border-white/[0.1] pt-3 text-[10px] text-[#94A3B8] uppercase">
                    <span className="flex items-center gap-1.5 text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                      N. P. RAHUL JAIN
                    </span>
                    <span>DSU · BENGALURU</span>
                  </div>
                </div>
              </div>

              {/* Floating Telemetry Stamp */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#64748B] uppercase">
                <span>IDENTITY // VERIFIED</span>
                <span>CGPA // 9.35</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-xs text-[#64748B] uppercase">
        <a
          href="#about"
          onClick={(e) => handleScrollTo(e, "#about")}
          className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"
        >
          <span>SCROLL TO EXPLORE ARCHITECTURE</span>
          <span className="text-[#d4af37]">↓</span>
        </a>
        <span>EST. 2024 — 2028</span>
      </div>

      {/* Resume Download / Preview Modal */}
      <Modal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        title="Curriculum Vitae / Engineering Dossier"
        categoryTag="DOCUMENT DISPATCH // N. P. RAHUL JAIN"
        maxWidth="lg"
      >
        <div className="space-y-6 font-sans">
          <div className="rounded-lg border border-white/[0.08] bg-[#060913] p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37] mb-3">
              <FileDown size={24} />
            </div>
            <h4 className="text-xl font-bold text-white">
              N. P. Rahul Jain // Engineering Dossier
            </h4>
            <p className="mt-1 text-sm text-[#94A3B8]">
              Dayananda Sagar University (CGPA 9.35) · AI & ML Spec
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-white/[0.1] p-4 text-xs font-mono text-[#94A3B8] space-y-2">
            <div className="flex justify-between">
              <span>PRIMARY EMAIL:</span>
              <span className="text-white">rahulpraveena2006@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span>UNIVERSITY EMAIL:</span>
              <span className="text-[#d4af37]">eng24am0228@dsu.edu.in</span>
            </div>
            <div className="flex justify-between">
              <span>GITHUB:</span>
              <span className="text-white">github.com/Rahul2006MILLION</span>
            </div>
            <div className="flex justify-between">
              <span>LOCATION:</span>
              <span className="text-white">Bengaluru, India</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setResumeModalOpen(false)}
              className="rounded-sm border border-white/[0.1] px-4 py-2 font-mono text-xs text-[#94A3B8] hover:text-white"
            >
              CLOSE
            </button>
            <a
              href={`mailto:${profileData.email}?subject=Resume Request - N. P. Rahul Jain`}
              className="rounded-sm bg-[#d4af37] px-5 py-2 font-mono text-xs font-bold text-[#060913] hover:bg-[#e5c158] flex items-center gap-1.5"
            >
              <Mail size={14} />
              <span>REQUEST RESUME DIRECTLY</span>
            </a>
          </div>
        </div>
      </Modal>
    </section>
  );
}
