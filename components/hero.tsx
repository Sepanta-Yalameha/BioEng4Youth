"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, Dna, FlaskConical } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Overlay for hero text readability — shader shows through from page root */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-text/50 via-brand-text/20 to-brand-text/55 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full glass mb-8
            transition-all duration-700
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
            Coming Soon · First Edition
          </span>
          <Dna size={13} className="text-brand-accent" />
        </div>

        {/* Headline */}
        <h1
          className={`
            font-display font-bold text-white leading-none tracking-tight
            text-[clamp(3.5rem,12vw,9rem)]
            transition-all duration-700
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{ transitionDelay: "250ms" }}
        >
          McMaster
          <br />
          <span className="text-brand-accent">Biohacks</span>
        </h1>

        {/* Tagline */}
        <p
          className={`
            mt-6 text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed
            transition-all duration-700
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: "400ms" }}
        >
          Where biology meets engineering.
          <br />
          McMaster&apos;s first bioengineering hackathon.
        </p>

        {/* Pills */}
        <div
          className={`
            mt-6 flex flex-wrap justify-center gap-2
            transition-all duration-700
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
          style={{ transitionDelay: "550ms" }}
        >
          {["Open to All", "MLH Guidelines", "McMaster University", "First Edition"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-white/20 text-white/60 text-xs font-mono tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`
            mt-10 flex flex-col sm:flex-row items-center gap-4
            transition-all duration-700
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: "700ms" }}
        >
          <Link
            href="#interest-form"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-accent/20 border border-brand-accent/50 text-white font-display tracking-wide text-base hover:bg-brand-accent/35 hover:border-brand-accent/70 active:scale-95 transition-all backdrop-blur-sm"
          >
            <FlaskConical size={18} />
            Register Interest
          </Link>
          <Link
            href="#about-hackathon"
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors group"
          >
            Learn More
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/60" />
        <ArrowDown size={14} className="text-white animate-bounce" />
      </div>
    </section>
  );
}
