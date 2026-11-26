import React from "react";

interface SectionHeaderProps {
  number: string;
  tag: string;
  title: string;
  description?: string;
  badge?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  number,
  tag,
  title,
  description,
  badge,
  className = "",
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`border-b border-white/[0.06] pb-8 mb-12 sm:mb-16 ${
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-4xl"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 font-mono text-xs tracking-widest text-[#94A3B8] uppercase mb-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="text-[#d4af37] font-semibold">{number}</span>
        <span className="text-[#64748B]">{"//"}</span>
        <span>{tag}</span>
        {badge && (
          <span className="ml-2 rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-2 py-0.5 text-[10px] text-[#e5c158]">
            {badge}
          </span>
        )}
      </div>

      <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F8FAFC] uppercase">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl font-sans">
          {description}
        </p>
      )}
    </div>
  );
}
