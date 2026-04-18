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
  const frameRef = useRef<number | null>(null);

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

    progressBar.style.width = `${progress * 100}%`;
    root.style.setProperty(
      "--scroll-darkness",
      `${(progress * 0.18).toFixed(3)}`,
    );
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

      document.documentElement.style.removeProperty("--scroll-darkness");
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
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full w-0 rounded-r-full bg-gradient-to-r from-primary via-primary to-[var(--project-scene-ring)] shadow-[0_0_24px_var(--project-progress-glow)]"
        />
      </div>
      {children}
    </>
  );
}
