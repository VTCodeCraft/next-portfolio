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
  const unsubscribeRef = useRef<(() => void) | undefined>(undefined);
  const activationTimeoutRef = useRef<number | null>(null);
  const activationFrameRefs = useRef<number[]>([]);

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
    const clearActivationQueue = () => {
      if (activationTimeoutRef.current !== null) {
        window.clearTimeout(activationTimeoutRef.current);
        activationTimeoutRef.current = null;
      }

      activationFrameRefs.current.forEach((frame) =>
        window.cancelAnimationFrame(frame),
      );
      activationFrameRefs.current = [];
    };
    const cleanupLenis = () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = undefined;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
    const detachIntentListeners = () => {
      window.removeEventListener("wheel", activateLenis);
      window.removeEventListener("touchstart", activateLenis);
      window.removeEventListener("keydown", activateLenis);
      window.removeEventListener("mousedown", activateLenis);
    };
    const activateLenis = () => {
      if (isTouchDevice || prefersReducedMotion || lenisRef.current) {
        return;
      }

      clearActivationQueue();

      const lenis = new Lenis({
        autoRaf: true,
        anchors: true,
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenisRef.current = lenis;
      unsubscribeRef.current = lenis.on("scroll", syncProgressBar);
      detachIntentListeners();

      window.requestAnimationFrame(() => {
        lenis.resize();
        syncProgressBar();
      });
    };
    const queueActivation = () => {
      if (isTouchDevice || prefersReducedMotion) {
        return;
      }

      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(() => {
          activationTimeoutRef.current = window.setTimeout(() => {
            activateLenis();
          }, 120);
        });

        activationFrameRefs.current.push(secondFrame);
      });

      activationFrameRefs.current.push(firstFrame);
    };

    syncProgressBar();
    queueActivation();

    window.addEventListener("load", resizePage);
    window.addEventListener("resize", resizePage);
    window.addEventListener("orientationchange", resizePage);
    window.addEventListener("scroll", syncOnScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", resizePage);
    window.addEventListener("wheel", activateLenis, { passive: true });
    window.addEventListener("touchstart", activateLenis, { passive: true });
    window.addEventListener("keydown", activateLenis);
    window.addEventListener("mousedown", activateLenis);

    return () => {
      clearActivationQueue();
      detachIntentListeners();
      window.removeEventListener("load", resizePage);
      window.removeEventListener("resize", resizePage);
      window.removeEventListener("orientationchange", resizePage);
      window.removeEventListener("scroll", syncOnScroll);
      window.visualViewport?.removeEventListener("resize", resizePage);
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
      cleanupLenis();
    };
  }, [pathname]);

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
          className="bar h-full w-0 rounded-r-full bg-gradient-to-r from-primary via-primary to-[var(--project-scene-ring)] shadow-[0_0_24px_var(--project-progress-glow)]"
        />
      </div>
      {children}
    </>
  );
}
