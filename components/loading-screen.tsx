"use client";

import { useEffect, useState } from "react";
import { TOTAL_FRAMES } from "@/hooks/use-scroll-animation";

const BATCH_SIZE = 20;

function loadFrame(index: number): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const n = String(index + 1).padStart(4, "0");
    img.src = `/frames/frame-${n}.jpg`;
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
  });
}

interface Props {
  onComplete: (frames: (HTMLImageElement | null)[]) => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      const frames: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);

      for (let i = 0; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        if (cancelled) return;
        const batch: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
          const idx = j;
          batch.push(loadFrame(idx).then((img) => { frames[idx] = img; }));
        }
        await Promise.all(batch);
        if (!cancelled) setProgress(Math.round((Math.min(i + BATCH_SIZE, TOTAL_FRAMES) / TOTAL_FRAMES) * 100));
      }

      if (!cancelled) {
        await new Promise((r) => setTimeout(r, 350));
        if (!cancelled) {
          setFading(true);
          await new Promise((r) => setTimeout(r, 600));
          if (!cancelled) onComplete(frames);
        }
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "#060810",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease",
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
