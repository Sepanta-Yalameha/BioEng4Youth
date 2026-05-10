# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

Marketing site for **BioHacks**, a bioengineering hackathon hosted at McMaster by the **BioEng4Youth** student nonprofit. **Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui scaffolding**. No backend, no DB, no tests — submissions go to a public Google Form.

Two visually distinct experiences share the same navbar:
1. **`/`** — scroll-driven landing with native scroll hijacked, scrubbing through 145 pre-rendered frames.
2. **`/about`, `/research`, `/past-events`, `/sponsors`** — traditional top-down static pages on white.

The navbar takes `mode="hackathon" | "club"` and swaps the title block.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # next lint
```

There's no test runner. For visual verification use the auto-loaded **`playwright-cli`** skill (e.g. `playwright-cli open http://localhost:3000`). `screenshot.mjs` is a Puppeteer one-shot that writes a full-page PNG to `temporary screenshots/`.

## Scroll experience (the home route)

Mounting:

```
app/page.tsx → ScrollLanding
  ├── LoadingScreen          # preloads 145 frames, then unmounts
  └── ScrollExperience       # canvas + 4 phase overlays + useScrollAnimation
```

Read `hooks/use-scroll-animation.ts` before touching scroll behaviour:

- The hook attaches non-passive `wheel` + `touchmove` listeners with `e.preventDefault()` and accumulates a virtual scroll position over `window.innerHeight * 4`. **Native scroll never happens on `/`** — `scroll-into-view` and anchor links don't work here.
- Progress (`0..1`) is target-driven, LERPed every frame at `0.08`. `progress * 145 → currentFrame`. The canvas RAF only redraws when the chosen frame changes.
- `PHASES` splits progress into 4 named windows (`hero`, `about`, `details`, `form`); `PhaseOverlay` crossfades on `activePhase`.
- Frames live at `public/frames/frame-NNNN.jpg` (4-digit padded, `0001`–`0145`). `LoadingScreen` loads in batches of 20.
- **Cross-route deep-linking**: navbar's "Register Interest" links to `/#form` and dispatches `biohacks:jumpToPhase` (`detail: "form"`). The hook reads `location.hash` on mount and listens for the custom event during the session.

## Secondary pages

All four club pages compose `<Navbar mode="club">` → `pt-20` + `TickerStrip` → `PageHero` → `SectionDivider` → numbered sections (`SectionHeader` + content) → optional dark closing band → `<Footer>`. `app/about/page.tsx` is the canonical example.

`components/page-chassis.tsx` exports the four sanctioned primitives — use these, don't reinvent:

