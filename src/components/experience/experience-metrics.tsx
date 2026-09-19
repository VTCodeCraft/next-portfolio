import type { ExperienceMetric } from "@/lib/experience";

/**
 * A row of figures, set as a definition list because that is what it is.
 *
 * Deliberately not cards, tiles or progress bars: the numbers here are small
 * counts, and a box around each one turns four facts into a dashboard. They
 * sit on a hairline rule with tabular figures so the column edges line up.
 */
export default function ExperienceMetrics({
  label,
  metrics,
  note,
}: {
  /** Mono heading above the row. */
  label: string;
  metrics: ExperienceMetric[];
  note?: string;
}) {
  if (metrics.length === 0) return null;

  return (
    <div className="border-t border-border pt-6">
      <p className="type-eyebrow text-[var(--text-subtle)]">{label}</p>

      {/*
        Two columns on phones, four from sm. A four-across row of numbers at
        375px puts three words on three lines each; two-across keeps every
        label to one or two lines.
      */}
      {/*
        dt before dd in the DOM, reversed visually with flex-col-reverse. The
        figure reads first and the label sits under it, but the markup keeps
        the term ahead of its definition where assistive tech expects it.

        The comment lives here rather than inside the map body: a JSX comment
        as the first thing in a parenthesised arrow return makes it a second
        sibling expression, which is a syntax error.
      */}
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex min-w-0 flex-col-reverse">
            <dt className="type-meta mt-1.5 text-muted-foreground">
              {metric.label}
            </dt>
            <dd className="type-statement m-0 tabular-nums text-foreground">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      {note ? (
        <p className="type-prose type-meta mt-6 text-[var(--text-subtle)]">
          {note}
        </p>
      ) : null}
    </div>
  );
}
