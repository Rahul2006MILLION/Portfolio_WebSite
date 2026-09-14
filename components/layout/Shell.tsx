import React, { type ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="relative min-h-[100dvh] w-full bg-[#070809] text-[#F5F6F8] selection:bg-[#d4ff00] selection:text-[#070809]">
      {/* Viewport Frame Guides (F1 Telemetry / Aerospace precision hairlines) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-20 flex justify-between px-4 sm:px-8 md:px-12 lg:px-16"
      >
        {/* Left vertical guide rule */}
        <div className="h-full w-[1px] bg-white/[0.04]" />
        {/* Center alignment guide rule */}
        <div className="hidden h-full w-[1px] bg-white/[0.02] xl:block" />
        {/* Right vertical guide rule */}
        <div className="h-full w-[1px] bg-white/[0.04]" />
      </div>

      {/* Top and bottom subtle registration marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-20 flex justify-between px-6 pt-3 font-mono text-[9px] tracking-widest text-[#464B55] uppercase select-none"
      >
        <span>SYS // CALIBRATED</span>
        <span className="hidden md:inline">LAT 28°36&apos;N · LNG 77°12&apos;E</span>
        <span>INDEX // 01</span>
      </div>

      {/* Subtle bottom telemetry border */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-between border-t border-white/[0.04] bg-[#070809]/80 px-6 py-2.5 font-mono text-[9px] tracking-widest text-[#464B55] uppercase backdrop-blur-sm select-none"
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff00]/80 animate-pulse" />
          CORE ENGINE // ACTIVE
        </span>
        <span className="hidden sm:inline">PRECISION INTERFACE SYSTEM</span>
        <span>PORTFOLIO // V1.0</span>
      </div>

      {/* Main content slot */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        {children}
      </div>
    </div>
  );
}
