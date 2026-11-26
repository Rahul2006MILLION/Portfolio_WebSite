import React, { type ReactNode } from "react";
import { RevealObserver } from "@/components/motion/RevealObserver";

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    // Layer order: page background (body) → grain (z 0) → vignette (z 1) → content (z 10).
    // No `isolate` here on purpose: the grain must multiply with the body's sage background.
    <div className="relative min-h-[100dvh] w-full text-ink">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div aria-hidden="true" className="grain" />
      <div aria-hidden="true" className="vignette" />
      <RevealObserver />
      <div className="relative z-10 flex min-h-[100dvh] flex-col">{children}</div>
    </div>
  );
}
