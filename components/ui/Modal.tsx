"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  categoryTag?: string;
  children: React.ReactNode;
  maxWidth?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  categoryTag,
  children,
  maxWidth = "3xl",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  }[maxWidth];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Dialog Body */}
      <div
        className={`relative z-10 w-full ${maxWidthClasses} my-8 overflow-hidden rounded-xl border border-white/[0.12] bg-[#0A0F1D] shadow-2xl transition-all`}
        data-lenis-prevent
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 bg-[#060913]/90">
          <div>
            {categoryTag && (
              <span className="font-mono text-[10px] tracking-widest text-[#d4af37] uppercase block mb-1">
                {categoryTag}
              </span>
            )}
            <h3 className="font-sans text-lg sm:text-xl font-bold text-[#F8FAFC]">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded p-2 text-[#94A3B8] hover:bg-white/[0.05] hover:text-[#d4af37] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-8 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
