"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/loading-screen";
import ScrollExperience from "@/components/scroll-experience";
import MobileSnapExperience from "@/components/mobile-snap-experience";
import { useFrameLoader } from "@/hooks/use-frame-loader";

export default function ScrollLanding() {
  const { store, ready, progress } = useFrameLoader();
  const [loaderGone, setLoaderGone] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      {ready && isMobile !== null && (
        isMobile ? (
          // Phones: snap-breakpoint sections.
          <MobileSnapExperience store={store} />
        ) : (
          // Desktop: existing scroll-jacked experience.
          <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#060810" }}>
            <ScrollExperience store={store} />
          </div>
        )
      )}
      {!loaderGone && (
        <LoadingScreen
          progress={progress}
          done={ready}
          onHidden={() => setLoaderGone(true)}
        />
      )}
    </>
  );
}
