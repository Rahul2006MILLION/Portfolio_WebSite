import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeroCanvas } from "@/components/three/HeroCanvas";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Section 01: Foundation Hero & Typography Test */}
        <section className="relative min-h-[100dvh] flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden">
          {/* Subtle 3D WebGL Canvas Layer */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-70 pointer-events-auto">
            <HeroCanvas />
          </div>

          {/* Top Telemetry Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/[0.04] pb-4 font-mono text-xs tracking-wider text-[#7B8291] uppercase">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff00]" />
              <span>PHASE 01 // FOUNDATION & SYSTEM TEST</span>
            </div>
            <div className="hidden sm:block text-[#464B55]">
              STK // JAVA · PYTHON · REACT · NEXT.JS
            </div>
          </div>

          {/* Centerpiece Display Typography */}
          <div className="relative z-10 my-auto py-12 pointer-events-none">
            <div className="overflow-hidden">
              <h1 className="font-sans font-black tracking-tighter text-[14vw] leading-[0.85] text-[#F5F6F8] uppercase select-none">
                <TextReveal type="words" delay={0.1}>
                  RAHUL JAIN
                </TextReveal>
              </h1>
            </div>

            <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="font-mono text-xs sm:text-sm tracking-wide text-[#7B8291] uppercase">
                  SOFTWARE ENGINEER & SYSTEMS ARCHITECT
                </p>
                <p className="mt-2 text-sm sm:text-base text-[#7B8291] leading-relaxed max-w-lg font-sans">
                  Crafting high-throughput backend infrastructure, algorithmic rigor, and ultra-fluid interactive web experiences.
                </p>
              </div>

              {/* Technical Telemetry Badges */}
              <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
                <span className="rounded-sm border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-[#7B8291]">
                  60 FPS WEBGL
                </span>
                <span className="rounded-sm border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-[#7B8291]">
                  LENIS TICK
                </span>
                <span className="rounded-sm border border-[#d4ff00]/30 bg-[#d4ff00]/10 px-3 py-1 font-mono text-[11px] text-[#d4ff00]">
                  SYS READY
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Prompt */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/[0.04] pt-4 font-mono text-xs text-[#464B55] uppercase">
            <span className="flex items-center gap-1.5">
              <span>SCROLL TO TEST MOTION PIPELINE</span>
              <span className="text-[#d4ff00]">↓</span>
            </span>
            <span>BUILD // 2026.09</span>
          </div>
        </section>

        {/* Section 02: Design System & Interaction Testing Lab */}
        <section className="relative min-h-[100dvh] border-t border-white/[0.06] bg-[#0B0C0E] py-24 px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="border-b border-white/[0.06] pb-6 mb-12">
              <span className="font-mono text-xs tracking-widest text-[#d4ff00] uppercase">
                SYSTEM VERIFICATION
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F6F8]">
                Interactive & Motion Architecture
              </h2>
            </div>

            {/* Feature Testing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Test 1: Magnetic Physics & Buttons */}
              <div className="border border-white/[0.06] bg-[#070809] p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#7B8291] uppercase">01 // MAGNETIC PHYSICS</span>
                  <h3 className="mt-3 text-xl font-bold text-white">Tactile Buttons</h3>
                  <p className="mt-2 text-sm text-[#7B8291] leading-relaxed">
                    Custom spring physics that gently track pointer proximity on desktop without jarring shifts.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Magnetic strength={0.4}>
                    <button
                      type="button"
                      data-cursor="interactive"
                      className="px-5 py-2.5 rounded-full bg-[#d4ff00] font-mono text-xs font-bold text-[#070809] uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      PULL ME
                    </button>
                  </Magnetic>

                  <Magnetic strength={0.25}>
                    <button
                      type="button"
                      data-cursor="hover"
                      className="px-5 py-2.5 rounded-full border border-white/[0.15] bg-white/[0.03] font-mono text-xs text-[#F5F6F8] uppercase transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00]"
                    >
                      OUTLINE CTA
                    </button>
                  </Magnetic>
                </div>
              </div>

              {/* Test 2: Masked Text & Scroll Reveals */}
              <div className="border border-white/[0.06] bg-[#070809] p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#7B8291] uppercase">02 // KINETIC TYPOGRAPHY</span>
                  <h3 className="mt-3 text-xl font-bold text-white">Masked Reveals</h3>
                  <p className="mt-2 text-sm text-[#7B8291] leading-relaxed">
                    Transform and clipping-based word animations orchestrated with GSAP ScrollTrigger.
                  </p>
                </div>
                <div className="mt-8 border-l border-[#d4ff00] pl-4">
                  <div className="text-base font-medium text-[#F5F6F8]">
                    <TextReveal type="words" delay={0.2}>
                      Precision is the intersection of mathematical correctness and visual mastery.
                    </TextReveal>
                  </div>
                </div>
              </div>

              {/* Test 3: Cursor State Inspection */}
              <div className="border border-white/[0.06] bg-[#070809] p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#7B8291] uppercase">03 // CURSOR MODES</span>
                  <h3 className="mt-3 text-xl font-bold text-white">Fluid Follower</h3>
                  <p className="mt-2 text-sm text-[#7B8291] leading-relaxed">
                    Zero-state re-rendering pointer loop. Automatically adapts to interactive triggers and 3D scenes.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  <span
                    data-cursor="interactive"
                    data-cursor-label="CLICK"
                    className="inline-block px-3 py-1.5 rounded-sm border border-white/[0.1] bg-white/[0.03] font-mono text-xs text-[#7B8291] hover:text-[#d4ff00] hover:border-[#d4ff00]/40 transition-colors cursor-pointer"
                  >
                    HOVER ME [TAG]
                  </span>
                  <span
                    data-cursor="webgl"
                    data-cursor-label="3D"
                    className="inline-block px-3 py-1.5 rounded-sm border border-white/[0.1] bg-white/[0.03] font-mono text-xs text-[#7B8291] hover:text-[#d4ff00] hover:border-[#d4ff00]/40 transition-colors cursor-pointer"
                  >
                    HOVER FOR 3D
                  </span>
                </div>
              </div>
            </div>

            {/* Telemetry Architecture Summary */}
            <div className="mt-12 rounded-lg border border-white/[0.06] bg-[#070809]/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-[#7B8291]">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#d4ff00]" />
                <span className="text-white font-medium">DESIGN SYSTEM & MOTION ENGINE VERIFIED</span>
              </div>
              <div className="flex items-center gap-6 text-[#464B55]">
                <span>LENIS SYNC: 100%</span>
                <span>GSAP CONTEXT: ACTIVE</span>
                <span>FAILOVER: 2D READY</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
