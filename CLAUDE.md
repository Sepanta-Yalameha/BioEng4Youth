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

There are no tests in this repo.

`screenshot.mjs` is a Puppeteer helper that scrolls a page and writes a full-page PNG to `temporary screenshots/`:

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
- **There are also 145 duplicate frames with shorter padding (e.g. `frame-061.jpg`) in the same directory — they are not loaded by anything in code.** If you're sure they're stale exports, deleting them shaves significant space; don't delete without checking they're not referenced elsewhere.

## Architecture: the secondary pages

- All four club pages (`/about`, `/research`, `/past-events`, `/sponsors`) are simple top-down scrolls with `<Navbar mode="club">` + content sections + `<Footer>`.
- They use the **light** brand palette (`#FFFFFF` bg, dark hero `#0B1F26`, brand teal `#135264`, brand accent green `#70B389`) — not the dark void palette of the home page.
- Most copy is inlined in the page file itself (team rosters, sponsorship tiers, value cards, etc.). For dynamic-feeling sections (`research-articles.tsx`, `past-events-grid.tsx`) the page file imports a dedicated component.

## Design system

Two visual languages live side-by-side. Don't mix them.

**Hackathon (home / scroll experience)** — dark, neon, terminal-flavored:
- Background `--void` `#060810`
- Accent `--neuro-teal` `#00e5cc` (this is the load bar, scroll bar, phase dot, form focus, all CTAs)
- Secondary `--neuro-violet` `#a78bfa`
- Foreground `--ivory` `#e8e4dc`

**Club (secondary pages)** — white, calmer, editorial:
- Brand colors live in `tailwind.config.ts → theme.extend.colors.brand` (`primary #135264`, `accent #70B389`, `text #0B303B`, `secondary #328795`, `bg #FFFFFF`)
- Hero blocks use `#0B1F26` for a dark accent strip on top of white sections.

Typography (set in `app/layout.tsx` via `next/font`):
- `--font-display` → **Bebas Neue** — tall condensed all-caps, hero impact
- `--font-sans` → **Barlow Semi Condensed** — body / engineered / fast
- `--font-mono` → **Share Tech Mono** — eyebrows, data labels, the `01 / Register Interest` markers

shadcn/ui is configured (`components.json`) with `tsx + cssVariables`, slate base, alias `@/components/ui`, `lucide` icon library. Only `accordion.tsx` is currently in use; install new shadcn components via the standard CLI.

## Forms / EmailJS

`components/interest-form-scroll.tsx` submits via `@emailjs/browser` to two templates per submit (admin notification + user auto-reply). Service/key/template IDs are hardcoded as fallbacks in the file and can be overridden by `NEXT_PUBLIC_EMAILJS_*` env vars in `.env.local`. The template params are sent in both lowercase and capitalized variants (`name`/`Name`, etc.) so EmailJS templates work either way.

## Gotchas to know up front

- **`lucide-react` is pinned to the 0.x line (`^0.577.0`).** The 1.x line ships `.mjs` files, but Next.js 14.2's automatic barrel optimizer for `lucide-react` hardcodes `.js` extensions — installing 1.x breaks every page that imports an icon. If you bump it, also bump Next.js or disable `optimizePackageImports` for `lucide-react`.
- **The home route locks scrolling.** Don't be surprised when normal `scroll-into-view` or anchor-link tricks don't work on `/`.
- **Brand cross-talk.** Components inside `components/{hero,about,details}-phase.tsx` and `interest-form-scroll.tsx` belong to the dark hackathon palette; everything in `components/{footer,past-events-grid,research-articles}.tsx` belongs to the light club palette. Keep colors on their own side of the line.
- **Two different "interest form" components have similar names** — `interest-form-scroll.tsx` is the live one mounted by `ScrollExperience`. There used to be a `components/interest-form.tsx` (now removed); don't reintroduce it.

## File-system layout cheat sheet

- `app/` — App Router routes; `app/layout.tsx` defines fonts; `app/globals.css` has CSS variables and the `.glass` / `.glass-dark` utility classes.
- `components/` — top-level page sections (`<phase>-phase.tsx`, `interest-form-scroll.tsx`, `loading-screen.tsx`, `navbar.tsx`, `footer.tsx`, etc.).
- `components/ui/` — shadcn-style primitives (only `accordion.tsx` in use).
- `hooks/` — `use-scroll-animation.ts` is the brain of the home page; `use-in-view.ts` is a one-shot `IntersectionObserver` reveal helper used by secondary pages.
- `lib/utils.ts` — the `cn()` className combiner only.
- `public/frames/` — 145 4-digit-padded JPGs that drive the scroll animation.
- `public/be4y-logo.png`, `public/Better.mp4` — brand assets.
