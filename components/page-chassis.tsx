import Link from "next/link";

// ─── Mono ticker strip ─────────────────────────────────────────────────────
// Full-width dark band that scrolls slowly left. Reuses the `ticker` keyframe
// declared in tailwind.config.ts. Items are duplicated automatically so the
// 50% translateX in the keyframe produces a seamless loop.

interface TickerItem {
  text: string;
}

export function TickerStrip({
  items,
}: {
  items: TickerItem[];
}) {
  // Duplicate the items so the -50% translate creates a seamless loop.
  const doubled = [...items, ...items];
  return (
    <div
      className="w-full overflow-hidden bg-ink text-neuro-teal border-y border-neuro-teal/20"
      aria-hidden
    >
      <div className="ticker-content py-2 whitespace-nowrap font-mono text-[10px] tracking-[0.22em] uppercase">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4 opacity-90">
            <span className="text-neuro-teal">★</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Page hero ─────────────────────────────────────────────────────────────
// Eyebrow seal + sentence-case Space Grotesk headline (with the noun
// optionally accented), lede + stats two-column grid, CTA pair.

interface Stat {
  label: string;
  value: string;
}

interface CtaConfig {
  label: string;
  href: string;
  /** Render as a plain anchor with target="_blank" instead of a Next Link. Use for static assets / external URLs. */
  external?: boolean;
}

interface PageHeroProps {
  /** Mono eyebrow seal text, e.g. "01 / About BioEng4Youth" */
  eyebrow: string;
  /** ReactNode so callers can wrap the accented noun in `<span className="text-neuro-teal-deep">` */
  headline: React.ReactNode;
  /** Lede paragraph (Inter). */
  lede: string;
  /** Optional stats column (right-side rail). Hidden when empty. */
  stats?: Stat[];
  /** Optional primary CTA — solid ink bg, neuro-teal text. */
  primaryCta?: CtaConfig;
  /** Optional secondary CTA — outlined ink. */
  secondaryCta?: CtaConfig;
}

export function PageHero({
  eyebrow,
  headline,
  lede,
  stats,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  const hasStats = stats && stats.length > 0;
  return (
    <section className="bg-paper text-ink">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-20 pb-14">
        <div className="inline-flex items-center gap-2 border border-rule px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-neuro-teal-deep" />
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-ink/80">
            {eyebrow}
          </span>
        </div>

        <h1
          className="font-display font-bold leading-[0.9] tracking-[-0.025em] mt-6 max-w-4xl"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          {headline}
        </h1>

        <div
          className={`grid grid-cols-1 ${hasStats ? "lg:grid-cols-[1.1fr_1fr]" : ""} gap-12 mt-12`}
        >
          <p className="text-[15px] leading-[1.7] text-muted max-w-2xl">{lede}</p>

          {hasStats && (
            <dl className="border-t-2 border-ink pt-3">
              {stats!.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between py-2.5 border-b border-rule"
                >
                  <dt className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft">
                    {s.label}
                  </dt>
                  <dd className="font-display font-bold text-lg">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {primaryCta &&
              (primaryCta.external ? (
                <a
                  href={primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-neuro-teal font-display font-semibold text-sm hover:brightness-125 active:scale-[0.98] transition-all rounded-md"
                >
                  {primaryCta.label}
                </a>
              ) : (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-neuro-teal font-display font-semibold text-sm hover:brightness-125 active:scale-[0.98] transition-all rounded-md"
                >
                  {primaryCta.label}
                </Link>
              ))}
            {secondaryCta &&
              (secondaryCta.external ? (
                <a
                  href={secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-ink text-ink font-display font-medium text-sm hover:bg-ink hover:text-neuro-teal transition-all rounded-md"
                >
                  {secondaryCta.label} ↗
                </a>
              ) : (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-ink text-ink font-display font-medium text-sm hover:bg-ink hover:text-neuro-teal transition-all rounded-md"
                >
                  {secondaryCta.label} ↗
                </Link>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Section header ────────────────────────────────────────────────────────
// [chip] [title] ........ [chevron]
// Used between major content sections on every secondary page.

export function SectionHeader({
  index,
  title,
}: {
  /** Two-digit string, e.g. "02" */
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="bg-neuro-teal-deep text-ink px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] uppercase">
        {index}
      </span>
      <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.015em] text-ink">
        {title}
      </h2>
      <span className="ml-auto font-display font-light text-2xl text-muted-soft">→</span>
    </div>
  );
}

// ─── Section divider ───────────────────────────────────────────────────────
// Full-width 1px ink rule, used between major content sections.

export function SectionDivider() {
  return <div className="h-px w-full bg-rule" />;
}
