"use client";

import {
  ArrowRight,
  Calendar,
  Users,
  FileText,
  Trophy,
  Award,
  Globe,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

function MetricCard({
  icon,
  value,
  label,
  delay,
  inView,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-5 rounded-2xl border border-brand-primary/10 bg-white hover:border-brand-accent/30 hover:shadow-md hover:shadow-brand-accent/5 transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-display font-bold text-brand-text text-xl leading-tight">
          {value}
        </p>
        <p className="text-brand-text/45 text-xs font-mono tracking-wide mt-0.5">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function PastEventsGrid() {
  const { ref, inView } = useInView();

  return (
    <section className="py-16">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-10">
          Featured Event
        </p>

        <div
          className={cn(
            "relative rounded-3xl border border-brand-primary/10 bg-gradient-to-br from-brand-primary/[0.03] to-brand-accent/[0.04] p-8 sm:p-10 lg:p-12 overflow-hidden transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary/20" />

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left — details */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-mono tracking-wide">
                  <Trophy size={12} />
                  Competition
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-mono tracking-wide">
                  <Globe size={12} />
                  International
                </span>
                <span className="flex items-center gap-1.5 text-brand-text/35 text-xs font-mono">
                  <Calendar size={12} />
                  Fall 2025
                </span>
              </div>

              <h3 className="font-display font-bold text-brand-text text-3xl sm:text-4xl tracking-tight leading-tight mb-2">
                International Research Case Competition
              </h3>

              <p className="text-brand-text/55 text-lg leading-relaxed mb-6">
                Our flagship international research case competition challenged
                participants to tackle a critical question in global maternal
                health — bridging engineering innovation with real-world clinical
                needs in rural, underserved communities.
              </p>

              <div
                className={cn(
                  "rounded-2xl border border-brand-primary/8 bg-brand-primary/[0.03] p-5 mb-6 transition-all duration-700",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: "150ms" }}
              >
                <p className="text-brand-text/40 text-[10px] font-mono tracking-widest uppercase mb-2">
                  Competition Prompt
                </p>
                <p className="text-brand-text/70 text-base leading-relaxed italic">
                  &ldquo;How can low-cost portable ultrasound devices improve
                  maternal health outcomes in rural underserved
                  communities?&rdquo;
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "100+ submissions from students across multiple faculties and institutions worldwide",
                  "Top 8 teams were published with URNCST",
                  "Judged by faculty, clinicians, and industry mentors",
                ].map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                    <span className="text-brand-text/60 text-sm leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white text-sm font-semibold hover:brightness-110 active:scale-95 transition-all">
                  Read More
                  <ArrowRight size={14} />
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-primary/15 text-brand-text/70 text-sm font-medium hover:border-brand-accent/30 hover:text-brand-text transition-all">
                  View Gallery
                </button>
              </div>
            </div>

            {/* Right — key metrics */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <MetricCard
                icon={<FileText size={20} />}
                value="100+"
                label="Submissions Received"
                delay={200}
                inView={inView}
              />
              <MetricCard
                icon={<Award size={20} />}
                value="Top 8"
                label="Published with URNCST"
                delay={350}
                inView={inView}
              />
              <MetricCard
                icon={<Globe size={20} />}
                value="International"
                label="Multi-Institution Participation"
                delay={500}
                inView={inView}
              />
              <MetricCard
                icon={<Users size={20} />}
                value="Cross-Faculty"
                label="Interdisciplinary Teams"
                delay={650}
                inView={inView}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
