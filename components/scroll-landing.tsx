"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/loading-screen";
import ScrollExperience from "@/components/scroll-experience";

export default function ScrollLanding() {
  const [frames, setFrames] = useState<(HTMLImageElement | null)[] | null>(null);
  const handleLoaded = useCallback((f: (HTMLImageElement | null)[]) => setFrames(f), []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#060810" }}>
      {!frames && <LoadingScreen onComplete={handleLoaded} />}
      {frames && <ScrollExperience frames={frames} />}
    </div>
  );
}
