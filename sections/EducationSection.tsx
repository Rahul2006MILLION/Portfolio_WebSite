import React from "react";
import { educationData } from "@/data/education";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Award, BookOpen, MapPin } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/[0.06] bg-[#060913]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          number="02"
          tag="ACADEMIC FOUNDATION"
          title="EDUCATION & INSTITUTIONAL RECORD"
          description="Undergraduate training in Computer Science & Engineering (AI & ML) at Dayananda Sagar University alongside distinction in secondary sciences."
        />

        {/* Timeline Container */}
        <div className="relative border-l border-white/[0.08] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {educationData.map((edu) => (
            <div key={edu.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full border-2 border-[#d4af37] bg-[#060913] group-hover:scale-125 transition-transform" />

              {/* Education Card */}
              <div className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-8 transition-colors hover:border-[#d4af37]/40 shadow-lg shadow-black/30">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-4 mb-6">
                  <div>
                    <span className="font-mono text-[11px] text-[#d4af37] tracking-wider uppercase block">
                      {edu.status} {"//"} {edu.period}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mt-1">
                      {edu.degree}
                    </h3>
                    {edu.specialization && (
                      <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-0.5">
                        {edu.specialization}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-[#94A3B8]">
                    <span className="text-[#F8FAFC] font-semibold text-sm">{edu.institution}</span>
                    {edu.location && (
                      <span className="flex items-center gap-1 text-[11px] text-[#64748B]">
                        <MapPin size={12} />
                        {edu.location}
                      </span>
                    )}
                    <span className="rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-0.5 text-[11px] text-[#e5c158] font-bold mt-1">
                      {edu.scoreType}: {edu.score}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {edu.description && (
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-sans">
                    {edu.description}
                  </p>
                )}

                {/* Relevant Coursework if present */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-mono text-xs tracking-wider text-[#94A3B8] uppercase mb-3 flex items-center gap-2">
                      <BookOpen size={14} className="text-[#d4af37]" />
                      <span>CORE CURRICULUM & SUBJECTS</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="rounded-sm border border-white/[0.06] bg-[#060913] px-3 py-1 font-mono text-xs text-[#CBD5E1] hover:border-white/[0.2] transition-colors"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Academic Highlights */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <div>
                    <h4 className="font-mono text-xs tracking-wider text-[#94A3B8] uppercase mb-3 flex items-center gap-2">
                      <Award size={14} className="text-[#d4af37]" />
                      <span>HONORS & ROLES</span>
                    </h4>
                    <ul className="space-y-2">
                      {edu.highlights.map((ach, aIdx) => (
                        <li
                          key={aIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#94A3B8]"
                        >
                          <span className="text-[#d4af37] font-mono mt-0.5">▸</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
