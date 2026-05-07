# BioEng4Youth Site Redesign — Design Spec

**Date:** 2026-05-07
**Scope:** Full visual + structural redesign of the BioEng4Youth marketing site (`/home/sepanta/BioEng4Youth`), excluding the home scroll-animation mechanics.
**Goal:** Bring the secondary pages and shared chrome up to MLH-tier polish so the entire site reads as one professional hackathon brand, with the existing scroll-animation landing page preserved as the anchor experience.

---

## 1. Background

The site has two visually distinct surfaces sharing one navbar:

1. **`/`** — a hijacked-scroll canvas that scrubs through 145 pre-rendered frames; dark void palette with a neon-teal accent. The user explicitly wants this preserved.
2. **`/about`, `/research`, `/past-events`, `/sponsors`** — light, conventional pages with a sage-green + medical-teal palette and a separate visual language. The user finds these visually weak compared to MLH-tier hackathon sites.

The redesign rebuilds (1)'s text rendering and (2)'s entire chassis so they share one design system. The scroll mechanics, frame loading, hijack model, LERP'd progress, and phase windows are all untouched.

## 2. Constraints

**Preserved as-is (do not modify):**
- `hooks/use-scroll-animation.ts` — virtual scroll, LERP factor, hash/event handling
- `components/scroll-experience.tsx` canvas rendering loop
- `components/loading-screen.tsx` frame preloading
- `components/scroll-landing.tsx` mounting orchestration
- `public/frames/*.jpg` (the 4-digit padded set; the 3-digit duplicates remain out of scope)
- The custom `biohacks:jumpToPhase` event contract

**Compatible by design:**
- The new typography is loaded the same way (`next/font/google` in `app/layout.tsx`), so font swaps cascade through both surfaces without touching the scroll machinery.
- The Tailwind palette is extended, not replaced — old `brand.*` keys are retired but their replacement keys are introduced cleanly.

## 3. Design tokens

### 3.1 Palette

**Light surface (secondary pages, navbar pill on light, body bg):**
| Token | Hex | Usage |
|---|---|---|
| `--paper` | `#FFFFFF` | Base page background |
| `--paper-2` | `#F6F7F9` | Alt section background (banded sections) |
| `--ink` | `#0B0F18` | Body text, navbar pill, dark hero strips, primary buttons |
| `--neuro-teal` | `#00E5CC` | Bright accent — **only on dark surfaces** (CTAs on `--ink`, dots on dark navbar) |
| `--neuro-teal-deep` | `#00B89E` | **Light-bg-safe** teal for labels, links, headline accents on `--paper`/`--paper-2`. The bright `#00E5CC` does not pass WCAG AA on white. |
| `--rule` | `rgba(11,15,24,0.10)` | Hairlines, dividers |
| `--muted` | `rgba(11,15,24,0.60)` | Secondary text |
| `--muted-soft` | `rgba(11,15,24,0.40)` | Tertiary/eyebrow text |

**Dark surface (scroll experience overlays, footer):**
| Token | Hex | Usage |
|---|---|---|
| `--void` | `#060810` | Scroll page bg |
| `--ink` | `#0B0F18` | Footer bg, navbar pill |
| `--neuro-teal` | `#00E5CC` | Accent (unchanged from current site) |
| `--ivory` | `#E8E4DC` | Body text on dark |

**Retired:**
- `tailwind.config.ts → theme.extend.colors.brand.*` (`primary #135264`, `accent #70B389`, `text #0B303B`, `secondary #328795`, `bg #FFFFFF`) — these are removed. All consumers re-pointed to the new tokens.
- `--neuro-violet` (`#A78BFA`) on `AboutPhase` — replaced by `--neuro-teal` for a tighter one-accent system.

### 3.2 Typography

All site-wide. Loaded via `next/font/google` in `app/layout.tsx`.

