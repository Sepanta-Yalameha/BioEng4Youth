import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/past-events", label: "Past Events" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1F26] text-white">
      <div className="h-0.5 w-full bg-[#70B389]/40" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-12 lg:gap-24">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/15">
                <Image src="/be4y-logo.png" alt="BioEng4Youth" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm leading-tight">BioHacks</p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-white/30 mt-0.5">by BioEng4Youth · University of Toronto</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              UofT&apos;s bioengineering hackathon. Where science meets engineering.
            </p>
            <a
              href="mailto:bioengineeringformcmaster@gmail.com"
              className="inline-flex items-center gap-2 mt-6 text-[#70B389] text-sm font-medium hover:text-white transition-colors"
            >
              <Mail size={14} />
              bioengineeringformcmaster@gmail.com
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-white/25 mb-5">Pages</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-white/25 mb-5">Get Involved</p>
            <div className="space-y-3">
              <Link
                href="#interest-form"
                className="block px-5 py-2.5 bg-[#70B389] text-[#0B1F26] text-sm font-semibold text-center hover:brightness-110 transition-all"
              >
                Register Interest
              </Link>
              <Link
                href="/sponsors"
                className="block px-5 py-2.5 border border-white/15 text-white/60 text-sm font-medium text-center hover:border-white/30 hover:text-white transition-all"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] text-white/20">
            © {new Date().getFullYear()} BioHacks · BioEng4Youth
          </p>
          <p className="font-mono text-[9px] text-white/15">
            Open to all · University of Toronto
          </p>
        </div>
      </div>
    </footer>
  );
}
