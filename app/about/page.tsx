import type { Metadata } from "next";
import Image from "next/image";
import {
  Globe,
  Heart,
  Lightbulb,
  Users,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  TickerStrip,
  PageHero,
  SectionHeader,
  SectionDivider,
} from "@/components/page-chassis";
import { composeEmail } from "@/lib/email";

export const metadata: Metadata = {
  title: "About - BioEng4Youth",
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

type Member = { name: string; role?: string; photo?: string };

const tier1: Member[] = [
  { name: "Jiya", role: "Co-President" },
  { name: "Ahyan", role: "Co-President" },
];

const tier2: Member[] = [
  { name: "Krish", role: "Director of Operations" },
  { name: "Sepanta", role: "Director of Operations", photo: "/team/Sepanta.jpg" },
  { name: "Avishi", role: "Chapter Coordinator", photo: "/team/Avishi.JPG" },
];

const departments: { name: string; members: Member[] }[] = [
  {
    name: "Outreach",
    members: [
      { name: "Nowshin", photo: "/team/Nowshin.jpeg" },
      { name: "Jasleen", photo: "/team/Jasleen.JPG" },
      { name: "Shovan", photo: "/team/Shovan.jpeg" },
      { name: "Vaidik", photo: "/team/Vaidik.jpeg" },
      { name: "Anisha", photo: "/team/Anisha.jpeg" },
      { name: "Tamishnah", photo: "/team/Tamishnah.jpeg" },
    ],
  },
  {
    name: "Socials",
    members: [
      { name: "Priyansi", photo: "/team/Priyansi.JPG" },
      { name: "Pratishtha", photo: "/team/Pratishtha.jpeg" },
      { name: "Mahek", photo: "/team/Mahek.JPG" },
      { name: "Vee" },
      { name: "Diya", photo: "/team/Diya.JPG" },
    ],
  },
  {
    name: "Research",
    members: [
      { name: "Shamim", photo: "/team/Shamim.JPG" },
      { name: "Ella", photo: "/team/Ella.jpeg" },
      { name: "Olivia", photo: "/team/Olivia.png" },
    ],
  },
];

const totalMembers =
  tier1.length +
  tier2.length +
  departments.reduce((sum, d) => sum + d.members.length, 0);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar mode="club" />

      <div className="pt-20">
        <TickerStrip
          items={[
            { text: "BioHacks · Fall 2026" },
            { text: "McMaster University" },
            { text: "One neuro case" },
            { text: "Infinite solutions" },
          ]}
        />
      </div>

      <PageHero
        eyebrow="01 / About BioEng4Youth"
        headline={
          <>
            Empowering youth
            <br />
            through{" "}
            <span className="text-neuro-teal-deep">science</span>.
          </>
        }
        lede="A student-led nonprofit creating accessible opportunities in research, outreach, and innovation. We run programs, competitions, and outreach that help students engage with real-world health and engineering challenges."
        stats={[
          { label: "Founded", value: "2025" },
          { label: "Members", value: String(totalMembers) },
          { label: "Type", value: "Student-led nonprofit" },
        ]}
        primaryCta={{
          label: "Get Involved",
          href: composeEmail(
            "Getting involved with BioEng4Youth",
            "Hi BioEng4Youth team,\n\nI'd love to learn more about getting involved. A bit about me:\n\n[your background / school / year]\n\nThanks,\n[your name]"
          ),
          external: true,
        }}
        secondaryCta={{ label: "Read mission", href: "#mission" }}
      />

      <SectionDivider />

      {/* 02 - Mission */}
      <section id="mission" className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="02" title="Our mission" />
          <p className="text-[15px] leading-[1.8] text-muted max-w-3xl">
            Our mission is to make biomedical, engineering, and health-related
            opportunities more accessible to youth by creating programs that
            promote research engagement, scientific curiosity, critical
            thinking, and innovation. Through events, competitions, and
            outreach, we support students as they develop the knowledge and
            confidence to contribute meaningfully to science and healthcare.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* 03 - Vision */}
      <section className="bg-paper-2">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="03" title="Our vision" />
          <p className="text-[15px] leading-[1.8] text-muted max-w-3xl">
            We envision a future in which young people are empowered to
            participate actively in research, innovation, and community-driven
            scientific problem solving. We want to help build a generation of
            students who are not only informed about global health challenges
            but also inspired to help solve them.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* 04 - What we do */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="04" title="What we do" />
          <p className="text-[15px] leading-[1.8] text-muted max-w-3xl">
            At BioEng4Youth, we develop initiatives that encourage students to
            engage with real-world scientific and healthcare issues. Our work
            includes competitions, educational opportunities, and outreach
            efforts that help youth strengthen their research skills,
            communicate ideas effectively, and think critically about innovation
            and equity in healthcare.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* 05 - Values */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="05" title="What drives us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-paper p-7 group hover:bg-paper-2 transition-colors"
              >
                <div className="w-9 h-9 bg-neuro-teal-deep/15 text-neuro-teal-deep flex items-center justify-center mb-4 rounded-sm group-hover:bg-neuro-teal-deep group-hover:text-paper transition-colors">
                  <Icon size={18} />
                </div>
                <p className="font-display font-bold text-ink text-lg mb-1.5">
                  {title}
                </p>
                <p className="text-[13px] leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 06 - Team */}
      <section className="bg-paper-2">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <SectionHeader index="06" title="The team" />
          <p className="text-[15px] leading-[1.7] text-muted max-w-2xl mb-14">
            A group of student leaders and contributors passionate about
            research accessibility, science communication, youth empowerment,
            and innovation in healthcare.
          </p>

          {/* Tier 1 - Co-Presidents */}
          <div className="flex justify-center gap-12 mb-12">
            {tier1.map((m) => (
              <TeamCard
                key={m.name}
                name={m.name}
                role={m.role}
                photo={m.photo}
                size="lg"
              />
            ))}
          </div>

          {/* Tier 2 - Directors */}
          <div className="flex justify-center flex-wrap gap-10 mb-16">
            {tier2.map((m) => (
              <TeamCard
                key={m.name}
                name={m.name}
                role={m.role}
                photo={m.photo}
                size="md"
              />
            ))}
          </div>

          <div className="h-px w-full bg-rule mb-14" />

          {/* Tier 3 - Departments */}
          <div className="grid md:grid-cols-3 gap-12">
            {departments.map((dept) => (
              <div key={dept.name}>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-neuro-teal-deep mb-6 text-center">
                  {dept.name}
                </p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-7">
                  {dept.members.map((m) => (
                    <TeamCard
                      key={m.name}
                      name={m.name}
                      photo={m.photo}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 - Closing dark band */}
      <section className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 grid lg:grid-cols-2 gap-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-neuro-teal mb-5">
              What our team does
            </p>
            <h3
              className="font-display font-bold text-white leading-tight tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Working together for impact.
            </h3>
            <p className="text-white/55 text-[15px] leading-relaxed">
              Our team works across events, outreach, communications, and
              research-focused programming to support the mission of
              BioEng4Youth.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-neuro-teal mb-5">
              Join our team
            </p>
            <h3
              className="font-display font-bold text-white leading-tight tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Get involved.
            </h3>
            <p className="text-white/55 text-[15px] leading-relaxed mb-8">
              Always excited to connect with students passionate about science,
              research, leadership, outreach, and innovation. If you&apos;re
              interested in contributing, we&apos;d love to hear from you.
            </p>
            <a
              href={composeEmail(
                "Joining the BioEng4Youth team",
                "Hi BioEng4Youth team,\n\nI'm interested in joining the team. A bit about me:\n\n[your background / school / year / what you'd like to contribute]\n\nThanks,\n[your name]"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neuro-teal text-ink font-display font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all rounded-md"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TeamCard({
  name,
  role,
  photo,
  size = "sm",
}: {
  name: string;
  role?: string;
  photo?: string;
  size?: "lg" | "md" | "sm";
}) {
  const dims =
    size === "lg"
      ? "w-24 h-24 sm:w-28 sm:h-28 text-3xl"
      : size === "md"
      ? "w-20 h-20 sm:w-24 sm:h-24 text-2xl"
      : "w-14 h-14 text-lg";
  const pixelSize = size === "lg" ? 112 : size === "md" ? 96 : 56;
  const initial = name.charAt(0);
  return (
    <div className="flex flex-col items-center max-w-[120px]">
      {photo ? (
        <div
          className={`${dims} relative overflow-hidden rounded-md mb-3 ring-1 ring-rule`}
        >
          <Image
            src={photo}
            alt={name}
            width={pixelSize}
            height={pixelSize}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`${dims} bg-neuro-teal-deep/15 text-neuro-teal-deep font-display font-bold flex items-center justify-center rounded-md mb-3`}
        >
          {initial}
        </div>
      )}
      <p className="font-display font-semibold text-ink text-base leading-tight text-center">
        {name}
      </p>
      {role && (
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft mt-1 text-center max-w-[160px]">
          {role}
        </p>
      )}
    </div>
  );
}
