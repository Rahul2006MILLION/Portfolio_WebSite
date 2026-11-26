"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileData } from "@/data/profile";

export const NAV_LINKS = [
  { label: "About", href: "#about", index: "01" },
  { label: "Education", href: "#education", index: "02" },
  { label: "Experience", href: "#experience", index: "03" },
  { label: "Skills", href: "#skills", index: "04" },
  { label: "Projects", href: "#projects", index: "05" },
  { label: "Research", href: "#research", index: "06" },
  { label: "Achievements", href: "#achievements", index: "07" },
  { label: "Certifications", href: "#certifications", index: "08" },
  { label: "Profiles", href: "#coding", index: "09" },
  { label: "Contact", href: "#contact", index: "10" },
];

const QUICK = ["#projects", "#research", "#contact"];

type LenisLike = { scrollTo: (target: Element, opts?: { offset?: number; duration?: number }) => void; stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export function scrollToHash(href: string) {
  const target = document.querySelector(href);
  if (!target) return false;
  const l = lenis();
  if (l) l.scrollTo(target, { offset: 0, duration: 1.4 });
  else target.scrollIntoView({ behavior: "smooth" });
  return true;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onHome && href.startsWith("#") && scrollToHash(href)) {
      e.preventDefault();
      setOpen(false);
    }
  };
  const hrefFor = (h: string) => (onHome ? h : `/${h}`);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1600px] items-center justify-between rounded-full px-4 py-2.5 transition-[background-color,box-shadow,backdrop-filter] duration-500 sm:px-5 ${
            scrolled ? "bg-sage-200/70 shadow-[0_8px_30px_-12px_rgba(20,25,16,0.35)] backdrop-blur-md" : ""
          }`}
        >
          <Link href={onHome ? "#top" : "/"} onClick={(e) => go(e, "#top")} className="group leading-tight">
            <span className="block text-[13px] font-medium tracking-[0.06em] text-ink">{profileData.name}</span>
            <span className="eyebrow block text-[9.5px] text-ink-muted">Creative Technologist</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="hidden items-center md:flex">
              {NAV_LINKS.filter((l) => QUICK.includes(l.href)).map((l) => (
                <li key={l.href}>
                  <a
                    href={hrefFor(l.href)}
                    onClick={(e) => go(e, l.href)}
                    className="eyebrow rounded-full px-3 py-2 text-[10.5px] text-ink-soft transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-index"
              className="eyebrow flex items-center gap-2 rounded-full border border-ink/25 px-3.5 py-2 text-[10.5px] text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="block h-px w-3.5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
              </span>
              Index
            </button>
          </div>
        </nav>
      </header>

      {/* full-screen index */}
      <div
        id="site-index"
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
        hidden={!open}
        className="fixed inset-0 z-[70] overflow-y-auto bg-forest text-cream"
        data-lenis-prevent
      >
        <div className="mx-auto flex min-h-full max-w-[1600px] flex-col px-6 py-6 sm:px-10">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-[10.5px] text-cream-muted">Index</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="eyebrow rounded-full border border-cream/30 px-4 py-2 text-[10.5px] hover:bg-cream hover:text-forest"
              autoFocus
            >
              Close
            </button>
          </div>
          <ol className="mt-10 grid flex-1 content-center gap-x-12 sm:grid-cols-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="border-b border-line-dark">
                <a
                  href={hrefFor(l.href)}
                  onClick={(e) => go(e, l.href)}
                  className="group flex items-baseline gap-5 py-3.5 sm:py-4"
                >
                  <span className="font-mono text-xs text-cream-muted">{l.index}</span>
                  <span className="font-serif text-4xl transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:translate-x-2 sm:text-5xl">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div className="eyebrow mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[10.5px] text-cream-muted">
            <a href={profileData.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-cream">GitHub ↗</a>
            <a href={profileData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-cream">LinkedIn ↗</a>
            <a href={profileData.socialLinks.email} className="hover:text-cream">{profileData.email}</a>
          </div>
        </div>
      </div>
    </>
  );
}
