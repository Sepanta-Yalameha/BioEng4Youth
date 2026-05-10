"use client";

import { ArrowUpRight, User } from "lucide-react";

interface Article {
  title: string;
  author?: string;
  tags: string[];
  abstract: string;
  href: string;
}

const articles: Article[] = [
  {
    title: "The Future of Brain-Computer Interfaces",
    tags: ["Neural Interfaces", "AI / ML"],
    abstract:
      "A technical primer on how BCIs capture, filter, and decode neural signals - from non-invasive EEG headsets to implanted microelectrode arrays - and how Neuralink and Synchron are turning that signal chain into devices that restore movement and speech for patients with ALS and paralysis.",
    href: "/research/Brain-Computer%20Interfaces%20(BCIs)%20-%20Technical%20Analysis_%20The%20Future%20of%20Brain-Computer%20Interfaces%20(BCIs)%20(1).pdf",
  },
  {
    title: "Modeling Synthetic Biological Systems",
    tags: ["Synthetic Biology", "Computational Modeling"],
    abstract:
      "Synthetic biology lets researchers wire genes, proteins, and regulatory elements together like circuits - but those circuits don't always behave the way the lab predicts. A walkthrough of how computational models simulate genetic-circuit dynamics before any cells are touched, using a toxin-sensing fluorescent bacterium as a worked example.",
    href: "/research/Modeling%20Synthetic%20Biological%20Systems%20(1).pdf",
  },
  {
    title: "The Hidden Role of Fluid Dynamics in Blood Flow & Disease",
    author: "Sumiran Sharma",
    tags: ["Cardiovascular", "Fluid Dynamics"],
    abstract:
      "Laminar blood flow stimulates endothelial cells to release nitric oxide; disturbed flow at arterial branches and bifurcations does the opposite - and that's exactly where atherosclerotic plaques tend to form. An exploration of how shear stress and turbulence drive cardiovascular disease, and how computational fluid dynamics is now used to design grafts and stents that restore healthy flow patterns.",
    href: "/research/Sumiran%20Sharma%20-%20The%20Hidden%20Role%20of%20Fluid%20Dynamics%20in%20Blood%20Flow%20%26%20Disease.pdf",
  },
  {
    title: "Precision Medicine: Multi-Omics, Biomarkers & Companion Diagnostics",
    tags: ["Precision Medicine", "Oncology"],
    abstract:
      "Modern medicine is shifting from treating disease after diagnosis to predicting it from molecular signals. A survey of how multi-omics profiling, biomarker discovery, and companion diagnostics are powering individualized treatment - including the I-PREDICT study, where nearly 95% of advanced-cancer patients had distinct tumour DNA profiles and matched therapies improved response and survival.",
    href: "/research/BE4Y%20Precision%20Medicine.docx",
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
    <li>
      <a
        href={article.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-0 hover:bg-paper-2 transition-colors duration-200 -mx-4 px-4"
      >
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
            {article.author && (
              <>
                <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] uppercase text-muted-soft">
                  <User size={9} />
                  {article.author}
                </span>
                <span className="text-rule text-xs">·</span>
              </>
            )}
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
      </a>
    </li>
  );
}
