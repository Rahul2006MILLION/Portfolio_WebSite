import React from "react";
import { codingProfilesData } from "@/data/codingProfiles";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/ui/Icons";
import { ArrowUpRight, BarChart3 } from "lucide-react";

export function CodingProfilesSection() {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return <GithubIcon size={24} />;
      case "LeetCode":
        return <LeetCodeIcon size={24} />;
      case "LinkedIn":
        return <LinkedinIcon size={24} />;
      default:
        return <BarChart3 size={24} />;
    }
  };

  return (
    <section id="coding" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/[0.06] bg-[#060913]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          number="08"
          tag="CODING ECOSYSTEM"
          title="DEVELOPER PRESENCE & PLATFORMS"
          description="Verified open-source repositories, historical competitive problem-solving milestones, and professional engineering networks."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {codingProfilesData.map((profile) => (
            <a
              key={profile.id}
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="interactive"
              data-cursor-label="VISIT"
              className="rounded-xl border border-white/[0.08] bg-[#0A0F1D] p-6 sm:p-8 flex flex-col justify-between hover:border-[#d4af37]/40 transition-colors group shadow-lg shadow-black/20"
            >
              <div>
                {/* Platform Header */}
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded border border-white/[0.08] bg-[#060913] p-2.5 text-white group-hover:text-[#d4af37] group-hover:border-[#d4af37]/40 transition-colors">
                      {getIcon(profile.platform)}
                    </div>
                    <div>
                      <h3 className="font-sans text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                        {profile.platform}
                      </h3>
                      <span className="font-mono text-xs text-[#94A3B8]">
                        {profile.handleOrRank}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-full border border-white/[0.08] p-2 text-[#94A3B8] group-hover:border-[#d4af37] group-hover:text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-sans">
                  {profile.tagline}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 rounded border border-white/[0.04] bg-[#060913] p-3">
                  {profile.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="text-center sm:text-left">
                      <span className="font-mono text-[9px] text-[#64748B] uppercase block">
                        {metric.label}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#F8FAFC] block mt-0.5">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-[#64748B] uppercase">
                  {profile.isConfigurable ? "CONFIGURABLE LINK" : "VERIFIED PROFILE"}
                </span>
                <span className="text-[#d4af37] group-hover:underline flex items-center gap-1">
                  <span>OPEN PROFILE</span>
                  <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
