"use client";

import { ArrowUpRight, Calendar } from "lucide-react";

interface Article {
  title: string;
  date: string;
  tags: string[];
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
      "Advances in dry-electrode EEG headsets and real-time signal classification are bringing non-invasive BCIs closer to clinical applications for patients with motor disabilities.",
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
      "A CNN trained on over 80,000 fundus images achieves specialist-level accuracy in grading diabetic retinopathy severity, enabling scalable screening in underserved communities.",
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
  const topicCount = new Set(articles.flatMap((a) => a.tags)).size;

  return (
    <section className="py-16 bg-paper">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Count header */}
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-4 mb-0">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-soft">
            Articles
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-soft">
            {articles.length} total · {topicCount} topics
          </span>
        </div>

        <ol className="divide-y divide-rule">
          {articles.map((article, i) => (
            <ArticleRow key={article.title} article={article} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <li className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-0 hover:bg-paper-2 transition-colors duration-200 -mx-4 px-4">
      {/* Index */}
      <div className="pt-8 pb-8 pr-4">
        <span
          className="font-display font-bold text-rule group-hover:text-neuro-teal-deep transition-colors duration-200 leading-none select-none"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="py-8 border-l border-rule group-hover:border-neuro-teal-deep/40 pl-6 sm:pl-8 transition-colors duration-200">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
          <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft">
            <Calendar size={9} />
            {article.date}
          </span>
          <span className="text-rule text-xs">·</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[0.22em] uppercase text-neuro-teal-deep/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-ink leading-tight tracking-[-0.015em] mb-3 group-hover:text-neuro-teal-deep transition-colors duration-200"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
        >
          {article.title}
        </h3>

        {/* Abstract */}
        <p className="text-muted text-[14px] leading-relaxed max-w-2xl sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:group-hover:max-h-40 sm:group-hover:opacity-100 transition-all duration-300 ease-out mb-0 sm:group-hover:mb-4">
          {article.abstract}
        </p>

        {/* Read link */}
        <div className="flex items-center gap-1.5 text-muted-soft group-hover:text-neuro-teal-deep text-sm font-medium transition-all duration-200 mt-1">
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read article
          </span>
          <ArrowUpRight
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </li>
  );
}
