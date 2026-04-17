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

    progressBar.style.width = `${Math.min(Math.max(progress, 0), 1) * 100}%`;
    root.style.setProperty(
      "--scroll-darkness",
      `${(Math.min(Math.max(progress, 0), 1) * 0.18).toFixed(3)}`,
    );
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    const resizePage = () => {
      window.requestAnimationFrame(() => {
        lenisRef.current?.resize();
        syncProgressBar();
      });
    };
    const syncOnScroll = () => syncProgressBar();

    let unsubscribe: (() => void) | undefined;

    if (!isTouchDevice && !prefersReducedMotion) {
      const lenis = new Lenis({
        autoRaf: true,
        anchors: true,
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenisRef.current = lenis;
      unsubscribe = lenis.on("scroll", syncProgressBar);
    }

    syncProgressBar();

    window.addEventListener("load", resizePage);
    window.addEventListener("resize", resizePage);
    window.addEventListener("orientationchange", resizePage);
    window.addEventListener("scroll", syncOnScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", resizePage);

    return () => {
      const lenis = lenisRef.current;
      unsubscribe?.();
      window.removeEventListener("load", resizePage);
      window.removeEventListener("resize", resizePage);
      window.removeEventListener("orientationchange", resizePage);
      window.removeEventListener("scroll", syncOnScroll);
      window.visualViewport?.removeEventListener("resize", resizePage);
      lenisRef.current = null;
      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped",
      );
      document.body.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped",
      );
      if (document.documentElement.getAttribute("style") === "") {
        document.documentElement.removeAttribute("style");
      }
      document.documentElement.style.removeProperty("--scroll-darkness");
      if (document.body.getAttribute("style") === "") {
        document.body.removeAttribute("style");
      }
      lenis?.destroy();
      lenisRef.current = null;
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
          className="bar h-full w-0 rounded-r-full bg-gradient-to-r from-primary via-primary to-[#67e8f9] shadow-[0_0_24px_var(--project-progress-glow)]"
        />
      </div>
      {children}
    </>
  );
}
