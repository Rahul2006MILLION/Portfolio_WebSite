"use client";

import React from "react";
import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";

interface NavItemProps {
  label: string;
  href: string;
  index: string;
}

export function NavItem({ label, href, index }: NavItemProps) {
  return (
    <Magnetic strength={0.3}>
      <Link
        href={href}
        data-cursor="hover"
        className="group relative flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs tracking-wider text-[#94A3B8] uppercase transition-colors duration-200 hover:text-[#F8FAFC] focus-visible:text-[#d4af37]"
      >
        <span className="text-[10px] text-[#64748B] transition-colors group-hover:text-[#d4af37]">
          {index}
        </span>
        <span>{label}</span>
        {/* Subtle hover line */}
        <span className="absolute bottom-0 left-3 right-3 h-[1px] scale-x-0 bg-[#d4af37] transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </Link>
    </Magnetic>
  );
}
