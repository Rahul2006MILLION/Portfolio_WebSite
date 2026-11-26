"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
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

  // Rendered at <body> so the dialog sits above every section and the fixed site navigation
  // (sections create their own stacking contexts). Only mounted client-side, when open.
  // Styled with the site's own tokens: sage paper panel, moss header, cream type on moss.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-6"
    >
      {/* Backdrop: deep moss veil, not black */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#141a10]/75 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Dialog Body */}
      <div
        className={`relative z-10 my-6 w-full ${maxWidthClasses} overflow-hidden rounded-[24px] border border-ink/15 bg-sage-50 text-ink shadow-[0_40px_100px_-40px_rgba(10,14,8,0.65)]`}
        data-lenis-prevent
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 bg-moss px-6 py-5 text-cream sm:px-8">
          <div className="min-w-0">
            {categoryTag && (
              <span className="eyebrow mb-2 block text-[10px] text-amber">
                {categoryTag}
              </span>
            )}
            <h3 id="modal-title" className="font-serif text-[clamp(24px,3vw,34px)] leading-[1.08] text-cream">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="press mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-moss"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="modal-scroll max-h-[75vh] space-y-6 overflow-y-auto p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
