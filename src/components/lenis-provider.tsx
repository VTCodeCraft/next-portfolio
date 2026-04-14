"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const syncProgressBar = () => {
    const progressBar = progressBarRef.current;
    const lenis = lenisRef.current;

    if (!progressBar || !lenis) {
      return;
    }

    const progress = lenis.limit > 0 ? lenis.progress : 0;
    progressBar.style.width = `${Math.min(Math.max(progress, 0), 1) * 100}%`;
  };

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    syncProgressBar();
    const unsubscribe = lenis.on("scroll", syncProgressBar);

    return () => {
      unsubscribe();
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      lenisRef.current?.resize();
      syncProgressBar();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
        <div
          ref={progressBarRef}
          className="bar h-full w-0 rounded-r-full bg-gradient-to-r from-primary via-primary to-primary/70 shadow-[0_0_24px_rgba(139,92,246,0.45)]"
        />
      </div>
      {children}
    </>
  );
}
