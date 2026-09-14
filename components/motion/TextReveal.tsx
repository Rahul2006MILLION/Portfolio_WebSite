"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASINGS, DURATIONS } from "@/lib/animations/gsapConfig";
import { prefersReducedMotion } from "@/lib/utils/device";

interface TextRevealProps {
  children: string;
  type?: "lines" | "words" | "chars";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  type = "words",
  className = "",
  delay = 0,
  duration = DURATIONS.medium,
  stagger = 0.03,
  triggerOnScroll = true,
  as = "div",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split content based on mode
  const items =
    type === "chars"
      ? children.split("")
      : type === "words"
      ? children.split(" ")
      : children.split("\n");

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = containerRef.current?.querySelectorAll(".reveal-item");
      if (!targets || targets.length === 0) return;

      const animProps: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: EASINGS.cinematic,
      };

      if (triggerOnScroll) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(targets, animProps);
          },
        });
      } else {
        gsap.to(targets, animProps);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration, stagger, triggerOnScroll]);

  const innerContent = items.map((item, idx) => (
    <span key={idx} className="inline-block overflow-hidden align-bottom">
      <span
        className="reveal-item inline-block will-change-transform"
        style={{
          transform: "translate3d(0, 110%, 0)",
          opacity: 0,
        }}
      >
        {item}
        {type === "words" && idx < items.length - 1 ? "\u00A0" : ""}
      </span>
    </span>
  ));

  const wrapperClass = `inline-block overflow-hidden ${className}`;

  if (as === "h1") {
    return (
      <h1
        ref={containerRef as unknown as React.RefObject<HTMLHeadingElement>}
        className={wrapperClass}
        aria-label={children}
      >
        {innerContent}
      </h1>
    );
  }

  if (as === "h2") {
    return (
      <h2
        ref={containerRef as unknown as React.RefObject<HTMLHeadingElement>}
        className={wrapperClass}
        aria-label={children}
      >
        {innerContent}
      </h2>
    );
  }

  if (as === "h3") {
    return (
      <h3
        ref={containerRef as unknown as React.RefObject<HTMLHeadingElement>}
        className={wrapperClass}
        aria-label={children}
      >
        {innerContent}
      </h3>
    );
  }

  if (as === "span") {
    return (
      <span
        ref={containerRef as unknown as React.RefObject<HTMLSpanElement>}
        className={wrapperClass}
        aria-label={children}
      >
        {innerContent}
      </span>
    );
  }

  return (
    <div
      ref={containerRef}
      className={wrapperClass}
      aria-label={children}
    >
      {innerContent}
    </div>
  );
}
