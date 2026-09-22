import type { ContributionHistory } from "@/lib/contributions";

/** "2025-07" → "Jul 2025". UTC so the month cannot slip a boundary. */
const formatMonth = (month: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${month}-01T00:00:00Z`));

/*
  Tall enough that the linear scale stays readable.

  One month is more than three times the next busiest, so against an 88px
  track everything except the peak landed between 3 and 26px and the chart
  was a spike over a row of stubs. Raising the track raises every bar with
  it — the proportions are untouched, there is just more of them to see.
*/
const TRACK_PX = 132;
/* Enough for a quiet month to stay visible next to a loud one without
   pretending it was busier than it was. */
const MIN_BAR_PX = 3;

/**
 * Every month since the first contribution, as a bar per month.
 *
 * The calendars above cover a rolling year, which says nothing about whether
 * the work has been going on for one year or five. This is the long view.
 *
 * Scaled linearly against the peak month, deliberately. The range here is
 * wide — the busiest month is more than ten times the quietest — and a log or
 * square-root axis would flatten that into a tidier chart that misrepresents
 * it. The quiet months were quiet; the chart says so.
 */
export default function ContributionHistoryChart({
  history,
}: {
  history: ContributionHistory;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline gap-3">
        <h3 className="type-eyebrow text-muted-foreground">All time</h3>

        <span
          aria-hidden
          className="h-px flex-1 translate-y-[-0.2em] bg-border"
        />

        <span className="type-meta tabular-nums text-[var(--text-subtle)]">
          {history.total.toLocaleString()} contributions
        </span>
      </div>

      {/*
        A list, not a bare row of divs: the months are an ordered series and
        each bar carries its own value in the accessible tree, so the chart is
        readable without seeing it.
      */}
      <ol
        className="m-0 flex list-none items-end gap-[3px] p-0"
        style={{ height: `${TRACK_PX}px` }}
      >
        {history.months.map((entry) => {
          const height =
            entry.count === 0
              ? 1
              : Math.max(
                  MIN_BAR_PX,
                  Math.round((entry.count / history.peak.count) * TRACK_PX),
                );

          return (
            <li
              key={entry.month}
              className="flex h-full flex-1 items-end"
              /* Native tooltip rather than a custom one: the calendars own
                 the interactive readout on this page, and a second hover
                 system for nineteen bars would be more machinery than the
                 information warrants. */
              title={`${entry.count.toLocaleString()} contributions in ${formatMonth(entry.month)}`}
            >
              <span
                aria-hidden
                className="w-full rounded-[1px]"
                style={{
                  height: `${height}px`,
                  /* The peak reads at full strength and everything else one
                     step down, so the tallest bar is also the brightest
                     rather than relying on height alone. */
                  backgroundColor:
                    entry.month === history.peak.month
                      ? "var(--activity-4)"
                      : entry.count === 0
                        ? "var(--border)"
                        : "var(--activity-2)",
                }}
              />
              <span className="sr-only">
                {formatMonth(entry.month)}: {entry.count.toLocaleString()}{" "}
                contributions
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-2.5 flex items-baseline justify-between gap-4">
        <span className="type-eyebrow text-[var(--text-subtle)]">
          {formatMonth(history.from)}
        </span>

        {/* The peak is the one value worth printing — without it the tallest
            bar is just "the tallest bar". */}
        <span className="type-eyebrow tabular-nums text-[var(--text-subtle)]">
          Peak {history.peak.count.toLocaleString()} ·{" "}
          {formatMonth(history.peak.month)}
        </span>

        <span className="type-eyebrow text-[var(--text-subtle)]">
          {formatMonth(history.to)}
        </span>
      </div>
    </div>
  );
}
