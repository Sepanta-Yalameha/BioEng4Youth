import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ResearchArticles from "@/components/research-articles";
import { TickerStrip, PageHero, SectionDivider } from "@/components/page-chassis";

export const metadata: Metadata = {
  title: "Research - BioEng4Youth",
  description:
    "Biomedical engineering research and insights from the BioEng4Youth community.",
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar mode="club" />

      <div className="pt-20">
        <TickerStrip
          items={[
            { text: "BioHacks · Fall 2026" },
            { text: "McMaster University" },
            { text: "Research & insight" },
            { text: "Biomedical engineering" },
          ]}
        />
      </div>

      <PageHero
        eyebrow="01 / Research & Insights"
        headline={
          <>
            Biomedical
            <br />
            engineering{" "}
            <span className="text-neuro-teal-deep">research</span>.
          </>
        }
        lede="Articles and insights from our team exploring the intersection of biology and engineering - written to inform and inspire."
      />

      <SectionDivider />

      <ResearchArticles />

      <Footer />
    </main>
  );
}
