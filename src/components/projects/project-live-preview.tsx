"use client";

import { useEffect, useRef, useState } from "react";

/* If the frame has not reported a load by then, assume it is not coming and
   show the fallback rather than holding a skeleton indefinitely. */
const LOAD_TIMEOUT_MS = 12000;

type Props = {
  /** Live URL, passed in from project data. The component knows no URLs. */
  href: string;
  /** Used for the iframe's accessible name and the fallback plate. */
  title: string;
  /** Rendered instead of the frame if it never loads. */
  fallback: React.ReactNode;
};

export default function ProjectLivePreview({ href, title, fallback }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  /*
    "idle" until the panel is near the viewport. The iframe is not in the tree
    before that, so opening /projects does not boot three external
    applications — each starts only when it is about to be seen.
  */
  const [phase, setPhase] = useState<"idle" | "loading" | "ready" | "failed">(
    "idle",
  );

  useEffect(() => {
    const node = containerRef.current;

    if (!node) return;

    const visible = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase((current) => (current === "idle" ? "loading" : current));
          visible.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    visible.observe(node);

    return () => visible.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const timer = setTimeout(() => {
      setPhase((current) => (current === "loading" ? "failed" : current));
    }, LOAD_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "failed") return <>{fallback}</>;

  return (
    <figure className="m-0">
      {/*
        The container is the whole treatment: one hairline, the page's own
        radius, and clipping. No header bar, no hostname, no mock browser
        chrome — those made the panel read as a debug tool, and the project
        title above it already says what the site is.
      */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-[var(--surface-glass)]"
      >
        {phase === "loading" ? <Skeleton /> : null}

        {phase !== "idle" ? (
          <iframe
            src={href}
            title={`${title}, live site`}
            loading="lazy"
            referrerPolicy="no-referrer"
            /*
              Rendered at its own size rather than scaled down from a desktop
              viewport. The scaled version looked like a product shot but was
              useless to operate: at ~0.42 a 44px button becomes an 18px
              target and body text lands under 6px. At 1:1 the site serves the
              breakpoint that fits the panel and every control is real size.
            */
            className="absolute inset-0 h-full w-full border-0"
            /*
              Cross-origin, so allow-same-origin grants it nothing against
              this page. allow-top-navigation stays out deliberately: an
              embedded site cannot redirect the portfolio out from under the
              visitor. The rest is what an app needs to actually function.
            */
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
            onLoad={() => setPhase("ready")}
            style={{
              opacity: phase === "ready" ? 1 : 0,
              transition: "opacity 400ms ease",
            }}
          />
        ) : null}
      </div>

      {/*
        The one concession to discoverability. A live embed is unusual enough
        that people assume it is an image; this says otherwise without an
        overlay sitting on top of the thing it describes.
      */}
      <figcaption className="type-eyebrow mt-3 text-[var(--text-faint)]">
        Interactive preview
      </figcaption>
    </figure>
  );
}

/* Matches the panel's shape rather than spinning in the middle of it. */
function Skeleton() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 animate-pulse bg-[var(--surface-muted)] motion-reduce:animate-none"
    />
  );
}
