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
  // The keyframe translates the strip by -50% of its own width, which only
  // looks seamless when one "copy" of the items already overflows the
  // viewport. With short item lists the strip would otherwise stop with
  // empty space on the right. Pad each copy out to ~6× the user-supplied
  // items so it's wider than any reasonable viewport.
  const oneCopy = Array.from({ length: 6 }, () => items).flat();
  const doubled = [...oneCopy, ...oneCopy];
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
  /** Render as a download anchor (`<a download>`). Use for same-origin static files (e.g. the sponsorship PDF). Takes precedence over `external`. */
  download?: boolean;
}

// Next.js `<Link>` is for in-app navigation and silently breaks `mailto:` and
// `tel:` hrefs in some browsers. Detect those protocols and force a plain `<a>`.
function isProtocolLink(href: string) {
  return /^(mailto:|tel:)/i.test(href);
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
  /** Optional primary CTA - solid ink bg, neuro-teal text. */
  primaryCta?: CtaConfig;
  /** Optional secondary CTA - outlined ink. */
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
            {primaryCta && (
              <CtaLink
                cta={primaryCta}
                className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-neuro-teal font-display font-semibold text-sm hover:brightness-125 active:scale-[0.98] transition-all rounded-md"
              />
            )}
            {secondaryCta && (
              <CtaLink
                cta={secondaryCta}
                className="inline-flex items-center gap-2 px-5 py-3 border border-ink text-ink font-display font-medium text-sm hover:bg-ink hover:text-neuro-teal transition-all rounded-md"
                trailingArrow
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// CTA link: routes mailto: / tel: / external URLs through a plain `<a>` and
// internal hrefs through Next's `<Link>`. Centralised so adding a new CTA
// can't accidentally drop a `mailto:` into Next's router (which won't open
// the user's email client).
function CtaLink({
  cta,
  className,
  trailingArrow,
}: {
  cta: CtaConfig;
  className: string;
  trailingArrow?: boolean;
}) {
  const labelNode = trailingArrow ? <>{cta.label} ↗</> : cta.label;
  if (cta.download) {
    return (
      <a href={cta.href} download className={className}>
        {labelNode}
      </a>
    );
  }
  if (cta.external || isProtocolLink(cta.href)) {
    return (
      <a
        href={cta.href}
        target={cta.external ? "_blank" : undefined}
        rel={cta.external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {labelNode}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={className}>
      {labelNode}
    </Link>
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
