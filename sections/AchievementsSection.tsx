import React from "react";
import { achievementsData } from "@/data/achievements";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckCircle2 } from "lucide-react";

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/[0.06] bg-[#060913]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          number="07"
          tag="MILESTONES & HONORS"
          title="VERIFIED ACHIEVEMENTS & LEADERSHIP"
          description="Competitive programming consistency milestones, elected academic representation, and collegiate hackathon leadership."
          badge="VERIFIED RECORDS"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-8 flex flex-col justify-between hover:border-[#d4af37]/40 transition-colors shadow-lg shadow-black/20"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-4 font-mono text-[11px] text-[#94A3B8]">
                  <span className="text-[#d4af37] font-bold">{item.categoryLabel}</span>
                  <span className="text-[#64748B]">{item.period}</span>
                </div>

                {/* Badge if available */}
                {item.badge && (
                  <span className="inline-block rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#e5c158] font-semibold mb-3">
                    {item.badge}
                  </span>
                )}

                {/* Title & Organization */}
                <h3 className="font-sans text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[#94A3B8] mt-1">
                  {item.organization}
                </p>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Key Points */}
                <div className="mt-4 space-y-1.5">
                  {item.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                      <span className="text-[#d4af37] font-mono mt-0.5">▸</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-[#64748B] uppercase">
                  VERIFIED RECORD
                </span>
                <span className="text-[#d4af37] text-[11px] font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>CONFIRMED</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
