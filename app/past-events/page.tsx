import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PastEventsGrid from "@/components/past-events-grid";

export const metadata: Metadata = {
  title: "Past Events — BioEng4Youth at McMaster",
  description:
    "Explore previous events hosted by BioEng4Youth, including case competitions, workshops, and hackathons at McMaster University.",
};

export default function PastEventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar mode="club" />

      {/* Hero */}
      <section className="bg-brand-primary pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <CalendarDays
              key={i}
              size={100}
              className="absolute text-white"
              style={{
                top: `${(i * 23) % 100}%`,
                left: `${(i * 17 + 5) % 100}%`,
                opacity: 0.25,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-4">
            Our Track Record
          </p>
          <h1 className="font-display font-bold text-white text-5xl sm:text-6xl tracking-tight leading-tight">
            Past Events
          </h1>
          <p className="mt-5 text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            From case competitions to hands-on workshops, here&apos;s a look at
            the events that have shaped our community and advanced
            bioengineering education at McMaster.
          </p>
        </div>
      </section>

      <PastEventsGrid />

      <Footer />
    </main>
  );
}
