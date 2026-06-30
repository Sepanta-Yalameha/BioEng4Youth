"use client";

import { useRef, useEffect, useState } from "react";
import type { Frame, FrameStore } from "@/hooks/use-frame-loader";
import { TOTAL_FRAMES } from "@/hooks/use-scroll-animation";
import HeroPhase from "@/components/hero-phase";
import AboutPhase from "@/components/about-phase";
import DetailsPhase from "@/components/details-phase";
import InterestFormScroll from "@/components/interest-form-scroll";

// ─────────────────────────────────────────────────────────────────────────────
// Snap-breakpoint mobile experience (test3).
//
// Each phase is a full-screen scroll-snap section, so a small swipe snaps to the
// next breakpoint instead of scrubbing the animation 1:1 with the finger (which
// looked weird). The brain animation is NOT tied to the drag — it eases toward
// the active section's target frame, so it transitions smoothly *between*
// breakpoints. Mobile only; desktop keeps the existing experience.
// ─────────────────────────────────────────────────────────────────────────────

const PHASE_IDS = ["hero", "about", "details", "form"] as const;
// The frame each section settles on (brain → neurons across the clip).
const SECTION_FRAMES = [0, 48, 96, TOTAL_FRAMES - 1];

const sectionStyle: React.CSSProperties = {
  height: "100svh",
  scrollSnapAlign: "start",
  scrollSnapStop: "always",
  position: "relative",
  zIndex: 5,
};

export default function MobileSnapExperience({ store }: { store: FrameStore }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let drawnImg: Frame | null = null;
    let currentFrame = 0;
    let targetIndex = 0;
    let activeIndex = 0;
    let raf: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      drawnImg = null;
    };

    const drawCover = (img: Frame) => {
      const iw = img instanceof HTMLImageElement ? img.naturalWidth : img.width;
      const ih = img instanceof HTMLImageElement ? img.naturalHeight : img.height;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      const idx = Math.max(
        0,
        Math.min(PHASE_IDS.length - 1, Math.round(scroller.scrollTop / scroller.clientHeight))
      );
      targetIndex = idx;
      if (idx !== activeIndex) {
        activeIndex = idx;
        setActive(idx);
      }
      const max = scroller.scrollHeight - scroller.clientHeight;
      const bar = document.getElementById("scroll-bar");
      if (bar) bar.style.width = `${max > 0 ? (scroller.scrollTop / max) * 100 : 0}%`;
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      const target = SECTION_FRAMES[targetIndex];
      const dir = target >= currentFrame ? 1 : -1;
      currentFrame += (target - currentFrame) * 0.1;
      if (Math.abs(target - currentFrame) < 0.25) currentFrame = target;
      const frameInt = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrame)));
      const img = store.requestFrame(frameInt, dir);
      if (img && img !== drawnImg) {
        drawCover(img);
        drawnImg = img;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [store]);

  // Navbar "Register Interest" / #hash → snap to that section.
  useEffect(() => {
    const jump = (id: string) => {
      const idx = (PHASE_IDS as readonly string[]).indexOf(id);
      const scroller = scrollerRef.current;
      if (idx < 0 || !scroller) return;
      scroller.scrollTo({ top: idx * scroller.clientHeight, behavior: "smooth" });
    };
    const hash = window.location.hash.replace("#", "");
    if (hash) setTimeout(() => jump(hash), 150);
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) jump(detail);
    };
    window.addEventListener("biohacks:jumpToPhase", handler);
    return () => window.removeEventListener("biohacks:jumpToPhase", handler);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-bar"
        style={{ position: "fixed", top: 0, left: 0, height: "1.5px", width: "0%", background: "#00e5cc", zIndex: 60 }}
      />

      {/* Fixed brain canvas + tint/vignette behind the snapping sections */}
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, background: "#060810" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", background: "rgba(4,5,12,0.45)" }} />
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(ellipse 78% 72% at 50% 50%, transparent 18%, rgba(4,5,12,0.65) 70%, rgba(4,5,12,0.96) 100%)",
        }}
      />

      {/* Snap scroller — transparent, holds the breakpoint sections */}
      <div
        ref={scrollerRef}
        style={{
          position: "fixed", inset: 0, zIndex: 5, overflowY: "scroll", overflowX: "hidden",
          scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch",
        }}
      >
        <section style={sectionStyle}><HeroPhase /></section>
        <section style={sectionStyle}><AboutPhase /></section>
        <section style={sectionStyle}><DetailsPhase /></section>
        <section style={sectionStyle}><InterestFormScroll /></section>
      </div>

      {/* Phase dots */}
      <div
        style={{
          position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
          zIndex: 30, display: "flex", alignItems: "center", gap: "8px", pointerEvents: "none",
        }}
      >
        {PHASE_IDS.map((id, i) => (
          <div
            key={id}
            style={{
              height: "4px", borderRadius: "2px",
              width: active === i ? "20px" : "4px",
              background: active === i ? "#00e5cc" : "rgba(255,255,255,0.18)",
              boxShadow: active === i ? "0 0 8px rgba(0,229,204,0.65)" : "none",
              transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
      </div>
    </>
  );
}
