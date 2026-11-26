"use client";

import React, { useEffect, useRef } from "react";
import { Character } from "@/components/character/Character";
import { scrollToHash } from "@/components/navigation/Navbar";
import { profileData } from "@/data/profile";
import { gsap, ScrollTrigger } from "@/lib/animations/gsapConfig";

const INTRO = `I build calibrated machine-learning systems, multi-robot coordination software and the interfaces around them.`;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      // push in towards the face, then let it fall out of focus as the page takes over
      tl.to(stageRef.current, { scale: 1.65, yPercent: 6, duration: 1 }, 0)
        .to(copyRef.current, { autoAlpha: 0, y: -70, duration: 0.35 }, 0)
        .to(stageRef.current, { filter: "blur(7px)", duration: 0.45 }, 0.55)
        .to(shadeRef.current, { opacity: 1, duration: 0.45 }, 0.55);
      return () => tl.scrollTrigger?.kill();
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative h-[100svh] motion-safe:h-[185svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* character, anchored to the bottom edge like a bust */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div
            ref={stageRef}
            className="shrink-0 origin-[50%_30%] will-change-transform"
            style={{ width: "min(100svh, 170vw, 1200px)" }}
          >
            <div className="hero-rise">
              <Character />
            </div>
          </div>
        </div>

        {/* deep moss falloff under the copy (keeps cream text readable) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[46svh] bg-gradient-to-t from-[#141b10]/80 via-[#141b10]/35 to-transparent"
        />
        <div ref={shadeRef} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-sage-300/50 opacity-0" />

        <div ref={copyRef} className="absolute inset-0 text-cream">
          <div className="absolute inset-x-0 bottom-0 px-5 pb-[4.5svh] text-center sm:px-8">
            <h1 className="font-serif leading-[0.86] tracking-[-0.01em] drop-shadow-[0_2px_24px_rgba(10,14,8,0.45)]">
              <span className="block text-[clamp(18px,min(2.4vw,3.6svh),32px)] italic" data-reveal style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>
                N. P.
              </span>
              <span className="block text-[clamp(60px,min(12vw,17svh),190px)]" data-reveal style={{ "--reveal-delay": "0.42s" } as React.CSSProperties}>
                Rahul <em className="italic">Jain</em>
              </span>
            </h1>
            <p
              className="eyebrow mx-auto mt-4 text-[10px] leading-[1.9] text-cream/90 sm:text-[11px]"
              data-reveal
              style={{ "--reveal-delay": "0.58s" } as React.CSSProperties}
            >
              <span className="whitespace-nowrap">Creative Technologist</span> <span aria-hidden="true">|</span>{" "}
              <span className="whitespace-nowrap">AI/ML Developer</span> <span aria-hidden="true">|</span>{" "}
              <span className="whitespace-nowrap">Researcher</span>
            </p>
            <p
              className="mx-auto mt-3 max-w-[40ch] font-serif text-[15px] italic leading-snug text-cream/85 lg:hidden [@media(max-height:760px)]:hidden"
              data-reveal
              style={{ "--reveal-delay": "0.68s" } as React.CSSProperties}
            >
              {INTRO}
            </p>
            <a
              href="#about"
              onClick={(e) => scrollToHash("#about") && e.preventDefault()}
              className="eyebrow group mt-5 inline-flex flex-col items-center gap-2 text-[10px] text-cream/75 hover:text-cream"
            >
              Scroll
              <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-cream/25">
                <span className="scroll-tick absolute inset-x-0 top-0 h-3 bg-cream" />
              </span>
            </a>
          </div>

          {/* corners (wide screens): a short introduction and where I am */}
          <p
            className="absolute bottom-[4.5svh] left-6 hidden max-w-[30ch] font-serif text-[17px] italic leading-snug text-cream/85 lg:block xl:left-10"
            data-reveal
            style={{ "--reveal-delay": "0.75s" } as React.CSSProperties}
          >
            {INTRO}
          </p>
          <div className="eyebrow absolute bottom-[4.5svh] right-6 hidden text-right text-[9.5px] leading-[1.9] text-cream/75 lg:block xl:right-10">
            {profileData.location}
            <br />
            B.Tech CSE (AI &amp; ML) · {profileData.university}
            <br />
            Open to research &amp; internships
          </div>
        </div>
      </div>
    </section>
  );
}
