"use client";

import { useState } from "react";

// TODO: Wire to Google Forms API when URL is provided
export default function InterestFormScroll() {
  const [formData, setFormData] = useState({ name: "", program: "", year: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to Google Forms API endpoint here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div
            className="text-[11px] tracking-[0.45em] uppercase mb-5"
            style={{ fontFamily: "var(--font-mono)", color: "#00e5cc" }}
          >
            Received
          </div>
          <p
            className="font-bold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#e8e4dc",
            }}
          >
            Thanks — we&apos;ll be in touch.
          </p>
          <div className="mx-auto mt-6 w-10 h-px" style={{ background: "#00e5cc", opacity: 0.5 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div
        className="w-full max-w-[340px] p-9"
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
          03 &nbsp;/&nbsp; Join the Waitlist
        </div>

        <h2
          className="font-bold mb-7"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.2rem",
            color: "#e8e4dc",
            letterSpacing: "-0.02em",
          }}
        >
          Count Me In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name" id="name" type="text" placeholder="Full name"
            value={formData.name} onChange={handleChange("name")}
            focused={focused === "name"} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />

          <Field label="Program" id="program" type="text" placeholder="e.g. Biomedical Engineering"
            value={formData.program} onChange={handleChange("program")}
            focused={focused === "program"} onFocus={() => setFocused("program")} onBlur={() => setFocused(null)} />

          <div>
            <label
              htmlFor="year"
              className="block text-[9px] tracking-[0.4em] uppercase mb-2"
              style={{ fontFamily: "var(--font-mono)", color: "#6b7280" }}
            >
              Year
            </label>
            <select
              id="year"
              required
              value={formData.year}
              onChange={handleChange("year")}
              className="w-full px-4 py-2.5 text-sm appearance-none"
              style={{
                fontFamily: "var(--font-sans)",
                background: "rgba(6,8,16,0.7)",
                border: `1px solid ${focused === "year" ? "rgba(0,229,204,0.55)" : "rgba(255,255,255,0.12)"}`,
                color: formData.year ? "#e8e4dc" : "rgba(255,255,255,0.22)",
                outline: "none",
              }}
              onFocus={() => setFocused("year")}
              onBlur={() => setFocused(null)}
            >
              <option value="" style={{ color: "#6b7280", background: "#060810" }}>Select year</option>
              {["1", "2", "3", "4", "5+"].map((y) => (
                <option key={y} value={y} style={{ color: "#e8e4dc", background: "#060810" }}>Year {y}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-4 font-semibold text-base tracking-wide transition-all duration-200"
            style={{ fontFamily: "var(--font-sans)", background: "#00e5cc", color: "#04050c", letterSpacing: "0.04em" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#00e5cc"; }}
          >
            Submit Interest
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, id, type, placeholder, value, onChange, focused, onFocus, onBlur,
}: {
  label: string; id: string; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focused: boolean; onFocus: () => void; onBlur: () => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[9px] tracking-[0.4em] uppercase mb-2"
        style={{ fontFamily: "var(--font-mono)", color: "#6b7280" }}
      >
        {label}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        onChange={onChange} onFocus={onFocus} onBlur={onBlur} required
        className="w-full px-4 py-2.5 text-sm bg-transparent"
        style={{
          fontFamily: "var(--font-sans)",
          border: `1px solid ${focused ? "rgba(0,229,204,0.55)" : "rgba(255,255,255,0.12)"}`,
          color: "#e8e4dc",
          outline: "none",
        }}
      />
    </div>
  );
}
