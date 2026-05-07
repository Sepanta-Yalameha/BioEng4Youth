# BioEng4Youth Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the entire BioEng4Youth marketing site to MLH-tier polish — new tokens (white + ink + neon teal), new typography (Space Grotesk + Inter + JetBrains Mono), shared navbar/footer refresh, four secondary pages rebuilt on a unified chassis, the home scroll experience repainted in the new fonts (preserving its hijacked-scroll mechanics) — and roll in the UofT → McMaster + Fall 2026 + real-roster-numbers content sweep.

**Architecture:** Token swap cascades through `next/font/google` variables and CSS custom properties, so component-level font changes are mostly free. New `components/page-chassis.tsx` exports four presentational primitives (`TickerStrip`, `PageHero`, `SectionHeader`, `SectionDivider`) that every secondary page composes. The scroll-experience canvas + hijack hook are not modified — only the phase-overlay components change.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, `next/font/google`, shadcn/ui (already installed but only `accordion.tsx` is used), Lucide icons (`^0.577.0` — pinned, do NOT bump), Puppeteer (existing `screenshot.mjs`) and/or Playwright CLI (user-installed) for visual QA.

**Spec:** See `docs/superpowers/specs/2026-05-07-bioeng4youth-redesign-design.md`.

**Out-of-scope reminders:** Do not modify `hooks/use-scroll-animation.ts`, `components/scroll-experience.tsx`, `components/scroll-landing.tsx`, `components/loading-screen.tsx`, `components/phase-overlay.tsx`, `public/frames/*`, or `screenshot.mjs`. Do not touch `components/faq-section.tsx` (it's untracked WIP).

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/layout.tsx` | Modify | Swap font imports + variable wiring; fix metadata copy. |
| `app/globals.css` | Modify | Replace `:root` palette + HSL tokens; keep `body.scroll-locked`, `#scroll-bar`, `.glass-dark`, ticker keyframe. |
| `tailwind.config.ts` | Modify | Retire `brand.*`; add new design tokens; keep keyframes/animations. |
| `components/page-chassis.tsx` | **Create** | Export `TickerStrip`, `PageHero`, `SectionHeader`, `SectionDivider`. |
| `components/navbar.tsx` | Modify | Type swap, active-state restyle, eyebrow-mode copy. |
| `components/footer.tsx` | Modify | Token + type refresh; gradient bar; UofT → McMaster copy. |
| `components/hero-phase.tsx` | Modify | Sentence-case headline rendering; new fonts via existing CSS vars; eyebrow → McMaster. |
| `components/about-phase.tsx` | Modify | Violet → teal accent; new fonts via existing CSS vars. |
| `components/details-phase.tsx` | Modify | "Coming Soon" → "Fall 2026"; "University of Toronto" → "McMaster University"; new fonts. |
| `components/interest-form-scroll.tsx` | Modify | Visual restyle only (no logic change); new fonts via existing CSS vars; nothing in the form-submission/`UNIVERSITY_OPTIONS`/validation logic moves. |
| `app/about/page.tsx` | Modify | Full restructure to chassis. |
| `app/research/page.tsx` | Modify | Full restructure to chassis. |
| `components/research-articles.tsx` | Modify | Restyle the article-row strip with new tokens. |
| `app/past-events/page.tsx` | Modify | Full restructure to chassis. |
| `components/past-events-grid.tsx` | Modify | Restyle the featured-event card with new tokens; keep real metrics. |
| `app/sponsors/page.tsx` | Modify | Full restructure to chassis. |

**Verification cadence:** after each task — `npm run lint`, `npm run build` (or `npm run dev` and visit the affected page), screenshot via `node screenshot.mjs <url> <label>` (existing Puppeteer helper) or Playwright if installed, then commit.

---

## Task 1: Swap typography in `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace the font imports and variable wiring.**

Replace the entire contents of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display — geometric grotesque, sentence-case-friendly, more distinctive than the
// overused Bebas Neue. Used for headlines and section titles.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

// Body — neutral grotesque, broad weight range, reads cleanly at every size.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Mono — engineered terminal labels, eyebrows, ticker copy, data values.
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "BioHacks — BioEng4Youth",
  description:
    "BioEng4Youth's bioengineering hackathon at McMaster University. Apply your science or engineering knowledge to a real neurological health challenge.",
  openGraph: {
    title: "BioHacks by BioEng4Youth",
    description: "Where science meets engineering. One neuro case. Infinite solutions.",
    siteName: "BioHacks",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify the dev server compiles and fonts load.**

Run: `npm run dev`
Visit `http://localhost:3000`. The text on the scroll page will look different (Space Grotesk instead of Bebas Neue) — that's expected. Open DevTools → Network → filter Fonts and confirm the three Google Font requests for Space Grotesk / Inter / JetBrains Mono.

Expected: dev server starts on port 3000, the home page renders with the new fonts, no console errors about missing font variables.

- [ ] **Step 3: Run lint and build.**

Run: `npm run lint && npm run build`
Expected: lint clean; build succeeds.

- [ ] **Step 4: Commit.**

```bash
git add app/layout.tsx
git commit -m "Redesign: swap fonts to Space Grotesk + Inter + JetBrains Mono

Replaces Bebas Neue + Barlow Semi Condensed + Share Tech Mono in the
next/font/google import. CSS variable names (--font-display, --font-sans,
--font-mono) are preserved so component-level styles cascade automatically.

Also updates the metadata description from \"University of Toronto\" to
\"McMaster University\" per the spec content sweep."
```

---

## Task 2: Replace design tokens in `app/globals.css`

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `:root` and base layer with the new tokens.**

Replace the entire contents of `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Site-wide design tokens ───────────────────────────────────────────── */
:root {
  /* Light surface (secondary pages) */
  --paper: #ffffff;
  --paper-2: #f6f7f9;
  --ink: #0b0f18;
  --rule: rgba(11, 15, 24, 0.10);
  --muted: rgba(11, 15, 24, 0.60);
  --muted-soft: rgba(11, 15, 24, 0.40);

  /* Accent */
  --neuro-teal: #00e5cc;       /* on dark surfaces only */
  --neuro-teal-deep: #00b89e;  /* light-bg-safe (passes WCAG AA on white) */

  /* Scroll experience surface */
  --void: #060810;
  --ivory: #e8e4dc;
}

/* Scroll landing locks the body when the experience is mounted */
body.scroll-locked {
  overflow: hidden;
}

/* Scroll progress bar (managed inline by ScrollExperience) */
#scroll-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 1.5px;
  background: var(--neuro-teal);
  z-index: 200;
}

/* shadcn/ui HSL tokens — kept but re-mapped to the new palette */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 36% 7%;        /* matches --ink */
    --card: 0 0% 100%;
    --card-foreground: 222 36% 7%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 36% 7%;
    --primary: 222 36% 7%;
    --primary-foreground: 0 0% 100%;
    --secondary: 222 18% 96%;
    --secondary-foreground: 222 36% 7%;
    --muted: 222 18% 96%;
    --muted-foreground: 222 12% 45%;
    --accent: 173 100% 36%;          /* matches --neuro-teal-deep */
    --accent-foreground: 222 36% 7%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 222 14% 91%;
    --input: 222 14% 91%;
    --ring: 173 100% 36%;
    --radius: 0.5rem;
  }

  * {
    @apply border-border;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--font-sans), system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display), system-ui, sans-serif;
    letter-spacing: -0.02em;
  }
}

/* ── Utilities ─────────────────────────────────────────────────────────── */
@layer utilities {
  .text-balance { text-wrap: balance; }

  .font-display { font-family: var(--font-display), system-ui, sans-serif; }
  .font-mono-brand { font-family: var(--font-mono), ui-monospace, monospace; }

  /* Used by the scroll-page phase overlays — kept intact */
  .glass {
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .glass-dark {
    background: rgba(4, 5, 14, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
}

/* ── Ticker animation (used by the new TickerStrip and the existing
       reduced-motion guard) ─────────────────────────────────────────────── */
.ticker-content {
  display: inline-flex;
  animation: ticker 28s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .ticker-content {
    animation: none;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify build still passes.**

Run: `npm run build`
Expected: build succeeds. shadcn HSL tokens still reference the same names so `accordion.tsx` keeps rendering.

- [ ] **Step 3: Commit.**

```bash
git add app/globals.css
git commit -m "Redesign: replace globals.css palette tokens

Introduces the redesign palette (--paper, --ink, --neuro-teal,
--neuro-teal-deep, --rule, --muted) and remaps the shadcn HSL tokens
to match. Body now uses var(--paper) + var(--ink) directly and headings
get tighter -0.02em tracking by default. Keeps .glass / .glass-dark
(scroll-page phase overlays) and the ticker animation intact."
```

---

## Task 3: Update `tailwind.config.ts`

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace `tailwind.config.ts`.**

Replace the entire contents with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // ── Redesign tokens ────────────────────────────────────────────
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        rule: "var(--rule)",
        muted: "var(--muted)",
        "muted-soft": "var(--muted-soft)",
        "neuro-teal": "var(--neuro-teal)",
        "neuro-teal-deep": "var(--neuro-teal-deep)",
        void: "var(--void)",
        ivory: "var(--ivory)",

        // ── shadcn HSL tokens (kept; remapped in globals.css) ──────────
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        ticker: "ticker 28s linear infinite",
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

- [ ] **Step 2: Sweep the codebase for retired `brand.*` Tailwind classes.**

Run:

```bash
grep -rn "brand-primary\|brand-accent\|brand-text\|brand-secondary\|brand-bg\|colors\.brand\|theme\.extend\.colors\.brand" \
  app components hooks lib
```

Expected hits to fix in later tasks (`navbar.tsx`, `footer.tsx`, secondary page files). For Task 3 the goal is just to surface them — don't fix yet; they'll all be rewritten in their per-component tasks.

If `npm run build` is run before those tasks ship, the `brand-*` references will resolve to nothing (Tailwind silently drops them). That's acceptable inside this redesign because every file containing them is being rewritten in Tasks 4–11.

- [ ] **Step 3: Run lint + build.**

Run: `npm run lint && npm run build`
Expected: build succeeds. The site will look broken on `/about`, `/research`, `/past-events`, `/sponsors`, the navbar, and the footer until those tasks land — that's expected.

- [ ] **Step 4: Commit.**

```bash
git add tailwind.config.ts
git commit -m "Redesign: retire brand.* tokens; add new design tokens

Drops brand.primary / brand.accent / brand.text / brand.secondary /
brand.bg from theme.extend.colors. Adds paper / paper-2 / ink / rule /
muted / muted-soft / neuro-teal / neuro-teal-deep / void / ivory backed
by CSS variables. shadcn HSL tokens unchanged. Existing keyframes
(ticker, fade-in-up, fade-in, float, accordion-*) all preserved."
```

---

## Task 4: Build the page-chassis primitives

**Files:**
- Create: `components/page-chassis.tsx`

- [ ] **Step 1: Create the file with all four primitives.**

Write `components/page-chassis.tsx`:

```tsx
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
  primaryCta?: { label: string; href: string };
  /** Optional secondary CTA — outlined ink. */
  secondaryCta?: { label: string; href: string };
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
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-neuro-teal font-display font-semibold text-sm hover:brightness-125 active:scale-[0.98] transition-all rounded-md"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 px-5 py-3 border border-ink text-ink font-display font-medium text-sm hover:bg-ink hover:text-neuro-teal transition-all rounded-md"
              >
                {secondaryCta.label} ↗
              </Link>
            )}
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
```

- [ ] **Step 2: Verify the file type-checks.**

Run: `npm run build`
Expected: build succeeds. The new file is exported but not yet imported anywhere — that's fine.

- [ ] **Step 3: Commit.**

```bash
git add components/page-chassis.tsx
git commit -m "Redesign: add page-chassis primitives

