"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, GraduationCap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setFeedbackMessage("Please fill in your name, email, and message.");
      return;
    }

    setStatus("submitting");

    // Simulated transmission / ready for Resend or EmailJS
    setTimeout(() => {
      setStatus("success");
      setFeedbackMessage(
        "Transmission acknowledged. Thank you for reaching out; I will respond promptly."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/[0.06] bg-[#060913]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          number="09"
          tag="COMMUNICATIONS PROTOCOL"
          title="INITIATE CONTACT & COLLABORATION"
          description="Open for research fellowship inquiries, machine learning engineering internships, systems architecture discussions, and academic collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Dossier & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-8 space-y-6 shadow-lg shadow-black/20">
              <div>
                <span className="font-mono text-xs tracking-wider text-[#d4af37] uppercase block mb-1">
                  DIRECT CHANNELS // N. P. RAHUL JAIN
                </span>
                <h3 className="font-sans text-2xl font-bold text-white">
                  Let&apos;s Build Verifiable & Scalable AI Systems
                </h3>
                <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                  Reach out directly for technical inquiries, research discussions in LLM calibration and robotics, or software engineering opportunities.
                </p>
              </div>

              {/* Channels List */}
              <div className="space-y-3 pt-4 border-t border-white/[0.04]">
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center gap-3 rounded border border-white/[0.04] bg-[#060913] p-3 text-sm text-[#F8FAFC] hover:border-[#d4af37]/40 transition-colors"
                >
                  <div className="rounded p-2 bg-[#d4af37]/10 text-[#d4af37]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#64748B] uppercase block">
                      PRIMARY EMAIL
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold">
                      {profileData.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${profileData.universityEmail}`}
                  className="flex items-center gap-3 rounded border border-white/[0.04] bg-[#060913] p-3 text-sm text-[#F8FAFC] hover:border-[#d4af37]/40 transition-colors"
                >
                  <div className="rounded p-2 bg-[#d4af37]/10 text-[#d4af37]">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#64748B] uppercase block">
                      UNIVERSITY EMAIL (DSU)
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold">
                      {profileData.universityEmail}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded border border-white/[0.04] bg-[#060913] p-3 text-sm text-[#F8FAFC]">
                  <div className="rounded p-2 bg-white/[0.05] text-[#94A3B8]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#64748B] uppercase block">
                      LOCATION
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-white">
                      {profileData.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/[0.04]">
                <span className="font-mono text-xs text-[#64748B] uppercase block mb-3">
                  PUBLIC PROFILES:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={profileData.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded border border-white/[0.08] py-2.5 font-mono text-xs text-[#94A3B8] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
                  >
                    <LinkedinIcon size={15} />
                    <span>LINKEDIN</span>
                  </a>
                  <a
                    href={profileData.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded border border-white/[0.08] py-2.5 font-mono text-xs text-[#94A3B8] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
                  >
                    <GithubIcon size={15} />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-10 space-y-6 font-sans shadow-lg shadow-black/20"
            >
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-2">
                <span className="font-mono text-xs text-[#d4af37] uppercase tracking-wider">
                  TRANSMISSION DISPATCH
                </span>
                <span className="font-mono text-[10px] text-[#64748B]">
                  SECURE CHANNELS
                </span>
              </div>

              {/* Feedback Alert */}
              {status === "success" && (
                <div className="rounded border border-[#d4af37]/40 bg-[#d4af37]/10 p-4 font-mono text-xs text-[#e5c158] flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div className="rounded border border-red-500/40 bg-red-500/10 p-4 font-mono text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-2"
                  >
                    YOUR NAME <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full rounded border border-white/[0.1] bg-[#060913] px-4 py-3 font-sans text-sm text-white placeholder-[#64748B] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-2"
                  >
                    YOUR EMAIL <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@institution.org"
                    className="w-full rounded border border-white/[0.1] bg-[#060913] px-4 py-3 font-sans text-sm text-white placeholder-[#64748B] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-2"
                >
                  SUBJECT
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Research Collaboration / Internship / Systems Engineering"
                  className="w-full rounded border border-white/[0.1] bg-[#060913] px-4 py-3 font-sans text-sm text-white placeholder-[#64748B] focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-2"
                >
                  MESSAGE <span className="text-[#d4af37]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Detail your inquiry, project scope, or opportunity..."
                  className="w-full rounded border border-white/[0.1] bg-[#060913] px-4 py-3 font-sans text-sm text-white placeholder-[#64748B] focus:border-[#d4af37] focus:outline-none transition-colors resize-y"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#64748B] uppercase">
                  DIRECT ROUTING
                </span>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-sm bg-[#d4af37] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#060913] hover:bg-[#e5c158] hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <span>{status === "submitting" ? "DISPATCHING..." : "SEND MESSAGE"}</span>
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
