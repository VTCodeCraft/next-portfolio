"use client";

import { useEffect, useRef, useState } from "react";

type Tip = { label: string; x: number; y: number } | null;

/**
 * Hover and focus behaviour for a contribution calendar.
 *
 * The grid itself is rendered on the server and arrives here as children, so
 * none of the 370-odd cells become client components. This adds one delegated
 * listener on the wrapper and reads the label straight off the target's
 * data attributes — the only thing that needs to run in the browser is the
 * tooltip's position.
 */
export default function CalendarInteractions({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip>(null);

  /*
    The grid is wider than the column on narrow screens, and the interesting
    end is the recent one. Left-aligned, a phone opens on last September.
  */
  useEffect(() => {
    const scroller = wrapperRef.current?.querySelector<HTMLElement>(
      "[data-calendar-scroll]",
    );

    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
  }, []);

  const show = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return;

    const label = target.dataset.label;
    const wrapper = wrapperRef.current;

    if (!label || !wrapper) return;

    const bounds = wrapper.getBoundingClientRect();
    const cell = target.getBoundingClientRect();

    setTip({
      label,
      x: cell.left - bounds.left + cell.width / 2,
      y: cell.top - bounds.top,
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseOver={(event) => show(event.target)}
      onMouseLeave={() => setTip(null)}
      onFocus={(event) => show(event.target)}
      onBlur={() => setTip(null)}
    >
      {children}

      {tip ? (
        <div
          role="tooltip"
          className="type-meta pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-popover-foreground shadow-[var(--shadow-soft)]"
          style={{ left: tip.x, top: tip.y - 6 }}
        >
          {tip.label}
        </div>
      ) : null}
    </div>
  );
}
