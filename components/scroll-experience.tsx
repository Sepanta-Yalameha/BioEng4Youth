"use client";

import { useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import PhaseOverlay from "@/components/phase-overlay";
import HeroPhase from "@/components/hero-phase";
import AboutPhase from "@/components/about-phase";
import DetailsPhase from "@/components/details-phase";
import InterestFormScroll from "@/components/interest-form-scroll";

const PHASE_IDS = ["hero", "about", "details", "form"] as const;

export default function ScrollExperience({ frames }: { frames: (HTMLImageElement | null)[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { progressRef, currentFrameRef, activePhase } = useScrollAnimation();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let drawnFrame = -1;
    let raf: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      drawnFrame = -1;
    };

    const drawCover = (img: HTMLImageElement) => {
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const f = currentFrameRef.current;
      if (f !== drawnFrame) {
        const img = frames[f];
        if (img) drawCover(img);
        drawnFrame = f;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [frames, currentFrameRef, progressRef]);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "1.5px",
          width: "0%",
          background: "#00e5cc",
          zIndex: 200,
        }}
      />

      {/* Fixed full-screen viewport */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#060810" }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />

        {/* Dark tint */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(4,5,12,0.45)", pointerEvents: "none", zIndex: 9 }} />

        {/* Vignette */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
            background: "radial-gradient(ellipse 78% 72% at 50% 50%, transparent 18%, rgba(4,5,12,0.65) 70%, rgba(4,5,12,0.96) 100%)",
          }}
        />

        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "160px",
            background: "linear-gradient(to top, rgba(4,5,12,0.95), transparent)",
            pointerEvents: "none", zIndex: 10,
          }}
        />

        {/* Phase overlays */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
          <PhaseOverlay visible={activePhase === "hero"}><HeroPhase /></PhaseOverlay>
          <PhaseOverlay visible={activePhase === "about"}><AboutPhase /></PhaseOverlay>
          <PhaseOverlay visible={activePhase === "details"}><DetailsPhase /></PhaseOverlay>
          <PhaseOverlay visible={activePhase === "form"}><InterestFormScroll /></PhaseOverlay>
        </div>

        {/* Phase dots */}
        <div
          style={{
            position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
            zIndex: 30, display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          {PHASE_IDS.map((id) => (
            <div
              key={id}
              style={{
                height: "4px",
                borderRadius: "2px",
                width: activePhase === id ? "20px" : "4px",
                background: activePhase === id ? "#00e5cc" : "rgba(255,255,255,0.18)",
                boxShadow: activePhase === id ? "0 0 8px rgba(0,229,204,0.65)" : "none",
                transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
