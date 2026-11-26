"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { certificatesData } from "@/data/certificates";
import type { CertificateItem } from "@/types/portfolio";
import { Chapter, container } from "@/components/ui/Chapter";
import { CertificateLightbox } from "@/components/certificates/CertificateLightbox";
import { StatusLabel } from "@/components/certificates/StatusLabel";
import { Tilt } from "@/components/motion/Tilt";
import { PanelGlow } from "@/components/motion/PanelGlow";
import { Magnetic } from "@/components/motion/Magnetic";

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as React.CSSProperties;

export function CertificationsSection({ items = certificatesData }: { items?: CertificateItem[] }) {
  // featured first, then the rest in their data order
  const ordered = [...items.filter((c) => c.featured), ...items.filter((c) => !c.featured)];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);
  const featured = ordered.filter((c) => c.featured);
  const rest = ordered.filter((c) => !c.featured);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="relative z-10 mx-2 px-5 py-28 text-cream sm:mx-4 sm:px-10 sm:py-36 lg:px-16"
    >
      <div aria-hidden="true" data-panel className="absolute inset-0 -z-10 overflow-hidden rounded-[28px] bg-forest sm:rounded-[40px]">
        <PanelGlow />
      </div>
      <div className={container}>
        <Chapter
          tone="dark"
          index="08"
          label="Certifications"
          title={
            <span id="certifications-title">
              Certifications &amp; <em className="italic">Learning</em>
            </span>
          }
          intro="Continuous learning, technical exploration, and hands-on experience."
        />

        <div className="space-y-6">
          {featured.map((c, i) => (
            <FeaturedCertificate key={c.id} item={c} reverse={i % 2 === 1} onOpen={() => setOpenIndex(ordered.indexOf(c))} />
          ))}
        </div>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((c, i) => (
            <li key={c.id} data-reveal="scale" style={delay(0.08 * i)}>
              <CertificateCard item={c} onOpen={() => setOpenIndex(ordered.indexOf(c))} />
            </li>
          ))}
        </ul>
      </div>

      <CertificateLightbox items={ordered} index={openIndex} onClose={close} onNavigate={setOpenIndex} />
    </section>
  );
}

const ACCENTS = {
  // Stanford-inspired cardinal for the academic course; deep evergreen (from the certificate) for VisionX
  cardinal: { rule: "bg-[#8c1515]", text: "text-[#8c1515]", hover: "hover:bg-[#8c1515]" },
  evergreen: { rule: "bg-[#1f4a35]", text: "text-[#1f4a35]", hover: "hover:bg-[#1f4a35]" },
} as const;

function FeaturedCertificate({ item, onOpen, reverse = false }: { item: CertificateItem; onOpen: () => void; reverse?: boolean }) {
  const accent = ACCENTS[item.highlight?.accent ?? "cardinal"];
  return (
    <article
      className="group relative grid overflow-hidden rounded-[24px] bg-cream text-ink shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)] lg:grid-cols-12"
      data-reveal
    >
      {/* fine accent rule: a quiet nod to the issuer, not a logo */}
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] ${accent.rule}`} />

      <div className={`relative flex items-center bg-[#e9e4d6] p-5 sm:p-8 lg:col-span-7 lg:p-10 ${reverse ? "lg:order-2" : ""}`}>
        <Tilt max={4} className="w-full">
        <div className="curtain w-full">
        <button
          type="button"
          onClick={onOpen}
          className="relative block w-full overflow-hidden rounded-md shadow-[0_24px_50px_-28px_rgba(25,29,22,0.65)] ring-1 ring-ink/10 transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:-translate-y-1"
          aria-label={`View certificate: ${item.title}`}
          data-cursor-label="View"
        >
          <Image
            src={item.preview.thumb}
            alt=""
            width={900}
            height={Math.round((900 * item.preview.height) / item.preview.width)}
            unoptimized
            className="drift h-auto w-full"
          />
          <span className="eyebrow absolute bottom-3 right-3 rounded-full bg-ink/85 px-3 py-1.5 text-[9.5px] text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100 focus-visible:opacity-100">
            View certificate
          </span>
        </button>
        </div>
        </Tilt>
      </div>

      <div className="flex flex-col p-7 sm:p-10 lg:col-span-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`eyebrow text-[9.5px] ${accent.text}`}>{item.highlight?.label ?? "Featured"}</span>
        </div>
        <h3 className="mt-4 font-serif text-[clamp(30px,3vw,44px)] leading-[1.04]">{item.title}</h3>
        {item.authority && <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{item.authority}</p>}
        <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{item.description}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/15 pt-5 text-[13.5px]">
          <div>
            <dt className="eyebrow text-[9px] text-ink-muted">Issued</dt>
            <dd className="mt-1">
              <time dateTime={item.isoDate}>{item.date}</time>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-[9px] text-ink-muted">Status</dt>
            <dd className="mt-1">
              <StatusLabel status={item.status} tone="paper" />
            </dd>
          </div>
          {item.details.map((d) => (
            <div key={d.label}>
              <dt className="eyebrow text-[9px] text-ink-muted">{d.label}</dt>
              <dd className="mt-1">{d.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap gap-2 pt-8">
          <Magnetic strength={0.2}>
            <button
              type="button"
              onClick={onOpen}
              className={`press eyebrow rounded-full bg-ink px-5 py-3 text-[10px] text-cream ${accent.hover}`}
            >
              View certificate
            </button>
          </Magnetic>
          {item.verificationUrl && (
            <a
              href={item.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="press eyebrow rounded-full border border-ink/25 px-5 py-3 text-[10px] text-ink hover:border-ink"
            >
              Verify on {item.issuer} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function CertificateCard({ item, onOpen }: { item: CertificateItem; onOpen: () => void }) {
  return (
    <Tilt max={6} className="h-full">
    <article className="spotlight group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line-dark bg-forest-2 transition-[border-color,background-color] duration-500 ease-[var(--ease-cinematic)] hover:border-amber/35 hover:bg-[#1f261a]">
      <div className="overflow-hidden bg-[#0f130c] p-4">
        <Image
          src={item.preview.thumb}
          alt=""
          width={900}
          height={Math.round((900 * item.preview.height) / item.preview.width)}
          unoptimized
          className="aspect-[1.414] w-full rounded-[4px] object-cover object-top opacity-90 transition-[transform,opacity] duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.03] group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[9.5px] leading-relaxed text-cream-muted">{item.issuer}</p>
        <h3 className="mt-3 font-serif text-[24px] leading-[1.1]">
          {/* stretched button: the whole card opens the preview */}
          <button type="button" onClick={onOpen} data-cursor-label="Open" className="text-left after:absolute after:inset-0 after:content-['']">
            {item.title}
          </button>
        </h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-cream-muted">{item.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-line-dark pt-4 text-[12.5px]">
          <time dateTime={item.isoDate} className="text-cream">{item.date}</time>
          <StatusLabel status={item.status} />
        </div>
      </div>
    </article>
    </Tilt>
  );
}
