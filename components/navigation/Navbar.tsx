"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const NAV_LINKS = [
  { label: "ABOUT", href: "#about", index: "01" },
  { label: "EDUCATION", href: "#education", index: "02" },
  { label: "EXPERIENCE", href: "#experience", index: "03" },
  { label: "SKILLS", href: "#skills", index: "04" },
  { label: "PROJECTS", href: "#projects", index: "05" },
  { label: "RESEARCH", href: "#research", index: "06" },
  { label: "ACHIEVEMENTS", href: "#achievements", index: "07" },
  { label: "CODING", href: "#coding", index: "08" },
  { label: "CONTACT", href: "#contact", index: "09" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "pt-2 pb-2" : "pt-5 pb-5"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "rounded-full border border-white/[0.08] bg-[#060913]/90 px-5 py-2 shadow-2xl backdrop-blur-md"
              : "border-b border-white/[0.04] pb-3"
          }`}
        >
          {/* Brand Mark */}
          <Magnetic strength={0.25}>
            <Link
              href="#hero"
              data-cursor="hover"
              className="flex items-center gap-2 group font-mono text-sm tracking-widest text-[#F8FAFC] uppercase"
            >
              <span className="font-black text-white tracking-tighter transition-colors group-hover:text-[#d4af37]">
                N. P. RAHUL JAIN
              </span>
              <span className="text-[#64748B]">{"//"}</span>
              <span className="text-[10px] text-[#94A3B8] font-normal hidden sm:inline">AI/ML · DSU</span>
            </Link>
          </Magnetic>

          {/* Center Telemetry Status Badge */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-[9px] tracking-wider text-[#94A3B8] uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            </span>
            <span className="text-white/80 font-medium">B.TECH CSE (AI & ML) // CGPA 9.35</span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                data-cursor="hover"
                className="group relative flex items-center gap-1 px-2.5 py-1 font-mono text-[11px] tracking-wider text-[#94A3B8] uppercase transition-colors duration-200 hover:text-[#F8FAFC] focus-visible:text-[#d4af37]"
              >
                <span className="text-[9px] text-[#64748B] transition-colors group-hover:text-[#d4af37]">
                  {item.index}
                </span>
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-2 right-2 h-[1px] scale-x-0 bg-[#d4af37] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-[#e5c158] hover:bg-[#d4af37] hover:text-[#060913] transition-all flex items-center gap-1.5"
            >
              <span>CONNECT</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded border border-white/[0.08] text-[#94A3B8] hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-xl border border-white/[0.12] bg-[#060913]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden">
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-[10px] text-[#94A3B8] uppercase">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                NAVIGATION DIRECTORY
              </span>
              <span>9 NODES</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="flex items-center justify-between rounded border border-white/[0.04] bg-white/[0.01] px-3 py-2.5 font-mono text-xs tracking-wider text-[#94A3B8] uppercase hover:border-[#d4af37]/40 hover:text-[#d4af37] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-[#64748B]">{item.index}</span>
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#64748B]">BENGALURU, INDIA</span>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="font-mono text-xs text-[#d4af37] font-bold uppercase hover:underline"
              >
                GET IN TOUCH →
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
