"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { Chapter, container } from "@/components/ui/Chapter";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Magnetic } from "@/components/motion/Magnetic";

/**
 * There is no backend to deliver messages, so the form composes an email in the visitor's own
 * mail app (mailto:) instead of pretending a message was sent.
 */
export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "error" | "opened">("idle");

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }
    const subject = form.subject.trim() || `Portfolio enquiry from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`;
    window.location.href = `mailto:${profileData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  };

  const field =
    "w-full border-b border-line-dark bg-transparent py-3 text-[16px] text-cream placeholder:text-cream-muted/60 focus:border-cream focus:outline-none";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-10 mx-2 mt-10 overflow-hidden px-5 pt-28 pb-16 text-cream sm:mx-4 sm:px-10 sm:pt-36 lg:px-16"
    >
      <div aria-hidden="true" data-panel="top" className="absolute inset-0 -z-10 overflow-hidden rounded-t-[28px] bg-forest sm:rounded-t-[40px]">
        <div className="aurora">
          <span />
          <span />
          <span />
        </div>
      </div>
      {/* kinetic invitation drifting with the scroll */}
      <div aria-hidden="true" className="pointer-events-none -mx-5 -mt-10 mb-16 overflow-hidden whitespace-nowrap sm:-mx-10 lg:-mx-16">
        <div data-scrub-x="-30" className="inline-block font-serif text-[clamp(48px,9vw,140px)] leading-none text-cream/15 text-outline">
          {Array.from({ length: 4 }, (_, k) => (
            <span key={k} className="mx-[0.3em]">
              Research · Internships · Collaboration <span className="text-amber/50">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className={container}>
        <Chapter
          tone="dark"
          index="10"
          label="Contact"
          title={<span id="contact-title">Let&apos;s build something <em className="italic">careful</em>.</span>}
          intro={profileData.availability}
        />
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5" data-reveal>
            <Magnetic strength={0.12}>
              <a
                href={`mailto:${profileData.email}`}
                className="group relative inline-block font-serif text-[clamp(26px,3vw,40px)] leading-tight"
              >
                {profileData.email}
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full bg-cream/30" />
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-x-100" />
              </a>
            </Magnetic>
            <dl className="space-y-4 text-[14px] text-cream-muted">
              <div>
                <dt className="eyebrow text-[9.5px]">University email</dt>
                <dd className="mt-1 text-cream">
                  <a href={`mailto:${profileData.universityEmail}`} className="hover:underline">{profileData.universityEmail}</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[9.5px]">Based in</dt>
                <dd className="mt-1 text-cream">{profileData.location}</dd>
              </div>
            </dl>
            <div className="flex gap-3">
              <Magnetic strength={0.3}>
                <a href={profileData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="eyebrow inline-flex items-center gap-2 rounded-full border border-line-dark px-5 py-3 text-[10.5px] transition-colors hover:bg-cream hover:text-forest">
                  <LinkedinIcon size={14} /> LinkedIn
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href={profileData.socialLinks.github} target="_blank" rel="noreferrer" className="eyebrow inline-flex items-center gap-2 rounded-full border border-line-dark px-5 py-3 text-[10.5px] transition-colors hover:bg-cream hover:text-forest">
                  <GithubIcon size={14} /> GitHub
                </a>
              </Magnetic>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="grid gap-8 lg:col-span-7" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-[9.5px] text-cream-muted">Name *</span>
                <input name="name" required value={form.name} onChange={set} autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className="eyebrow text-[9.5px] text-cream-muted">Email *</span>
                <input name="email" type="email" required value={form.email} onChange={set} autoComplete="email" className={field} />
              </label>
            </div>
            <label className="block">
              <span className="eyebrow text-[9.5px] text-cream-muted">Subject</span>
              <input name="subject" value={form.subject} onChange={set} placeholder="Research collaboration, internship…" className={field} />
            </label>
            <label className="block">
              <span className="eyebrow text-[9.5px] text-cream-muted">Message *</span>
              <textarea name="message" required rows={5} value={form.message} onChange={set} className={`${field} resize-y`} />
            </label>
            <div className="flex flex-wrap items-center gap-5">
              <button type="submit" className="eyebrow rounded-full bg-cream px-6 py-3.5 text-[10.5px] text-forest transition-colors hover:bg-amber">
                Compose email ↗
              </button>
              <p role="status" aria-live="polite" className="text-[13px] text-cream-muted">
                {status === "error" && "Please add your name, email and a message."}
                {status === "opened" && (
                  <>Your mail app should now be open with the message ready to send. If not, write to {profileData.email}.</>
                )}
                {status === "idle" && "Opens your own email app — nothing is sent from this site."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
