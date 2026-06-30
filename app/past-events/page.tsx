import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PastEventsGrid from "@/components/past-events-grid";
import { TickerStrip, PageHero, SectionDivider } from "@/components/page-chassis";

export const metadata: Metadata = {
  title: "Past Events - BioEng4Youth",
  description: "Events hosted by BioEng4Youth at McMaster University.",
};

export default function PastEventsPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar mode="club" />

      <div className="pt-20">
        <TickerStrip
          items={[
            { text: "BioHacks · Fall 2026" },
            { text: "McMaster University" },
            { text: "Track record" },
            { text: "Real impact" },
          ]}
        />
      </div>

      <PageHero
        eyebrow="Track Record"
        headline={
          <>
            Events that{" "}
            <span className="text-neuro-teal-deep">shaped us</span>.
          </>
        }
        lede="From case competitions to hands-on workshops - a look at what we've built and who we've brought together."
      />

      <SectionDivider />

      <PastEventsGrid />

      <Footer />
    </main>
  );
}
