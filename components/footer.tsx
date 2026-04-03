import Link from "next/link";
import Image from "next/image";
import { Share2, ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-text/[0.95] backdrop-blur-md text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/25">
                <Image
                  src="/be4y-logo.png"
                  alt="BioEng4Youth"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-display font-bold text-base leading-tight">McMaster Biohacks</p>
                <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase">by BioEng4Youth</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              McMaster&apos;s first bioengineering hackathon. Where biology meets engineering.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-white/40 text-xs font-mono tracking-widest uppercase">Navigate</p>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About BioEng4Youth" },
                { href: "/research", label: "Research" },
                { href: "/sponsors", label: "Sponsors" },
                { href: "#interest-form", label: "Register Interest" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <p className="text-white/40 text-xs font-mono tracking-widest uppercase">Connect</p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-accent hover:text-brand-text flex items-center justify-center transition-all"
              >
                <Share2 size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-accent hover:text-brand-text flex items-center justify-center transition-all"
              >
                <ExternalLink size={16} />
              </a>
              <a
                href="mailto:bioengineeringformcmaster@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-accent hover:text-brand-text flex items-center justify-center transition-all"
              >
                <Mail size={16} />
              </a>
            </div>
            <p className="text-white/40 text-sm">
              Organized by{" "}
              <span className="text-brand-accent font-medium">BioEng4Youth</span>
              <br />at McMaster University
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-mono">
            © {new Date().getFullYear()} McMaster Biohacks · BioEng4Youth
          </p>
          <p className="text-white/20 text-xs">
            Following MLH guidelines · Open to all
          </p>
        </div>
      </div>
    </footer>
  );
}
