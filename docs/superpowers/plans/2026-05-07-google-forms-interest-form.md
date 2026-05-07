# Google-Forms-backed Interest Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the EmailJS-backed interest form on `/` (phase 4 of the scroll experience) with a custom UI that POSTs directly to a public Google Form, dropping all EmailJS dependencies.

**Architecture:** Single-component rewrite of `components/interest-form-scroll.tsx`. The submit handler builds `URLSearchParams` of the four field values (keyed by entry IDs from the Google Form) and `fetch`-POSTs them to `https://docs.google.com/forms/d/e/<FORM_ID>/formResponse` with `mode: "no-cors"`. The Year-of-Study `<select>` is replaced with a University `<select>` (Ontario big six + Other) that conditionally renders a free-text input when "Other" is selected. The `@emailjs/browser` dependency is removed.

**Tech Stack:** Next.js 14 (App Router, client component), TypeScript, Tailwind. No new dependencies.

**Reference:** `docs/superpowers/specs/2026-05-07-google-forms-interest-form-design.md`

---

## Pre-flight

Before starting, verify:
- The dev server is running (`curl -s http://localhost:3000/` returns HTTP 200). If not, run `npm run dev` in a separate terminal.
- You are on `main` with a clean working tree (`git status` shows no uncommitted changes).

If both are true, proceed to Task 1.

---

### Task 1: Add `.env.local.example` documenting the form configuration

**Files:**
- Create: `.env.local.example`

- [ ] **Step 1: Create the file**

Write the following exact content to `/home/sepanta/BioEng4Youth/.env.local.example`:

```
# Public Google Form configuration for the BioHacks interest form.
#
# These values are also hardcoded as fallbacks in
# components/interest-form-scroll.tsx, so the form works on a fresh
# checkout without copying this file. Override only if you're pointing
# at a different form.
#
# To get values for a different form: open the form, click the kebab
# menu (top-right) > "Get pre-filled link", fill each field with a
# unique placeholder, click "Get link" > "Copy link", and read the
# entry.NNNN IDs out of the resulting URL.

NEXT_PUBLIC_GOOGLE_FORM_ID=1FAIpQLSeIIYtZLEXKbYTeqk2HUiADYLdfzFfcQm9gCowMRPMZfAZIkw
NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME=entry.1890073431
NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL=entry.984592493
NEXT_PUBLIC_GOOGLE_FORM_ENTRY_PROGRAM=entry.546667181
NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UNIVERSITY=entry.1295668290
```

- [ ] **Step 2: Verify**

Run: `cat .env.local.example | wc -l`
Expected: `17` (16 lines of content + trailing newline)

- [ ] **Step 3: Commit**

```bash
git add .env.local.example
git commit -m "Add .env.local.example documenting Google Form config"
```

---

### Task 2: Replace EmailJS with Google Forms POST in `interest-form-scroll.tsx`

This task fully rewrites the component. The bottom `Field` helper component (currently lines 331–403) stays bit-for-bit identical; only the imports, configuration constants, types, state, validation, submit handler, and the Year `<select>` block change.

**Files:**
- Modify: `components/interest-form-scroll.tsx` (lines 1–329)

- [ ] **Step 1: Replace lines 1–329 of the file**

Open `components/interest-form-scroll.tsx`. Keep lines 331 onward (the `Field` helper) untouched. Replace everything from the start of the file through the closing `}` of the `InterestFormScroll` component (currently line 329) with the following:

