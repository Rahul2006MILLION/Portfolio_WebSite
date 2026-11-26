import React from "react";
import { cn } from "@/lib/utils/cn";
import { splitWords, textOf } from "@/components/motion/split";

interface ChapterProps {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** Editorial section opener: index + label on a hairline, then a large serif title. */
export function Chapter({ index, label, title, intro, tone = "light", className }: ChapterProps) {
  const dark = tone === "dark";
  // titles arrive as <span id="x-title">…</span>: lift the id onto the heading itself
  let id: string | undefined;
  let content: React.ReactNode = title;
  if (React.isValidElement<{ id?: string; children?: React.ReactNode }>(title) && title.props.id) {
    id = title.props.id;
    content = title.props.children;
  }
  return (
    <header className={cn("mb-14 sm:mb-20", className)}>
      <div
        className={cn("eyebrow flex items-center gap-4 text-[10.5px]", dark ? "text-cream-muted" : "text-ink-muted")}
        data-reveal
      >
        <span>{index}</span>
        <span aria-hidden="true" className="draw-x h-px flex-1 bg-current opacity-30" />
        <span>{label}</span>
      </div>
      <h2
        id={id}
        className={cn(
          "sw-host mt-7 max-w-[18ch] font-serif text-[clamp(44px,7vw,104px)] leading-[0.92] tracking-[-0.015em]",
          dark ? "text-cream" : "text-ink"
        )}
        data-reveal
        style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}
      >
        <span className="sr-only">{textOf(content)}</span>
        {splitWords(content)}
      </h2>
      {intro && (
        <p
          className={cn("mt-6 max-w-[58ch] text-[15px] leading-relaxed sm:text-base", dark ? "text-cream-muted" : "text-ink-soft")}
          data-reveal
          style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
        >
          {intro}
        </p>
      )}
    </header>
  );
}

export const sectionPad = "relative px-5 py-28 sm:px-10 sm:py-36 lg:px-16";
export const container = "mx-auto max-w-[1360px]";
