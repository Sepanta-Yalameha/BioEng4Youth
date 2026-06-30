"use client";

import { useEffect, useRef, useState } from "react";
import { TOTAL_FRAMES } from "@/hooks/use-scroll-animation";

// ─────────────────────────────────────────────────────────────────────────────
// Windowed frame loader for the scroll experience.
//
// Frames are extracted from the 4K master (scripts/extract-frames.mjs) into
// responsive WebP: desktop 2560×1440, mobile 1280×720. Those are too large to
// keep all 145 decoded at once (2560 decodes to ~14.7 MB each → 2 GB), so this
// loader:
//   1. Downloads every frame's WebP *blob* (cheap to hold — ~24 MB desktop)
//      progressively, always chasing the current scroll position first.
//   2. Decodes only a rolling WINDOW of frames around the scroll head via
//      createImageBitmap (off-thread), prefetching AHEAD in the scroll
//      direction, and closes bitmaps that fall outside the window.
// Memory stays flat and bounded (~600 MB desktop / ~150 MB mobile) regardless
// of frame resolution, and decode keeps ahead of the LERP-smoothed scroll so it
// never stutters. JPGs remain a fallback for browsers without WebP.
// ─────────────────────────────────────────────────────────────────────────────

export type Frame = ImageBitmap | HTMLImageElement;

export interface FrameStore {
  /** Best frame to draw now for `frameIdx`; schedules decode of it + ahead. */
  requestFrame: (frameIdx: number, dir: number) => Frame | null;
}

interface InternalStore extends FrameStore {
  start: (opts: {
    mobile: boolean;
    onReady: () => void;
    onProgress: (pct: number) => void;
  }) => void;
  stop: () => void;
}

const MOBILE_BREAKPOINT = 768;
const PRIORITY_DESKTOP = 12;
const PRIORITY_MOBILE = 8;
const DOWNLOAD_CONCURRENCY = 6;
const MAX_DECODE = 4;
const WINDOW = 40; // max decoded bitmaps held in memory
const AHEAD = 10; // decode this many positions ahead in the scroll direction
const BEHIND = 4; // and a few behind, for reverse scrubs

function frameUrl(frameIdx: number, isMobile: boolean): string {
  const n = String(frameIdx + 1).padStart(4, "0");
  return isMobile ? `/frames-sm/frame-${n}.webp` : `/frames/frame-${n}.webp`;
}

async function fetchBlob(url: string): Promise<Blob | null> {
  try {
    const res = await fetch(url);
    if (res.ok) return await res.blob();
  } catch {
    // download failed; frame stays null and the nearest decoded frame is drawn
  }
  return null;
}

