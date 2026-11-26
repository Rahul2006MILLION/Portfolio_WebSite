"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { ProjectItem, ProjectCategory } from "@/types/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { Search, Sparkles, Layers, FolderKanban } from "lucide-react";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "AI / ML",
  "Research",
  "Robotics",
  "Software Engineering",
  "Web Development",
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Filter projects by category and search query
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      project.title.toLowerCase().includes(query) ||
      project.shortDescription.toLowerCase().includes(query) ||
      project.problemStatement.toLowerCase().includes(query) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  const handleOpenDetails = (project: ProjectItem) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/[0.06] bg-[#060913]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          number="05"
          tag="ENGINEERING PORTFOLIO"
          title="VERIFIED PROJECTS & ARCHITECTURES"
          description="Comprehensive collection of 12 engineering projects spanning multilingual LLM confidence calibration, multi-robot coordination, deterministic financial systems, and applied machine learning."
          badge={`${projectsData.length} VERIFIED PROJECTS`}
        />

        {/* Filter Bar & Interactive Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-12 pb-6 border-b border-white/[0.06]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-sm px-3 py-1.5 uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-[#d4af37] text-[#060913] font-bold"
                    : "border border-white/[0.08] bg-[#0A0F1D] text-[#94A3B8] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-sm w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech, problem, or title..."
              className="w-full rounded-sm border border-white/[0.1] bg-[#0A0F1D] py-2 pl-9 pr-3 font-mono text-xs text-white placeholder-[#64748B] focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="rounded-lg border border-dashed border-white/[0.1] p-12 text-center my-8 bg-[#0A0F1D]">
            <FolderKanban className="mx-auto h-10 w-10 text-[#64748B] mb-3" />
            <h4 className="text-base font-bold text-[#F8FAFC]">No projects match your criteria</h4>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono">
              Try adjusting your search query or reset category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-sm border border-[#d4af37] px-4 py-1.5 font-mono text-xs text-[#d4af37]"
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {/* Featured Projects Highlight */}
        {featuredProjects.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6 font-mono text-xs text-[#d4af37] uppercase tracking-wider">
              <Sparkles size={14} />
              <span>FLAGSHIP PROJECTS & SYSTEMS ({featuredProjects.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={handleOpenDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6 font-mono text-xs text-[#94A3B8] uppercase tracking-wider">
              <Layers size={14} />
              <span>ALL ADDITIONAL SYSTEMS & INTERNSHIP DELIVERABLES ({otherProjects.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {otherProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={handleOpenDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </section>
  );
}
