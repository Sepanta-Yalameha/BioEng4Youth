"use client";

import { ArrowRight, Calendar, FileText, Trophy, Award, Globe, Users } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const metrics = [
  { icon: FileText, value: "100+", label: "Submissions" },
  { icon: Award, value: "Top 8", label: "Published with URNCST" },
  { icon: Globe, value: "International", label: "Multi-Institution" },
  { icon: Users, value: "Cross-Faculty", label: "Interdisciplinary" },
];

export default function PastEventsGrid() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-[#70B389]">Featured Event</span>
          <div className="flex-1 h-px bg-[#0B1F26]/8" />
        </div>

        {/* Featured event — editorial asymmetric layout */}
        <div
          className={cn(
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Top accent bar */}
          <div className="h-0.5 w-full bg-[#0B1F26]" />

          <div className="border border-[#0B1F26]/10 border-t-0">
            {/* Header row */}
            <div className="border-b border-[#0B1F26]/8 px-8 sm:px-10 py-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-[#0B1F26]/50 border border-[#0B1F26]/15 px-3 py-1.5">
                <Trophy size={10} />
                Competition
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-[#70B389] border border-[#70B389]/30 px-3 py-1.5">
                <Globe size={10} />
                International
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#0B1F26]/30 ml-auto">
                <Calendar size={10} />
                Fall 2025
              </span>
            </div>

            {/* Body — 60/40 split */}
            <div className="grid lg:grid-cols-[3fr_2fr] divide-y lg:divide-y-0 lg:divide-x divide-[#0B1F26]/8">
              {/* Left */}
              <div className="px-8 sm:px-10 py-10">
                <h3
                  className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight mb-4"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                >
                  International Research
                  <br />
                  Case Competition
                </h3>

                <p className="text-[#0B1F26]/55 text-base leading-loose mb-8 max-w-lg">
                  Participants tackled a critical question in global maternal health —
                  bridging engineering innovation with real-world clinical needs in
                  rural, underserved communities.
                </p>

                <div className="border-l-2 border-[#70B389] pl-5 mb-8">
                  <p className="font-mono text-[9px] tracking-widest uppercase text-[#0B1F26]/30 mb-2">
                    Competition Prompt
                  </p>
                  <p className="text-[#0B1F26]/65 text-sm leading-relaxed italic">
                    &ldquo;How can low-cost portable ultrasound devices improve
                    maternal health outcomes in rural underserved communities?&rdquo;
                  </p>
                </div>

                <ul className="space-y-3 mb-10">
                  {[
                    "100+ submissions from students across multiple faculties and institutions worldwide",
                    "Top 8 teams published with URNCST",
                    "Judged by faculty, clinicians, and industry mentors",
                  ].map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-[#0B1F26]/55">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#70B389] shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F26] text-white text-sm font-semibold hover:bg-[#135264] transition-colors">
                    Read More <ArrowRight size={14} />
                  </button>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0B1F26]/20 text-[#0B1F26]/60 text-sm font-medium hover:border-[#0B1F26]/40 hover:text-[#0B1F26] transition-all">
                    View Gallery
                  </button>
                </div>
              </div>

              {/* Right: metrics */}
              <div className="divide-y divide-[#0B1F26]/8">
                {metrics.map(({ icon: Icon, value, label }, i) => (
                  <div
                    key={label}
                    className={cn(
                      "px-8 py-7 flex items-center gap-4 transition-all duration-700",
                      inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    )}
                    style={{ transitionDelay: `${200 + i * 100}ms` }}
                  >
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#0B1F26]/5 text-[#135264]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-[#0B1F26] text-xl leading-tight">{value}</p>
                      <p className="font-mono text-[9px] tracking-widest uppercase text-[#0B1F26]/35 mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
