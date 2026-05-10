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
import { composeEmail } from "@/lib/email";

export const metadata: Metadata = {
  title: "Sponsors - BioHacks",
  description:
    "Partner with BioHacks and connect with the next generation of bioengineers at McMaster University.",
};

const tiers = [
  {
    name: "Tier 1",
    price: "From $750",
    perks: [
      "Logo on the BioHacks website",
      "1 representative at the networking event",
      "Logo placement at the bottom of the email banner",
      "Recognition at the closing ceremony",
    ],
  },
  {
    name: "Tier 2",
    price: "From $2,000",
    perks: [
      "Everything in Tier 1",
      "Up to 2 representatives at the networking event",
      "Logo placement in the middle of the email banner",
      "Custom project stream, co-designed with the sponsor",
      "Option to send judges",
    ],
  },
  {
    name: "Tier 3",
    price: "From $5,000",
    featured: true,
    perks: [
      "Everything in Tier 2",
      "Up to 7 representatives + a promo booth at the networking event",
      "Featured logo at the top of the email banner",
      "Promotional workshop slot during the event",
      "Option to send a keynote speaker",
      "Access to the participant resume bank for recruiting",
    ],
  },
];

const reasons = [
  {
    num: "01",
    title: "Reach motivated students",
    desc: "Connect directly with students in engineering, science, and health across McMaster and visiting institutions - at every year of study.",
  },
  {
    num: "02",
    title: "Build your brand",
    desc: "Increase awareness among the next generation of bioengineering and biotech talent before they enter the workforce.",
  },
  {
    num: "03",
    title: "Test your tools at scale",
    desc: "Hand participants your dataset, beta API, or platform and watch hundreds of motivated builders put it through its paces over a weekend.",
  },
];

const partnerships = [
  {
    title: "Custom challenge tracks",
    desc: "Sponsors can provide a proprietary dataset or a beta API and frame a problem around it. Hackers - including life-sci and science students who may be picking up code for the first time - build solutions on top of it. You get focused QA, a feedback corpus, and a real signal on how non-experts interact with your product.",
  },
  {
    title: "1:1 recruiter resume reviews",
    desc: "Send a couple of recruiters to run 1:1 resume critiques on the day of the event. Participants meet real industry recruiters; you build a top-of-funnel pipeline into the bioengineering and biotech roles you're hiring for. We'll market this hard - it drives serious sign-up traffic.",
  },
  {
    title: "Speakers, judges, workshops",
    desc: "Beyond the tier defaults, Tier 2 and Tier 3 sponsors can co-design how they show up: technical workshops, fireside chats, judging panels, or breakout sessions. Tell us what you'd want and we'll build the slot in.",
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
        lede="Support McMaster's first bioengineering hackathon and connect with a community of driven, interdisciplinary students. Funding tiers start at $750, and we're happy to design custom partnerships around what you want to get out of the event."
        primaryCta={{
          label: "Get in touch",
          href: composeEmail(
            "BioHacks sponsorship inquiry",
            "Hi BioEng4Youth team,\n\nI'm reaching out from [company] about sponsoring BioHacks. We're interested in:\n\n[ ] A specific tier ([Tier 1 / 2 / 3])\n[ ] A custom partnership (challenge track / recruiter access / workshop)\n[ ] Just learning more for now\n\nHappy to set up a quick call.\n\nThanks,\n[your name]"
          ),
          external: true,
        }}
      />

      <SectionDivider />

      {/* 02 - Why sponsor */}
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

      {/* 03 - Tiers */}
      <section className="bg-paper-2">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeader index="03" title="Sponsorship tiers" />
            <p className="text-muted-soft text-sm font-mono max-w-xs sm:text-right">
              Three tiers, plus space to design custom partnerships.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-paper p-8 flex flex-col ${
                  tier.featured ? "ring-2 ring-inset ring-neuro-teal-deep" : ""
                }`}
              >
                {tier.featured && (
                  <span className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.22em] uppercase text-neuro-teal-deep border border-neuro-teal-deep/40 px-2 py-0.5">
                    Recommended
                  </span>
                )}

                <p className="font-display font-bold text-ink text-2xl mb-1">
                  {tier.name}
                </p>
                <p className="font-display font-semibold text-ink text-lg leading-tight mb-8">
                  {tier.price}
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
                  href={composeEmail(
                    `BioHacks sponsorship - ${tier.name}`,
                    `Hi BioEng4Youth team,\n\nWe'd like to discuss the ${tier.name} sponsorship for BioHacks. Could we set up a call to walk through the perks and confirm details?\n\nThanks,\n[your name]\n[company]`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 text-sm font-display font-semibold transition-all rounded-md border ${
                    tier.featured
                      ? "bg-neuro-teal-deep text-ink border-neuro-teal-deep hover:brightness-105"
                      : "border-rule text-muted hover:bg-ink hover:text-neuro-teal hover:border-ink"
                  }`}
                >
                  Inquire about {tier.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 04 - Custom partnerships */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="04" title="Beyond the tiers" />
          <p className="text-[15px] leading-[1.7] text-muted max-w-3xl mb-14">
            The tiers above cover most partnerships. If you have something more
            specific in mind - a challenge track on your dataset, a recruiter
            booth, a flagship workshop - these are the formats we already plan
            to support, and we&apos;re happy to design something around them.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule">
            {partnerships.map((p, i) => (
              <div key={p.title} className="bg-paper p-7">
                <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-neuro-teal-deep mb-4 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display font-bold text-ink text-lg mb-3">
                  {p.title}
                </p>
                <p className="text-[13.5px] leading-relaxed text-muted">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 05 - Closing CTA */}
      <section className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 text-center">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-neuro-teal mb-5">
            Ready to talk?
          </p>
          <h3
            className="font-display font-bold text-white leading-tight tracking-[-0.02em] mb-6 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Let&apos;s build BioHacks together.
          </h3>
          <p className="text-white/55 text-[15px] leading-relaxed mb-8 max-w-xl mx-auto">
            Reach out and we&apos;ll walk you through the tiers, custom
            partnership options, and where your support fits the event best.
          </p>
          <a
            href={composeEmail(
              "BioHacks sponsorship inquiry",
              "Hi BioEng4Youth team,\n\nI'm interested in becoming a BioHacks sponsor. Could we set up a quick call to walk through the options?\n\nThanks,\n[your name]\n[company]"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neuro-teal text-ink font-display font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all rounded-md"
          >
            <Mail size={15} />
            Become a sponsor
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