- `<TickerStrip items={[{text}, ...]}>` — full-width dark scrolling band. Reuses the `ticker` keyframe (declared inline in `globals.css` because Tailwind's JIT only emits it when the matching `animate-ticker` utility appears in source, and the strip uses the hand-written `.ticker-content` class instead).
- `<PageHero eyebrow headline lede stats? primaryCta? secondaryCta?>` — wrap accented nouns in `<span className="text-neuro-teal-deep">`. CTAs accept `external?: boolean` for plain `<a target="_blank">` (assets / external URLs).
- `<SectionHeader index="02" title="..." />` — chip + title + chevron.
- `<SectionDivider />` — 1px ink rule.

Most copy is inlined in the page file (rosters, sponsorship tiers, value cards). Two sections live in their own components (`research-articles.tsx`, `past-events-grid.tsx`) — both apply chassis tokens but own their layout.

**Real numbers only.** Stats in `PageHero` and inline copy must derive from in-repo data — count the roster array literally. Don't fabricate.

## Design system

One palette, two surfaces, shared neon-teal accent.

Tokens live in `app/globals.css` and are exposed via `tailwind.config.ts`. Solid colors are stored as **space-separated RGB triplets** so Tailwind's `<color>/<alpha>` modifier composes through `rgb(var(--token) / <alpha-value>)`. Direct CSS or inline `style={{}}` consumers must wrap with `rgb(...)`.

| Token | Value | Usage |
|---|---|---|
| `--paper` | `255 255 255` | Body bg on secondary pages |
| `--paper-2` | `246 247 249` | Banded alt section bg |
| `--ink` | `11 15 24` | Body text, navbar pill, footer, dark bands, primary buttons |
| `--neuro-teal` | `0 229 204` | Bright accent — **dark surfaces only** |
| `--neuro-teal-deep` | `0 184 158` | Light-bg accent — sub-AA on white, kept for brand thread |
| `--void` | `6 8 16` | Scroll-experience background |
| `--ivory` | `232 228 220` | Body text on dark surfaces |
| `--rule` | `rgba(11,15,24,0.10)` | Hairline borders — pre-mixed alpha |
| `--muted` | `rgba(11,15,24,0.60)` | Secondary text — pre-mixed alpha |
| `--muted-soft` | `rgba(11,15,24,0.40)` | Tertiary text — pre-mixed alpha |

`--rule` / `--muted` / `--muted-soft` are pre-mixed `rgba()` because they're used at fixed opacity — `text-muted/50` won't work; use `text-muted-soft`.

**Fonts** (set via `next/font` in `app/layout.tsx`):
- `--font-display` → **Space Grotesk** — sentence-case headlines, section titles, button labels
- `--font-sans` → **Inter** — body, lede, navigation
- `--font-mono` → **JetBrains Mono** — eyebrows, section numbers, ticker, data labels

Headlines: sentence case, `tracking-[-0.025em]` to `-0.045em` at large sizes, accented noun in `text-neuro-teal-deep` (light) or inline `style={{ color: "#00e5cc" }}` (dark). Eyebrows: `9–11px`, `tracking-[0.22em]` to `0.5em`, uppercase.

shadcn/ui is configured (`components.json`, alias `@/components/ui`). Only `accordion.tsx` is currently in use. Its HSL tokens in `globals.css` are remapped — `--accent` and `--ring` use `172 100% 36%` to match `--neuro-teal-deep`.

## Forms / Google Forms

`components/interest-form-scroll.tsx` POSTs to `https://docs.google.com/forms/d/e/<FORM_ID>/formResponse` with `mode: "no-cors"`. No backend. Field-to-`entry.NNNN` mapping reads `NEXT_PUBLIC_GOOGLE_FORM_*` env vars with hardcoded fallbacks (see `.env.local.example`). To target a different form, get the entry IDs from a "Get pre-filled link" URL on the Google Form.

The "Other" university option uses Google's wire format: `entry.<ID>=__other_option__` plus `entry.<ID>.other_option_response=<typed value>`.

Two Google-side settings the form depends on:
- **Settings → Responses**: Collect email addresses **Off**, Limit to 1 response **Off**, no Restrict-to-org banner. Any of those silently drops anonymous POSTs.
- Because of `mode: "no-cors"`, fetch resolves successfully regardless of what Google does. The only proof a submission landed is checking the Responses tab.

## Research articles

`components/research-articles.tsx` lists 4 articles whose source files live in `public/research/` (3 PDFs + 1 docx). Each row is an `<a target="_blank">` to its source — PDFs render in-browser, the `.docx` downloads. Add new articles by appending to the `articles` array with `title / tags / abstract / href` (and optional `author`).

## Gotchas

- **`lucide-react` is pinned to 0.x (`^0.577.0`).** The 1.x line ships `.mjs`; Next 14.2's barrel optimizer for `lucide-react` hardcodes `.js` extensions and breaks every icon import. To bump, also bump Next or disable `optimizePackageImports` for it.
- **Token format matters for opacity.** Solid CSS-var tokens are space-separated RGB triplets *without* `rgb(...)`; `tailwind.config.ts` wraps them. Switching one to a hex literal silently kills every `bg-ink/85` / `ring-neuro-teal/50` etc. Inline / raw CSS consumers must wrap: `rgb(var(--paper))`.
- **Phase overlays vs page chassis.** `components/{hero,about,details}-phase.tsx` and `interest-form-scroll.tsx` are dark scroll-experience overlays — they sit on `--void` and use `#00e5cc` (bright neon teal) directly via inline styles. Everything else (`navbar`, `footer`, `page-chassis`, secondary pages) uses Tailwind classes against the new tokens. Don't mix them.
- **`no-cors` form submits look successful even when Google rejects them.** If anything about the Google Form changes (settings, IDs, owner), submit a real test via the dev UI and check the Responses tab — the in-app success state is not proof.
- **The home route locks scrolling.** Don't reach for `scroll-into-view` or anchor scrolling on `/`.

## File-system layout

- `app/` — App Router routes; `layout.tsx` defines fonts; `globals.css` has tokens, `.glass` / `.glass-dark` utilities, and the inline ticker keyframe.
- `components/` — page sections (`<phase>-phase.tsx`, `interest-form-scroll.tsx`, `loading-screen.tsx`, `navbar.tsx`, `footer.tsx`, `page-chassis.tsx`, `research-articles.tsx`, `past-events-grid.tsx`, etc.). `components/ui/accordion.tsx` is the only shadcn primitive in use.
- `hooks/` — `use-scroll-animation.ts` (home-page brain), `use-in-view.ts` (one-shot IntersectionObserver reveal).
- `lib/utils.ts` — `cn()` only.
- `public/frames/` — 145 padded JPGs driving the scroll. `public/team/` — roster headshots. `public/research/` — article source files.
- `public/be4y-logo.png`, `public/Better.mp4`, `public/bioeng4youth-sponsorship-package.pdf`, `public/research-case-competition-abstract.pdf` — brand & content assets.
- `.env.local.example` — Google Form env vars.
- `docs/superpowers/specs/`, `docs/superpowers/plans/` — design specs and implementation plans. Read the latest spec for any feature before changing related code.
- `.claude/skills/playwright-cli/` — auto-loaded browser-driving skill.
