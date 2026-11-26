"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils/device";

export type CursorVariant = "default" | "hover" | "interactive" | "webgl" | "hidden";

const emptySubscribe = () => () => {};

export function CustomCursor() {
  // Determine if cursor should be active without triggering cascading setState in effects
  const isEnabled = useSyncExternalStore(
    emptySubscribe,
    () => !isTouchDevice() && !prefersReducedMotion(),
    () => false
  );

  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState<string>("");

  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  // Position state stored in refs to avoid re-rendering React on every mouse frame
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);

  useEffect(() => {
    if (!isEnabled) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovered element or its parents have custom cursor annotations
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      const cursorLabel = target.closest("[data-cursor-label]") as HTMLElement | null;

      if (cursorTarget) {
        const customType = cursorTarget.getAttribute("data-cursor") as CursorVariant;
        setVariant(customType || "hover");
        isHovered.current = true;
      } else if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setVariant("hover");
        isHovered.current = true;
      } else {
        setVariant("default");
        isHovered.current = false;
      }

      if (cursorLabel) {
        setLabel(cursorLabel.getAttribute("data-cursor-label") || "");
      } else {
        setLabel("");
      }
    };

    const onMouseLeave = () => {
      setVariant("hidden");
    };

    const onMouseEnter = () => {
      setVariant("default");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth Lerp loop for follower circle
    let animationFrameId: number;
    const lerpSpeed = 0.18;

    const tick = () => {
      const { x: targetX, y: targetY } = mousePos.current;
      followerPos.current.x += (targetX - followerPos.current.x) * lerpSpeed;
      followerPos.current.y += (targetY - followerPos.current.y) * lerpSpeed;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Primary pinpoint dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#d4af37] transition-opacity duration-200 ${
          variant === "hidden" ? "opacity-0" : "opacity-100"
        } ${variant === "webgl" ? "scale-0" : "scale-100"}`}
        style={{ willChange: "transform" }}
      />

      {/* Smooth outer follower ring */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full border border-white/20 transition-all duration-300 ease-out ${
          variant === "hidden"
            ? "opacity-0 scale-50"
            : variant === "hover"
            ? "-ml-5 -mt-5 h-10 w-10 border-[#d4af37]/60 bg-[#d4af37]/10 scale-110"
            : variant === "interactive"
            ? "-ml-6 -mt-6 h-12 w-12 border-[#d4af37] bg-[#d4af37]/15 scale-125"
            : variant === "webgl"
            ? "-ml-8 -mt-8 h-16 w-16 border-[#d4af37]/40 bg-white/[0.03] backdrop-blur-[2px] scale-100"
            : "-ml-3 -mt-3 h-6 w-6 opacity-60 scale-100"
        }`}
        style={{ willChange: "transform" }}
      >
        {label && (
          <span className="font-mono text-[9px] font-bold tracking-widest text-[#d4af37] uppercase">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
