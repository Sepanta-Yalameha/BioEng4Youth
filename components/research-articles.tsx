"use client";

import { useState } from "react";
import { Search, ArrowRight, Calendar, Tag } from "lucide-react";
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

  const filtered = articles.filter((article) => {
    const matchesTopic =
      activeTopic === "All" || article.tags.includes(activeTopic);
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <>
      {/* Filter / Search */}
      <section className="py-12 border-b border-brand-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/30"
            />
            <input
              type="text"
              placeholder="Search articles by title or keyword…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-brand-primary/15 bg-white text-brand-text text-sm placeholder:text-brand-text/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent/40 transition-all"
            />
          </div>

          {/* Topic tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeTopic === topic
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                    : "bg-brand-primary/5 text-brand-text/60 hover:bg-brand-primary/10 hover:text-brand-text"
                )}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 flex items-center justify-between">
            <p className="text-brand-text/40 text-sm font-mono">
              {filtered.length} article{filtered.length !== 1 && "s"} found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-text/40 text-lg">
                No articles match your search.
              </p>
              <button
                onClick={() => {
                  setActiveTopic("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-brand-accent text-sm font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <article
                  key={article.title}
                  className="group flex flex-col p-6 rounded-3xl border border-brand-primary/10 bg-white hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-accent/5 hover:-translate-y-1 transition-all"
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-primary/5 text-brand-secondary text-[11px] font-mono tracking-wide"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-brand-text text-lg leading-snug mb-3 group-hover:text-brand-primary transition-colors">
                    {article.title}
                  </h3>

                  {/* Abstract */}
                  <p className="text-brand-text/50 text-sm leading-relaxed flex-1 mb-5">
                    {article.abstract}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-brand-primary/5">
                    <span className="flex items-center gap-1.5 text-brand-text/35 text-xs font-mono">
                      <Calendar size={12} />
                      {article.date}
                    </span>
                    <button className="inline-flex items-center gap-1 text-brand-accent text-sm font-medium group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
