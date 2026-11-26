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
      <main id="main" className="flex-1 pt-28">
        <div className="mx-auto max-w-[1360px] px-5 pb-8 sm:px-10 lg:px-16">
          <Link
            href="/"
            className="eyebrow inline-flex items-center gap-2 text-[10.5px] text-ink hover:underline"
          >
            <ArrowLeft size={14} />
            <span>Back to portfolio</span>
          </Link>
        </div>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
