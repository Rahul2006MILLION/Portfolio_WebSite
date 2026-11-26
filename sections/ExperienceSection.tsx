import React from "react";
import { experienceData } from "@/data/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/[0.06] bg-[#060913]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          number="03"
          tag="PROFESSIONAL EXPERIENCE"
          title="INTERNSHIPS & APPLIED ENGINEERING"
          description="Real-world machine learning engineering experience developing predictive forecasting pipelines, NLP ticket classifiers, and semantic candidate matching engines."
          badge="VERIFIED EXPERIENCE"
        />

        <div className="space-y-8">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-10 transition-colors hover:border-[#d4af37]/40"
            >
              {/* Header Telemetry */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#d4af37] uppercase tracking-wider">
                    <Briefcase size={14} />
                    <span>{exp.type} {"//"} {exp.company}</span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5 font-mono text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 text-white font-medium">
                    <Calendar size={13} className="text-[#d4af37]" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                    <MapPin size={12} />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-base text-[#94A3B8] leading-relaxed mb-8 font-sans max-w-4xl">
                {exp.summary}
              </p>

              {/* Deliverables Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exp.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-lg border border-white/[0.06] bg-[#060913] p-6 hover:border-[#d4af37]/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs text-[#d4af37] uppercase mb-3">
                        <span className="font-bold">DELIVERABLE 0{idx + 1}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                      </div>

                      <h4 className="font-sans text-lg font-bold text-white mb-2">
                        {item.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.04]">
                      {item.metrics && (
                        <div className="rounded border border-[#d4af37]/20 bg-[#d4af37]/5 px-3 py-1.5 mb-3 font-mono text-[11px] text-[#e5c158] font-semibold">
                          {item.metrics}
                        </div>
                      )}

                      {item.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.map((t) => (
                            <span
                              key={t}
                              className="rounded-sm border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-[#94A3B8]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
