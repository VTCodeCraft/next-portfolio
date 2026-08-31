import React from "react";
import clsx from "clsx";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  /** Every route needs exactly one h1; sections below it stay h2. */
  as?: "h1" | "h2";
  /** Monospace section index, e.g. "01". Sits outside the heading. */
  index?: string;
  /**
   * Runs a hairline from the heading to the right edge of the column. Used on
   * the homepage to tie every section to the same spine; replaces the short
   * gradient underline rather than stacking with it.
   */
  rule?: boolean;
  /**
   * Small metadata sitting at the far end of the rule — counts, ranges, links.
   * Keeps section-level context on the spine instead of in a side rail.
   */
  meta?: React.ReactNode;
};

export default function SectionHeading({
  children,
  className,
  as: Heading = "h2",
  index,
  rule = false,
  meta,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "flex w-full flex-col",
        rule ? "mb-8 items-start" : "mx-auto mb-7 items-center lg:items-start",
        className,
      )}
    >
      <div
        className={clsx(
          "flex w-full gap-4",
          rule ? "items-baseline" : "flex-col items-center lg:items-start",
        )}
      >
        {index ? (
          <span
            aria-hidden
            className="type-eyebrow shrink-0 tabular-nums text-[var(--text-subtle)]"
          >
            {index}
          </span>
        ) : null}

        <Heading
          className={clsx(
            "type-h2 text-foreground",
            rule ? "shrink-0 text-left" : "text-center lg:text-left",
          )}
        >
          {children}
        </Heading>

        {rule ? (
          <span aria-hidden className="h-px min-w-8 flex-1 translate-y-[-0.35em] bg-border" />
        ) : null}

        {rule && meta ? (
          <span className="type-eyebrow shrink-0 tracking-[0.12em]">{meta}</span>
        ) : null}
      </div>

      {rule ? null : (
        <div className="mt-3 h-px w-[95px] rounded-full bg-gradient-to-r from-primary via-muted-foreground to-transparent" />
      )}
    </div>
  );
}
