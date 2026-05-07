# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Marketing site for **BioHacks**, a bioengineering hackathon hosted at McMaster by the **BioEng4Youth** student nonprofit. Built with **Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui scaffolding**.

The repo contains two visually distinct experiences sharing a single navbar:

1. **`/` — the BioHacks scroll-driven landing page** (a fixed full-screen canvas that scrubs through 145 pre-rendered frames as the user scrolls; native scroll is hijacked).
2. **`/about`, `/research`, `/past-events`, `/sponsors` — traditional static pages** for the BioEng4Youth club, on a white background with the same nav and a shared footer.

The navbar takes a `mode="hackathon" | "club"` prop and renders a slightly different title block for each.

## Commands

```bash
npm run dev      # Next.js dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint (eslint-config-next)
```

There are no automated tests in this repo. Verification is manual or scripted via the **playwright-cli skill** (auto-loaded from `.claude/skills/playwright-cli/`). Drive a browser without writing a script:

```bash
playwright-cli open http://localhost:3000/#form  # opens Chromium and goes to the form
playwright-cli snapshot                          # accessibility tree + element refs
playwright-cli fill <ref> "value"                # fill a textbox
playwright-cli select <ref> "Option"             # pick a dropdown option
playwright-cli click <ref>                       # click
playwright-cli close                             # close the browser
```

`screenshot.mjs` is a separate Puppeteer-based helper that scrolls a page and writes a full-page PNG to `temporary screenshots/`:

```bash
node screenshot.mjs [url] [label]      # defaults: http://localhost:3000, no label
```

It hardcodes a Chrome path under `~/.cache/puppeteer/...` — if that path doesn't exist on a new machine, run `npx puppeteer browsers install chrome-headless-shell` and update the path in `screenshot.mjs`.

## Architecture: the scroll experience

The home page is the most opinionated piece of the codebase. Everything below this section that lives under `components/` is a piece of it. Order of mounting:

```
app/page.tsx
└── ScrollLanding
    ├── LoadingScreen          # preloads all 145 frames, then unmounts
    └── ScrollExperience       # canvas + phase overlays (after frames are ready)
        ├── PhaseOverlay × 4   # crossfades between phases
        │   ├── HeroPhase
        │   ├── AboutPhase
        │   ├── DetailsPhase
        │   └── InterestFormScroll
        └── useScrollAnimation # virtual scroll + LERP + phase state
```

### Scroll model — read this before changing anything in `hooks/use-scroll-animation.ts`

- The home page **hijacks native scroll**. The hook attaches non-passive `wheel` and `touchmove` listeners with `e.preventDefault()` and accumulates a virtual scroll position over `window.innerHeight * 4`. Native scrolling does not happen on `/`. Don't add elements that expect native scroll-into-view.
- Progress (`0..1`) is target-driven and **LERPed** every frame (`factor 0.08`) into a smoothed `progressRef`.
- `progressRef * 145` is floored to pick the current frame. `ScrollExperience` runs its own RAF loop and only redraws when the chosen frame changes.
- Progress is split into 4 named windows (`hero`, `about`, `details`, `form`) declared in `PHASES`. The hook exposes `activePhase` for overlay visibility; `PhaseOverlay` does the crossfade.
- Cross-page deep-linking to a phase uses a **custom event** plus URL hash. The navbar's "Register Interest" button dispatches `biohacks:jumpToPhase` with `detail: "form"` and links to `/#form`. The hook listens for both: on mount it reads `location.hash`, and during the session it listens for the custom event. On non-home routes the dispatch is a no-op; once the home route mounts, the hash drives the initial jump.

### Frames

- `public/frames/frame-NNNN.jpg` (4-digit padded, `0001`–`0145`) is the canonical set. `LoadingScreen` builds paths via `String(index + 1).padStart(4, "0")`.
- `LoadingScreen` loads frames in batches of 20 in parallel and updates a `0..100` progress counter.
- `frames` is passed to `ScrollExperience` as a prop, which draws the chosen frame onto a `cover`-fitting canvas every RAF.

## Architecture: the secondary pages

- All four club pages (`/about`, `/research`, `/past-events`, `/sponsors`) are simple top-down scrolls with `<Navbar mode="club">` + content sections + `<Footer>`.
- They share a unified visual language with the home scroll experience (white surface, ink text, neon-teal accent), composed from a small set of presentational primitives in `components/page-chassis.tsx`. The chassis exports four exports — they are the only sanctioned way to build a secondary-page section header / hero / divider / ticker:
  - `<TickerStrip items={[{text}, ...]} />` — full-width dark band that scrolls left, reuses the `ticker` keyframe in `app/globals.css`. Items are duplicated internally so the `-50%` translate loops seamlessly. Wrap in a `pt-20` container so it clears the floating navbar.
  - `<PageHero eyebrow headline lede stats? primaryCta? secondaryCta? />` — eyebrow seal pill + Space Grotesk headline (callers wrap the accented noun in `<span className="text-neuro-teal-deep">`) + lede paragraph + optional stats column + optional CTA pair. Stats panel and CTAs are hidden when omitted.
  - `<SectionHeader index="02" title="..." />` — `[chip] [title] ........ [→]` separator. The `index` is rendered in JetBrains Mono inside a teal-deep chip; the chevron is anchored right.
  - `<SectionDivider />` — full-width 1px ink rule between major sections.
