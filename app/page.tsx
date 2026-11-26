import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { EducationSection } from "@/sections/EducationSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ResearchSection } from "@/sections/ResearchSection";
import { AchievementsSection } from "@/sections/AchievementsSection";
import { CodingProfilesSection } from "@/sections/CodingProfilesSection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ResearchSection />
        <AchievementsSection />
        <CodingProfilesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
