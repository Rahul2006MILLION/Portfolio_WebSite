"use client";

import React from "react";

export function WebGLFallback() {
  return (
    <div
      aria-label="2D Abstract Core Visual"
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      {/* Ambient background depth glow */}
      <div className="absolute h-72 w-72 rounded-full bg-[#d4ff00]/[0.03] blur-3xl" />

      {/* Outer concentric technical circle */}
      <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/[0.08]">
        {/* Mid wireframe ring */}
        <div className="flex h-48 w-48 items-center justify-center rounded-full border border-dashed border-[#d4ff00]/30 animate-[spin_60s_linear_infinite]">
          {/* Inner core circle */}
          <div className="h-32 w-32 rounded-full border border-white/[0.15] bg-[#0B0C0E]/80 shadow-2xl backdrop-blur-sm" />
        </div>

        {/* Telemetry crosshair marks */}
        <div className="absolute top-0 h-3 w-[1px] bg-[#d4ff00]/60" />
        <div className="absolute bottom-0 h-3 w-[1px] bg-[#d4ff00]/60" />
        <div className="absolute left-0 h-[1px] w-3 bg-[#d4ff00]/60" />
        <div className="absolute right-0 h-[1px] w-3 bg-[#d4ff00]/60" />
      </div>

      {/* Fallback label indicator */}
      <span className="absolute bottom-6 font-mono text-[9px] tracking-widest text-[#464B55] uppercase">
        2D ENGINE ACTIVE // FALLBACK
      </span>
    </div>
  );
}