| Variable | Family | Weights | Usage |
|---|---|---|---|
| `--font-display` | Space Grotesk | 500, 600, 700 | Headlines (h1–h3), section titles, button labels |
| `--font-sans` | Inter | 300, 400, 500, 600, 700, 800 | Body, lede, paragraphs, navigation |
| `--font-mono` | JetBrains Mono | 400, 500 | Eyebrows, section numbers, tickers, data labels, stat values where appropriate |

**Retired:** Bebas Neue, Barlow Semi Condensed, Share Tech Mono.

**Headline conventions:**
- Sentence case (not all-caps). Letter-spacing `-0.025em` to `-0.035em` on large sizes.
- `clamp()` for fluid sizing — H1 hero `clamp(3rem, 7vw, 6rem)`; section h2 `clamp(2rem, 4vw, 3rem)`.
- Page hero noun gets the accent color (`--neuro-teal-deep` on light, `--neuro-teal` on dark).

**Eyebrow conventions:**
- JetBrains Mono, font-size 9–11px, `letter-spacing: 0.22em`, `text-transform: uppercase`, color `--neuro-teal-deep` on light / `--neuro-teal` on dark.
- Pattern: `01 / Section name` or `★ MARQUEE ITEM`.

## 4. Shared chrome

### 4.1 Navbar (`components/navbar.tsx`)

**Keep:** floating-pill geometry, fixed top with side margins, `mode="hackathon" | "club"` prop, mobile-toggle pattern, `biohacks:jumpToPhase` dispatch behavior, `next/image` logo lockup.

**Refresh:**
- Background `--ink/85` with white/10 border (mostly unchanged), subtle `box-shadow` for the light-page float
- Logo lockup: round image (unchanged) + `Space Grotesk 600` for the brand name + `JetBrains Mono` 9px eyebrow that reads `MCMASTER · BIOHACKS 2026` in `hackathon` mode and `BIOENG4YOUTH` in `club` mode (capitalize/spacing already done in CSS)
- Active link: replace green-tint with `bg-[--neuro-teal-deep]/22 ring-1 ring-[--neuro-teal-deep]/45 text-[--neuro-teal]` text
- Hover state: subtle `bg-white/8`
- CTA button: solid `--neuro-teal` on `--ink` text, font Space Grotesk 600

### 4.2 Footer (`components/footer.tsx`)

**Layout stays three-column on lg+, stacked on mobile.** Always dark (`--ink` bg).

**Changes:**
- Top accent bar: replace the current `bg-[#70B389]/40` strip with a 1px full-width gradient `linear-gradient(90deg, transparent, var(--neuro-teal), transparent)` — visually echoes the scroll page's progress bar.
- All typography swapped to the new stack
- Section labels (`PAGES`, `GET INVOLVED`) become `JetBrains Mono` 9px tracking-wide
- Email link: text `--neuro-teal` (bright accent OK on dark)
- Bottom row keeps `JetBrains Mono` micro-copy
- Copy: "BioHacks · McMaster · Fall 2026" replaces "University of Toronto" references

## 5. Secondary-page chassis (the "Y / Tech Brief" structure)

Every secondary page (`/about`, `/research`, `/past-events`, `/sponsors`) inherits this rhythm. New shared component: **`components/page-chassis.tsx`** — exports `<TickerStrip />`, `<PageHero />`, `<SectionHeader />`, `<SectionDivider />` for consistent reuse. Per-page files compose them with page-specific content.

**Order on every page:**

1. **Floating dark navbar pill** (existing component, refreshed)
2. **TickerStrip** — full-width `--ink` band, ~28px tall, JetBrains Mono 10px text scrolling left at 28s. Reuses the `ticker` keyframe already defined in `tailwind.config.ts`. Default content: `★ BIOHACKS · FALL 2026   ★ MCMASTER UNIVERSITY   ★ ONE NEURO CASE   ★ INFINITE SOLUTIONS` (each item separated by 16px). Items duplicate to seamlessly loop. Respects `prefers-reduced-motion`.
3. **PageHero** — page-specific. Props: `eyebrow` (mono seal), `headline` (Space Grotesk, sentence case, the noun is wrapped in `<span className="text-[--neuro-teal-deep]">`), `lede` (Inter, max 3 lines), `stats` (array of `{label, value}` pairs — empty array hides the panel), `primaryCta`, `secondaryCta` (optional).
4. **Section content** — interleave `<SectionHeader index="02" title="…" />` (chip + title + chevron) with full-width 1px ink rules.
5. **Footer** (existing, refreshed)

