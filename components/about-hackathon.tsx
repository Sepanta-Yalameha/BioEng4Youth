"use client";

import { Microscope, Users, Trophy } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Microscope size={22} />,
    title: "Hack",
    desc: "Build real solutions to bioengineering challenges over an intense weekend with your team.",
  },
  {
    icon: <Users size={22} />,
    title: "Learn",
    desc: "Workshops, expert mentors, and resources to help you push the boundaries of what's possible.",
  },
  {
    icon: <Trophy size={22} />,
    title: "Connect",
    desc: "Network with passionate students, mentors, and industry professionals in bioengineering.",
  },
];

export default function AboutHackathon() {
  const { ref, inView } = useInView();

  return (
    <section id="about-hackathon" className="py-24 bg-white/[0.93] backdrop-blur-md">
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Left */}
        <div
          className={cn(
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-4">
            About the Hackathon
          </p>
          <h2 className="font-display font-bold text-brand-text text-4xl sm:text-5xl leading-tight tracking-tight">
            What is McMaster
            <br />
            <span className="text-brand-primary">Biohacks?</span>
          </h2>
          <p className="mt-6 text-brand-text/60 text-lg leading-relaxed">
            McMaster Biohacks is the first bioengineering-focused hackathon at
            McMaster University. Open to participants of all backgrounds and
            experience levels, it&apos;s a weekend of building, learning, and
            connecting — guided by MLH standards.
          </p>
          <p className="mt-4 text-brand-text/60 leading-relaxed">
            Whether you&apos;re a seasoned hacker or attending your first
            hackathon, you&apos;ll find your place here. All you need is
            curiosity and the drive to create.
          </p>
        </div>

        {/* Right: feature cards */}
        <div className="flex flex-col gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={cn(
                "flex gap-4 p-5 rounded-2xl border border-brand-primary/10 bg-brand-primary/3 hover:border-brand-accent/30 hover:bg-brand-accent/5 transition-all group",
                "transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-all shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="font-display font-semibold text-brand-text">{f.title}</p>
                <p className="text-brand-text/50 text-sm mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
