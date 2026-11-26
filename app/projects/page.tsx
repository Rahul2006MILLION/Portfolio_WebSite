import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections/Footer";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Engineering Systems // Rahul Jain",
  description:
    "Comprehensive technical repertory of systems, deep learning models, algorithms, and architectures engineered by Rahul Jain.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 bg-[#060913]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-16 pt-8 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#d4af37] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </Link>
        </div>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
