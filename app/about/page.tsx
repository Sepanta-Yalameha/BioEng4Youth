import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Heart,
  Lightbulb,
  Users,
  Sparkles,
  User,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About — BioEng4Youth",
  description:
    "BioEng4Youth is a student-led, non-profit global organization dedicated to empowering youth through accessible opportunities in research, outreach, and innovation.",
};

const values = [
  {
    icon: Globe,
    title: "Accessibility",
    desc: "We believe research and innovation opportunities should be open, approachable, and available to students from diverse backgrounds.",
  },
  {
    icon: Heart,
    title: "Equity",
    desc: "We value solutions that consider the needs of underserved communities and promote inclusive access to healthcare and education.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We encourage creativity, curiosity, and evidence-based thinking in addressing biomedical and public health challenges.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "We believe progress happens when students, communities, and future leaders come together to share ideas and learn from one another.",
  },
  {
    icon: Sparkles,
    title: "Youth Empowerment",
    desc: "We are committed to helping young people recognize their potential as researchers, innovators, and changemakers.",
  },
];

const tier1 = [
  { name: "Jiya", role: "Co-President" },
  { name: "Ahyan", role: "Co-President" },
];

const tier2 = [
  { name: "Krish", role: "Director of Operations" },
  { name: "Sepanta", role: "Director of Operations" },
  { name: "Avishi", role: "Chapter Coordinator" },
];

