"use client";

import { useEffect, useState } from "react";

interface Props {
  /** Priority-batch progress, 0–100. */
  progress: number;
  /** True once the priority batch is decoded — triggers the fade-out. */
  done: boolean;
  /** Called after the fade-out completes so the parent can unmount the loader. */
  onHidden: () => void;
}

export default function LoadingScreen({ progress, done, onHidden }: Props) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!done) return;
    setFading(true);
    const t = setTimeout(onHidden, 500);
    return () => clearTimeout(t);
  }, [done, onHidden]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "#060810",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div className="mb-14 opacity-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/be4y-logo.png" alt="BioEng4Youth" className="h-12 w-auto" />
      </div>

      <div className="relative w-52 h-px" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: "#00e5cc",
            boxShadow: "0 0 10px rgba(0,229,204,0.6)",
          }}
        />
      </div>

      <div
        className="mt-4 text-[10px] tracking-[0.45em] uppercase"
        style={{ fontFamily: "var(--font-mono)", color: "#6b7280" }}
      >
        {progress}
      </div>
    </div>
  );
}