Adds TickerStrip / PageHero / SectionHeader / SectionDivider — the
shared chassis the four secondary pages will compose. Pure
presentational, no state. TickerStrip duplicates its items array
internally so the existing -50% ticker keyframe loops seamlessly."
```

---

## Task 5: Restyle the navbar

**Files:**
- Modify: `components/navbar.tsx`

- [ ] **Step 1: Replace `components/navbar.tsx`.**

Replace the entire contents with:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  mode?: "hackathon" | "club";
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/past-events", label: "Past Events" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function Navbar({ mode = "hackathon" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleRegisterInterestClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("biohacks:jumpToPhase", { detail: "form" })
      );
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50">
        <nav className="flex items-center justify-between px-2 py-2 rounded-full bg-ink/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
          {/* Left — logo lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 pl-1 pr-4 group shrink-0"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-neuro-teal/50 group-hover:ring-neuro-teal shadow-md shadow-black/30 transition-all">
              <Image
                src="/be4y-logo.png"
                alt="BioEng4Youth"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="block text-white font-display font-semibold text-sm tracking-[0.005em]">
                {mode === "hackathon" ? "McMaster Biohacks" : "BioEng4Youth"}
              </span>
              <span className="block text-white/40 text-[9px] font-mono tracking-[0.22em] uppercase mt-0.5">
                {mode === "hackathon" ? "by BioEng4Youth · Fall 2026" : "Student-led nonprofit"}
              </span>
            </div>
          </Link>

          {/* Center — links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-sans transition-all",
                    active
                      ? "bg-neuro-teal-deep/22 text-neuro-teal ring-1 ring-neuro-teal-deep/45"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right — CTA + mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/#form"
              onClick={handleRegisterInterestClick}
              className="hidden md:block px-4 py-2 rounded-full bg-neuro-teal text-ink text-sm font-display font-semibold hover:brightness-110 active:scale-95 transition-all"
            >
              Register Interest
            </Link>
            <button
              className="md:hidden text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 rounded-2xl bg-ink/92 backdrop-blur-xl border border-white/10 shadow-2xl p-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-sans transition-all",
                pathname === link.href
                  ? "bg-neuro-teal-deep/22 text-neuro-teal ring-1 ring-neuro-teal-deep/45"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#form"
            onClick={handleRegisterInterestClick}
            className="mt-1 px-4 py-3 rounded-xl bg-neuro-teal text-ink text-sm font-display font-semibold text-center hover:brightness-110 transition-all"
          >
            Register Interest
          </Link>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Visual smoke test.**

Run: `npm run dev`
Visit `http://localhost:3000`. Confirm:
- The pill renders at top with `bg-ink/85` (very dark, almost black)
- Logo lockup shows "McMaster Biohacks" + "by BioEng4Youth · Fall 2026" eyebrow in mono
- Hovering a link gives a soft white wash; visiting `/about` shows the active link with the teal-deep ring

