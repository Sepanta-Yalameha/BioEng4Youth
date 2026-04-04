import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ResearchArticles from "@/components/research-articles";

export const metadata: Metadata = {
  title: "Research — BioEng4Youth at McMaster",
  description:
    "Explore biomedical engineering research, articles, and insights from the BioEng4Youth community at McMaster University.",
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar mode="club" />

      {/* Hero */}
      <section className="bg-brand-primary pt-32 pb-20 relative overflow-hidden">
        {/* Decorative background icons */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <FlaskConical
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
            Research &amp; Insights
          </p>
          <h1 className="font-display font-bold text-white text-5xl sm:text-6xl tracking-tight leading-tight">
            Biomedical Engineering
            <br />
            Research
          </h1>
          <p className="mt-5 text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            Dive into the latest research, breakthroughs, and insights from
            our team exploring the intersection of biology and engineering
            at McMaster University.
          </p>
        </div>
      </section>

      <ResearchArticles />

      <Footer />
    </main>
  );
}
