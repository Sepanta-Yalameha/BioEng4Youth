"use client";

import { useState } from "react";
import LoadingScreen from "@/components/loading-screen";
import ScrollExperience from "@/components/scroll-experience";
import { useFrameLoader } from "@/hooks/use-frame-loader";

export default function ScrollLanding() {
  const { store, ready, progress } = useFrameLoader();
  const [loaderGone, setLoaderGone] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#060810" }}>
      {/* Mount the experience as soon as the priority frames are ready; the
          loader fades out over it instead of blocking the whole download. */}
      {ready && <ScrollExperience store={store} />}
      {!loaderGone && (
        <LoadingScreen
          progress={progress}
          done={ready}
          onHidden={() => setLoaderGone(true)}
        />
      )}
    </div>
  );
}
