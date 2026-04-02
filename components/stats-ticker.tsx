import { Dna, Microscope, Zap, GraduationCap, Globe, Star } from "lucide-react";

const items = [
  { icon: <Star size={14} />, text: "First Edition" },
  { icon: <Globe size={14} />, text: "Open to All" },
  { icon: <GraduationCap size={14} />, text: "McMaster University" },
  { icon: <Zap size={14} />, text: "MLH Guidelines" },
  { icon: <Dna size={14} />, text: "Bioengineering" },
  { icon: <Microscope size={14} />, text: "Coming Soon" },
  { icon: <Star size={14} />, text: "First Edition" },
  { icon: <Globe size={14} />, text: "Open to All" },
  { icon: <GraduationCap size={14} />, text: "McMaster University" },
  { icon: <Zap size={14} />, text: "MLH Guidelines" },
  { icon: <Dna size={14} />, text: "Bioengineering" },
  { icon: <Microscope size={14} />, text: "Coming Soon" },
];

export default function StatsTicker() {
  return (
    <div className="bg-brand-text/85 backdrop-blur-md border-y border-white/10 py-3 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {/* Doubled for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 mx-6 text-white/50 text-xs font-mono tracking-widest uppercase shrink-0"
          >
            <span className="text-brand-accent">{item.icon}</span>
            <span>{item.text}</span>
            <span className="mx-2 text-white/20">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
