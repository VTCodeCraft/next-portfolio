"use client";

import { useEffect, useRef, useState } from "react";

/*
  The frame is rendered at a desktop viewport and scaled down to fit, rather
  than letting the site lay itself out at ~600px. Embedded at container width
  these projects would render their own mobile breakpoints, so the preview
  would show a phone layout inside a desktop composition — the opposite of
  what a "here is the product" shot should show.
*/
const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 900;

/* If the frame has not reported a load by now, assume it is not coming and
   show the fallback rather than an indefinite skeleton. */
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
  const [scale, setScale] = useState(0);
  /*
    "idle" until the container is near the viewport. The iframe is not in the
    tree before that, so opening /projects does not boot three external
    applications — each one only starts when it is about to be seen.
  */
  const [phase, setPhase] = useState<"idle" | "loading" | "ready" | "failed">(
    "idle",
  );

  useEffect(() => {
    const node = containerRef.current;

    if (!node) return;

    const resize = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME_WIDTH);
    });

    resize.observe(node);

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

    return () => {
      resize.disconnect();
      visible.disconnect();
    };
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
    <div className="overflow-hidden rounded-lg border border-border bg-[var(--surface-glass)]">
      {/*
        A two-line header rather than fake browser chrome. Mock traffic-light
        buttons and a mock address bar are controls that cannot be operated,
        which is worse than no chrome at all; this states what the panel is
        and where it points.
      */}
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
        <span className="type-eyebrow shrink-0 text-[var(--text-faint)]">
          Live
        </span>
        {/* min-w-0 is what makes truncate work: a hostname has no spaces, so
            without it the flex item's automatic minimum is the full string
            and the panel pushes the whole row past the viewport on mobile. */}
        <span className="type-eyebrow min-w-0 truncate text-[var(--text-subtle)]">
          {hostOf(href)}
        </span>
      </div>

      {/* Aspect held so the row reserves its height before the frame loads. */}
      <div ref={containerRef} className="relative aspect-[16/10] w-full">
        {phase === "loading" ? <Skeleton /> : null}

        {phase !== "idle" && scale > 0 ? (
          <iframe
            src={href}
            title={`Live preview of ${title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            /*
              Cross-origin content, so allow-same-origin does not grant it
              access to this page. Dropping allow-top-navigation is the point:
              without it an embedded site cannot redirect the portfolio out
              from under the visitor.
            */
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            /*
              Not interactive, and out of the tab order. A live third-party app
              inside the page would capture scroll and swallow keyboard focus
              with no visible way back out. This is evidence of shipped work;
              the link below it is how you actually use the thing.
            */
            tabIndex={-1}
            aria-hidden
            onLoad={() => setPhase("ready")}
            className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
            style={{
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
              transform: `scale(${scale})`,
              opacity: phase === "ready" ? 1 : 0,
              transition: "opacity 400ms ease",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

function hostOf(href: string) {
  try {
    return new URL(href).host;
  } catch {
    return href;
  }
}

/* Matches the frame's shape rather than spinning in the middle of it. */
function Skeleton() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 animate-pulse bg-[var(--surface-muted)] motion-reduce:animate-none"
    />
  );
}
