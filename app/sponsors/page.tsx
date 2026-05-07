import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  TickerStrip,
  PageHero,
  SectionHeader,
  SectionDivider,
} from "@/components/page-chassis";

export const metadata: Metadata = {
  title: "Sponsors — BioHacks",
  description:
    "Partner with BioHacks and connect with the next generation of bioengineers at McMaster University.",
};

const tiers = [
  {
    name: "Bronze",
    perks: ["Logo on website", "Social media mention", "Recognition at event"],
  },
  {
    name: "Silver",
    perks: [
      "All Bronze perks",
      "Logo on event materials",
      "Booth at event",
      "Judge / mentor opportunity",
    ],
  },
  {
    name: "Gold",
    featured: true,
    perks: [
      "All Silver perks",
      "Named prize category",
      "Featured social posts",
      "Banner at venue",
      "Direct access to participants",
    ],
  },
  {
    name: "Title",
    perks: [
      "All Gold perks",
      "Event co-branding",
      "Opening / closing remarks",
      "Premium logo placement",
      "Custom activation",
      "Dedicated sponsor page",
    ],
  },
];

const reasons = [
  {
    num: "01",
    title: "Reach motivated students",
    desc: "Connect directly with McMaster students in engineering, science, and health across all years.",
  },
  {
    num: "02",
    title: "Build your brand",
    desc: "Increase awareness among the next generation of bioengineering talent before they enter the workforce.",
  },
  {
    num: "03",
    title: "Support the ecosystem",
    desc: "Help grow Canada's bioengineering community and be part of something that matters.",
  },
];

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar mode="club" />

      <div className="pt-20">
        <TickerStrip
          items={[
            { text: "BioHacks · Fall 2026" },
            { text: "McMaster University" },
            { text: "Sponsor BioHacks" },
            { text: "Build the next generation" },
          ]}
        />
      </div>

      <PageHero
        eyebrow="01 / Sponsorship"
        headline={
          <>
            Partner with{" "}
            <span className="text-neuro-teal-deep">BioHacks</span>.
          </>
        }
        lede="Support McMaster's first bioengineering hackathon and connect with a community of driven, innovative students."
        primaryCta={{
          label: "Get in touch",
          href: "mailto:bioengineeringformcmaster@gmail.com",
        }}
      />

      <SectionDivider />

      {/* 02 — Why sponsor */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="02" title="Why sponsor" />

          <div className="divide-y divide-rule border-y border-rule">
            {reasons.map((r) => (
              <div
                key={r.num}
                className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr_1fr] gap-6 py-8 items-start"
              >
                <span className="font-mono text-[10px] tracking-[0.22em] text-muted-soft pt-1">
                  {r.num}
                </span>
                <h3
                  className="font-display font-bold text-ink leading-tight tracking-[-0.015em]"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
                >
                  {r.title}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed sm:col-start-3">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 03 — Tiers */}
      <section className="bg-paper-2">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeader index="03" title="Sponsorship tiers" />
            <p className="text-muted-soft text-sm font-mono max-w-xs sm:text-right">
              Pricing confirmed soon. Reach out to discuss a package.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-paper p-8 flex flex-col ${
                  tier.featured ? "ring-2 ring-inset ring-neuro-teal-deep" : ""
                }`}
              >
                {tier.featured && (
                  <span className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.22em] uppercase text-neuro-teal-deep border border-neuro-teal-deep/40 px-2 py-0.5">
                    Popular
                  </span>
                )}

                <p className="font-display font-bold text-ink text-2xl mb-1">
                  {tier.name}
                </p>
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft mb-8">
                  Price: TBD
                </p>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <span className="mt-2 w-1.5 h-1.5 bg-neuro-teal-deep shrink-0 rounded-sm" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:bioengineeringformcmaster@gmail.com"
                  className={`block text-center py-3 text-sm font-display font-semibold transition-all rounded-md border ${
                    tier.featured
                      ? "bg-neuro-teal-deep text-ink border-neuro-teal-deep hover:brightness-105"
                      : "border-rule text-muted hover:bg-ink hover:text-neuro-teal hover:border-ink"
                  }`}
                >
                  Inquire
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 04 — Current sponsors */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="04" title="Current sponsors" />

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-px bg-rule border border-rule">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-paper flex items-center justify-center hover:bg-paper-2 transition-colors"
              >
                <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft">
                  {`// SLOT ${String(i + 1).padStart(2, "0")}`}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="mailto:bioengineeringformcmaster@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-neuro-teal font-display font-semibold text-sm hover:brightness-125 transition-all rounded-md"
            >
              <Mail size={15} />
              Become a sponsor
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
