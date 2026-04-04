"use client";

import { Code2, Network, Award } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const reasons = [
  {
    icon: <Code2 size={28} />,
    title: "Build",
    desc: "Turn ideas into reality. Tackle open-ended bioengineering problems with a team and ship something you're proud of.",
    accent: "#70B389",
  },
  {
    icon: <Network size={28} />,
    title: "Network",
    desc: "Meet like-minded students, connect with mentors from industry and academia, and grow your community.",
    accent: "#328795",
  },
  {
    icon: <Award size={28} />,
    title: "Win",
    desc: "Compete for prizes, recognition, and opportunities. Prizes and categories will be announced soon.",
    accent: "#135264",
  },
];

export default function WhyParticipate() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 bg-brand-primary/[0.88] backdrop-blur-md relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-secondary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={cn(
            "text-center mb-14 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-3">
            Why Participate
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl leading-tight tracking-tight">
            What&apos;s in it for you?
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={cn(
                "p-7 rounded-3xl glass group hover:-translate-y-1 transition-all duration-300",
                "transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${150 + i * 130}ms` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-5"
                style={{ backgroundColor: r.accent + "33" }}
              >
                <span style={{ color: r.accent }}>{r.icon}</span>
              </div>
              <h3 className="font-display font-bold text-white text-2xl mb-3">{r.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