- Each secondary page lays out as: `Navbar mode="club"` → `pt-20` + `TickerStrip` → `PageHero` → `SectionDivider` → numbered sections (`SectionHeader` + content) interleaved with `SectionDivider` → optional dark closing band → `Footer`. See `app/about/page.tsx` for the canonical example.
- Most copy is inlined in the page file itself (team rosters, sponsorship tiers, value cards, etc.). For dynamic-feeling sections (`research-articles.tsx`, `past-events-grid.tsx`) the page file imports a dedicated component. Both rendered components apply the same chassis tokens but own their own internal layout.
- **Real numbers only.** Stats panels (`Founded 2025`, `Members 22`, etc.) must derive from in-repo data — count the roster array literally rather than rounding up. Don't fabricate numbers in copy; this is a saved memory rule.

## Design system

One palette, two surfaces. Both surfaces share the same accent (neon teal) so the dark home scroll experience and the light secondary pages read as one brand.

**Tokens (defined in `app/globals.css`, exposed via `tailwind.config.ts`):**

Solid colors are stored as space-separated RGB triplets so Tailwind's `<color>/<alpha>` modifier composes through the `rgb(var(--token) / <alpha-value>)` pattern (e.g. `bg-ink/85`, `ring-neuro-teal/50`). When you reference these vars from raw CSS or inline `style={{}}`, **wrap them in `rgb(...)`** — see `body { background: rgb(var(--paper)) }` in globals.css and the footer's gradient bar for examples.

| Token | Value | Usage |
|---|---|---|
| `--paper` | `255 255 255` | Body bg on secondary pages |
| `--paper-2` | `246 247 249` | Alt section bg (banded sections) |
| `--ink` | `11 15 24` | Body text, navbar pill, footer, dark closing bands, primary buttons |
| `--neuro-teal` | `0 229 204` | Bright accent — **dark surfaces only** (CTAs on ink, scroll progress bar, phase dots) |
| `--neuro-teal-deep` | `0 184 158` | Light-bg accent — headline accent words, mono eyebrows, section chips, ring colors. Sub-AA on white, kept intentionally for brand thread |
| `--void` | `6 8 16` | Scroll-experience background |
| `--ivory` | `232 228 220` | Body text on dark surfaces (scroll page overlays) |
| `--rule` | `rgba(11,15,24,0.10)` | Hairline borders, dividers — pre-mixed alpha |
| `--muted` | `rgba(11,15,24,0.60)` | Secondary text — pre-mixed alpha |
| `--muted-soft` | `rgba(11,15,24,0.40)` | Tertiary / eyebrow text — pre-mixed alpha |

`--rule` / `--muted` / `--muted-soft` are full `rgba()` strings because they're used at fixed opacity. Don't try `text-muted/50`; use `text-muted-soft` instead.

**Typography (set in `app/layout.tsx` via `next/font`):**
- `--font-display` → **Space Grotesk** (500/600/700) — sentence-case headlines, section titles, button labels
- `--font-sans` → **Inter** (300–800) — body, lede, navigation
- `--font-mono` → **JetBrains Mono** (400/500) — eyebrows, section numbers, ticker copy, data labels

Headline conventions: sentence case, `tracking-[-0.025em]` to `tracking-[-0.045em]` at large sizes, with the noun-in-focus wrapped in `<span className="text-neuro-teal-deep">` on light pages or `style={{ color: "#00e5cc" }}` on dark.

Eyebrow conventions: JetBrains Mono, 9–11px, `tracking-[0.22em]` to `tracking-[0.5em]`, uppercase. Pattern: `01 / Section name` or `★ MARQUEE ITEM`.

shadcn/ui is configured (`components.json`) with `tsx + cssVariables`, slate base, alias `@/components/ui`, `lucide` icon library. Only `accordion.tsx` is currently in use; install new shadcn components via the standard CLI. The shadcn HSL tokens (`--background`, `--foreground`, `--accent`, etc.) live in the `@layer base` block in globals.css and are remapped to match the new palette — `--accent` and `--ring` use `172 100% 36%` to match `--neuro-teal-deep #00b89e` exactly.

**Retired (do not reintroduce):** `brand.primary`, `brand.accent`, `brand.text`, `brand.secondary`, `brand.bg` (sage-green + medical-teal) and `--neuro-violet` (`#a78bfa`). Old hex literals to avoid: `#70B389`, `#135264`, `#0B1F26`, `#0B303B`, `#328795`, `#a78bfa`. Old fonts: Bebas Neue, Barlow Semi Condensed, Share Tech Mono.

## Forms / Google Forms

