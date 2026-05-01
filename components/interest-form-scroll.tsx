"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

// ─────────────────────────────────────────────────────────────────────────────
// EmailJS configuration
//
// Paste your keys from https://dashboard.emailjs.com/admin below.
// You can also override these via .env.local with NEXT_PUBLIC_EMAILJS_* vars.
// See README / instructions provided with this component.
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_tfmq2kp";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "4EtFpyIdjsiY-lJak";
// Template that emails the BioHacks team with the submission data
const EMAILJS_TEMPLATE_ADMIN =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN || "template_cxj591r";
// Template that emails the user back with the auto-reply confirmation
const EMAILJS_TEMPLATE_AUTOREPLY =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTOREPLY || "template_cdc01u2";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  program: string;
  year: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function InterestFormScroll() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    program: "",
    year: "",
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
    if (!data.year) next.year = "Required";
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

    // Variables exposed to BOTH EmailJS templates. Keep keys lowercase + with
    // capitalized aliases so the template draft works regardless of which the
    // user uses in their template body ({{name}} or {{Name}}).
    const templateParams = {
      name: formData.name.trim(),
      Name: formData.name.trim(),
      email: formData.email.trim(),
      Email: formData.email.trim(),
      program: formData.program.trim(),
      Program: formData.program.trim(),
      year: formData.year,
      Year: formData.year,
      reply_to: formData.email.trim(),
    };

    try {
      // 1) Notify the BioHacks team
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ADMIN,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      // 2) Auto-reply / confirmation email back to the user
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_AUTOREPLY,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS submission failed:", err);
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
            Check your inbox — we just sent a confirmation to{" "}
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
                htmlFor="year"
                className="block text-[9px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "#6b7280" }}
              >
                Year of Study
              </label>
              {errors.year && (
                <span
                  className="text-[9px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: "#ff6b6b" }}
                >
                  {errors.year}
                </span>
              )}
            </div>
            <select
              id="year"
              value={formData.year}
              onChange={handleChange("year")}
              className="w-full px-4 py-2.5 text-sm appearance-none"
              style={{
                fontFamily: "var(--font-sans)",
                background: "rgba(6,8,16,0.7)",
                border: `1px solid ${
                  errors.year
                    ? "rgba(255,107,107,0.55)"
                    : focused === "year"
                    ? "rgba(0,229,204,0.55)"
                    : "rgba(255,255,255,0.12)"
                }`,
                color: formData.year ? "#e8e4dc" : "rgba(255,255,255,0.22)",
                outline: "none",
              }}
              onFocus={() => setFocused("year")}
              onBlur={() => setFocused(null)}
            >
              <option value="" style={{ color: "#6b7280", background: "#060810" }}>
                Select year
              </option>
              {["1", "2", "3", "4", "5+"].map((y) => (
                <option key={y} value={y} style={{ color: "#e8e4dc", background: "#060810" }}>
                  Year {y}
                </option>
              ))}
            </select>
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

function Field({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  error,
  autoComplete,
  inputMode,
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  error?: string;
  autoComplete?: string;
  inputMode?: "email" | "text" | "search" | "tel" | "url" | "none" | "numeric" | "decimal";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label
          htmlFor={id}
          className="block text-[9px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "#6b7280" }}
        >
          {label}
        </label>
        {error && (
          <span
            className="text-[9px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "#ff6b6b" }}
          >
            {error}
          </span>
        )}
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full px-4 py-2.5 text-sm bg-transparent transition-colors"
        style={{
          fontFamily: "var(--font-sans)",
          border: `1px solid ${
            error
              ? "rgba(255,107,107,0.55)"
              : focused
              ? "rgba(0,229,204,0.55)"
              : "rgba(255,255,255,0.12)"
          }`,
          color: "#e8e4dc",
          outline: "none",
        }}
      />
    </div>
  );
}
