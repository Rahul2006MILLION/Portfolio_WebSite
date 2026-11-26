"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { NAV_LINKS, scrollToHash } from "@/components/navigation/Navbar";
import { usePathname } from "next/navigation";
import { splitWords } from "@/components/motion/split";

export function Footer() {
  const onHome = usePathname() === "/";
  return (
    <footer className="relative z-10 mx-2 rounded-b-[28px] bg-forest px-5 pb-10 text-cream sm:mx-4 sm:mb-4 sm:rounded-b-[40px] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1360px] border-t border-line-dark pt-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <p className="eyebrow max-w-[34ch] text-[10.5px] leading-relaxed text-cream-muted">
            Thanks for scrolling all the way down. {profileData.availability}.
          </p>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={onHome ? l.href : `/${l.href}`}
                onClick={(e) => onHome && scrollToHash(l.href) && e.preventDefault()}
                className="w-fit text-[14px] text-cream-muted transition-colors hover:text-cream"
              >
                <span className="link-draw">{l.label}</span>
              </a>
            ))}
          </nav>
        </div>
        {/* signature: the name rises word by word as the page ends */}
        <p
          data-reveal
          aria-label={profileData.name}
          className="sw-host mt-16 select-none font-serif text-[clamp(64px,15vw,230px)] leading-[0.85] tracking-[-0.02em]"
        >
          <span data-parallax="0.12" className="block">
            {splitWords(<>{profileData.shortName.split(" ")[0]} <em className="italic text-amber">{profileData.shortName.split(" ").slice(1).join(" ")}</em></>)}
          </span>
        </p>
        <div className="eyebrow mt-10 flex flex-col justify-between gap-3 text-[9.5px] text-cream-muted sm:flex-row">
          <span>© {profileData.name} · {profileData.location}</span>
          <span>Character: illustrated 3D portrait, animated in WebGL</span>
        </div>
      </div>
    </footer>
  );
}
