"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CertificateItem } from "@/types/portfolio";
import { StatusLabel } from "./StatusLabel";

interface Props {
  items: CertificateItem[];
  /** index of the open certificate, or null when closed */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

/**
 * Full-screen certificate viewer. Shows a high-resolution render of the PDF (works on every
 * device, pinch/scroll-zoomable), the original PDF itself in the browser's viewer, and links to
 * open / download the untouched PDF.
 */
export function CertificateLightbox({ items, index, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [mode, setMode] = useState<"image" | "pdf">("image");
  const open = index !== null;
  const item = open ? items[index] : null;
  const isPdf = item?.original.type === "pdf";

  // open / close the native dialog (focus trap, Escape and top-layer for free). Re-synced on
  // every index change too: a reopen can land before the async "close" event resets the state.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      lenis()?.stop();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open, index]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const handleClose = () => {
      // ignore a stale close event if the dialog was already reopened
      if (d.open) return;
      lenis()?.start();
      setZoomed(false);
      setMode("image");
      onClose();
    };
    d.addEventListener("close", handleClose);
    return () => d.removeEventListener("close", handleClose);
  }, [onClose]);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setZoomed(false);
      setMode("image");
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (mode === "pdf") return; // let the PDF viewer keep its own keys
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, mode]);

  const btn =
    "eyebrow inline-flex items-center gap-2 rounded-full border border-line-dark px-4 py-2.5 text-[10px] text-cream transition-colors hover:border-cream/60 hover:bg-cream hover:text-forest";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cert-viewer-title"
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 text-cream backdrop:bg-[#0b0f09]/88 backdrop:backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
    >
      {item && (
        <div className="flex h-full flex-col bg-forest/70">
          {/* header */}
          <div className="flex items-start justify-between gap-4 border-b border-line-dark px-4 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="eyebrow text-[9.5px] text-amber">
                {index! + 1} / {items.length} · {item.issuer}
              </p>
              <h2 id="cert-viewer-title" className="mt-1.5 line-clamp-2 font-serif text-[20px] leading-tight sm:line-clamp-1 sm:text-[28px]">
                {item.title}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-3 text-[13px] text-cream-muted">
                <time dateTime={item.isoDate}>{item.date}</time>
                <StatusLabel status={item.status} tone="dark" />
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="eyebrow shrink-0 rounded-full bg-cream px-4 py-2.5 text-[10px] text-forest hover:bg-amber"
              autoFocus
            >
              Close ✕
            </button>
          </div>

          {/* viewer */}
          <div className="relative min-h-0 flex-1">
            {mode === "image" ? (
              <div
                data-lenis-prevent
                className={`h-full overflow-auto overscroll-contain ${zoomed ? "" : "flex items-center justify-center p-4 sm:p-8"}`}
              >
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  aria-label={zoomed ? "Fit certificate to screen" : "Zoom certificate to full size"}
                  className={`block ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                  style={
                    zoomed
                      ? undefined
                      : {
                          // reserve the fitted box before the full render arrives
                          width: `min(100%, calc((100dvh - 230px) * ${item.preview.width / item.preview.height}))`,
                        }
                  }
                >
                  <Image
                    key={item.id}
                    src={item.preview.full}
                    alt={`Certificate: ${item.title}, ${item.issuer}, ${item.date}`}
                    width={item.preview.width}
                    height={item.preview.height}
                    unoptimized
                    className={
                      zoomed
                        ? "h-auto max-w-none"
                        : "h-auto w-full rounded-md bg-cover shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
                    }
                    style={{
                      // the card thumbnail is already cached: show it until the full-size render loads
                      backgroundImage: `url(${item.preview.thumb})`,
                      backgroundSize: "100% 100%",
                      ...(zoomed ? { width: Math.min(item.preview.width, 2400) } : null),
                    }}
                  />
                </button>
              </div>
            ) : (
              <object data={item.original.href} type="application/pdf" className="h-full w-full" aria-label={`Original PDF: ${item.title}`}>
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-cream-muted">
                  <p>This browser can&apos;t show PDFs inline.</p>
                  <a href={item.original.href} target="_blank" rel="noreferrer" className={btn}>
                    Open the PDF ↗
                  </a>
                </div>
              </object>
            )}

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous certificate"
                  className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-dark bg-forest/80 text-lg hover:bg-cream hover:text-forest sm:flex"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next certificate"
                  className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-dark bg-forest/80 text-lg hover:bg-cream hover:text-forest sm:flex"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-dark px-4 py-4 sm:px-8">
            <div role="group" aria-label="View" className="flex gap-1 rounded-full border border-line-dark p-1">
              {(isPdf ? (["image", "pdf"] as const) : (["image"] as const)).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => {
                    setMode(m);
                    setZoomed(false);
                  }}
                  className={`eyebrow rounded-full px-3.5 py-2 text-[9.5px] ${mode === m ? "bg-cream text-forest" : "text-cream-muted hover:text-cream"}`}
                >
                  {m === "pdf" ? "Original PDF" : isPdf ? "Preview" : "Original image"}
                </button>
              ))}
              {mode === "image" && (
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className="eyebrow rounded-full px-3.5 py-2 text-[9.5px] text-cream-muted hover:text-cream"
                >
                  {zoomed ? "Fit" : "Zoom"}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {item.verificationUrl && (
                <a href={item.verificationUrl} target="_blank" rel="noreferrer" className={btn}>
                  Verify ↗
                </a>
              )}
              <a href={item.original.href} target="_blank" rel="noreferrer" className={btn}>
                {isPdf ? "Open PDF ↗" : "Open full size ↗"}
              </a>
              <a href={item.original.href} download className={btn}>
                Download ↓
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
