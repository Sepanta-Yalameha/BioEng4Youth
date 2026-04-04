import type { Metadata } from "next";
import Image from "next/image";
import { Microscope, Users, GraduationCap } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About — BioEng4Youth",
  description: "The student club behind BioHacks at the University of Toronto.",
};

const teamMembers = [
  { name: "Name TBD", role: "President" },
  { name: "Name TBD", role: "Vice President" },
  { name: "Name TBD", role: "Director of Events" },
  { name: "Name TBD", role: "Director of Outreach" },
  { name: "Name TBD", role: "Director of Finance" },
  { name: "Name TBD", role: "Web Committee" },
];

const values = [
  { icon: Microscope, label: "01", title: "Innovation", desc: "Pushing boundaries at the intersection of biology and engineering." },
  { icon: Users, label: "02", title: "Inclusivity", desc: "Open to every discipline, background, and level of experience." },
  { icon: GraduationCap, label: "03", title: "Education", desc: "Building the next generation of bioengineers through hands-on work." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar mode="club" />

      {/* Hero — asymmetric, left-anchored */}
      <section className="bg-[#0B1F26] pt-36 pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
                BioEng4Youth — University of Toronto
              </p>
              <h1
                className="font-display font-bold text-white leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
              >
                Built by
                <br />
                <span style={{ color: "#70B389" }}>students,</span>
                <br />
                for students.
              </h1>
            </div>
            <div className="lg:pb-3">
              <p className="text-white/55 text-lg leading-relaxed max-w-md">
                BioEng4Youth is a student-led club dedicated to making
                bioengineering accessible, inspiring, and impactful at the
                University of Toronto.
              </p>
              <div className="mt-10 flex items-center gap-6">
                <div>
                  <p className="font-display font-bold text-white text-4xl">100+</p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/35 mt-1">Members</p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <p className="font-display font-bold text-white text-4xl">3+</p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/35 mt-1">Events run</p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <p className="font-display font-bold text-white text-4xl">1st</p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/35 mt-1">UofT BioHacks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story — zig-zag, not equal columns */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_2px_1fr] gap-0 lg:gap-0 items-stretch">
            {/* Left */}
            <div className="lg:pr-16 pb-16 lg:pb-0">
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">Our Story</p>
              <h2
                className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Why we exist
              </h2>
              <p className="text-[#0B1F26]/60 text-base leading-loose mb-4">
                BioEng4Youth was founded with a single belief: bioengineering
                should be accessible to everyone. We run workshops, events, and
                competitions that bring together curious minds across disciplines.
              </p>
              <p className="text-[#0B1F26]/60 text-base leading-loose">
                BioHacks is our biggest project yet — a hackathon that embodies
                our mission to spark innovation and empower the next generation.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block bg-[#0B1F26]/8 mx-auto w-px" />

            {/* Right — values as horizontal strips */}
            <div className="lg:pl-16">
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">Our Values</p>
              <div className="divide-y divide-[#0B1F26]/8">
                {values.map(({ icon: Icon, label, title, desc }) => (
                  <div key={title} className="flex items-start gap-5 py-6 first:pt-0">
                    <span className="font-mono text-[10px] text-[#0B1F26]/25 tracking-widest mt-1 shrink-0 w-6">
                      {label}
                    </span>
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg bg-[#0B1F26]/5 text-[#135264]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-[#0B1F26] text-base mb-1">{title}</p>
                      <p className="text-[#0B1F26]/50 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#F6F9F8]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-3">The Team</p>
              <h2
                className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                The crew behind it all
              </h2>
            </div>
            <p className="text-[#0B1F26]/40 text-sm font-mono">Photos coming soon.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#0B1F26]/8 border border-[#0B1F26]/8">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="bg-white p-6 flex flex-col items-center gap-4 group hover:bg-[#0B1F26] transition-colors duration-300"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-[#0B1F26]/5 group-hover:bg-white/10 transition-colors"
                >
                  <Image
                    src="/be4y-logo.png"
                    alt={member.role}
                    width={40}
                    height={40}
                    className="w-8 h-8 object-contain grayscale opacity-40 group-hover:opacity-60"
                  />
                </div>
                <div className="text-center">
                  <p className="font-display font-semibold text-[#0B1F26] group-hover:text-white text-sm transition-colors">{member.name}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-[#0B1F26]/35 group-hover:text-white/40 mt-1 transition-colors">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
