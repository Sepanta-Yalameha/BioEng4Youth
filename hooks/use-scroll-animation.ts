"use client";

import { useEffect, useRef, useState } from "react";

export const TOTAL_FRAMES = 145;

// Each phase declares the [start, end] window of the smoothed progress (0..1)
// during which its overlay is visible. Outside any window, all overlays fade
// to opacity 0 and only the canvas animation shows. Mobile uses tighter
// windows + bigger gaps because each overlay covers most of the small screen
// - shorter visible windows mean the user gets to actually see the canvas
// frame animation in between phases instead of one long text wall.
type Phase = { id: PhaseIdNonNull; start: number; end: number };

const PHASES_DESKTOP: readonly Phase[] = [
  { id: "hero",    start: 0.00, end: 0.18 },
  { id: "about",   start: 0.22, end: 0.42 },
  { id: "details", start: 0.46, end: 0.66 },
  { id: "form",    start: 0.70, end: 1.00 },
];

const PHASES_MOBILE: readonly Phase[] = [
  { id: "hero",    start: 0.00, end: 0.08 },
  { id: "about",   start: 0.26, end: 0.34 },
  { id: "details", start: 0.52, end: 0.60 },
  { id: "form",    start: 0.80, end: 1.00 },
];

const MOBILE_BREAKPOINT = 768;

type PhaseIdNonNull = "hero" | "about" | "details" | "form";
export type PhaseId = PhaseIdNonNull | null;

function pickPhases(): readonly Phase[] {
  if (typeof window === "undefined") return PHASES_DESKTOP;
  return window.innerWidth < MOBILE_BREAKPOINT ? PHASES_MOBILE : PHASES_DESKTOP;
}

export function useScrollAnimation() {
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const virtualRef = useRef(0);
  const currentFrameRef = useRef(0);
  const phasesRef = useRef<readonly Phase[]>(PHASES_DESKTOP);
  const activePhaseRef = useRef<PhaseId>("hero");
  const [activePhase, setActivePhase] = useState<PhaseId>("hero");

  // Pick the right phase windows on mount and re-pick on resize so rotating
  // a tablet from portrait to landscape (or resizing the browser across the
  // breakpoint) updates the phase timing live.
  useEffect(() => {
    const update = () => {
      phasesRef.current = pickPhases();
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
      advance(dy * 1.15);
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

  // Jump-to-phase: triggered by hash on mount and by `biohacks:jumpToPhase` custom event.
  // Used by the navbar "Register Interest" CTA to deep-link to the form phase.
  useEffect(() => {
    const SCROLL_MAX = window.innerHeight * 4;

    const jumpToPhase = (phaseId: string) => {
      const phase = phasesRef.current.find((p) => p.id === phaseId);
      if (!phase) return;
      const targetProgress = (phase.start + phase.end) / 2;
      virtualRef.current = targetProgress * SCROLL_MAX;
      targetRef.current = targetProgress;
    };

    const initialHash = window.location.hash.replace("#", "");
    if (initialHash) jumpToPhase(initialHash);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) jumpToPhase(detail);
    };
    window.addEventListener("biohacks:jumpToPhase", handler);
    return () => window.removeEventListener("biohacks:jumpToPhase", handler);
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

        const match = phasesRef.current.find(
          (ph) => next >= ph.start && next <= ph.end
        );
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
