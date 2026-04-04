import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Sponsors — BioHacks",
  description: "Partner with BioHacks and connect with the next generation of bioengineers at the University of Toronto.",
};

const tiers = [
  {
    name: "Bronze",
    perks: ["Logo on website", "Social media mention", "Recognition at event"],
  },
  {
    name: "Silver",
    perks: ["All Bronze perks", "Logo on event materials", "Booth at event", "Judge / mentor opportunity"],
  },
  {
    name: "Gold",
    featured: true,
    perks: ["All Silver perks", "Named prize category", "Featured social posts", "Banner at venue", "Direct access to participants"],
  },
  {
    name: "Title",
    perks: ["All Gold perks", "Event co-branding", "Opening / closing remarks", "Premium logo placement", "Custom activation", "Dedicated sponsor page"],
  },
];

const reasons = [
  { num: "01", title: "Reach motivated students", desc: "Connect directly with UofT students in engineering, science, and health across all years." },
  { num: "02", title: "Build your brand", desc: "Increase awareness among the next generation of bioengineering talent before they enter the workforce." },
  { num: "03", title: "Support the ecosystem", desc: "Help grow Canada's bioengineering community and be part of something that matters." },
];

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar mode="club" />

      {/* Hero — editorial split, not centered */}
      <section className="bg-[#0B1F26] pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
                Sponsorship
              </p>
              <h1
                className="font-display font-bold text-white leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
              >
                Partner with
                <br />
                <span style={{ color: "#70B389" }}>BioHacks</span>
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-md">
                Support UofT&apos;s first bioengineering hackathon and connect
                with a community of driven, innovative students.
              </p>
              <a
                href="mailto:bioengineeringformcmaster@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#70B389] text-[#0B1F26] font-semibold text-sm hover:brightness-110 transition-all"
              >
                <Mail size={15} />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why sponsor — numbered list strips, not cards */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-12">
            Why Sponsor
          </p>
          <div className="divide-y divide-[#0B1F26]/8 border-y border-[#0B1F26]/8">
            {reasons.map((r) => (
              <div
                key={r.num}
                className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr_1fr] gap-6 py-8 items-start group"
              >
                <span className="font-mono text-[10px] tracking-widest text-[#0B1F26]/25 pt-1">{r.num}</span>
                <h3
                  className="font-display font-bold text-[#0B1F26] leading-tight"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
                >
                  {r.title}
                </h3>
                <p className="text-[#0B1F26]/55 text-base leading-relaxed sm:col-start-3">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers — bordered columns, no gradients */}
      <section className="py-24 bg-[#F6F9F8]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-3">Tiers</p>
              <h2
                className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Sponsorship tiers
              </h2>
            </div>
            <p className="text-[#0B1F26]/40 text-sm font-mono max-w-xs text-right">
              Pricing confirmed soon. Reach out to discuss a package.
            </p>
          </div>

          {/* Tier grid — bordered, no gradient */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0B1F26]/8 border border-[#0B1F26]/8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white p-8 flex flex-col ${tier.featured ? "ring-2 ring-inset ring-[#70B389]" : ""}`}
              >
                {tier.featured && (
                  <span className="absolute top-4 right-4 font-mono text-[9px] tracking-widest uppercase text-[#70B389] border border-[#70B389]/40 px-2 py-0.5">
                    Popular
                  </span>
                )}

                <p className="font-display font-bold text-[#0B1F26] text-2xl mb-1">{tier.name}</p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-[#0B1F26]/30 mb-8">Price: TBD</p>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm text-[#0B1F26]/65">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#70B389] shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:bioengineeringformcmaster@gmail.com"
                  className={`block text-center py-3 text-sm font-semibold transition-all border ${
                    tier.featured
                      ? "bg-[#70B389] text-[#0B1F26] border-[#70B389] hover:brightness-105"
                      : "border-[#0B1F26]/20 text-[#0B1F26]/70 hover:bg-[#0B1F26] hover:text-white hover:border-[#0B1F26]"
                  }`}
                >
                  Inquire
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current sponsors */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-3">Our Sponsors</p>
              <h2
                className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Current sponsors
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-px bg-[#0B1F26]/8 border border-[#0B1F26]/8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-white flex items-center justify-center group hover:bg-[#0B1F26]/3 transition-colors"
              >
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#0B1F26]/20">
                  Your Logo
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="mailto:bioengineeringformcmaster@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F26] text-white font-semibold text-sm hover:bg-[#135264] transition-all"
            >
              <Mail size={15} />
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
