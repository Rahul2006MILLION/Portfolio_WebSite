"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { NAV_LINKS } from "@/components/navigation/Navbar";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#04060C] pt-16 pb-12 px-4 sm:px-8 lg:px-16 text-[#94A3B8]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/[0.06]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 font-mono text-lg font-black tracking-wider text-white uppercase">
              <span>{profileData.name}</span>
              <span className="text-[#64748B]">{"//"}</span>
              <span className="text-xs text-[#d4af37] font-normal">PORTFOLIO</span>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm font-sans">
              AI/ML Engineer, Software Developer, and AI Research Enthusiast. Pursuing B.Tech in CSE (AI & ML) at Dayananda Sagar University, Bengaluru.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="rounded border border-white/[0.08] p-2 text-[#94A3B8] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="rounded border border-white/[0.08] p-2 text-[#94A3B8] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                aria-label="Email N. P. Rahul Jain"
                className="rounded border border-white/[0.08] p-2 text-[#94A3B8] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Navigation Col */}
          <div className="md:col-span-4">
            <span className="font-mono text-xs tracking-widest text-[#d4af37] uppercase block mb-4">
              DIRECTORY INDEX
            </span>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="hover:text-white transition-colors"
                >
                  <span className="text-[#64748B] mr-1.5">{link.index}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Telemetry & Return to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <span className="font-mono text-xs tracking-widest text-[#94A3B8] uppercase block mb-2">
                SYSTEM TELEMETRY
              </span>
              <div className="font-mono text-[11px] text-[#64748B] space-y-1">
                <div>CORE // NEXT.JS 16 APP ROUTER</div>
                <div>INSTITUTION // DSU BENGALURU</div>
                <div>CADENCE // 2024 — 2028</div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 flex items-center gap-2 rounded border border-white/[0.08] bg-[#0A0F1D] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#F8FAFC] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#64748B]">
          <div>
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            <span>DAYANANDA SAGAR UNIVERSITY // B.TECH CSE (AI & ML)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
