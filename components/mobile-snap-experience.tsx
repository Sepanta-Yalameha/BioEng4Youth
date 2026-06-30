"use client";

import { useRef, useEffect, useState } from "react";
import type { Frame, FrameStore } from "@/hooks/use-frame-loader";
import { TOTAL_FRAMES } from "@/hooks/use-scroll-animation";
import HeroPhase from "@/components/hero-phase";
import AboutPhase from "@/components/about-phase";
import DetailsPhase from "@/components/details-phase";
import InterestFormScroll from "@/components/interest-form-scroll";

// ─────────────────────────────────────────────────────────────────────────────
// Mobile "deck" experience (test3, revised).
//
// Each phase is a centered card that stays put — a swipe snaps to the next one
// and the cards crossfade IN PLACE (no sliding), while the brain animation eases
// between hand-picked frames. The frames are spaced across the clip's actual
// motion (brain → neural network → zoom-in → close cluster) so every step has
// visible movement. Mobile only; desktop keeps the existing experience.
// ─────────────────────────────────────────────────────────────────────────────

const PHASE_IDS = ["hero", "about", "details", "form"] as const;
// Hand-picked frames: brain head → wide neuron network → zooming in → cluster.
const PHASE_FRAMES = [0, 40, 56, 72];
const COUNT = PHASE_IDS.length;
const SWIPE_THRESHOLD = 46; // px of vertical drag to step to the next card

export default function MobileSnapExperience({ store }: { store: FrameStore }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(COUNT - 1, next));
    if (clamped === activeRef.current) return;
    activeRef.current = clamped;
    setActive(clamped);
    const bar = document.getElementById("scroll-bar");
    if (bar) bar.style.width = `${(clamped / (COUNT - 1)) * 100}%`;
  };

  // Gesture: a swipe (or wheel) steps one card at a time. Taps pass through, so
  // the form stays interactive.
  useEffect(() => {
    let startY = 0;
    let engaged = false;
    let stepped = false;
    const onStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      engaged = true;
      stepped = false;
    };
    const onMove = (e: TouchEvent) => {
      if (!engaged) return;
      e.preventDefault();
      if (stepped) return;
      const dy = startY - e.touches[0].clientY;
      if (Math.abs(dy) >= SWIPE_THRESHOLD) {
        go(activeRef.current + (dy > 0 ? 1 : -1));
        stepped = true;
      }
    };
    const onEnd = () => {
      engaged = false;
    };

    let wheelLock = false;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLock || Math.abs(e.deltaY) < 6) return;
      go(activeRef.current + (e.deltaY > 0 ? 1 : -1));
      wheelLock = true;
      setTimeout(() => {
        wheelLock = false;
      }, 650);
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Navbar "Register Interest" / #hash → jump to that card.
  useEffect(() => {
    const jump = (id: string) => {
      const idx = (PHASE_IDS as readonly string[]).indexOf(id);
      if (idx >= 0) go(idx);
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

  // Canvas: ease the brain toward the active card's target frame.
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let drawnImg: Frame | null = null;
    let currentFrame = 0;
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

    const tick = () => {
      const target = PHASE_FRAMES[activeRef.current];
      const dir = target >= currentFrame ? 1 : -1;
      currentFrame += (target - currentFrame) * 0.09;
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
    };
  }, [store]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#060810", overflow: "hidden" }}>
      {/* Scroll progress bar */}
      <div
        id="scroll-bar"
        style={{ position: "fixed", top: 0, left: 0, height: "1.5px", width: "0%", background: "#00e5cc", zIndex: 60 }}
      />

      {/* Brain canvas + tint/vignette */}
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "rgba(4,5,12,0.45)" }} />
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(ellipse 78% 72% at 50% 50%, transparent 18%, rgba(4,5,12,0.65) 70%, rgba(4,5,12,0.96) 100%)",
        }}
      />

      {/* Centered cards — crossfade in place, no sliding */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
        {[<HeroPhase key="h" />, <AboutPhase key="a" />, <DetailsPhase key="d" />, <InterestFormScroll key="f" />].map(
          (node, i) => (
            <div
              key={PHASE_IDS[i]}
              className="absolute inset-0"
              style={{
                opacity: active === i ? 1 : 0,
                pointerEvents: active === i ? "auto" : "none",
                transition: "opacity 0.5s ease",
              }}
              aria-hidden={active !== i}
            >
              {node}
            </div>
          )
        )}
      </div>

      {/* Phase dots — fixed, centered */}
      <div
        style={{
          position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)",
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
    </div>
  );
}
