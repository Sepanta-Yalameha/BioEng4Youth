# Google-Forms-backed interest form

**Status:** Draft, pending review
**Author:** Sepanta Yalameha (with Claude Code)
**Date:** 2026-05-07

## Problem

The BioHacks interest form on `/` (phase 4 of the scroll experience) currently submits to EmailJS, which sends two transactional emails (admin notify + user auto-reply) but does not produce a structured dataset. The team wants:

1. Responses visible in Google Forms' built-in dashboard (live charts, CSV export, Sheets sync) for easy lead visualization.
2. The custom dark-themed scroll-experience form UI preserved.
3. No backend or service-account credentials to maintain.

## Approach

Direct browser POST to a public Google Form's `formResponse` endpoint. The official Google Forms API only supports reading responses and editing form structure — it does not accept submitted responses. The `formResponse` POST is the standard pattern every "custom UI on top of Google Forms" tutorial uses; it has been stable for 10+ years.

EmailJS is removed entirely. The auto-reply email is dropped (per design decision); users see only the on-screen success state.

## Field schema

| Display label                    | Input type | Required | Validation              | Google Form question type |
| -------------------------------- | ---------- | -------- | ----------------------- | ------------------------- |
| Full Name                        | text       | yes      | non-empty               | Short answer              |
| Email                            | email      | yes      | non-empty + EMAIL_REGEX | Short answer              |
| Program of Study                 | text       | yes      | non-empty               | Short answer              |
| What university are you from?    | select     | yes      | one of seven options    | Dropdown (with "Other")   |

University options (in order): McMaster, University of Toronto, Waterloo, Western, Queen's, Toronto Metropolitan, Other.

When "Other" is selected, the UI reveals a free-text input that is itself required (non-empty after `.trim()`). On submit we send `entry.1295668290=__other_option__` plus `entry.1295668290.other_option_response=<typed value>`. For any non-Other selection we send the option string in `entry.1295668290` and omit the `.other_option_response` param.

The `Year of Study` field present in the EmailJS form is removed.

## Architecture

```
┌─────────────────────────┐
│ user fills form         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ client-side validate    │ — same rules + regex as today
└────────────┬────────────┘
       valid │
             ▼
┌─────────────────────────┐
│ fetch POST              │
│ formResponse endpoint   │
│ mode: "no-cors"         │
│ body: URLSearchParams   │
└────────────┬────────────┘
             │
        resolved          rejected (network)
             │                  │
             ▼                  ▼
       success state       error state
       "You're on          "Something went
       the list"           wrong. Try again."
```

Single component touched. No new components, hooks, or routes.

## Configuration

The component reads five environment variables, with hardcoded fallbacks so the form works on first checkout without env setup:

```
NEXT_PUBLIC_GOOGLE_FORM_ID=1FAIpQLSeIIYtZLEXKbYTeqk2HUiADYLdfzFfcQm9gCowMRPMZfAZIkw
NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME=entry.1890073431
NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL=entry.984592493
NEXT_PUBLIC_GOOGLE_FORM_ENTRY_PROGRAM=entry.546667181
NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UNIVERSITY=entry.1295668290
```

The submit URL is built as `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`.

A `.env.local.example` is committed to document the variables (with the same default values, so the file doubles as authoritative reference). The actual `.env.local` is ignored by `.gitignore` (already covered by `.env*.local`).

## Files changed

- **`components/interest-form-scroll.tsx`** — rewrite the submit handler; replace the Year `<select>` with a University `<select>` + conditional Other input; remove EmailJS imports and template-ID constants; keep all visual styling, focus states, error styling, and the success state copy.
- **`package.json` / `package-lock.json`** — remove `@emailjs/browser` from dependencies.
- **`.env.local.example`** — new file documenting the five env vars.

## Error handling

| Failure mode                            | Behavior                                                 |
| --------------------------------------- | -------------------------------------------------------- |
| Empty required field                    | Inline red label "Required" next to that field           |
| Invalid email format                    | Inline red label "Enter a valid email"                   |
| University = Other with empty free-text | Inline red label "Required" on the Other input           |
| `fetch` rejects (offline, DNS fail)     | Whole-form error "Something went wrong. Try again."      |
| `fetch` resolves with non-200 (rare)    | Treated as success — `mode: "no-cors"` hides the status  |

The CORS-induced inability to read the response is acceptable: the `formResponse` endpoint accepts arbitrary submissions without rejecting on bad entry IDs, and Google has not changed its behavior in over a decade. If submissions silently stop landing, the only signal is "the Responses tab is empty"; the spec accepts that risk.

## What we're not building (YAGNI)

- **No auto-reply email.** Per the receipt decision, we drop transactional confirmation emails. The Google Form's "send a copy" feature stays off.
- **No analytics/tracking.** No GA event, no Vercel Analytics call. Submissions are tracked solely by the Google Forms response count.
- **No optimistic submit / retry.** A single attempt; if it fails, the user retries by clicking Submit again.
- **No EmailJS coexistence.** EmailJS is removed entirely, not stubbed for fallback.
- **No server-side proxy.** All submission happens client-side.

## Setup state

The Google Form has already been created with the four questions above. The form ID and four entry IDs are recorded in the configuration section. The "send a copy" setting is to be confirmed off (no receipt path is implemented in the code, so leaving it on "When requested" is harmless — Google simply never receives a request from our UI).

The team-side action items remaining before merge:
- Confirm `Settings > Responses > Send respondents a copy of their response` is `Off`.
- Submit one test response after deploy and verify it appears in the Responses tab.

## Verification (manual)

This repo has no automated test suite. Verification is manual:

1. `npm run dev`, open `http://localhost:3000`.
2. Scroll to phase 4 (the form).
3. Submit one entry with each field filled, picking a non-Other university.
4. Confirm the success state renders.
5. Open the Google Form's Responses tab — confirm the entry appears with all four values mapped to the correct columns.
6. Submit a second entry with University = Other and a typed value (e.g. "University of Calgary").
7. Confirm the Responses tab shows `Other (University of Calgary)` or similar in the University column.
8. Submit a third entry with an invalid email — confirm inline error and no network request.
9. Toggle airplane mode, submit a valid entry — confirm whole-form error message and the form remains editable.
