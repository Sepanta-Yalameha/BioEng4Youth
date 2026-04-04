import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ResearchArticles from "@/components/research-articles";

export const metadata: Metadata = {
  title: "Research — BioEng4Youth",
  description: "Biomedical engineering research and insights from the BioEng4Youth community.",
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar mode="club" />

      {/* Hero */}
      <section className="bg-[#0B1F26] pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
                Research &amp; Insights
              </p>
              <h1
                className="font-display font-bold text-white leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
              >
                Biomedical
                <br />
                <span style={{ color: "#70B389" }}>Engineering</span>
                <br />
                Research
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                Articles and insights from our team exploring the intersection
                of biology and engineering — written to inform and inspire.
              </p>
              <div className="mt-8 font-mono text-[10px] tracking-widest uppercase text-white/25">
                9 articles &nbsp;·&nbsp; 7 topics
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResearchArticles />

      <Footer />
    </main>
  );
}
