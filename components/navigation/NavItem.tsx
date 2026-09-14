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
        className="group relative flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs tracking-wider text-[#7B8291] uppercase transition-colors duration-200 hover:text-[#F5F6F8] focus-visible:text-[#d4ff00]"
      >
        <span className="text-[10px] text-[#464B55] transition-colors group-hover:text-[#d4ff00]">
          {index}
        </span>
        <span>{label}</span>
        {/* Subtle hover line */}
        <span className="absolute bottom-0 left-3 right-3 h-[1px] scale-x-0 bg-[#d4ff00] transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </Link>
    </Magnetic>
  );
}