```tsx
"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Google Forms configuration
//
// Submissions POST directly to a public Google Form's formResponse endpoint.
// IDs are read from process.env first, with hardcoded fallbacks so the form
// works on a fresh checkout. To point at a different form, see .env.local.example.
// ─────────────────────────────────────────────────────────────────────────────
const GOOGLE_FORM_ID =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_ID ||
  "1FAIpQLSeIIYtZLEXKbYTeqk2HUiADYLdfzFfcQm9gCowMRPMZfAZIkw";
const ENTRY_NAME =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME || "entry.1890073431";
const ENTRY_EMAIL =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL || "entry.984592493";
const ENTRY_PROGRAM =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_PROGRAM || "entry.546667181";
const ENTRY_UNIVERSITY =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UNIVERSITY || "entry.1295668290";

const FORM_RESPONSE_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

const UNIVERSITY_OPTIONS = [
  "McMaster",
  "University of Toronto",
  "Waterloo",
  "Western",
  "Queen's",
  "Toronto Metropolitan",
  "Other",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  program: string;
  university: string;
  universityOther: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function InterestFormScroll() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    program: "",
    university: "",
    universityOther: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (data: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!data.name.trim()) next.name = "Required";
    if (!data.email.trim()) next.email = "Required";
    else if (!EMAIL_REGEX.test(data.email.trim())) next.email = "Enter a valid email";
    if (!data.program.trim()) next.program = "Required";
    if (!data.university) next.university = "Required";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setLoading(true);

    const params = new URLSearchParams();
    params.set(ENTRY_NAME, formData.name.trim());
    params.set(ENTRY_EMAIL, formData.email.trim());
    params.set(ENTRY_PROGRAM, formData.program.trim());

    if (formData.university === "Other") {
      params.set(ENTRY_UNIVERSITY, "__other_option__");
      params.set(`${ENTRY_UNIVERSITY}.other_option_response`, formData.universityOther.trim());
    } else {
      params.set(ENTRY_UNIVERSITY, formData.university);
    }

    try {
      await fetch(FORM_RESPONSE_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Google Forms submission failed:", err);
      setSubmitError("Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full h-full flex items-center justify-center px-4">
        <div
          className="w-full max-w-[340px] p-9 text-center"
          style={{
            background: "rgba(4, 5, 14, 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div
            className="text-[11px] tracking-[0.45em] uppercase mb-5"
            style={{ fontFamily: "var(--font-mono)", color: "#00e5cc" }}
          >
            Received
          </div>
          <p
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#e8e4dc",
              letterSpacing: "-0.02em",
            }}
          >
            You&apos;re on the list.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(232,228,220,0.7)" }}
          >
            We&apos;ll be in touch at{" "}
            <span style={{ color: "#00e5cc" }}>{formData.email}</span>.
          </p>
          <div className="mx-auto mt-6 w-10 h-px" style={{ background: "#00e5cc", opacity: 0.5 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div
        className="w-full max-w-[360px] p-8"
        style={{
          background: "rgba(4, 5, 14, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <div
          className="text-[11px] tracking-[0.45em] uppercase mb-3"
          style={{ fontFamily: "var(--font-mono)", color: "#00e5cc" }}
        >
          03 &nbsp;/&nbsp; Register Interest
        </div>

        <h2
          className="font-bold mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            color: "#e8e4dc",
            letterSpacing: "-0.02em",
          }}
        >
          Count Me In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          <Field
            label="Full Name"
            id="name"
            type="text"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={handleChange("name")}
            focused={focused === "name"}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            error={errors.name}
            autoComplete="name"
          />

          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="jane@example.com"
            value={formData.email}
            onChange={handleChange("email")}
            focused={focused === "email"}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            error={errors.email}
            autoComplete="email"
            inputMode="email"
          />

          <Field
            label="Program of Study"
            id="program"
            type="text"
            placeholder="e.g. Biomedical Engineering"
            value={formData.program}
            onChange={handleChange("program")}
            focused={focused === "program"}
            onFocus={() => setFocused("program")}
            onBlur={() => setFocused(null)}
            error={errors.program}
          />

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label
                htmlFor="university"
                className="block text-[9px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "#6b7280" }}
              >
                University
              </label>
              {errors.university && (
                <span
                  className="text-[9px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: "#ff6b6b" }}
                >
                  {errors.university}
                </span>
              )}
            </div>
            <select
              id="university"
              value={formData.university}
              onChange={handleChange("university")}
              className="w-full px-4 py-2.5 text-sm appearance-none"
              style={{
                fontFamily: "var(--font-sans)",
                background: "rgba(6,8,16,0.7)",
                border: `1px solid ${
                  errors.university
                    ? "rgba(255,107,107,0.55)"
                    : focused === "university"
                    ? "rgba(0,229,204,0.55)"
                    : "rgba(255,255,255,0.12)"
                }`,
                color: formData.university ? "#e8e4dc" : "rgba(255,255,255,0.22)",
                outline: "none",
              }}
              onFocus={() => setFocused("university")}
              onBlur={() => setFocused(null)}
            >
              <option value="" style={{ color: "#6b7280", background: "#060810" }}>
                Select university
              </option>
              {UNIVERSITY_OPTIONS.map((u) => (
                <option key={u} value={u} style={{ color: "#e8e4dc", background: "#060810" }}>
                  {u}
                </option>
              ))}
            </select>
            {formData.university === "Other" && (
              <div className="mt-3">
                <Field
                  label="Specify university"
                  id="universityOther"
                  type="text"
                  placeholder="University name"
                  value={formData.universityOther}
                  onChange={handleChange("universityOther")}
                  focused={focused === "universityOther"}
                  onFocus={() => setFocused("universityOther")}
                  onBlur={() => setFocused(null)}
                  error={errors.universityOther}
                />
              </div>
            )}
          </div>

          {submitError && (
            <p
              className="text-[10px] tracking-[0.25em] uppercase pt-1"
              style={{ fontFamily: "var(--font-mono)", color: "#ff6b6b" }}
            >
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-4 font-semibold text-base tracking-wide transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            style={{
              fontFamily: "var(--font-sans)",
              background: loading ? "rgba(0,229,204,0.55)" : "#00e5cc",
              color: "#04050c",
              letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = "#fff";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.background = "#00e5cc";
            }}
          >
            {loading ? (
              <>
                <span
                  className="inline-block w-3.5 h-3.5 rounded-full animate-spin"
                  style={{
                    border: "2px solid rgba(4,5,12,0.3)",
                    borderTopColor: "#04050c",
                  }}
                />
                Submitting...
              </>
            ) : (
              "Submit Interest"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
```

**Note:** the `Field` helper at the bottom of the file (currently around lines 331–403, beginning `function Field({`) is unchanged. Do not delete or modify it.

