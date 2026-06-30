import { Fragment } from "react";
import type { Metadata } from "next";
import { Mail, Download } from "lucide-react";
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
    "Partner with BioHacks and connect with the next generation of bioengineers at McMaster University. Sponsorship tiers from $500.",
};

// Public path to the sponsorship package PDF (served from /public).
const PACKAGE_PDF = "/bioeng4youth-sponsorship-package.pdf";

// ─── Tier cards ──────────────────────────────────────────────────────────────
// Perks are derived from the detailed comparison matrix in the sponsorship
// package (page 6, treated as the source of truth). Tiers are cumulative, so
// each card leads with "Everything in <lower tier>" and lists only its deltas.

const tiers = [
  {
    name: "Bronze",
    price: "$500",
    perks: [
      "Limited resume bank access",
      "1 on-site recruiter",
      "Standard social media promotion",
      "Logo on website + event materials",
      "Closing ceremony recognition",
      "Participant analytics access",
    ],
  },
  {
    name: "Silver",
    price: "$1,000",
    perks: [
      "Everything in Bronze, plus:",
      "Full resume bank access",
      "Up to 2 on-site recruiters",
      "Standard networking booth",
      "Email banner + standard logo placement",
      "Judging & speaker opportunities",
    ],
  },
  {
    name: "Gold",
    price: "$2,000",
    featured: true,
    perks: [
      "Everything in Silver, plus:",
      "Up to 3 on-site recruiters",
      "Resume review sessions",
      "Large networking booth",
      "Featured social media + top logo & banner",
      "Host a workshop",
    ],
  },
  {
    name: "Platinum",
    price: "Inquire",
    perks: [
      "Everything in Gold, plus:",
      "Up to 4 on-site recruiters",
      "Custom challenge stream",
      "Keynote speaker slot",
      "Co-host level influence",
      "Custom add-ons upon inquiry",
    ],
  },
];

const reasons = [
  {
    num: "01",
    title: "Reach motivated students",
    desc: "Connect directly with Health Sciences, Engineering, and Business students from McMaster and visiting universities, at every year of study and already building toward careers in medicine, biotech, and engineering.",
  },
  {
    num: "02",
    title: "Put your brand in front of them",
    desc: "Featured social posts, prominent logo placement, and event branding keep you in front of the next generation of clinicians, engineers, and biotech founders, on our channels through the lead-up and on-site all weekend.",
  },
  {
    num: "03",
    title: "Back patient-centred work",
    desc: "Every team spends the weekend on a real, patient-centred case. Your support goes straight toward work aimed at improving how people are diagnosed, treated, and cared for.",
  },
];

// ─── Comparison matrix ───────────────────────────────────────────────────────
// `true` = included (dot), `false` = not included (–), string = qualifier.
// Columns map 1:1 to `tiers` above: [Bronze, Silver, Gold, Platinum].

type Cell = boolean | string;

const matrix: {
  group: string;
  rows: { label: string; cells: [Cell, Cell, Cell, Cell] }[];
}[] = [
  {
    group: "Recruiting",
    rows: [
      { label: "Resume bank access", cells: ["Limited", true, true, true] },
      { label: "On-site recruiters", cells: ["1", "Up to 2", "Up to 3", "Up to 4"] },
      { label: "Resume review sessions", cells: [false, false, true, true] },
    ],
  },
  {
    group: "Marketing",
    rows: [
      { label: "Logo on website", cells: ["Basic", "Standard", "Top", "Top"] },
      { label: "Email banner placement", cells: [false, "Bottom", "Top", "Top"] },
      {
        label: "Social media promotion",
        cells: ["Standard", "Standard", "Featured", "Featured"],
      },
      { label: "Closing ceremony recognition", cells: [true, true, true, true] },
      { label: "Branding on event materials", cells: [true, true, true, true] },
    ],
  },
  {
    group: "Technology & product",
    rows: [
      { label: "Custom challenge stream", cells: [false, false, false, "Inquire"] },
      { label: "Workshop hosting", cells: [false, false, true, true] },
    ],
  },
  {
    group: "Event presence",
    rows: [
      { label: "Networking booth", cells: [false, "Standard", "Large", "Large"] },
      { label: "Judging opportunity", cells: [false, true, true, true] },
      { label: "Speaker opportunity", cells: [false, true, true, "Keynote"] },
    ],
  },
  {
    group: "Special benefits",
    rows: [
      { label: "Participant analytics access", cells: [true, true, true, true] },
      { label: "Co-host level influence", cells: [false, false, false, "Inquire"] },
    ],
  },
];

