import React from "react";
import { profileData } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Cpu,
  Layers,
  Target,
  FlaskConical,
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/[0.06] bg-[#060913]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          number="01"
          tag="BIOGRAPHICAL DOSSIER"
          title="ENGINEERING PHILOSOPHY & PROFILE"
          description="Bridging statistical machine learning, multilingual LLM calibration, decentralized robotic planning, and high-performance software architecture."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative Bio & Key Ambitions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-8 space-y-4 font-sans text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-2 font-mono text-xs">
                <span className="tracking-wider text-[#d4af37] uppercase font-semibold">
                  {"//"} EXECUTIVE PROFILE
                </span>
                <span className="text-[#64748B]">BENGALURU, INDIA</span>
              </div>
              {profileData.fullBio.map((paragraph, idx) => (
                <p key={idx} className="text-[#CBD5E1]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Strategic Pillars / Ambitions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/[0.06] bg-[#0A0F1D] p-5">
                <div className="flex items-center gap-2.5 font-mono text-xs text-[#d4af37] uppercase mb-2">
                  <Target size={16} />
                  <span>CORE MOTIVATION</span>
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Building verifiable, calibrated AI solutions where uncertainty is mathematically modeled and mission-critical systems operate with deterministic safety.
                </p>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-[#0A0F1D] p-5">
                <div className="flex items-center gap-2.5 font-mono text-xs text-[#d4af37] uppercase mb-2">
                  <FlaskConical size={16} />
                  <span>RESEARCH TRAJECTORY</span>
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Investigating confidence calibration shifts in multilingual models, semantic entropy quantification, and agent denial leakage.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Focus Areas & Technical Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            {/* Focus Areas Card */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-8">
              <h3 className="font-mono text-xs tracking-widest text-[#94A3B8] uppercase mb-4 flex items-center gap-2">
                <Layers size={14} className="text-[#d4af37]" />
                <span>CORE SPECIALIZATION DOMAINS</span>
              </h3>

              <div className="space-y-3">
                {profileData.focusAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded border border-white/[0.04] bg-[#060913] p-3 text-xs sm:text-sm text-[#F8FAFC] font-sans hover:border-[#d4af37]/30 transition-colors"
                  >
                    <span className="font-mono text-xs text-[#d4af37]">
                      0{idx + 1}
                    </span>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic & Engineering Telemetry */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6">
              <h3 className="font-mono text-xs tracking-widest text-[#94A3B8] uppercase mb-4 flex items-center gap-2">
                <Cpu size={14} className="text-[#d4af37]" />
                <span>VERIFIED METRICS</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {profileData.metrics.map((m, idx) => (
                  <div key={idx} className="border-l border-white/[0.08] pl-3 py-1">
                    <span className="font-mono text-[10px] text-[#64748B] uppercase block">
                      {m.label}
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-black text-white block mt-0.5">
                      {m.value}
                    </span>
                    {m.sublabel && (
                      <span className="font-mono text-[10px] text-[#94A3B8] block mt-0.5">
                        {m.sublabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