- [ ] **Step 3: Commit.**

```bash
git add components/navbar.tsx
git commit -m "Redesign: refresh navbar tokens and active state

Swaps brand.* classes for the new tokens (ink, neuro-teal,
neuro-teal-deep). Active link state changes from green-tint to
teal-deep ring + soft fill. CTA button uses solid neuro-teal on ink.
Eyebrow line below the brand name is now always shown and contains
\"by BioEng4Youth · Fall 2026\" (hackathon) or \"Student-led nonprofit\"
(club). Logo ring picks up the teal accent."
```

---

## Task 6: Restyle the footer

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Step 1: Replace `components/footer.tsx`.**

Replace the entire contents with:

```tsx
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/past-events", label: "Past Events" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Top accent — echoes the scroll-page progress bar */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--neuro-teal), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-12 lg:gap-24">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/15">
                <Image
                  src="/be4y-logo.png"
                  alt="BioEng4Youth"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm leading-tight">
                  BioHacks
                </p>
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/35 mt-0.5">
                  by BioEng4Youth · McMaster · Fall 2026
                </p>
              </div>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              McMaster&apos;s bioengineering hackathon. Where science meets engineering.
            </p>
            <a
              href="mailto:bioengineeringformcmaster@gmail.com"
              className="inline-flex items-center gap-2 mt-6 text-neuro-teal text-sm font-medium hover:text-white transition-colors"
            >
              <Mail size={14} />
              bioengineeringformcmaster@gmail.com
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/30 mb-5">
              Pages
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/55 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/30 mb-5">
              Get Involved
            </p>
            <div className="space-y-3">
              <Link
                href="/#form"
                className="block px-5 py-2.5 bg-neuro-teal text-ink text-sm font-display font-semibold text-center hover:brightness-110 transition-all rounded-md"
              >
                Register Interest
              </Link>
              <Link
                href="/sponsors"
                className="block px-5 py-2.5 border border-white/15 text-white/65 text-sm font-display font-medium text-center hover:border-white/35 hover:text-white transition-all rounded-md"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] text-white/25">
            © {new Date().getFullYear()} BioHacks · BioEng4Youth
          </p>
          <p className="font-mono text-[9px] text-white/20">
            Open to all · McMaster University
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Visual smoke test.**

Run: `npm run dev`
Visit `http://localhost:3000/about` (any page that mounts the footer). Confirm:
- A 1px gradient bar runs across the top of the footer (transparent → teal → transparent)
- "by BioEng4Youth · McMaster · Fall 2026" appears under the BioHacks lockup in mono
- The "Open to all" line says McMaster University, not UofT
- The two CTA buttons stack with rounded corners; the primary one is teal on ink

- [ ] **Step 3: Commit.**

```bash
git add components/footer.tsx
git commit -m "Redesign: refresh footer tokens, type, and copy

Applies the new tokens (bg-ink, text-neuro-teal, etc.) and Inter / Space
Grotesk / JetBrains Mono. Replaces the static green accent bar with a
horizontal gradient that echoes the scroll-page progress bar. Updates
copy to McMaster + Fall 2026."
```

---

## Task 7: Restyle the home scroll page phase overlays

**Files:**
- Modify: `components/hero-phase.tsx`
- Modify: `components/about-phase.tsx`
- Modify: `components/details-phase.tsx`
- Modify: `components/interest-form-scroll.tsx`

The font swap cascades automatically through the existing `var(--font-display)` / `var(--font-sans)` / `var(--font-mono)` references. Component-level changes are: tighten letter-spacing where Bebas Neue's wide tracking was tuned in, retire `--neuro-violet`, fix UofT/timing copy.

- [ ] **Step 1: Update `components/hero-phase.tsx`.**

Replace the entire contents with:

```tsx
export default function HeroPhase() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
      <div
        className="text-[10px] tracking-[0.5em] uppercase mb-8"
        style={{ fontFamily: "var(--font-mono)", color: "#00e5cc" }}
      >
        BioEng4Youth &nbsp;&mdash;&nbsp; McMaster University
      </div>

      <h1
        className="font-bold leading-none mb-6"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 13vw, 10rem)",
          color: "#e8e4dc",
          letterSpacing: "-0.045em",
        }}
      >
        Bio<span style={{ color: "#00e5cc" }}>Hacks</span>
      </h1>

      <p
        className="font-light text-base max-w-xs mx-auto leading-loose tracking-wide"
        style={{ fontFamily: "var(--font-sans)", color: "rgba(232,228,220,0.7)" }}
      >
        Where science meets engineering.<br />
        One neuro case. Infinite solutions.
      </p>

      <div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.3 }}
      >
        <div
          className="text-[9px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "#e8e4dc" }}
        >
          Scroll
        </div>
        <div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
          }}
        />
      </div>
    </div>
  );
}
```

