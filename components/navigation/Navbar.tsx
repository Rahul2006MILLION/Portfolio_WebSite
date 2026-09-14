"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { Magnetic } from "@/components/motion/Magnetic";

const NAV_LINKS = [
  { label: "WORK", href: "#work", index: "01" },
  { label: "DSA", href: "#dsa", index: "02" },
  { label: "ABOUT", href: "#about", index: "03" },
  { label: "CONTACT", href: "#contact", index: "04" },
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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "pt-3 pb-3"
          : "pt-6 pb-6"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "rounded-full border border-white/[0.08] bg-[#070809]/85 px-6 py-2.5 shadow-2xl backdrop-blur-md"
              : "border-b border-white/[0.04] pb-4"
          }`}
        >
          {/* Brand Mark */}
          <Magnetic strength={0.25}>
            <Link
              href="/"
              data-cursor="hover"
              className="flex items-center gap-2 group font-mono text-sm tracking-widest text-[#F5F6F8] uppercase"
            >
              <span className="font-bold text-white transition-colors group-hover:text-[#d4ff00]">
                RJ
              </span>
              <span className="text-[#464B55]">{"//"}</span>
              <span className="text-xs text-[#7B8291]">01</span>
            </Link>
          </Magnetic>

          {/* Status Indicator (Center on Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1 font-mono text-[10px] tracking-wider text-[#7B8291] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4ff00] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4ff00]" />
            </span>
            <span className="text-white/80 font-medium">AVAILABLE FOR HIGH-IMPACT ROLES</span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                href={item.href}
                index={item.index}
              />
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded border border-white/[0.08] text-[#7B8291] hover:text-white md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`h-[1px] w-5 bg-current transition-transform duration-300 ${
                  mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1px] w-5 bg-current transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[1px] w-5 bg-current transition-transform duration-300 ${
                  mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-lg border border-white/[0.08] bg-[#0B0C0E]/95 p-4 backdrop-blur-lg md:hidden">
            <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-2 font-mono text-[10px] text-[#7B8291] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff00]" />
              AVAILABLE FOR HIGH-IMPACT ROLES
            </div>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 font-mono text-sm tracking-wider text-[#7B8291] uppercase hover:text-[#d4ff00]"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#464B55]">{item.index}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
