"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

// TODO: Replace with your actual Google Form action URL
// Format: https://docs.google.com/forms/d/e/{FORM_ID}/formResponse
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/TODO_FORM_ID/formResponse";

// TODO: Replace with your actual Google Form field entry IDs
const FIELD_IDS = {
  name: "entry.000000001",
  email: "entry.000000002",
  school: "entry.000000003",
  program: "entry.000000004",
};

export default function InterestForm() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", school: "", program: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Submit to Google Form via hidden iframe trick (no redirect)
    const params = new URLSearchParams({
      [FIELD_IDS.name]: form.name,
      [FIELD_IDS.email]: form.email,
      [FIELD_IDS.school]: form.school,
      [FIELD_IDS.program]: form.program,
    });

    try {
      await fetch(`${GOOGLE_FORM_URL}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
      });
    } catch {
      // no-cors always "fails" — that's expected
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="interest-form" className="py-24 bg-brand-text/[0.88] backdrop-blur-md relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-primary/30 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-accent/10 blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div
        ref={ref}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-14 items-center"
      >
        {/* Copy */}
        <div
          className={cn(
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-4">
            Register Interest
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl leading-tight tracking-tight">
            Be the first
            <br />
            to know.
          </h2>
          <p className="mt-5 text-white/50 text-lg leading-relaxed max-w-sm">
            Sign up for updates on McMaster Biohacks — date, location, tracks,
            and registration when they drop.
          </p>
          <ul className="mt-6 space-y-2 text-white/40 text-sm">
            {["Event date & location", "Track reveals", "Registration opening", "Sponsor announcements"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-brand-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div
          className={cn(
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          {submitted ? (
            <div className="glass rounded-3xl p-10 text-center space-y-4">
              <CheckCircle2 size={40} className="text-brand-accent mx-auto" />
              <h3 className="font-display font-bold text-white text-2xl">You&apos;re on the list!</h3>
              <p className="text-white/50 leading-relaxed">
                Thanks for registering your interest. We&apos;ll reach out as soon as details are confirmed.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5">
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "Jane Smith" },
                { id: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
                { id: "school", label: "School / University", type: "text", placeholder: "McMaster University" },
                { id: "program", label: "Program / Major", type: "text", placeholder: "Biomedical Engineering" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-white/60 text-xs font-mono tracking-widest uppercase mb-2">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-brand-accent/60 focus:bg-white/8 transition-all"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-accent text-brand-text font-semibold font-display text-sm hover:brightness-110 active:brightness-90 transition-all disabled:opacity-60"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-brand-text/30 border-t-brand-text rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    Register My Interest
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
