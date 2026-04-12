"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("@/components/Galaxy"), {
  ssr: false,
  loading: () => null,
});

export default function GalaxyDeferred() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timeoutId = window.setTimeout(() => {
      if (!document.hidden) {
        setMounted(true);
      }
    }, 800);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setMounted(false);
        window.clearTimeout(timeoutId);
        return;
      }

      timeoutId = window.setTimeout(() => setMounted(true), 150);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Galaxy
      mouseRepulsion={false}
      mouseInteraction={false}
      density={1}
      glowIntensity={0.1}
      saturation={0.12}
      hueShift={100}
      twinkleIntensity={0.2}
      rotationSpeed={0.02}
      repulsionStrength={1}
      autoCenterRepulsion={0}
      starSpeed={0.3}
      speed={0.5}
      transparent
    />
  );
}