const departments = [
  {
    name: "Outreach",
    members: [
      "Nowshin",
      "Jasleen",
      "Shovan",
      "Vaidik",
      "Anisha",
      "Tamishnah",
      "Leen",
    ],
  },
  {
    name: "Socials",
    members: ["Priyansi", "Pratistha", "Mahek", "Smera", "Vee", "Diya"],
  },
  {
    name: "Research",
    members: ["Shamim", "Ella", "Olivia", "Sumiran"],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar mode="club" />

      {/* ── Hero ── */}
      <section className="bg-[#0B1F26] pt-36 pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
                About BioEng4Youth
              </p>
              <h1
                className="font-display font-bold text-white leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
              >
                Empowering
                <br />
                <span style={{ color: "#70B389" }}>youth</span> through
                <br />
                science.
              </h1>
            </div>
            <div className="lg:pb-3">
              <p className="text-white/55 text-lg leading-relaxed max-w-md">
                BioEng4Youth is a student-led, non-profit global organization
                dedicated to empowering youth through accessible opportunities
                in research, outreach, and innovation.
              </p>
              <p className="text-white/40 text-base leading-relaxed max-w-md mt-4">
                We believe that students should have meaningful opportunities to
                explore science, engage with healthcare challenges, and
                contribute to conversations that shape the future of research
                and medicine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_2px_1fr] gap-0 items-stretch">
            <div className="lg:pr-16 pb-16 lg:pb-0">
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
                Our Mission
              </p>
              <h2
                className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Why we exist
              </h2>
              <p className="text-[#0B1F26]/60 text-base leading-loose">
                Our mission is to make biomedical, engineering, and
                health-related opportunities more accessible to youth by
                creating programs that promote research engagement, scientific
                curiosity, critical thinking, and innovation. Through events,
                competitions, and outreach, we aim to support students as they
                develop the knowledge and confidence to contribute meaningfully
                to science and healthcare.
              </p>
            </div>

            <div className="hidden lg:block bg-[#0B1F26]/8 mx-auto w-px" />

            <div className="lg:pl-16">
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
                Our Vision
              </p>
              <h2
                className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Where we&apos;re headed
              </h2>
              <p className="text-[#0B1F26]/60 text-base leading-loose">
                We envision a future in which young people are empowered to
                participate actively in research, innovation, and
                community-driven scientific problem solving. We want to help
                build a generation of students who are not only informed about
                global health challenges but also inspired to help solve them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="py-24 bg-[#F6F9F8]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
            What We Do
          </p>
          <h2
            className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Real-world impact,
            <br />
            student-driven.
          </h2>
          <p className="text-[#0B1F26]/60 text-lg leading-relaxed max-w-3xl">
            At BioEng4Youth, we develop initiatives that encourage students to
            engage with real-world scientific and healthcare issues. Our work
            includes competitions, educational opportunities, and outreach
            efforts that help youth strengthen their research skills,
            communicate ideas effectively, and think critically about innovation
            and equity in healthcare.
          </p>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-3">
              Our Values
            </p>
            <h2
              className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              What drives us
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] p-8 border border-[#0B1F26]/8 group hover:border-[#70B389]/30 hover:bg-[#70B389]/[0.03] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B1F26]/5 flex items-center justify-center text-[#135264] group-hover:bg-[#70B389] group-hover:text-white transition-all duration-300 mb-5">
                  <Icon size={20} />
                </div>
                <p className="font-display font-bold text-[#0B1F26] text-lg mb-2">
                  {title}
                </p>
                <p className="text-[#0B1F26]/50 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="py-24 bg-[#F6F9F8]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-3">
              Our Team
            </p>
            <h2
              className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              The people behind it all
            </h2>
            <p className="text-[#0B1F26]/50 text-base leading-relaxed max-w-2xl mx-auto">
              Meet the team behind BioEng4Youth. We are a group of student
              leaders and contributors who are passionate about research
              accessibility, science communication, youth empowerment, and
              innovation in healthcare. Together, we work to create
              opportunities that help students explore meaningful scientific
              topics and engage with real-world challenges.
            </p>
          </div>

          {/* Tier 1 — Co-Presidents */}
          <div className="flex justify-center gap-8 sm:gap-12 mb-12">
            {tier1.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#70B389]/20 to-[#135264]/20 border-2 border-[#70B389]/30 flex items-center justify-center mb-4">
                  <User
                    size={36}
                    className="text-[#0B1F26]/30"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="font-display font-bold text-[#0B1F26] text-lg sm:text-xl">
                  {member.name}
                </p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-[#70B389] mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          {/* Tier 2 — Directors & Coordinator */}
          <div className="flex justify-center flex-wrap gap-8 sm:gap-10 mb-16">
            {tier2.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0B1F26]/5 border border-[#0B1F26]/10 flex items-center justify-center mb-3">
                  <User
                    size={28}
                    className="text-[#0B1F26]/25"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="font-display font-semibold text-[#0B1F26] text-base sm:text-lg">
                  {member.name}
                </p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-[#0B1F26]/40 mt-1 text-center max-w-[160px]">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-[#0B1F26]/8 mb-16" />

          {/* Tier 3 — Departments */}
          <div className="grid md:grid-cols-3 gap-12">
            {departments.map((dept) => (
              <div key={dept.name}>
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6 text-center">
                  {dept.name}
                </p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
                  {dept.members.map((name) => (
                    <div
                      key={name}
                      className="flex flex-col items-center w-[72px]"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#0B1F26]/5 flex items-center justify-center mb-2">
                        <User
                          size={20}
                          className="text-[#0B1F26]/20"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="font-display font-semibold text-[#0B1F26] text-sm text-center leading-tight">
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing — What Our Team Does & Join ── */}
      <section className="bg-[#0B1F26] py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
                What Our Team Does
              </p>
              <h2
                className="font-display font-bold text-white leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Working together
                <br />
                for impact.
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                Our team works across events, outreach, communications, and
                research-focused programming to support the mission of
                BioEng4Youth. Each member contributes to creating a community
                where youth can access opportunities, develop skills, and take
                part in meaningful scientific exploration.
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#70B389] mb-6">
                Join Our Team
              </p>
              <h2
                className="font-display font-bold text-white leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Get involved.
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                We are always excited to connect with students who are
                passionate about science, research, leadership, outreach, and
                innovation. If you are interested in contributing to
                BioEng4Youth, we would love to hear from you.
              </p>
              <Link
                href="mailto:bioengineeringformcmaster@gmail.com"
                className="inline-block px-6 py-3 bg-[#70B389] text-[#0B1F26] font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all"
              >
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
