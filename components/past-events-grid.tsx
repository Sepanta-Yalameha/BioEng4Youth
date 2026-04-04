"use client";

import {
  ArrowRight,
  Calendar,
  Users,
  FileText,
  Trophy,
  Award,
  Beaker,
  BookOpen,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface PastEvent {
  title: string;
  date: string;
  description: string;
  highlights: string[];
  category: string;
  icon: React.ReactNode;
  featured?: boolean;
}

const events: PastEvent[] = [
  {
    title: "Case Competition",
    date: "Winter 2026",
    category: "Competition",
    icon: <Trophy size={20} />,
    description:
      "Our flagship case competition challenged participants to design low-cost diagnostic tools for reproductive health — bridging engineering creativity with real-world clinical needs in underserved communities.",
    highlights: [
      "100+ submissions from students across multiple faculties",
      "Top 8 teams were published with URNCST",
      "Judged by faculty, clinicians, and industry mentors",
    ],
    featured: true,
  },
  {
    title: "Biomedical Device Workshop",
    date: "Fall 2025",
    category: "Workshop",
    icon: <Beaker size={20} />,
    description:
      "A hands-on, two-day workshop where participants learned to prototype low-cost biomedical sensors using Arduino-based platforms and open-source hardware.",
    highlights: [
      "40+ attendees from engineering and life sciences",
      "Participants built functional pulse oximeters",
    ],
  },
  {
    title: "Research Poster Symposium",
    date: "Spring 2025",
    category: "Symposium",
    icon: <Award size={20} />,
    description:
      "An interdisciplinary poster session showcasing undergraduate research at the intersection of biology, medicine, and engineering. Faculty judges awarded prizes across three categories.",
    highlights: [
      "25 poster presentations from across campus",
      "3 award categories with cash prizes",
    ],
  },
  {
    title: "Intro to Bioinformatics Seminar",
    date: "Winter 2025",
    category: "Seminar",
    icon: <BookOpen size={20} />,
    description:
      "A guest lecture and coding workshop introducing students to computational biology — covering sequence alignment, protein structure prediction, and genomic data analysis with Python.",
    highlights: [
      "60+ students attended across two sessions",
      "Hands-on coding exercises with real genomic datasets",
    ],
  },
];

function FeaturedEvent({ event }: { event: PastEvent }) {
  const { ref, inView } = useInView();

  return (
    <section className="py-16 border-b border-brand-primary/10">
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
          {/* Decorative accent bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary/20" />

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left — details (3 cols) */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-mono tracking-wide">
                  <Trophy size={12} />
                  {event.category}
                </span>
                <span className="flex items-center gap-1.5 text-brand-text/35 text-xs font-mono">
                  <Calendar size={12} />
                  {event.date}
                </span>
              </div>

              <h3 className="font-display font-bold text-brand-text text-3xl sm:text-4xl tracking-tight leading-tight mb-4">
                {event.title}
              </h3>

              <p className="text-brand-text/55 text-lg leading-relaxed mb-6">
                {event.description}
              </p>

              <ul className="space-y-3 mb-8">
                {event.highlights.map((highlight) => (
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

            {/* Right — key metrics (2 cols) */}
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
                icon={<Users size={20} />}
                value="Multi-Faculty"
                label="Student Participation"
                delay={500}
                inView={inView}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

function EventCard({ event, index }: { event: PastEvent; index: number }) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      className={cn(
        "group flex flex-col p-6 rounded-3xl border border-brand-primary/10 bg-white hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-accent/5 hover:-translate-y-1 transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Category + date */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-primary/5 text-brand-secondary text-[11px] font-mono tracking-wide">
          {event.icon}
          {event.category}
        </span>
        <span className="flex items-center gap-1.5 text-brand-text/35 text-xs font-mono">
          <Calendar size={12} />
          {event.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-brand-text text-lg leading-snug mb-3 group-hover:text-brand-primary transition-colors">
        {event.title}
      </h3>

      {/* Description */}
      <p className="text-brand-text/50 text-sm leading-relaxed flex-1 mb-5">
        {event.description}
      </p>

      {/* Highlights */}
      <ul className="space-y-2 mb-5">
        {event.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-accent shrink-0" />
            <span className="text-brand-text/50 text-xs leading-relaxed">
              {highlight}
            </span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="pt-4 border-t border-brand-primary/5">
        <button className="inline-flex items-center gap-1 text-brand-accent text-sm font-medium group-hover:gap-2 transition-all">
          Read More
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

export default function PastEventsGrid() {
  const featured = events.find((e) => e.featured);
  const otherEvents = events.filter((e) => !e.featured);

  return (
    <>
      {featured && <FeaturedEvent event={featured} />}

      {/* Events Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-2">
            More Events
          </p>
          <h2 className="font-display font-bold text-brand-text text-3xl sm:text-4xl tracking-tight leading-tight mb-10">
            Workshops, Symposiums &amp; Seminars
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherEvents.map((event, i) => (
              <EventCard key={event.title} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
