"use client";

import { useEffect, useRef, useState } from "react";

export const TOTAL_FRAMES = 145;

export const PHASES = [
  { id: "hero",    start: 0.00, end: 0.18 },
  { id: "about",   start: 0.22, end: 0.42 },
  { id: "details", start: 0.46, end: 0.66 },
  { id: "form",    start: 0.70, end: 1.00 },
] as const;

export type PhaseId = (typeof PHASES)[number]["id"] | null;

export function useScrollAnimation() {
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const virtualRef = useRef(0);
  const currentFrameRef = useRef(0);
  const activePhaseRef = useRef<PhaseId>(PHASES[0].id);
  const [activePhase, setActivePhase] = useState<PhaseId>(PHASES[0].id);

  // Input: wheel + touch
  useEffect(() => {
    const SCROLL_MAX = window.innerHeight * 4;

    const advance = (delta: number) => {
      virtualRef.current = Math.max(0, Math.min(SCROLL_MAX, virtualRef.current + delta));
      targetRef.current = virtualRef.current / SCROLL_MAX;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      advance(e.deltaY);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      advance(dy * 1.5);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // Lerp loop
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const cur = progressRef.current;
      const tgt = targetRef.current;
      const next = cur + (tgt - cur) * 0.08;

      if (Math.abs(next - cur) > 0.00005) {
        progressRef.current = next;
        currentFrameRef.current = Math.min(Math.floor(next * TOTAL_FRAMES), TOTAL_FRAMES - 1);

        const bar = document.getElementById("scroll-bar");
        if (bar) bar.style.width = `${next * 100}%`;

        const match = PHASES.find((ph) => next >= ph.start && next <= ph.end);
        const nextPhase: PhaseId = match?.id ?? null;
        if (nextPhase !== activePhaseRef.current) {
          activePhaseRef.current = nextPhase;
          setActivePhase(nextPhase);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { progressRef, currentFrameRef, activePhase };
}
