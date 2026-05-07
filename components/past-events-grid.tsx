"use client";

import {
  ArrowRight,
  Calendar,
  FileText,
  Trophy,
  Award,
  Globe,
  Users,
} from "lucide-react";
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
    <section ref={ref} className="py-20 bg-paper">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-4 mb-12">
          <span className="bg-neuro-teal-deep text-ink px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] uppercase">
            02
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.015em] text-ink">
            Featured event
          </h2>
          <div className="flex-1 h-px bg-rule" />
        </div>

        <div
          className={cn(
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Top accent bar */}
          <div className="h-0.5 w-full bg-ink" />

          <div className="border border-rule border-t-0">
            {/* Header row */}
            <div className="border-b border-rule px-8 sm:px-10 py-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] uppercase text-muted border border-rule px-3 py-1.5">
                <Trophy size={10} />
                Competition
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] uppercase text-neuro-teal-deep border border-neuro-teal-deep/40 px-3 py-1.5">
                <Globe size={10} />
                International
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted-soft ml-auto">
                <Calendar size={10} />
                Fall 2025
              </span>
            </div>

            {/* Body — 60/40 split */}
            <div className="grid lg:grid-cols-[3fr_2fr] divide-y lg:divide-y-0 lg:divide-x divide-rule">
              {/* Left */}
              <div className="px-8 sm:px-10 py-10">
                <h3
                  className="font-display font-bold text-ink leading-tight tracking-[-0.02em] mb-4"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                >
                  International Research
                  <br />
                  Case Competition
                </h3>

                <p className="text-muted text-[15px] leading-loose mb-8 max-w-lg">
                  Participants tackled a critical question in global maternal
                  health — bridging engineering innovation with real-world
                  clinical needs in rural, underserved communities.
                </p>

                <div className="border-l-2 border-neuro-teal-deep pl-5 mb-8">
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft mb-2">
                    Competition prompt
                  </p>
                  <p className="text-ink/75 text-sm leading-relaxed italic">
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
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-neuro-teal-deep shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/research-case-competition-abstract.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-neuro-teal text-sm font-display font-semibold hover:brightness-125 transition-all rounded-md"
                  >
                    Read more <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right: metrics */}
              <div className="divide-y divide-rule">
                {metrics.map(({ icon: Icon, value, label }, i) => (
                  <div
                    key={label}
                    className={cn(
                      "px-8 py-7 flex items-center gap-4 transition-all duration-700",
                      inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    )}
                    style={{ transitionDelay: `${200 + i * 100}ms` }}
                  >
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-neuro-teal-deep/15 text-neuro-teal-deep rounded-sm">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-ink text-xl leading-tight">
                        {value}
                      </p>
                      <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft mt-0.5">
                        {label}
                      </p>
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
