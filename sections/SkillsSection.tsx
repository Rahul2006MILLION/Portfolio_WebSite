"use client";

import React, { useState } from "react";
import { skillCategoriesData } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Search } from "lucide-react";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCategories = skillCategoriesData
    .filter((cat) => (selectedCategory === "all" ? true : cat.id === selectedCategory))
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter((skill) =>
        searchQuery.trim() === ""
          ? true
          : skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (skill.levelTag && skill.levelTag.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/[0.06] bg-[#060913]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          number="04"
          tag="TECHNICAL CAPABILITIES"
          title="ENGINEERING & MACHINE LEARNING SKILLS"
          description="Organized catalog of programming languages, deep learning frameworks, databases, and systems competencies verified across real-world projects."
        />

        {/* Filter Bar & Quick Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.06]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-sm px-3 py-1.5 uppercase tracking-wider transition-all ${
                selectedCategory === "all"
                  ? "bg-[#d4af37] text-[#060913] font-bold"
                  : "border border-white/[0.08] bg-[#0A0F1D] text-[#94A3B8] hover:text-white"
              }`}
            >
              ALL GROUPS (06)
            </button>
            {skillCategoriesData.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-sm px-3 py-1.5 uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#d4af37] text-[#060913] font-bold"
                    : "border border-white/[0.08] bg-[#0A0F1D] text-[#94A3B8] hover:text-white"
                }`}
              >
                {cat.categoryNumber} {"//"} {cat.title}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. PyTorch, FastAPI)..."
              className="w-full rounded-sm border border-white/[0.1] bg-[#0A0F1D] py-2 pl-9 pr-3 font-mono text-xs text-white placeholder-[#64748B] focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group) => (
            <div
              key={group.id}
              className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 flex flex-col justify-between hover:border-[#d4af37]/30 transition-colors shadow-lg shadow-black/20"
            >
              <div>
                {/* Group Header */}
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#d4af37] font-bold">
                      {group.categoryNumber}
                    </span>
                    <h3 className="font-sans text-lg font-bold text-white uppercase tracking-tight">
                      {group.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#64748B]">
                    {group.skills.length} SKILLS
                  </span>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-5 font-sans">
                  {group.description}
                </p>

                {/* Skill Chips */}
                <div className="space-y-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between rounded border border-white/[0.04] bg-[#060913] px-3 py-2 text-xs hover:border-white/[0.12] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {skill.isKeySkill ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#64748B]" />
                        )}
                        <span className="font-mono text-[#F8FAFC] font-medium">
                          {skill.name}
                        </span>
                      </div>
                      {skill.levelTag && (
                        <span className="font-mono text-[10px] text-[#94A3B8] uppercase">
                          {skill.levelTag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Telemetry Footer */}
              <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center justify-between font-mono text-[10px] text-[#64748B] uppercase">
                <span>VERIFIED STACK</span>
                <span>PRODUCTION TESTED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
