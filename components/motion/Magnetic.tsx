"use client";

import React, { useRef } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils/device";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // Distance multiplier (default: 0.35)
  className?: string;
}

export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice() || prefersReducedMotion() || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    pos.current = { x: deltaX, y: deltaY };
    ref.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    pos.current = { x: 0, y: 0 };
    ref.current.style.transform = "translate3d(0px, 0px, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${className ?? ""}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
