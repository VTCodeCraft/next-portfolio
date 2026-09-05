"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const activateRef = useRef<HTMLButtonElement>(null);
  /*
    "idle" until the panel is near the viewport. The iframe is not in the tree
    before that, so opening /projects does not boot three external
    applications — each starts only when it is about to be seen.
  */
  const [phase, setPhase] = useState<"idle" | "loading" | "ready" | "failed">(
    "idle",
  );
  /*
    The frame is inert until it is deliberately activated.

    A live embed that takes the pointer on hover hijacks the page: the wheel
    goes to whichever app the cursor happens to be crossing, so scrolling past
    a preview scrolls the preview instead of the page, and the visitor has no
    obvious way to get out. Requiring a click means the reader stays in
    control of the page and only hands over the pointer on purpose.
  */
  const [isActive, setIsActive] = useState(false);

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

  /*
    The activate button does not exist while the frame is live, so focusing it
    in the same tick as the state change would find nothing. The flag defers
    the focus to the effect below, after the button is back in the DOM. Only
    the keyboard path sets it — someone who clicked away has already chosen
    where they want to be.
  */
  const restoreFocus = useRef(false);

  const release = useCallback(() => {
    restoreFocus.current = true;
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (isActive || !restoreFocus.current) return;

    restoreFocus.current = false;
    activateRef.current?.focus();
  }, [isActive]);

  /*
    Two ways back out, and they cover different cases.

    Escape only fires while focus is still in this document — a keydown inside
    a cross-origin frame does not cross the boundary, so once the visitor has
    genuinely clicked into the embedded app this handler stops hearing them.
    That is why the caption advertises clicking away rather than Escape: a
    pointer-down outside the panel always lands in this document, so it is the
    path that works from any state.
  */
  useEffect(() => {
    if (!isActive) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") release();
    };

    const onPointerDown = (event: PointerEvent) => {
      const node = containerRef.current;

      if (node && event.target instanceof Node && !node.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown, true);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [isActive, release]);

  if (phase === "failed") return <>{fallback}</>;

  return (
    <figure className="m-0">
      <div
        ref={containerRef}
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-lg border bg-[var(--surface-glass)] transition-colors ${
          isActive ? "border-[oklch(1_0_0/26%)]" : "border-border"
        }`}
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
              viewport: at ~0.42 a 44px control becomes an 18px target and body
              text lands under 6px, which is not something you can operate.
            */
            className={`absolute inset-0 h-full w-full border-0 ${
              isActive ? "" : "pointer-events-none"
            }`}
            /* Out of the tab order until activated, so keyboard users are not
               dropped into a third-party app while tabbing down the page. */
            tabIndex={isActive ? 0 : -1}
            /*
              Cross-origin, so allow-same-origin grants it nothing against this
              page. allow-top-navigation stays out deliberately: an embedded
              site cannot redirect the portfolio out from under the visitor.
            */
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
            onLoad={() => setPhase("ready")}
            style={{
              opacity: phase === "ready" ? 1 : 0,
              transition: "opacity 400ms ease",
            }}
          />
        ) : null}

        {/*
          Transparent click-catcher rather than a panel with a label on it.
          The hint lives in the caption below, so nothing is printed over the
          product itself — but this is a real button, so it is reachable and
          operable from the keyboard.
        */}
        {!isActive ? (
          <button
            ref={activateRef}
            type="button"
            onClick={() => setIsActive(true)}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--foreground)]"
          >
            <span className="sr-only">
              Activate the interactive preview of {title}
            </span>
          </button>
        ) : null}
      </div>

      {/* Reads as status, not as an instruction pasted over the artwork. */}
      <figcaption
        aria-live="polite"
        className="type-eyebrow mt-3 text-[var(--text-faint)]"
      >
        {isActive ? "Interactive · click away to release" : "Click to interact"}
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