### 5.1 PageHero anatomy

- Container: `max-w-6xl mx-auto px-6 sm:px-8 pt-20 pb-14`
- Eyebrow row: small dot (`--neuro-teal-deep`) + mono text in a thin-bordered pill (`border-[--rule]`)
- Headline: Space Grotesk 700, `clamp(3rem, 7vw, 6rem)`, `leading-[0.9]`, `tracking-[-0.025em]`. Three lines max.
- Lede + stats grid: `grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12`, lede on left in Inter, stats on right in a 2px ink top-rule then row-by-row hairlines.
  - Stats panel hidden when no real numbers exist for the page.
- CTA row: primary (`--ink` bg, `--neuro-teal` text) + secondary (`--ink` 1px border, ink text). Space Grotesk 600. Hover: primary brightens; secondary fills to `--ink`.

### 5.2 SectionHeader anatomy

- Layout: `[chip] [title] ........ [chevron arrow]`
- Chip: `bg-[--neuro-teal-deep] text-[--ink]`, padding `2px 8px`, JetBrains Mono 9px, the section index (`02`, `03`, …)
- Title: Space Grotesk 700, `text-2xl`/`text-3xl`, `tracking-[-0.015em]`
- Chevron: subtle `→` in `--muted-soft`, anchored right
- Sits above each major content block; followed by a 1px `--rule` divider 14px below.

### 5.3 Per-page content (re-skin only — no new copy)

**`/about`** (`app/about/page.tsx`):
- Hero: eyebrow `01 / About BioEng4Youth`, headline "Empowering youth through **science**.", lede from existing copy, stats: `Founded 2025 / Members 22 / Type Student-led nonprofit`.
- Section 02 — *Our Mission* (existing copy, restyled)
- Section 03 — *Our Vision* (existing copy)
- Section 04 — *What we do* (existing copy)
- Section 05 — *Values* — existing 5 values (Accessibility, Equity, Innovation, Collaboration, Youth Empowerment) become 1px-bordered grid cards in a 3-column grid (1-col mobile, 2-col tablet, 3-col desktop). Lucide icon → small `--neuro-teal-deep` square containing the icon. Card hover: 1px border deepens to `--ink`.
- Section 06 — *Team* — existing roster (Tier 1 / Tier 2 / Departments) restyled. `User`-icon avatar circles become 56–96px squares filled with `--neuro-teal-deep`/15 background, member's first initial in Space Grotesk 700 centered. Names in Space Grotesk 600. Roles in JetBrains Mono uppercase tracking-wide.
- Closing dark-band CTA section ("What our team does / Get involved") becomes a single dark `--ink` band with the same inner type stack as the rest.

**`/research`** (`app/research/page.tsx` + `components/research-articles.tsx`):
- Hero: eyebrow `01 / Research & Insights`, headline "Biomedical engineering **research**." Stats panel: `Articles {articles.length} / Topics {new Set(articles.flatMap(a => a.tags)).size} / Updated Monthly` — both numbers derived from the existing `articles` array in `research-articles.tsx`, so they stay accurate as articles are added.
- Existing strip-list articles re-skin: each `ArticleRow` becomes a 1px `--rule`-separated entry with the numbered prefix (`01`, `02`…) restyled in Space Grotesk 700 in `--rule` color (faint), Space Grotesk title, JetBrains Mono date + tag chips on the right. Hover state slides the row right by 4px and reveals a `→` arrow.