`components/interest-form-scroll.tsx` submits directly to a public Google Form via `fetch` POST to `https://docs.google.com/forms/d/e/<FORM_ID>/formResponse` with `mode: "no-cors"`. Responses land in the form's Responses tab (and any linked Sheet). No EmailJS, no backend, no auto-reply email — just data into Google Forms.

Field-to-`entry.NNNN` mapping is configured via env vars (with hardcoded fallbacks in source so a fresh checkout works): `NEXT_PUBLIC_GOOGLE_FORM_ID`, `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME`, `..._EMAIL`, `..._PROGRAM`, `..._UNIVERSITY`. The full reference is in `.env.local.example`. To target a different form, get its entry IDs from a "Get pre-filled link" URL on the Google Form (click the kebab menu next to "Send").

The form's "Other" university option uses Google's wire format: `entry.<ID>=__other_option__` plus a companion `entry.<ID>.other_option_response=<typed value>`.

Two Google-side settings the form depends on (toggle these on the form, not in code):
- **Settings → Responses → Collect email addresses** must be **Off**, **Limit to 1 response** must be **Off**, and there must be no **Restrict to org** banner. Any of those forces sign-in and silently drops anonymous POSTs from this UI.
- Because of `mode: "no-cors"`, fetch resolves successfully regardless of what Google does with the submission. The only reliable way to verify a submission landed is to check the Responses tab.

## Gotchas to know up front

- **`lucide-react` is pinned to the 0.x line (`^0.577.0`).** The 1.x line ships `.mjs` files, but Next.js 14.2's automatic barrel optimizer for `lucide-react` hardcodes `.js` extensions — installing 1.x breaks every page that imports an icon. If you bump it, also bump Next.js or disable `optimizePackageImports` for `lucide-react`.
- **The home route locks scrolling.** Don't be surprised when normal `scroll-into-view` or anchor-link tricks don't work on `/`.
- **Token format matters for opacity.** Solid CSS-variable tokens (`--ink`, `--paper`, `--neuro-teal`, etc.) are stored as space-separated RGB triplets *without* `rgb(...)`, and `tailwind.config.ts` wraps them with `rgb(var(--x) / <alpha-value>)`. If you change a token to a hex literal, every `bg-ink/85` / `ring-neuro-teal/50` / `bg-neuro-teal-deep/22` opacity modifier silently disappears from the compiled CSS. Direct CSS-var consumers (raw CSS or inline `style={{}}`) must wrap the variable: `rgb(var(--paper))`, not `var(--paper)`.
- **Tailwind keyframes are utility-gated.** Tailwind's JIT only emits `@keyframes <name>` when the matching `animate-<name>` utility appears in scanned source. Because the chassis ticker uses a hand-written `.ticker-content` class (not `animate-ticker`), `@keyframes ticker` is declared inline in `app/globals.css`. Don't delete the inline keyframe and rely on the `tailwind.config.ts` entry alone.
- **Phase overlays vs page chassis.** Components inside `components/{hero,about,details}-phase.tsx` and `interest-form-scroll.tsx` are the dark scroll-experience overlays — they sit on `--void` and use `#00e5cc` (bright neon teal) directly via inline styles. Everything else (`navbar.tsx`, `footer.tsx`, `page-chassis.tsx`, secondary pages) uses Tailwind classes against the new tokens. Don't drop dark-overlay inline hexes into the secondary pages, and don't put light-page Tailwind tokens onto the phase overlays.
- **`no-cors` form submits look successful even when Google rejects them.** If you change anything about the Google Form (settings, entry IDs, ownership), submit a real test via the dev UI and verify the row appears in the Responses tab — the in-app success state is not proof.

## File-system layout cheat sheet

- `app/` — App Router routes; `app/layout.tsx` defines fonts; `app/globals.css` has CSS variables and the `.glass` / `.glass-dark` utility classes.
- `components/` — top-level page sections (`<phase>-phase.tsx`, `interest-form-scroll.tsx`, `loading-screen.tsx`, `navbar.tsx`, `footer.tsx`, etc.). `page-chassis.tsx` exports the four shared primitives every secondary page composes (`TickerStrip`, `PageHero`, `SectionHeader`, `SectionDivider`).
- `components/ui/` — shadcn-style primitives (only `accordion.tsx` in use).
- `hooks/` — `use-scroll-animation.ts` is the brain of the home page; `use-in-view.ts` is a one-shot `IntersectionObserver` reveal helper used by secondary pages.
- `lib/utils.ts` — the `cn()` className combiner only.
- `public/frames/` — 145 4-digit-padded JPGs that drive the scroll animation.
- `public/be4y-logo.png`, `public/Better.mp4` — brand assets.
- `.env.local.example` — documents the Google Form env vars (the form ID + four `entry.NNN` IDs).
- `docs/superpowers/specs/`, `docs/superpowers/plans/` — design specs and implementation plans written by the brainstorming/writing-plans skills. Read the latest spec for any feature before changing related code.
- `.claude/skills/playwright-cli/` — auto-loaded skill that lets any Claude Code session in this repo drive a browser via the `playwright-cli` command (no test-script setup needed).
