"use client";

import { Lock } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const placeholderTracks = [
  { gradient: "from-brand-primary/60 to-brand-secondary/60", label: "Track 01" },
  { gradient: "from-brand-secondary/60 to-brand-accent/40", label: "Track 02" },
  { gradient: "from-brand-accent/40 to-brand-primary/60", label: "Track 03" },
];

export default function TracksSection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 bg-white/[0.90] backdrop-blur-md">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={cn(
            "text-center mb-14 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-3">
            Challenge Tracks
          </p>
          <h2 className="font-display font-bold text-brand-text text-4xl sm:text-5xl leading-tight tracking-tight">
            Tracks
          </h2>
          <p className="mt-4 text-brand-text/50 text-lg max-w-md mx-auto">
            Our challenge tracks will be revealed soon. Stay tuned.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {placeholderTracks.map((track, i) => (
            <div
              key={i}
              className={cn(
                "relative h-52 rounded-3xl overflow-hidden border border-brand-primary/10 group",
                "transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${150 + i * 120}ms` }}
            >
              {/* Blurred background */}
              <div className={cn("absolute inset-0 bg-gradient-to-br", track.gradient)} />
              <div className="absolute inset-0 backdrop-blur-sm" />

              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Lock size={20} className="text-white/60" />
                </div>
                <div className="text-center">
                  <p className="text-white/80 text-xs font-mono tracking-widest uppercase">
                    {track.label}
                  </p>
                  <p className="text-white/40 text-xs mt-1">Coming Soon</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