**`/past-events`** (`app/past-events/page.tsx` + `components/past-events-grid.tsx`):
- Hero: eyebrow `01 / Track Record`, headline reuses existing copy ("Events that **shaped us**."), lede from existing copy. Stats panel hidden (no derivable page-level event count yet — the page currently features one event).
- The `PastEventsGrid` "International Research Case Competition" featured-event card stays structurally as-is — it's already on-pattern (numbered/labeled chips, asymmetric grid, real metrics: 100+ submissions, Top 8 published with URNCST, etc.). Restyle with new tokens: chip eyebrows in JetBrains Mono on `--rule` borders; left "Competition Prompt" callout border swaps from `#70B389` to `--neuro-teal-deep`; metric icon backgrounds become `--neuro-teal-deep`/15 fill; CTA buttons match chassis primary/secondary system. **Real metric values are preserved verbatim** — they correspond to the actual URNCST competition that ran.

**`/sponsors`** (`app/sponsors/page.tsx`):
- Hero: eyebrow `01 / Sponsorship`, headline reuses existing copy ("Partner with **BioHacks**"), lede + email CTA from existing copy. Stats panel hidden.
- Section 02 — *Why Sponsor*: existing 3 numbered reasons stay in the strip-list shape (already on-pattern), restyled with new tokens (mono index → JetBrains Mono in `--muted-soft`; title → Space Grotesk 700 in `--ink`; description → Inter in `--muted`).
- Section 03 — *Sponsorship tiers*: existing 4 tiers (**Bronze / Silver / Gold / Title** — the existing data, not renamed) stay in a 4-column grid on `--paper-2`. Each card: 1px ink border, no inset ring, `--neuro-teal-deep` accent for the "Popular" badge on Gold (the `featured: true` tier), perks bullets are small `--neuro-teal-deep` filled squares (replacing the round green dots), "Inquire" CTA matches the chassis primary/secondary CTA system.
- Section 04 — *Current sponsors*: existing 6-placeholder logo grid kept; placeholder text "Your Logo" → `// SLOT 01` … `// SLOT 06` in JetBrains Mono `--muted-soft` until real logos arrive. Bottom "Become a Sponsor" CTA uses the chassis primary CTA pattern.

## 6. Home scroll page (visual restyle only)

**Unchanged:** scroll hijack, frame loading/drawing, phase windows, hash + custom-event jump-to-phase, vignette/tint overlays.

**Restyled:**
- `components/hero-phase.tsx`: "BioHacks" hero changes from Bebas Neue all-caps to Space Grotesk 700 sentence-case ("BioHacks" with the capital H restored); mono eyebrow uses JetBrains Mono.
- `components/about-phase.tsx`: same font swap; the "Two streams." accent switches from `--neuro-violet` to `--neuro-teal`. Frosted-glass card unchanged.
- `components/details-phase.tsx`: same font swap; "When: Coming Soon" updated to "When: **Fall 2026**"; "Where: University of Toronto" updated to "Where: **McMaster University**".
- `components/interest-form-scroll.tsx`: input/label fonts swap to Inter / JetBrains Mono. Teal accent unchanged. EmailJS logic untouched.
- Phase dots and progress bar (`#00e5cc` neon teal) unchanged.

## 7. Content fixes (rolled in with the chassis work)

- **University of Toronto → McMaster University** sweep across:
  - `app/layout.tsx` (metadata description and openGraph)
  - `app/sponsors/page.tsx` (page metadata description; lede "UofT's first bioengineering hackathon" → "McMaster's first bioengineering hackathon"; "Reach … UofT students" → "Reach … McMaster students")
  - `app/past-events/page.tsx` (page metadata description)
  - `components/hero-phase.tsx` (eyebrow line)
  - `components/details-phase.tsx` (Where row)
  - `components/footer.tsx` (×2 — brand block tagline and bottom-right copy)
  - `app/about/page.tsx` and any remaining secondary pages — anywhere UofT appears in copy
