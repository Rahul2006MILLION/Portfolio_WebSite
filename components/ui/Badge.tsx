import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "mono";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs";

  const variantClasses = {
    default: "border border-white/[0.08] bg-white/[0.02] text-[#94A3B8]",
    accent: "border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#e5c158]",
    outline: "border border-white/[0.15] bg-transparent text-[#F8FAFC]",
    mono: "border border-white/[0.06] bg-[#0A0F1D] font-mono text-[#94A3B8]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm font-mono tracking-wider uppercase transition-colors select-none ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
