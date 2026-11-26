"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Subtle 3D tilt + cursor spotlight for fine pointers. Exposes --mx / --my (0–100%) so children
 * can draw a light that follows the cursor (see .spotlight in globals.css). Touch devices and
 * reduced-motion users get the static element.
 */
export function Tilt({
  children,
  max = 5,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    if (max > 0) el.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * max).toFixed(2)}deg) rotateY(${((x - 0.5) * max).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return React.createElement(
    Tag,
    {
      ref,
      onPointerMove: onMove,
      onPointerLeave: onLeave,
      className: cn("tilt", className),
    },
    children
  );
}