- **"Coming Soon" → "Fall 2026"** in `details-phase.tsx`
- **Stats panels populated only with confirmed values** — pulled from the existing roster file at build time where applicable (`Members: 22` from counting `tier1 + tier2 + departments[*].members.length`).
- **Footer email** stays `bioengineeringformcmaster@gmail.com` (already McMaster-correct).
- **Navbar title** stays "McMaster Biohacks" (already correct).

## 8. Out of scope

- Modifying scroll-experience mechanics, frame timing, phase windows, or LERP factors
- Adding new pages or routes
- Adding new content sections beyond what the existing pages have (no new copy authoring)
- Adding a real schedule, live timer, sponsor-logo wall, or applications-form integration — these need real event data
- Cleaning up the duplicate 3-digit-padded `frame-NNN.jpg` files in `public/frames/` (separate task)
- Installing the Playwright CLI globally — handled by the user, used during implementation for screenshot QA

## 9. File-level summary

**Modified:**
- `app/layout.tsx` — font swap, metadata copy fix
- `app/globals.css` — token rewrite (CSS variables), retire `.glass-dark` if unused after redesign
- `tailwind.config.ts` — retire `brand.*`, add new tokens, keep `ticker`/`fade-in-up`/`float` keyframes
- `components/navbar.tsx` — typography + active-state refresh, eyebrow copy update
- `components/footer.tsx` — full restyle, copy fix
- `components/hero-phase.tsx`, `components/about-phase.tsx`, `components/details-phase.tsx`, `components/interest-form-scroll.tsx` — font swap, violet → teal, copy fixes
- `app/about/page.tsx` — full restructure to chassis
- `app/research/page.tsx`, `components/research-articles.tsx` — full restructure to chassis
- `app/past-events/page.tsx`, `components/past-events-grid.tsx` — full restructure to chassis
- `app/sponsors/page.tsx` — full restructure to chassis

**New:**
- `components/page-chassis.tsx` — exports `TickerStrip`, `PageHero`, `SectionHeader`, `SectionDivider`. Single source of truth for the chassis primitives. Pure presentational; no state.

**Untouched:**
- `hooks/use-scroll-animation.ts`, `hooks/use-in-view.ts`
- `components/scroll-landing.tsx`, `components/scroll-experience.tsx`, `components/loading-screen.tsx`, `components/phase-overlay.tsx`
- `public/frames/*`, `public/be4y-logo.png`, `public/Better.mp4`
- `screenshot.mjs`
- `lib/utils.ts`, `components/ui/accordion.tsx`

## 10. Verification

The implementation plan should include screenshot-based visual QA. The user is installing Playwright CLI globally; the implementer should use it (or the existing `screenshot.mjs` Puppeteer helper) to capture each page at `/`, `/about`, `/research`, `/past-events`, `/sponsors` at desktop (1440w) and mobile (390w) widths, both before and after, and confirm:

- All UofT references are gone (search the rendered HTML for "University of Toronto")
- Marquee scrolls and respects `prefers-reduced-motion`
- Active navbar link uses the new teal-deep ring
- Hero typography renders Space Grotesk (not Bebas Neue) on all routes
- Stats panels show only real values
- The home scroll experience still scrubs through all 145 frames as the user scrolls
- Phase overlays still crossfade at the correct progress thresholds
- "Register Interest" navbar CTA still jumps to the form phase via the custom event

## 11. Decisions log (from brainstorming)

- **Site posture:** Light secondary pages with hackathon-flavored visual language (not all-dark; not a hybrid dark-hero/light-body).
- **Palette:** Continuity (white + ink + neon teal) — keeps the dark landing's accent as the brand thread.
- **Typography:** Space Grotesk + Inter + JetBrains Mono.
- **Page structure:** Y / Tech Brief — marquee strip + bold sentence-case hero + lede/stats grid + chip-numbered sections.
- **Campus:** McMaster University (canonical).
- **Event timing:** Fall 2026.
- **Founded:** 2025.
- **Member count:** 22 (counted from existing roster).
- **Out:** fabricated stats, hybrid dark-hero treatment, retiring the scroll experience.