async function decodeBlob(blob: Blob): Promise<Frame | null> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(blob);
    } catch {
      // fall through
    }
  }
  return new Promise<Frame | null>((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const d = img.decode ? img.decode().catch(() => {}) : Promise.resolve();
      d.then(() => {
        URL.revokeObjectURL(url);
        resolve(img);
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

function closeFrame(frame: Frame | undefined) {
  if (frame instanceof ImageBitmap) frame.close();
}

function createStore(): InternalStore {
  const blobs: (Blob | null)[] = new Array(TOTAL_FRAMES).fill(null);
  const decoded = new Map<number, Frame>();
  const decoding = new Set<number>();

  let isMobile = false;
  let step = 1;
  let positions = TOTAL_FRAMES; // number of loadable positions
  let priorityCount = PRIORITY_DESKTOP;
  let center = 0; // current scroll head, in position units
  let dir = 1;
  let pending = new Set<number>(); // positions not yet downloaded
  let revealed = false;
  let cancelled = false;
  let onReady = () => {};
  let onProgress = (_pct: number) => {};

  const posToFrame = (pos: number) => pos * step;
  const frameToPos = (f: number) =>
    Math.max(0, Math.min(positions - 1, Math.round(f / step)));

  function pickDownload(): number | null {
    let best: number | null = null;
    let bestScore = Infinity;
    pending.forEach((pos) => {
      const delta = pos - center;
      // prefer frames at/ahead of the head in the current scroll direction
      const ahead = delta === 0 || Math.sign(delta) === Math.sign(dir || 1);
      const score = Math.abs(delta) + (ahead ? 0 : 4);
      if (score < bestScore) {
        bestScore = score;
        best = pos;
      }
    });
    return best;
  }

  async function downloadWorker() {
    while (!cancelled) {
      const pos = pickDownload();
      if (pos === null) return;
      pending.delete(pos);
      const blob = await fetchBlob(frameUrl(posToFrame(pos), isMobile));
      if (cancelled) return;
      blobs[posToFrame(pos)] = blob;
      maybeReveal();
    }
  }

  function maybeReveal() {
    if (revealed) return;
    const need = Math.min(priorityCount, positions);
    let have = 0;
    for (let p = 0; p < need; p++) if (blobs[posToFrame(p)]) have++;
    onProgress(Math.round((have / need) * 100));
    if (have >= need) {
      revealed = true;
      ensureDecoded(0);
      onReady();
    }
  }

  function ensureDecoded(pos: number) {
    if (pos < 0 || pos >= positions) return;
    const f = posToFrame(pos);
    if (decoded.has(f) || decoding.has(f)) return;
    const blob = blobs[f];
    if (!blob) return;
    if (decoding.size >= MAX_DECODE) return;
    decoding.add(f);
    decodeBlob(blob).then((frame) => {
      decoding.delete(f);
      if (cancelled || !frame) {
        if (cancelled) closeFrame(frame ?? undefined);
        return;
      }
      decoded.set(f, frame);
      evict();
    });
  }

  function evict() {
    while (decoded.size > WINDOW) {
      let worst = -1;
      let worstDist = -1;
      decoded.forEach((_frame, f) => {
        const dist = Math.abs(Math.round(f / step) - center);
        if (dist > worstDist) {
          worstDist = dist;
          worst = f;
        }
      });
      if (worst < 0) break;
      closeFrame(decoded.get(worst));
      decoded.delete(worst);
    }
  }

  function nearestDecoded(pos: number): Frame | null {
    const exact = decoded.get(posToFrame(pos));
    if (exact) return exact;
    let best: Frame | null = null;
    let bestDist = Infinity;
    decoded.forEach((frame, f) => {
      const dist = Math.abs(Math.round(f / step) - pos);
      if (dist < bestDist) {
        bestDist = dist;
        best = frame;
      }
    });
    return best;
  }

  return {
    requestFrame(frameIdx, d) {
      const pos = frameToPos(frameIdx);
      if (d !== 0) dir = d > 0 ? 1 : -1;
      center = pos;
      ensureDecoded(pos);
      for (let k = 1; k <= AHEAD; k++) ensureDecoded(pos + dir * k);
      for (let k = 1; k <= BEHIND; k++) ensureDecoded(pos - dir * k);
      return nearestDecoded(pos);
    },
    start({ mobile, onReady: r, onProgress: p }) {
      // Reset run state so a remount (React StrictMode double-invokes effects in
      // dev) restarts cleanly instead of staying cancelled. Downloaded blobs are
      // kept — re-fetches hit the browser cache.
      cancelled = false;
      revealed = false;
      decoding.clear();
      center = 0;
      dir = 1;
      isMobile = mobile;
      step = mobile ? 2 : 1;
      positions = Math.floor((TOTAL_FRAMES - 1) / step) + 1;
      priorityCount = mobile ? PRIORITY_MOBILE : PRIORITY_DESKTOP;
      pending = new Set(Array.from({ length: positions }, (_, i) => i));
      onReady = r;
      onProgress = p;
      const workers = Math.min(DOWNLOAD_CONCURRENCY, positions);
      for (let w = 0; w < workers; w++) downloadWorker();
    },
    stop() {
      cancelled = true;
      decoded.forEach((frame) => closeFrame(frame));
      decoded.clear();
    },
  };
}

export function useFrameLoader() {
  const storeRef = useRef<InternalStore>();
  if (!storeRef.current) storeRef.current = createStore();
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const store = storeRef.current!;
    store.start({
      mobile: window.innerWidth < MOBILE_BREAKPOINT,
      onReady: () => setReady(true),
      onProgress: setProgress,
    });
    return () => store.stop();
  }, []);

  return { store: storeRef.current as FrameStore, ready, progress };
}
