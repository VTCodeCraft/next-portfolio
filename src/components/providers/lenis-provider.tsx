"use client";

import { useEffect, useEffectEvent, useRef } from "react";
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
  const darknessRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastDarknessRef = useRef(-1);

  const syncProgressBar = useEffectEvent(() => {
    const progressBar = progressBarRef.current;

    if (!progressBar) {
      return;
    }

    const root = document.documentElement;
    const scrollHeight = Math.max(root.scrollHeight, document.body.scrollHeight);
    const maxScroll = Math.max(scrollHeight - window.innerHeight, 0);
    const scrollTop = window.scrollY || root.scrollTop || 0;
    const progress =
      maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

    // scaleX instead of width: compositor-only, no layout pass per frame
    progressBar.style.transform = `scaleX(${progress})`;

    // Darkness is its own fixed, viewport-sized layer driven by opacity.
    // Writing a custom property on <html> instead would invalidate style for
    // the whole document and repaint the full-height background layer.
    const darkness = darknessRef.current;

    if (darkness) {
      const next = Math.round(progress * 0.18 * 200) / 200;

      if (next !== lastDarknessRef.current) {
        darkness.style.opacity = `${next}`;
        lastDarknessRef.current = next;
      }
    }

    frameRef.current = null;
  });

  const queueProgressSync = useEffectEvent(() => {
    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(syncProgressBar);
  });

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const resizePage = () => {
      lenis.resize();
      queueProgressSync();
    };

    lenisRef.current = lenis;
    queueProgressSync();
    lenis.on("scroll", queueProgressSync);
    window.addEventListener("resize", resizePage);
    window.addEventListener("orientationchange", resizePage);

    return () => {
      lenis.off("scroll", queueProgressSync);
      window.removeEventListener("resize", resizePage);
      window.removeEventListener("orientationchange", resizePage);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      lenisRef.current?.resize();
      queueProgressSync();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={darknessRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 hidden bg-[rgb(3,2,8)] opacity-0 dark:block"
        style={{ willChange: "opacity" }}
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left scale-x-0 rounded-r-full bg-gradient-to-r from-primary via-primary to-[var(--project-scene-ring)] shadow-[0_0_24px_var(--project-progress-glow)]"
          style={{ willChange: "transform" }}
        />
      </div>
      {children}
    </>
  );
}
