import React from "react";
import type { CertificateStatus } from "@/types/portfolio";
import { cn } from "@/lib/utils/cn";

/** Small status pill. "Participation" is never presented as completion; "Award" marks recognitions. */
export function StatusLabel({ status, tone = "dark", className }: { status: CertificateStatus; tone?: "dark" | "paper"; className?: string }) {
  const styles = {
    paper: {
      Completed: "border-[#8c1515]/35 text-[#8c1515]",
      Award: "border-[#1f4a35]/40 bg-[#1f4a35] text-cream",
      Participation: "border-ink/25 text-ink-muted",
    },
    dark: {
      Completed: "border-amber/45 text-amber",
      Award: "border-amber bg-amber text-forest",
      Participation: "border-cream/25 text-cream-muted",
    },
  }[tone][status];
  return (
    <span className={cn("eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] leading-none", styles, className)}>
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", status === "Participation" ? "border border-current" : "bg-current")} />
      {status}
    </span>
  );
}
