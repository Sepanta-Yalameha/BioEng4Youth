import type { Metadata } from "next";
import { Mail, TrendingUp, Users, Globe } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Sponsors — McMaster Biohacks",
  description: "Partner with McMaster Biohacks and connect with the next generation of bioengineers.",
};

const tiers = [
  {
    name: "Bronze",
    color: "#A36F3D",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    perks: [
      "Logo on website",
      "Social media mention",
      "Recognition at event",
    ],
  },
  {
    name: "Silver",
    color: "#6B7280",
    bg: "from-slate-50 to-gray-50",
    border: "border-slate-200",
    perks: [
      "All Bronze perks",
      "Logo on event materials",
      "Booth at event",
      "Judge / mentor opportunity",
    ],
  },
  {
    name: "Gold",
    color: "#B7941C",
    bg: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    perks: [
      "All Silver perks",
      "Named prize category",
      "Featured social media posts",
      "Banner placement at venue",
      "Direct access to participants",
    ],
    featured: true,
  },
  {
    name: "Title Sponsor",
    color: "#135264",
    bg: "from-teal-50 to-cyan-50",
    border: "border-brand-primary/30",
    perks: [
      "All Gold perks",
      "Event co-branding",
      "Opening / closing remarks",
      "Premium logo placement",
      "Custom activation opportunity",
      "Dedicated sponsor page",
    ],
  },
];

const reasons = [
  {
    icon: <Users size={22} />,
    title: "Reach motivated students",
    desc: "Connect directly with McMaster students in engineering, science, and adjacent fields.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Build your brand",
    desc: "Increase awareness among the next generation of bioengineering talent before they enter the workforce.",
  },
  {
    icon: <Globe size={22} />,
    title: "Support the ecosystem",
    desc: "Help grow Canada's bioengineering community and be part of something that matters.",
  },
];

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar mode="club" />

      {/* Hero */}
      <section className="bg-brand-primary pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-4">
            Sponsorship
          </p>
          <h1 className="font-display font-bold text-white text-5xl sm:text-6xl tracking-tight leading-tight">
            Partner with
            <br />
            McMaster Biohacks
          </h1>
          <p className="mt-5 text-white/60 text-xl max-w-xl mx-auto leading-relaxed">
            Support McMaster&apos;s first bioengineering hackathon and connect
            with our community of driven, innovative students.
          </p>
          <a
            href="mailto:bioengineeringformcmaster@gmail.com"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-brand-text font-semibold hover:brightness-110 transition-all"
          >
            <Mail size={16} />
            Get in Touch
          </a>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-3">
              Why Sponsor
            </p>
            <h2 className="font-display font-bold text-brand-text text-4xl sm:text-5xl leading-tight tracking-tight">
              Why it matters
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="p-7 rounded-3xl border border-brand-primary/10 bg-brand-primary/3 hover:border-brand-accent/30 hover:-translate-y-1 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-all mb-4">
                  {r.icon}
                </div>
                <h3 className="font-display font-semibold text-brand-text mb-2">{r.title}</h3>
                <p className="text-brand-text/50 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 bg-[#f7fafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-3">
              Tiers
            </p>
            <h2 className="font-display font-bold text-brand-text text-4xl sm:text-5xl leading-tight tracking-tight">
              Sponsorship tiers
            </h2>
            <p className="mt-3 text-brand-text/50">
              Pricing will be confirmed soon. Reach out to discuss a package that works for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 rounded-3xl border bg-gradient-to-br ${tier.bg} ${tier.border} ${
                  tier.featured ? "ring-2 ring-brand-accent shadow-lg shadow-brand-accent/10" : ""
                } flex flex-col`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-brand-accent text-brand-text text-xs font-mono tracking-widest uppercase font-bold">
                      Popular
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <div
                    className="inline-flex px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase font-bold text-white mb-3"
                    style={{ backgroundColor: tier.color }}
                  >
                    {tier.name}
                  </div>
                  <p className="text-brand-text/50 text-sm font-mono">Price: TBD</p>
                </div>

                <ul className="space-y-2 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-brand-text/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:bioengineeringformcmaster@gmail.com"
                  className="mt-6 block text-center py-2.5 rounded-xl border-2 text-sm font-semibold transition-all hover:bg-brand-primary hover:text-white hover:border-brand-primary"
                  style={{ borderColor: tier.color, color: tier.color }}
                >
                  Inquire
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current sponsors placeholder */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-3">
              Our Sponsors
            </p>
            <h2 className="font-display font-bold text-brand-text text-4xl leading-tight tracking-tight">
              Current sponsors
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-2xl border-2 border-dashed border-brand-primary/15 flex items-center justify-center bg-brand-primary/3"
              >
                <span className="text-brand-text/25 text-xs font-mono text-center px-2">
                  Your Logo
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="mailto:bioengineeringformcmaster@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-secondary transition-all"
            >
              <Mail size={16} />
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
