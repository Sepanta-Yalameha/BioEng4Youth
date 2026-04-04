import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PastEventsGrid from "@/components/past-events-grid";

export const metadata: Metadata = {
  title: "Past Events — BioEng4Youth",
  description: "Events hosted by BioEng4Youth at the University of Toronto.",
};

export default function PastEventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar mode="club" />

      {/* Hero — large type, no decorative icon tiling */}
      <section className="bg-[#0B1F26] pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
            Track Record
          </p>
          <h1
            className="font-display font-bold text-white leading-[0.92] tracking-tight max-w-2xl"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
          >
            Events that
            <br />
            <span style={{ color: "#70B389" }}>shaped us.</span>
          </h1>
          <p className="mt-8 text-white/50 text-lg leading-relaxed max-w-lg">
            From case competitions to hands-on workshops — a look at
            what we&apos;ve built and who we&apos;ve brought together.
          </p>
        </div>
      </section>

      <PastEventsGrid />

      <Footer />
    </main>
  );
}
