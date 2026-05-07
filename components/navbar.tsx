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
        <div className="fixed top-20 left-4 right-4 z-40 rounded-2xl bg-ink border border-white/10 shadow-2xl p-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-sans transition-all",
                pathname === link.href
                  ? "bg-neuro-teal-deep/22 text-neuro-teal ring-1 ring-neuro-teal-deep/45"
                  : "text-white/75 hover:text-white hover:bg-white/8"
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