The success-state copy was also updated: the EmailJS-era line "Check your inbox — we just sent a confirmation to ..." is now "We'll be in touch at ..." (no auto-reply email is sent under the new flow).

- [ ] **Step 2: Verify the file still has the Field helper at the bottom**

Run: `grep -n "^function Field" components/interest-form-scroll.tsx`
Expected: one line, e.g. `XXX:function Field({` where XXX is some line number.

If `grep` returns nothing, the helper was accidentally deleted — restore it from git: `git checkout HEAD -- components/interest-form-scroll.tsx` and redo Step 1.

- [ ] **Step 3: Verify the dev server compiles the new file**

Run: `curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3000/`
Expected: `HTTP 200`

If 500, inspect the dev server output (`tail -40` of the most recent log under `/tmp/claude-1000/-home-sepanta-BioEng4Youth/.../tasks/<id>.output`) for the compile error and fix it before committing.

- [ ] **Step 4: Smoke-test the new UI manually**

In a browser, open `http://localhost:3000`, scroll past the hero/about/details phases (or use the navbar's "Register Interest" CTA) to reveal the form, and confirm:
- The dropdown is labeled "University" with seven options (six universities + Other).
- Selecting "Other" reveals a "Specify university" text input below the dropdown.
- Selecting any non-Other option does NOT show the extra input.
- The "Year of Study" dropdown is gone.

- [ ] **Step 5: Commit**

```bash
git add components/interest-form-scroll.tsx
git commit -m "Replace EmailJS submit with Google Forms formResponse POST"
```

---

### Task 3: Remove `@emailjs/browser` dependency

**Files:**
- Modify: `package.json` (remove the `@emailjs/browser` dependency line)
- Modify: `package-lock.json` (regenerated by `npm install`)

- [ ] **Step 1: Remove the dependency line**

In `package.json`, delete the line:

```
    "@emailjs/browser": "^4.4.1",
```

The line is located inside the `"dependencies": { ... }` block. The trailing comma is on the line itself; verify the lines above and below it remain syntactically valid JSON after the deletion.

- [ ] **Step 2: Update the lockfile**

Run: `npm install`
Expected: completes without errors. The lockfile entries for `@emailjs/browser` are removed.

- [ ] **Step 3: Verify no source file still imports `@emailjs/browser`**

Run: `grep -r "@emailjs/browser" components hooks app lib 2>/dev/null`
Expected: no output (zero matches).

If any matches appear, the import was missed during Task 2 — go back, remove it, and recommit.

- [ ] **Step 4: Verify the dev server still compiles**

Run: `curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3000/`
Expected: `HTTP 200`

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "Remove @emailjs/browser — no longer used"
```

---

### Task 4: End-to-end manual verification against the live Google Form

This is the spec's "Verification" section. Each item is a manual browser action with no auto-correction. Do them in order.

- [ ] **Step 1: Submit a non-Other entry**

In the browser, fill the form with:
- Full Name: `Test User One`
- Email: `test+one@example.com`
- Program: `Biomedical Engineering`
- University: `McMaster`

Click **Submit Interest**. Confirm the success state ("You're on the list.") renders.

Open the live Google Form's **Responses** tab in another browser tab. Confirm a new row appeared with all four values mapped to the correct columns.

- [ ] **Step 2: Submit an "Other" entry**

Fill the form with:
- Full Name: `Test User Two`
- Email: `test+two@example.com`
- Program: `Mechatronics`
- University: `Other` → "Specify university": `University of Calgary`

Submit. Confirm the success state. In the Responses tab, confirm the University column shows `Other (University of Calgary)` (or whatever Google's representation of an Other-with-fill is).

- [ ] **Step 3: Verify invalid-email handling**

In the form, type a name, type `not-an-email` in the email field, fill the rest, and click Submit. Confirm:
- An inline red "Enter a valid email" appears next to the Email label.
- No new row appears in the Google Form's Responses tab (check via refresh).

- [ ] **Step 4: Verify network-failure handling**

Open browser devtools > Network panel > set throttling to **Offline**. Fill the form with any valid values and click Submit. Confirm:
- The whole-form red error message "Something went wrong. Please try again in a moment." renders below the dropdown.
- The Submit button returns to its enabled state.
- No row appears in Responses.

Reset throttling to **No throttling** when done.

- [ ] **Step 5: Final acknowledgement commit (only if you fixed anything during verification)**

If verification surfaced no issues, skip. If you had to make any code changes during verification, commit them with a descriptive message.

---

## Self-review notes (already applied)

- All five spec env vars and four entry IDs match the values in the design doc.
- Validation rules (required, EMAIL_REGEX) preserved verbatim from the prior implementation.
- The Other path matches the format observed in the user-supplied pre-fill URL: `entry.1295668290=__other_option__` plus `entry.1295668290.other_option_response=<value>`.
- The success copy was updated to remove the EmailJS-era "we just sent a confirmation" claim, which would have been a lie under the new no-receipt flow.
- The Field helper at the bottom of the file is preserved as-is (the rewrite only replaces lines 1–329).
- No tests are added — this repo has no test framework, and the spec's verification is manual.