function MatrixCell({ cell }: { cell: Cell }) {
  if (cell === true) {
    return (
      <span
        className="inline-block w-2 h-2 rounded-full bg-neuro-teal-deep"
        role="img"
        aria-label="Included"
      />
    );
  }
  if (cell === false || cell === "") {
    return (
      <span className="text-muted-soft" aria-label="Not included">
        –
      </span>
    );
  }
  return (
    <span className="text-[12.5px] font-medium text-ink whitespace-nowrap">
      {cell}
    </span>
  );
}

const partnerships = [
  {
    title: "Put your name on a track or prize",
    desc: "Lend your name to one of our competition tracks, like \"The [Company] Diagnostics Track,\" or fund a prize awarded in your name to a winning team. It's the most direct way to tie your brand to the work students will remember.",
  },
  {
    title: "Custom challenge stream",
    desc: "Platinum partners can hand teams a proprietary dataset or a beta API and frame a problem around it. Hackers, including science and health students picking up code for the first time, build solutions on top of it. You get focused QA, a feedback corpus, and real signal on how non-experts use your product.",
  },
  {
    title: "Judges, mentors, and workshops",
    desc: "Send judges to evaluate the final pitches, mentors to coach teams through the weekend, or run a technical workshop or fireside chat. Tell us what you'd like to share and we'll build the slot around it. Add-ons are available on inquiry.",
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
        eyebrow="Sponsorship"
        headline={
          <>
            Partner with{" "}
            <span className="text-neuro-teal-deep">BioHacks</span>.
          </>
        }
        lede="BioHacks brings Health Sciences, Engineering, and Business students together for two days of building around one real, patient-centred case. Sponsoring puts your brand in front of the people who will shape medicine and biotech next, and backs work aimed squarely at improving patient lives. Tiers start at $500, Platinum is fully custom, and we'll gladly build a partnership around exactly what you want from the weekend."
        primaryCta={{
          label: "Get in touch",
          href: composeEmail("BioHacks sponsorship inquiry"),
          external: true,
        }}
        secondaryCta={{
          label: "Download the package",
          href: PACKAGE_PDF,
          download: true,
        }}
      />

      {/* Impact line - one-line proof point to back the pitch */}
      <section className="bg-paper-2 border-y border-rule">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-neuro-teal-deep shrink-0">
            Track record
          </span>
          <p className="text-[14px] leading-relaxed text-muted">
            Our 2025 International Research Case Competition, on reimagining
            ultrasound for maternal health in rural communities, drew{" "}
            <span className="text-ink font-medium">100+ submissions</span>{" "}
            worldwide, with the{" "}
            <a
              href="https://doi.org/10.26685/urncst.1043"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink font-medium underline underline-offset-2 decoration-neuro-teal-deep/60 hover:decoration-ink transition-colors"
            >
              top 8 published in URNCST
            </a>
            .
          </p>
        </div>
      </section>

      {/* 02 - Why sponsor */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader title="Why sponsor" />

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
                <p className="text-muted text-[15px] leading-relaxed col-start-2 sm:col-start-3">
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
            <SectionHeader title="Sponsorship tiers" />
            <p className="text-muted-soft text-sm font-mono max-w-xs sm:text-right">
              Four tiers, plus space to design custom partnerships.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-paper p-7 flex flex-col ${
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
                <p className="font-display font-semibold text-ink text-lg leading-tight mb-8">
                  {tier.price}
                </p>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.perks.map((perk) => {
                    const isCumulative = perk.endsWith("plus:");
                    return (
                      <li
                        key={perk}
                        className={
                          isCumulative
                            ? "text-[13px] font-medium text-ink"
                            : "flex items-start gap-3 text-sm text-muted"
                        }
                      >
                        {!isCumulative && (
                          <span className="mt-2 w-1.5 h-1.5 bg-neuro-teal-deep shrink-0 rounded-sm" />
                        )}
                        {perk}
                      </li>
                    );
                  })}
                </ul>

                <a
                  href={composeEmail(`BioHacks sponsorship - ${tier.name}`)}
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

      {/* 04 - Full comparison matrix */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeader title="Compare every perk" />
            <p className="text-muted-soft text-sm font-mono max-w-xs sm:text-right">
              The full breakdown, tier by tier.
            </p>
          </div>

          <div className="overflow-x-auto border border-rule">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="bg-paper-2">
                  <th className="p-4 text-left align-bottom w-[34%]">
                    <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft">
                      Perk
                    </span>
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.name}
                      className={`p-4 text-center align-bottom ${
                        tier.featured ? "bg-neuro-teal-deep/[0.06]" : ""
                      }`}
                    >
                      <span className="block font-display font-bold text-ink text-base leading-none">
                        {tier.name}
                      </span>
                      <span className="block font-mono text-[11px] text-muted mt-1.5">
                        {tier.price}
                      </span>
                      {tier.featured && (
                        <span className="mt-2 inline-block font-mono text-[8px] tracking-[0.18em] uppercase text-neuro-teal-deep border border-neuro-teal-deep/40 px-1.5 py-0.5">
                          Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((group) => (
                  <Fragment key={group.group}>
                    <tr>
                      <th
                        colSpan={5}
                        className="text-left bg-ink/[0.03] border-t border-rule px-4 pt-5 pb-2"
                      >
                        <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-neuro-teal-deep">
                          {group.group}
                        </span>
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.label} className="border-t border-rule">
                        <th
                          scope="row"
                          className="text-left px-4 py-3.5 text-[13.5px] font-normal text-muted"
                        >
                          {row.label}
                        </th>
                        {row.cells.map((cell, i) => (
                          <td
                            key={i}
                            className={`px-4 py-3.5 text-center align-middle ${
                              tiers[i].featured
                                ? "bg-neuro-teal-deep/[0.06]"
                                : ""
                            }`}
                          >
                            <MatrixCell cell={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
                <tr className="border-t border-rule">
                  <th
                    scope="row"
                    className="text-left px-4 py-3.5 text-[13.5px] font-normal text-muted"
                  >
                    Add-ons
                  </th>
                  <td
                    colSpan={4}
                    className="px-4 py-3.5 text-center text-[12.5px] font-medium text-ink"
                  >
                    Available upon inquiry
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[13px] text-muted-soft">
            Prefer the printable version?{" "}
            <a
              href={PACKAGE_PDF}
              download
              className="text-neuro-teal-deep font-medium underline underline-offset-2 hover:text-ink transition-colors"
            >
              Download the full sponsorship package (PDF)
            </a>
            .
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* 05 - Custom partnerships */}
      <section className="bg-paper-2">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader title="Beyond the tiers" />
          <p className="text-[15px] leading-[1.7] text-muted max-w-3xl mb-14">
            The tiers above cover most partnerships. If you have something more
            specific in mind - a challenge stream on your dataset, a recruiter
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

      {/* 06 - Closing CTA */}
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
            Reach out and we&apos;ll shape a partnership around your goals: a
            named track, a custom challenge, judges and mentors, or a speaking
            slot. We&apos;ll show you exactly where your support lands, or you can
            grab the full package to share with your team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={composeEmail("BioHacks sponsorship inquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neuro-teal text-ink font-display font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all rounded-md"
            >
              <Mail size={15} />
              Become a sponsor
            </a>
            <a
              href={PACKAGE_PDF}
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 text-white font-display font-semibold text-sm hover:bg-white/10 active:scale-[0.97] transition-all rounded-md"
            >
              <Download size={15} />
              Download the package
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