The two real changes: eyebrow now reads "McMaster University" (not "University of Toronto") and the headline tracking goes from `-0.03em` (tuned for Bebas Neue's narrower letterforms) to `-0.045em` (Space Grotesk needs tighter tracking at this scale to keep the impact).

- [ ] **Step 2: Update `components/about-phase.tsx`.**

Replace the entire contents with:

```tsx
export default function AboutPhase() {
  return (
    <div className="w-full h-full flex items-center">
      <div
        className="ml-[8vw] max-w-[480px] p-10"
        style={{
          background: "rgba(4, 5, 14, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <div
          className="text-[11px] tracking-[0.45em] uppercase mb-6"
          style={{ fontFamily: "var(--font-mono)", color: "#00e5cc" }}
        >
          01 &nbsp;/&nbsp; What is BioHacks
        </div>

        <h2
          className="font-bold leading-tight mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            color: "#e8e4dc",
            letterSpacing: "-0.025em",
          }}
        >
          One case.{" "}
          <span style={{ color: "#00e5cc" }}>Two streams.</span>
          <br />
          Unlimited impact.
        </h2>

        <p
          className="font-normal text-base leading-loose"
          style={{ fontFamily: "var(--font-sans)", color: "#e8e4dc" }}
        >
          BioHacks challenges science and engineering students
          to collaborate on a real neurological health case —
          no prior experience required, just curiosity and drive.
        </p>

        <div className="mt-8 w-16 h-px" style={{ background: "#00e5cc" }} />
      </div>
    </div>
  );
}
```

Real change: violet `#a78bfa` → teal `#00e5cc` on the "Two streams." span; tracking widened from `-0.02em` to `-0.025em` for Space Grotesk metrics.

- [ ] **Step 3: Update `components/details-phase.tsx`.**

Replace the entire contents with:

```tsx
export default function DetailsPhase() {
  return (
    <div className="w-full h-full flex items-center justify-end">
      <div
        className="mr-[8vw] max-w-[400px] w-full p-10"
        style={{
          background: "rgba(4, 5, 14, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <div
          className="text-[11px] tracking-[0.45em] uppercase mb-6"
          style={{ fontFamily: "var(--font-mono)", color: "#00e5cc" }}
        >
          02 &nbsp;/&nbsp; The Details
        </div>

        <div className="space-y-6">
          <Row label="Where">
            <span
              className="font-bold text-2xl"
              style={{ fontFamily: "var(--font-display)", color: "#e8e4dc" }}
            >
              McMaster University
            </span>
          </Row>

          <Row label="When">
            <span
              className="font-bold text-2xl"
              style={{ fontFamily: "var(--font-display)", color: "#e8e4dc" }}
            >
              Fall 2026
            </span>
          </Row>

          <Row label="The Challenge">
            <p
              className="font-normal text-base leading-relaxed mt-1"
              style={{ fontFamily: "var(--font-sans)", color: "#e8e4dc" }}
            >
              A live neuro health case — revealed at the event.
              Your team diagnoses, engineers, and presents a solution.
            </p>
          </Row>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        className="text-[10px] tracking-[0.4em] uppercase mb-2"
        style={{ fontFamily: "var(--font-mono)", color: "rgba(200,205,215,0.7)" }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
```

Real changes: Where = McMaster University (was UofT), When = Fall 2026 (was "Coming Soon").

- [ ] **Step 4: Update `components/interest-form-scroll.tsx`.**

The Google Forms submission logic, `UNIVERSITY_OPTIONS`, validation, and `Field` helper are all preserved verbatim. The only edits are typography — and they cascade automatically through the `var(--font-display) / var(--font-sans) / var(--font-mono)` references already in the file. **No changes are required to this file in Task 7** — verify it visually instead.

Open `http://localhost:3000` in dev mode, scroll to the form phase, confirm:
- Inputs render in Inter (not Barlow Semi Condensed)
- Eyebrow + labels render in JetBrains Mono (not Share Tech Mono)
- "Count Me In" headline renders in Space Grotesk (not Bebas Neue)
- Submit button reads "Submit Interest" in Inter
- Submit + validation still work end-to-end (you can test with a fake email — the form posts no-cors to Google so the result is fire-and-forget)

If "Count Me In" looks too tightly tracked in Space Grotesk (Bebas's `-0.02em` was generous; Space Grotesk's same value reads tight at 2rem), open the file and change line 190 from `letterSpacing: "-0.02em"` to `letterSpacing: "-0.025em"`. Same edit at the success-card headline (line 148). These are the only two lines that may need a tracking touch-up.

- [ ] **Step 5: Visual smoke test the entire scroll experience.**

Run: `npm run dev`
Visit `http://localhost:3000`. Scroll all the way through. Confirm:
- 145 frames preload (loading screen completes)
- Hero shows "BioHacks" with "Hacks" in teal, eyebrow says "McMaster University"
- Scrolling 25% advances to the About phase, no violet anywhere
- Scrolling further advances to the Details phase showing "McMaster University" / "Fall 2026"
- Scrolling further advances to the Form phase
- Frame count and phase dots still increment correctly
- The navbar "Register Interest" button still jumps to the form phase

- [ ] **Step 6: Commit.**

```bash
git add components/hero-phase.tsx components/about-phase.tsx components/details-phase.tsx
# Only add interest-form-scroll.tsx if you tweaked tracking values:
# git add components/interest-form-scroll.tsx
git commit -m "Redesign: repaint scroll phase overlays in new tokens

Updates the four phase overlays for the new typography stack and
content fixes: \"University of Toronto\" → \"McMaster University\"
in HeroPhase and DetailsPhase; \"Coming Soon\" → \"Fall 2026\" in
DetailsPhase; --neuro-violet retired (AboutPhase \"Two streams.\"
accent now matches the rest of the page on --neuro-teal); headline
letter-spacing widened from -0.02/-0.03em to -0.025/-0.045em to
compensate for Space Grotesk's wider letterforms vs Bebas Neue.

Scroll-experience canvas, hijack hook, and frame loading are
untouched. The Google Forms submission machinery in
interest-form-scroll.tsx is also untouched — only its typography
shifts (via the unchanged --font-* CSS variables)."
```

---

## Task 8: Rebuild `app/about/page.tsx` on the chassis

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Replace `app/about/page.tsx`.**

Replace the entire contents with:

```tsx
import type { Metadata } from "next";
import {
  Globe,
  Heart,
  Lightbulb,
  Users,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  TickerStrip,
  PageHero,
  SectionHeader,
  SectionDivider,
} from "@/components/page-chassis";

export const metadata: Metadata = {
  title: "About — BioEng4Youth",
  description:
    "BioEng4Youth is a student-led, non-profit global organization dedicated to empowering youth through accessible opportunities in research, outreach, and innovation.",
};

const values = [
  {
    icon: Globe,
    title: "Accessibility",
    desc: "We believe research and innovation opportunities should be open, approachable, and available to students from diverse backgrounds.",
  },
  {
    icon: Heart,
    title: "Equity",
    desc: "We value solutions that consider the needs of underserved communities and promote inclusive access to healthcare and education.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We encourage creativity, curiosity, and evidence-based thinking in addressing biomedical and public health challenges.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "We believe progress happens when students, communities, and future leaders come together to share ideas and learn from one another.",
  },
  {
    icon: Sparkles,
    title: "Youth Empowerment",
    desc: "We are committed to helping young people recognize their potential as researchers, innovators, and changemakers.",
  },
];

const tier1 = [
  { name: "Jiya", role: "Co-President" },
  { name: "Ahyan", role: "Co-President" },
];

const tier2 = [
  { name: "Krish", role: "Director of Operations" },
  { name: "Sepanta", role: "Director of Operations" },
  { name: "Avishi", role: "Chapter Coordinator" },
];

const departments = [
  {
    name: "Outreach",
    members: ["Nowshin", "Jasleen", "Shovan", "Vaidik", "Anisha", "Tamishnah", "Leen"],
  },
  {
    name: "Socials",
    members: ["Priyansi", "Pratistha", "Mahek", "Smera", "Vee", "Diya"],
  },
  {
    name: "Research",
    members: ["Shamim", "Ella", "Olivia", "Sumiran"],
  },
];

const totalMembers =
  tier1.length +
  tier2.length +
  departments.reduce((sum, d) => sum + d.members.length, 0);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar mode="club" />

      <div className="pt-20">
        <TickerStrip
          items={[
            { text: "BioHacks · Fall 2026" },
            { text: "McMaster University" },
            { text: "One neuro case" },
            { text: "Infinite solutions" },
          ]}
        />
      </div>

      <PageHero
        eyebrow="01 / About BioEng4Youth"
        headline={
          <>
            Empowering youth
            <br />
            through{" "}
            <span className="text-neuro-teal-deep">science</span>.
          </>
        }
        lede="A student-led nonprofit creating accessible opportunities in research, outreach, and innovation. We run programs, competitions, and outreach that help students engage with real-world health and engineering challenges."
        stats={[
          { label: "Founded", value: "2025" },
          { label: "Members", value: String(totalMembers) },
          { label: "Type", value: "Student-led nonprofit" },
        ]}
        primaryCta={{ label: "Get Involved", href: "mailto:bioengineeringformcmaster@gmail.com" }}
        secondaryCta={{ label: "Read mission", href: "#mission" }}
      />

      <SectionDivider />

      {/* 02 — Mission */}
      <section id="mission" className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="02" title="Our mission" />
          <p className="text-[15px] leading-[1.8] text-muted max-w-3xl">
            Our mission is to make biomedical, engineering, and health-related
            opportunities more accessible to youth by creating programs that
            promote research engagement, scientific curiosity, critical
            thinking, and innovation. Through events, competitions, and
            outreach, we support students as they develop the knowledge and
            confidence to contribute meaningfully to science and healthcare.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* 03 — Vision */}
      <section className="bg-paper-2">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="03" title="Our vision" />
          <p className="text-[15px] leading-[1.8] text-muted max-w-3xl">
            We envision a future in which young people are empowered to
            participate actively in research, innovation, and community-driven
            scientific problem solving. We want to help build a generation of
            students who are not only informed about global health challenges
            but also inspired to help solve them.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* 04 — What we do */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="04" title="What we do" />
          <p className="text-[15px] leading-[1.8] text-muted max-w-3xl">
            At BioEng4Youth, we develop initiatives that encourage students to
            engage with real-world scientific and healthcare issues. Our work
            includes competitions, educational opportunities, and outreach
            efforts that help youth strengthen their research skills,
            communicate ideas effectively, and think critically about innovation
            and equity in healthcare.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* 05 — Values */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="05" title="What drives us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-paper p-7 group hover:bg-paper-2 transition-colors"
              >
                <div className="w-9 h-9 bg-neuro-teal-deep/15 text-neuro-teal-deep flex items-center justify-center mb-4 rounded-sm group-hover:bg-neuro-teal-deep group-hover:text-paper transition-colors">
                  <Icon size={18} />
                </div>
                <p className="font-display font-bold text-ink text-lg mb-1.5">
                  {title}
                </p>
                <p className="text-[13px] leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 06 — Team */}
      <section className="bg-paper-2">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="06" title="The team" />
          <p className="text-[15px] leading-[1.7] text-muted max-w-2xl mb-14">
            A group of student leaders and contributors passionate about
            research accessibility, science communication, youth empowerment,
            and innovation in healthcare.
          </p>

          {/* Tier 1 — Co-Presidents */}
          <div className="flex justify-center gap-12 mb-12">
            {tier1.map((m) => (
              <TeamCard key={m.name} name={m.name} role={m.role} size="lg" />
            ))}
          </div>

          {/* Tier 2 — Directors */}
          <div className="flex justify-center flex-wrap gap-10 mb-16">
            {tier2.map((m) => (
              <TeamCard key={m.name} name={m.name} role={m.role} size="md" />
            ))}
          </div>

          <div className="h-px w-full bg-rule mb-14" />

          {/* Tier 3 — Departments */}
          <div className="grid md:grid-cols-3 gap-12">
            {departments.map((dept) => (
              <div key={dept.name}>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-neuro-teal-deep mb-6 text-center">
                  {dept.name}
                </p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-7">
                  {dept.members.map((name) => (
                    <TeamCard key={name} name={name} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Closing dark band */}
      <section className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 grid lg:grid-cols-2 gap-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-neuro-teal mb-5">
              What our team does
            </p>
            <h3
              className="font-display font-bold text-white leading-tight tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Working together for impact.
            </h3>
            <p className="text-white/55 text-[15px] leading-relaxed">
              Our team works across events, outreach, communications, and
              research-focused programming to support the mission of
              BioEng4Youth.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-neuro-teal mb-5">
              Join our team
            </p>
            <h3
              className="font-display font-bold text-white leading-tight tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Get involved.
            </h3>
            <p className="text-white/55 text-[15px] leading-relaxed mb-8">
              Always excited to connect with students passionate about science,
              research, leadership, outreach, and innovation. If you&apos;re
              interested in contributing, we&apos;d love to hear from you.
            </p>
            <a
              href="mailto:bioengineeringformcmaster@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neuro-teal text-ink font-display font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all rounded-md"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TeamCard({
  name,
  role,
  size = "sm",
}: {
  name: string;
  role?: string;
  size?: "lg" | "md" | "sm";
}) {
  const dims =
    size === "lg"
      ? "w-24 h-24 sm:w-28 sm:h-28 text-3xl"
      : size === "md"
      ? "w-20 h-20 sm:w-24 sm:h-24 text-2xl"
      : "w-14 h-14 text-lg";
  const initial = name.charAt(0);
  return (
    <div className="flex flex-col items-center max-w-[120px]">
      <div
        className={`${dims} bg-neuro-teal-deep/15 text-neuro-teal-deep font-display font-bold flex items-center justify-center rounded-md mb-3`}
      >
        {initial}
      </div>
      <p className="font-display font-semibold text-ink text-base leading-tight text-center">
        {name}
      </p>
      {role && (
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft mt-1 text-center max-w-[160px]">
          {role}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Visual + screenshot check.**

Run: `npm run dev`
Visit `http://localhost:3000/about`. Confirm:
- Ticker scrolls across the top under the navbar
- Hero shows "Empowering youth through science." in Space Grotesk, "science" in teal-deep
- Stats panel shows Founded 2025 / Members **22** / Type "Student-led nonprofit"
- Section headers are `02 → Our mission` style
- Values grid is 3-up on desktop with neuro-teal-deep icon squares
- Team section has initial-tile avatars (no Lucide `User` icons anymore)
- Closing dark band uses the new tokens
- Footer renders below

Capture before/after with Puppeteer:

```bash
node screenshot.mjs http://localhost:3000/about about-after
```

- [ ] **Step 3: Lint + build.**

Run: `npm run lint && npm run build`
Expected: clean.

- [ ] **Step 4: Commit.**

```bash
git add app/about/page.tsx
git commit -m "Redesign: rebuild /about on the page chassis

Replaces the existing about page with a chassis-composed structure:
TickerStrip + PageHero + numbered sections (02 Mission / 03 Vision /
04 What we do / 05 Values / 06 Team) + dark closing band. Hero
stats are derived from the actual roster (22 members) and the
user-confirmed founding year (2025). The team section drops the
Lucide User-icon avatars in favor of initial-tile squares using the
neuro-teal-deep accent."
```

---

## Task 9: Rebuild `app/research/page.tsx` and restyle `components/research-articles.tsx`

**Files:**
- Modify: `app/research/page.tsx`
- Modify: `components/research-articles.tsx`

- [ ] **Step 1: Replace `app/research/page.tsx`.**

Replace the entire contents with:

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ResearchArticles from "@/components/research-articles";
import { TickerStrip, PageHero, SectionDivider } from "@/components/page-chassis";

export const metadata: Metadata = {
  title: "Research — BioEng4Youth",
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
        lede="Articles and insights from our team exploring the intersection of biology and engineering — written to inform and inspire."
      />

      <SectionDivider />

      <ResearchArticles />

      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Replace `components/research-articles.tsx`.**

Replace the entire contents with:

```tsx
"use client";

import { ArrowUpRight, Calendar } from "lucide-react";

interface Article {
  title: string;
  date: string;
  tags: string[];
  abstract: string;
}

const articles: Article[] = [
  {
    title: "Decellularized Scaffolds for Cardiac Tissue Regeneration",
    date: "March 2026",
    tags: ["Tissue Engineering", "Biomaterials"],
    abstract:
      "Exploring how decellularized extracellular matrix scaffolds can be repopulated with patient-derived cardiomyocytes to restore function in damaged heart tissue after myocardial infarction.",
  },
  {
    title: "Non-Invasive Brain-Computer Interfaces Using EEG Signal Processing",
    date: "February 2026",
    tags: ["Neural Interfaces"],
    abstract:
      "Advances in dry-electrode EEG headsets and real-time signal classification are bringing non-invasive BCIs closer to clinical applications for patients with motor disabilities.",
  },
  {
    title: "Hydrogel-Based Drug Delivery Systems for Targeted Cancer Therapy",
    date: "January 2026",
    tags: ["Biomaterials"],
    abstract:
      "pH-responsive hydrogels engineered to release chemotherapeutic agents selectively within the acidic tumour microenvironment, reducing systemic toxicity while improving treatment efficacy.",
  },
  {
    title: "3D-Bioprinted Vascular Networks for Organ-on-a-Chip Models",
    date: "December 2025",
    tags: ["Tissue Engineering"],
    abstract:
      "Combining sacrificial bioprinting with endothelial cell seeding to create perfusable microvascular networks that better replicate organ-level physiology in microphysiological systems.",
  },
  {
    title: "Biodegradable Magnesium Alloys for Orthopedic Implants",
    date: "November 2025",
    tags: ["Biomaterials"],
    abstract:
      "Investigating surface-modified Mg-Zn-Ca alloys that degrade at a controlled rate in vivo, eliminating the need for secondary implant-removal surgeries in fracture fixation.",
  },
  {
    title: "Machine Learning for Early Detection of Diabetic Retinopathy",
    date: "October 2025",
    tags: ["Medical Imaging"],
    abstract:
      "A CNN trained on over 80,000 fundus images achieves specialist-level accuracy in grading diabetic retinopathy severity, enabling scalable screening in underserved communities.",
  },
  {
    title: "CRISPR-Cas9 Gene Editing Strategies for Sickle Cell Disease",
    date: "September 2025",
    tags: ["Genetic Engineering"],
    abstract:
      "Recent clinical trials demonstrate that ex-vivo CRISPR editing of the BCL11A enhancer in hematopoietic stem cells can reactivate fetal hemoglobin production and alleviate sickle cell symptoms.",
  },
  {
    title: "Flexible Piezoelectric Sensors for Real-Time Gait Analysis",
    date: "August 2025",
    tags: ["Biosensors"],
    abstract:
      "Thin-film PVDF sensors embedded in shoe insoles capture plantar pressure distributions during walking, providing clinicians with continuous biomechanical data for post-stroke rehabilitation.",
  },
  {
    title: "Microfluidic Platforms for High-Throughput Drug Screening",
    date: "July 2025",
    tags: ["Biosensors", "Biomaterials"],
    abstract:
      "Droplet-based microfluidic chips that encapsulate individual cells in picoliter volumes, enabling rapid screening of thousands of drug candidates with minimal reagent consumption.",
  },
];

export default function ResearchArticles() {
  const topicCount = new Set(articles.flatMap((a) => a.tags)).size;

  return (
    <section className="py-16 bg-paper">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Count header */}
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-4 mb-0">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-soft">
            Articles
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-soft">
            {articles.length} total · {topicCount} topics
          </span>
        </div>

        <ol className="divide-y divide-rule">
          {articles.map((article, i) => (
            <ArticleRow key={article.title} article={article} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <li className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-0 hover:bg-paper-2 transition-colors duration-200 -mx-4 px-4">
      {/* Index */}
      <div className="pt-8 pb-8 pr-4">
        <span
          className="font-display font-bold text-rule group-hover:text-neuro-teal-deep transition-colors duration-200 leading-none select-none"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="py-8 border-l border-rule group-hover:border-neuro-teal-deep/40 pl-6 sm:pl-8 transition-colors duration-200">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
          <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft">
            <Calendar size={9} />
            {article.date}
          </span>
          <span className="text-rule text-xs">·</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[0.22em] uppercase text-neuro-teal-deep/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-ink leading-tight tracking-[-0.015em] mb-3 group-hover:text-neuro-teal-deep transition-colors duration-200"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
        >
          {article.title}
        </h3>

        {/* Abstract */}
        <p className="text-muted text-[14px] leading-relaxed max-w-2xl sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:group-hover:max-h-40 sm:group-hover:opacity-100 transition-all duration-300 ease-out mb-0 sm:group-hover:mb-4">
          {article.abstract}
        </p>

        {/* Read link */}
        <div className="flex items-center gap-1.5 text-muted-soft group-hover:text-neuro-teal-deep text-sm font-medium transition-all duration-200 mt-1">
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read article
          </span>
          <ArrowUpRight
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </li>
  );
}
```

- [ ] **Step 2.5: Note about the IntersectionObserver wiring.**

The previous version of `research-articles.tsx` did not use `useInView` (it relied on hover only). Confirm this in the new version too — there's no `useInView` import. Good.

- [ ] **Step 3: Visual check.**

Run: `npm run dev`
Visit `http://localhost:3000/research`. Confirm:
- Ticker + hero render in the new chassis
- Article count header reads `9 total · 7 topics` (counted from the data)
- Hovering an article row reveals the abstract and the "Read article" mono label

```bash
node screenshot.mjs http://localhost:3000/research research-after
```

- [ ] **Step 4: Lint + build.**

Run: `npm run lint && npm run build`
Expected: clean.

- [ ] **Step 5: Commit.**

```bash
git add app/research/page.tsx components/research-articles.tsx
git commit -m "Redesign: rebuild /research on the page chassis

Wraps the article strip-list with TickerStrip + PageHero from the
shared chassis. The article-row component swaps brand.* tokens for
the new design tokens (rule, muted, muted-soft, neuro-teal-deep).
Article count and topic count are computed from the data array
rather than hardcoded."
```

---

## Task 10: Rebuild `app/past-events/page.tsx` and restyle `components/past-events-grid.tsx`

**Files:**
- Modify: `app/past-events/page.tsx`
- Modify: `components/past-events-grid.tsx`

- [ ] **Step 1: Replace `app/past-events/page.tsx`.**

Replace the entire contents with:

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PastEventsGrid from "@/components/past-events-grid";
import { TickerStrip, PageHero, SectionDivider } from "@/components/page-chassis";

export const metadata: Metadata = {
  title: "Past Events — BioEng4Youth",
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
        eyebrow="01 / Track Record"
        headline={
          <>
            Events that{" "}
            <span className="text-neuro-teal-deep">shaped us</span>.
          </>
        }
        lede="From case competitions to hands-on workshops — a look at what we've built and who we've brought together."
      />

      <SectionDivider />

      <PastEventsGrid />

      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Replace `components/past-events-grid.tsx`.**

Replace the entire contents with:

```tsx
"use client";

import {
  ArrowRight,
  Calendar,
  FileText,
  Trophy,
  Award,
  Globe,
  Users,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const metrics = [
  { icon: FileText, value: "100+", label: "Submissions" },
  { icon: Award, value: "Top 8", label: "Published with URNCST" },
  { icon: Globe, value: "International", label: "Multi-Institution" },
  { icon: Users, value: "Cross-Faculty", label: "Interdisciplinary" },
];

export default function PastEventsGrid() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-20 bg-paper">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-4 mb-12">
          <span className="bg-neuro-teal-deep text-ink px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] uppercase">
            02
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.015em] text-ink">
            Featured event
          </h2>
          <div className="flex-1 h-px bg-rule" />
        </div>

        <div
          className={cn(
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Top accent bar */}
          <div className="h-0.5 w-full bg-ink" />

          <div className="border border-rule border-t-0">
            {/* Header row */}
            <div className="border-b border-rule px-8 sm:px-10 py-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] uppercase text-muted border border-rule px-3 py-1.5">
                <Trophy size={10} />
                Competition
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] uppercase text-neuro-teal-deep border border-neuro-teal-deep/40 px-3 py-1.5">
                <Globe size={10} />
                International
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted-soft ml-auto">
                <Calendar size={10} />
                Fall 2025
              </span>
            </div>

            {/* Body — 60/40 split */}
            <div className="grid lg:grid-cols-[3fr_2fr] divide-y lg:divide-y-0 lg:divide-x divide-rule">
              {/* Left */}
              <div className="px-8 sm:px-10 py-10">
                <h3
                  className="font-display font-bold text-ink leading-tight tracking-[-0.02em] mb-4"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                >
                  International Research
                  <br />
                  Case Competition
                </h3>

                <p className="text-muted text-[15px] leading-loose mb-8 max-w-lg">
                  Participants tackled a critical question in global maternal
                  health — bridging engineering innovation with real-world
                  clinical needs in rural, underserved communities.
                </p>

                <div className="border-l-2 border-neuro-teal-deep pl-5 mb-8">
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft mb-2">
                    Competition prompt
                  </p>
                  <p className="text-ink/75 text-sm leading-relaxed italic">
                    &ldquo;How can low-cost portable ultrasound devices improve
                    maternal health outcomes in rural underserved communities?&rdquo;
                  </p>
                </div>

                <ul className="space-y-3 mb-10">
                  {[
                    "100+ submissions from students across multiple faculties and institutions worldwide",
                    "Top 8 teams published with URNCST",
                    "Judged by faculty, clinicians, and industry mentors",
                  ].map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-neuro-teal-deep shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-neuro-teal text-sm font-display font-semibold hover:brightness-125 transition-all rounded-md">
                    Read more <ArrowRight size={14} />
                  </button>
                  <button className="inline-flex items-center gap-2 px-5 py-3 border border-ink text-ink text-sm font-display font-medium hover:bg-ink hover:text-neuro-teal transition-all rounded-md">
                    View gallery
                  </button>
                </div>
              </div>

              {/* Right: metrics */}
              <div className="divide-y divide-rule">
                {metrics.map(({ icon: Icon, value, label }, i) => (
                  <div
                    key={label}
                    className={cn(
                      "px-8 py-7 flex items-center gap-4 transition-all duration-700",
                      inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    )}
                    style={{ transitionDelay: `${200 + i * 100}ms` }}
                  >
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-neuro-teal-deep/15 text-neuro-teal-deep rounded-sm">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-ink text-xl leading-tight">
                        {value}
                      </p>
                      <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft mt-0.5">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

The four real-event metrics ("100+ Submissions" / "Top 8 Published with URNCST" / "International Multi-Institution" / "Cross-Faculty Interdisciplinary") and the "Fall 2025" date are preserved verbatim — they correspond to the actual competition that ran.

- [ ] **Step 3: Visual check.**

Run: `npm run dev`
Visit `http://localhost:3000/past-events`. Confirm:
- Ticker + hero in the chassis style
- Section header `02 → Featured event`
- Featured event card: ink-top-accent, rule borders, neuro-teal-deep callout border, ink CTAs
- Right-rail metrics still animate in via `useInView`

```bash
node screenshot.mjs http://localhost:3000/past-events past-events-after
```

- [ ] **Step 4: Lint + build.**

Run: `npm run lint && npm run build`
Expected: clean.

- [ ] **Step 5: Commit.**

```bash
git add app/past-events/page.tsx components/past-events-grid.tsx
git commit -m "Redesign: rebuild /past-events on the page chassis

Wraps the existing featured-event card with TickerStrip + PageHero.
The card itself keeps its asymmetric grid + IntersectionObserver
reveal but swaps brand.* tokens for the new design tokens. Real
event metrics (100+ submissions, Top 8 published with URNCST, etc.)
are preserved verbatim. Page metadata description updated to
McMaster."
```

---

## Task 11: Rebuild `app/sponsors/page.tsx`

**Files:**
- Modify: `app/sponsors/page.tsx`

- [ ] **Step 1: Replace `app/sponsors/page.tsx`.**

Replace the entire contents with:

```tsx
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
                  // SLOT {String(i + 1).padStart(2, "0")}
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
```

- [ ] **Step 2: Visual check.**

Run: `npm run dev`
Visit `http://localhost:3000/sponsors`. Confirm:
- Hero says "Partner with BioHacks" with "BioHacks" in teal-deep
- Lede says "McMaster's first bioengineering hackathon" (not UofT)
- Why-sponsor strip lists 3 reasons; reason 01 mentions "McMaster students"
- Tier cards: 4 of them (Bronze / Silver / Gold / Title); Gold is ringed in teal-deep with "Popular" badge
- Sponsor wall placeholder shows `// SLOT 01` … `// SLOT 06` in mono
- Bottom CTA is the dark ink/teal pill

```bash
node screenshot.mjs http://localhost:3000/sponsors sponsors-after
```

- [ ] **Step 3: Lint + build.**

Run: `npm run lint && npm run build`
Expected: clean.

- [ ] **Step 4: Commit.**

```bash
git add app/sponsors/page.tsx
git commit -m "Redesign: rebuild /sponsors on the page chassis

Composes TickerStrip + PageHero + SectionHeader/SectionDivider for
the chassis. Why-sponsor strip-list, tier grid (Bronze / Silver /
Gold / Title), and sponsor logo wall stay structurally similar but
use the new tokens. Logo wall placeholder text changes from
\"Your Logo\" to mono \"// SLOT 0X\" until real logos arrive. Page
metadata + reason 01 + lede update UofT references to McMaster."
```

---

## Task 12: Final verification sweep

**Files:**
- (Read-only verification across the whole site)

- [ ] **Step 1: Search for any remaining `brand-*` Tailwind classes.**

Run:

```bash
grep -rn "brand-primary\|brand-accent\|brand-text\|brand-secondary\|brand-bg" \
  app components hooks lib
```

Expected: no matches (all rewritten in Tasks 5–11). If any remain, fix the file in question and amend its task's commit, or add a small follow-up commit.

- [ ] **Step 2: Search for retired font names and old palette hexes.**

Run:

```bash
grep -rn "Bebas_Neue\|Bebas Neue\|Barlow_Semi_Condensed\|Barlow Semi Condensed\|Share_Tech_Mono\|Share Tech Mono" app components || echo "No stale font refs"
grep -rn "#70B389\|#135264\|#0B1F26\|#0B303B\|#328795\|#a78bfa" app components || echo "No stale hex refs"
```

Expected output: `No stale font refs` and `No stale hex refs`.
If anything matches, fix it in its respective file. The hexes from the old palette must not appear in any source file.

- [ ] **Step 3: Search for remaining "University of Toronto" references in source.**

Run:

```bash
grep -rn "University of Toronto\|UofT\|U of T\|Uoft" \
  app components --include="*.tsx" --include="*.ts" || echo "No UofT refs in source"
```

Expected: only one allowed match — `UNIVERSITY_OPTIONS` in `components/interest-form-scroll.tsx` (the form must continue to offer UofT as a non-McMaster student option). Everything else (page metadata, footer, hero/details copy, lede text) must be McMaster.

If you see more than that one match, edit and fix.

- [ ] **Step 4: Search for "Coming Soon" placeholder strings.**

Run:

```bash
grep -rn "Coming Soon" app components || echo "No 'Coming Soon' strings"
```

Expected: none. (DetailsPhase was the only one and it became "Fall 2026" in Task 7.)

- [ ] **Step 5: Run full lint + build + dev smoke test.**

Run: `npm run lint && npm run build`
Expected: clean.

Run: `npm run dev`. Open the dev server and walk through every route:

| URL | What to check |
|---|---|
| `http://localhost:3000` | Loading screen completes; scroll all the way through the four phases; "BioHacks" headline in Space Grotesk; eyebrow says McMaster; Details phase says Fall 2026; Form submits successfully (use a test email) |
| `http://localhost:3000/about` | Ticker + hero; sections 02–06 + closing dark band; team initials show |
| `http://localhost:3000/research` | Ticker + hero; article count `9 total · 7 topics`; hover row reveals abstract |
| `http://localhost:3000/past-events` | Ticker + hero; featured event card with ink rules + teal-deep callout |
| `http://localhost:3000/sponsors` | Ticker + hero; why-sponsor strip + tier grid + slot wall |

- [ ] **Step 6: Capture full screenshot suite.**

Run each (sequentially — `screenshot.mjs` will not collide on filenames):

```bash
node screenshot.mjs http://localhost:3000 home
node screenshot.mjs http://localhost:3000/about about
node screenshot.mjs http://localhost:3000/research research
node screenshot.mjs http://localhost:3000/past-events past-events
node screenshot.mjs http://localhost:3000/sponsors sponsors
```

If the user has globally installed Playwright, you can supplement with mobile-width captures. Since `screenshot.mjs` hardcodes 1440×900, that gives desktop-only. To capture mobile, drop into a Node REPL or quick script and re-run with `setViewport({ width: 390, height: 844 })`.

The deliverable is a folder `temporary screenshots/` with full-page captures of all five routes — the user reviews these to sign off on the visual delivery.

- [ ] **Step 7: Confirm scroll experience integrity.**

Visit `http://localhost:3000`. Scroll smoothly to the bottom. Confirm:
- All 145 frames render in sequence (no flicker, no skip)
- The progress bar at top fills smoothly
- Phase dots increment as you cross 25 / 50 / 75% scroll
- Refresh and navigate to `/about` then click navbar "Register Interest" — expect a page nav back to `/` and an immediate jump to the form phase (the `biohacks:jumpToPhase` event handling on hash mount)
- Submit the form with a fake-but-valid email — expect the success card to render

If any of these fail, the regression came from the Task 7 changes — re-read `components/hero-phase.tsx` / `about-phase.tsx` / `details-phase.tsx` / `interest-form-scroll.tsx` and check that no logic-bearing attributes were dropped during the re-skin.

- [ ] **Step 8: Update memory and commit any cleanup.**

If verification surfaced bugs that needed extra fixes, commit them as a small follow-up:

```bash
git add <fixed files>
git commit -m "Redesign: post-verification fixups"
```

Also update `MEMORY.md` (under `/home/sepanta/.claude/projects/-home-sepanta-BioEng4Youth/memory/`) if any new conventions emerged that should persist (e.g., "always derive member counts from the roster file at build time"). Likely nothing to add — the existing memory entries already capture the redesign principles.

- [ ] **Step 9: Final summary commit (no-op or true commit).**

If everything is clean and only the screenshot folder is dirty, you're done. The screenshots directory is gitignored (`/temporary screenshots/`). Confirm with:

```bash
git status
```

Expected: working tree clean (or only the gitignored screenshots folder shows as untracked, which is fine).

---

## Self-Review

**Spec coverage:**
- Tokens (palette + type) → Tasks 1–3 ✓
- Page-chassis primitives → Task 4 ✓
- Navbar → Task 5 ✓
- Footer → Task 6 ✓
- Scroll page restyle (HeroPhase / AboutPhase / DetailsPhase / InterestFormScroll) → Task 7 ✓
- /about restructure → Task 8 ✓
- /research restructure → Task 9 ✓
- /past-events restructure → Task 10 ✓
- /sponsors restructure → Task 11 ✓
- Content sweep (UofT → McMaster, Fall 2026, real numbers) → woven into every component task and verified again in Task 12 ✓
- Verification → Task 12 ✓

**Type consistency:** `TickerStrip`, `PageHero`, `SectionHeader`, `SectionDivider` are defined in Task 4 and consumed identically in Tasks 8–11. `TickerItem` shape (`{ text: string }`) is the same everywhere. `PageHeroProps` field names (`eyebrow`, `headline`, `lede`, `stats`, `primaryCta`, `secondaryCta`) match consumer usage.

**Placeholder scan:** No "TBD" / "TODO" / "fill in details" / "similar to Task N" patterns. Each step has the actual code or command.

**Out-of-scope:** Tasks do not modify `hooks/use-scroll-animation.ts`, `components/scroll-experience.tsx`, `components/scroll-landing.tsx`, `components/loading-screen.tsx`, `components/phase-overlay.tsx`, `public/frames/*`, `screenshot.mjs`, or `components/faq-section.tsx`. The Google Forms submission machinery in `interest-form-scroll.tsx` is untouched.
