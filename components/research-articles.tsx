"use client";

import { useState } from "react";
import { Search, ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const topics = [
  "All",
  "Tissue Engineering",
  "Neural Interfaces",
  "Biomaterials",
  "Medical Imaging",
  "Genetic Engineering",
  "Biosensors",
] as const;

type Topic = (typeof topics)[number];

interface Article {
  title: string;
  date: string;
  tags: Topic[];
  abstract: string;
}

const articles: Article[] = [
  {
    title: "Decellularized Scaffolds for Cardiac Tissue Regeneration",
    date: "March 2026",
    tags: ["Tissue Engineering", "Biomaterials"],
    abstract:
      "Exploring how decellularized extracellular matrix scaffolds can be repopulated with patient-derived cardiomyocytes to restore function in damaged heart tissue after myocardial infarction.",
  },
  {
    title: "Non-Invasive Brain-Computer Interfaces Using EEG Signal Processing",
    date: "February 2026",
    tags: ["Neural Interfaces"],
    abstract:
      "Advances in dry-electrode EEG headsets and real-time signal classification are bringing non-invasive brain-computer interfaces closer to clinical applications for patients with motor disabilities.",
  },
  {
    title: "Hydrogel-Based Drug Delivery Systems for Targeted Cancer Therapy",
    date: "January 2026",
    tags: ["Biomaterials"],
    abstract:
      "pH-responsive hydrogels engineered to release chemotherapeutic agents selectively within the acidic tumour microenvironment, reducing systemic toxicity while improving treatment efficacy.",
  },
  {
    title: "3D-Bioprinted Vascular Networks for Organ-on-a-Chip Models",
    date: "December 2025",
    tags: ["Tissue Engineering"],
    abstract:
      "Combining sacrificial bioprinting with endothelial cell seeding to create perfusable microvascular networks that better replicate organ-level physiology in microphysiological systems.",
  },
  {
    title: "Biodegradable Magnesium Alloys for Orthopedic Implants",
    date: "November 2025",
    tags: ["Biomaterials"],
    abstract:
      "Investigating surface-modified Mg-Zn-Ca alloys that degrade at a controlled rate in vivo, eliminating the need for secondary implant-removal surgeries in fracture fixation.",
  },
  {
    title: "Machine Learning for Early Detection of Diabetic Retinopathy",
    date: "October 2025",
    tags: ["Medical Imaging"],
    abstract:
      "A convolutional neural network trained on over 80,000 fundus images achieves specialist-level accuracy in grading diabetic retinopathy severity, enabling scalable screening in underserved communities.",
  },
  {
    title: "CRISPR-Cas9 Gene Editing Strategies for Sickle Cell Disease",
    date: "September 2025",
    tags: ["Genetic Engineering"],
    abstract:
      "Recent clinical trials demonstrate that ex-vivo CRISPR editing of the BCL11A enhancer in hematopoietic stem cells can reactivate fetal hemoglobin production and alleviate sickle cell symptoms.",
  },
  {
    title: "Flexible Piezoelectric Sensors for Real-Time Gait Analysis",
    date: "August 2025",
    tags: ["Biosensors"],
    abstract:
      "Thin-film PVDF sensors embedded in shoe insoles capture plantar pressure distributions during walking, providing clinicians with continuous biomechanical data for post-stroke rehabilitation.",
  },
  {
    title: "Microfluidic Platforms for High-Throughput Drug Screening",
    date: "July 2025",
    tags: ["Biosensors", "Biomaterials"],
    abstract:
      "Droplet-based microfluidic chips that encapsulate individual cells in picoliter volumes, enabling rapid screening of thousands of drug candidates with minimal reagent consumption.",
  },
];

export default function ResearchArticles() {
  const [activeTopic, setActiveTopic] = useState<Topic>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchesTopic = activeTopic === "All" || a.tags.includes(activeTopic);
    const matchesSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const [featured, ...rest] = filtered;

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Layout: left rail filters + right content */}
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">

          {/* Left rail — filters */}
          <aside className="mb-10 lg:mb-0">
            {/* Search */}
            <div className="relative mb-8">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B1F26]/30" />
              <input
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-[#0B1F26]/15 bg-white text-[#0B1F26] text-sm placeholder:text-[#0B1F26]/30 focus:outline-none focus:border-[#70B389]/60 transition-colors"
              />
            </div>

            {/* Topic list */}
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-[#0B1F26]/30 mb-4">Topics</p>
            <ul className="space-y-1">
              {topics.map((topic) => (
                <li key={topic}>
                  <button
                    onClick={() => setActiveTopic(topic)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm transition-colors",
                      activeTopic === topic
                        ? "bg-[#0B1F26] text-white font-semibold"
                        : "text-[#0B1F26]/55 hover:text-[#0B1F26] hover:bg-[#0B1F26]/4"
                    )}
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>

            <p className="font-mono text-[9px] text-[#0B1F26]/25 mt-8">
              {filtered.length} article{filtered.length !== 1 && "s"}
            </p>
          </aside>

          {/* Right: articles */}
          <div>
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[#0B1F26]/35 text-base mb-4">No articles match your search.</p>
                <button
                  onClick={() => { setActiveTopic("All"); setSearchQuery(""); }}
                  className="text-[#70B389] text-sm font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {/* Featured — large editorial card */}
                {featured && (
                  <article className="mb-10 border-t-2 border-[#0B1F26] pt-6 group">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] tracking-widest uppercase text-[#70B389] border border-[#70B389]/30 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                      <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#0B1F26]/30 ml-auto">
                        <Calendar size={10} /> {featured.date}
                      </span>
                    </div>

                    <h2
                      className="font-display font-bold text-[#0B1F26] leading-tight tracking-tight mb-4 group-hover:text-[#135264] transition-colors"
                      style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
                    >
                      {featured.title}
                    </h2>

                    <p className="text-[#0B1F26]/55 text-base leading-loose max-w-2xl mb-6">
                      {featured.abstract}
                    </p>

                    <button className="inline-flex items-center gap-2 text-[#0B1F26] text-sm font-semibold border-b border-[#0B1F26]/30 pb-0.5 hover:border-[#0B1F26] transition-colors group-hover:gap-3">
                      Read More <ArrowRight size={14} />
                    </button>
                  </article>
                )}

                {/* Divider */}
                {rest.length > 0 && (
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-[#0B1F26]/8" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-[#0B1F26]/25">More Articles</span>
                    <div className="flex-1 h-px bg-[#0B1F26]/8" />
                  </div>
                )}

                {/* Rest — 2-col grid */}
                <div className="grid sm:grid-cols-2 gap-px bg-[#0B1F26]/8 border border-[#0B1F26]/8">
                  {rest.map((article) => (
                    <article
                      key={article.title}
                      className="bg-white p-7 flex flex-col group hover:bg-[#F6F9F8] transition-colors"
                    >
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag) => (
                          <span key={tag} className="font-mono text-[9px] tracking-widest uppercase text-[#0B1F26]/35 border border-[#0B1F26]/12 px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-display font-bold text-[#0B1F26] text-lg leading-snug mb-3 group-hover:text-[#135264] transition-colors flex-1">
                        {article.title}
                      </h3>

                      <p className="text-[#0B1F26]/45 text-sm leading-relaxed mb-5 line-clamp-3">
                        {article.abstract}
                      </p>

                      <div className="flex items-center justify-between border-t border-[#0B1F26]/6 pt-4">
                        <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#0B1F26]/30">
                          <Calendar size={10} /> {article.date}
                        </span>
                        <button className="inline-flex items-center gap-1 text-[#70B389] text-sm font-medium group-hover:gap-2 transition-all">
                          Read <ArrowRight size={13} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
