import type { Metadata } from "next";
import Image from "next/image";
import { Dna, Microscope, GraduationCap, Users } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About — BioEng4Youth at McMaster",
  description: "Learn about BioEng4Youth, the student club behind McMaster Biohacks.",
};

const teamMembers = [
  { name: "Name TBD", role: "President", img: "https://placehold.co/300x300/135264/FFFFFF?text=BE4Y" },
  { name: "Name TBD", role: "Vice President", img: "https://placehold.co/300x300/328795/FFFFFF?text=BE4Y" },
  { name: "Name TBD", role: "Director of Events", img: "https://placehold.co/300x300/70B389/FFFFFF?text=BE4Y" },
  { name: "Name TBD", role: "Director of Outreach", img: "https://placehold.co/300x300/135264/FFFFFF?text=BE4Y" },
  { name: "Name TBD", role: "Director of Finance", img: "https://placehold.co/300x300/328795/FFFFFF?text=BE4Y" },
  { name: "Name TBD", role: "Web Committee", img: "https://placehold.co/300x300/70B389/FFFFFF?text=BE4Y" },
];

const values = [
  {
    icon: <Microscope size={22} />,
    title: "Innovation",
    desc: "Pushing the boundaries of what's possible at the intersection of biology and engineering.",
  },
  {
    icon: <Users size={22} />,
    title: "Inclusivity",
    desc: "Welcoming everyone regardless of background, experience, or discipline.",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Education",
    desc: "Building the next generation of bioengineers through hands-on learning and community.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar mode="club" />

      {/* Hero */}
      <section className="bg-brand-primary pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <Dna
              key={i}
              size={120}
              className="absolute text-white"
              style={{
                top: `${(i * 23) % 100}%`,
                left: `${(i * 17 + 5) % 100}%`,
                opacity: 0.3,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/20">
              <Image
                src="/be4y-logo.png"
                alt="BioEng4Youth"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="font-display font-bold text-white text-5xl sm:text-6xl tracking-tight leading-tight">
            BioEng4Youth
          </h1>
          <p className="mt-5 text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            A student-led club at McMaster University dedicated to making
            bioengineering accessible, inspiring, and impactful for the next generation.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-display font-bold text-brand-text text-4xl leading-tight tracking-tight mb-5">
              Who we are
            </h2>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              BioEng4Youth was founded by students at McMaster University with a
              simple belief: bioengineering should be accessible to everyone.
              We run workshops, events, and initiatives that bring together
              curious minds across disciplines.
            </p>
            <p className="text-brand-text/60 leading-relaxed">
              McMaster Biohacks is our biggest project yet — a hackathon that
              embodies our mission to create community, spark innovation, and
              empower the next generation of bioengineers.
            </p>
          </div>
          <div className="bg-brand-primary/5 rounded-3xl p-8 border border-brand-primary/10">
            <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-5">
              Our Values
            </p>
            <div className="space-y-5">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-brand-text text-sm">{v.title}</p>
                    <p className="text-brand-text/50 text-sm mt-0.5">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#f7fafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-3">
              The Team
            </p>
            <h2 className="font-display font-bold text-brand-text text-4xl sm:text-5xl leading-tight tracking-tight">
              Meet the crew
            </h2>
            <p className="mt-3 text-brand-text/50">Photos coming soon.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group">
                <div className="w-full aspect-square rounded-2xl overflow-hidden ring-2 ring-transparent group-hover:ring-brand-accent transition-all">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div className="text-center">
                  <p className="font-display font-semibold text-brand-text text-sm">{member.name}</p>
                  <p className="text-brand-text/40 text-xs font-mono mt-0.5">{member.role}</p>
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
