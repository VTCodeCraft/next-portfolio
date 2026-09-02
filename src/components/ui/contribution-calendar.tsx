import type { ContributionCalendar } from "@/lib/contributions";

import CalendarInteractions from "./calendar-interactions";

/*
  Dates arrive as plain YYYY-MM-DD. Parsing them without an explicit zone
  makes the browser read them as local midnight, which shifts a day either
  side of UTC and can move a square into the wrong weekday column. Everything
  below is computed in UTC for that reason.
*/
const utc = (date: string) => new Date(`${date}T00:00:00Z`);

const monthFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
});

const dayFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/* Rows are Sun–Sat; only alternate rows are labelled, as GitHub does — at
   this cell size three labels are legible and seven are a stack of ink. */
const WEEKDAY_ROWS = ["", "Mon", "", "Wed", "", "Fri", ""];

type Props = {
  calendar: ContributionCalendar;
  /** Singular noun for the tooltip: "contribution", "submission". */
  unit: string;
};

export default function ContributionCalendar({ calendar, unit }: Props) {
  const { days } = calendar;

  /*
    A calendar column is a Sun–Sat week. The first day in the range is rarely
    a Sunday, so the grid is padded with as many blanks as there are days
    before it — without this every square sits in the wrong weekday row.
  */
  const leadingBlanks = utc(days[0].date).getUTCDay();
  const cells: (ContributionCalendar["days"][number] | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...days,
  ];
  const weekCount = Math.ceil(cells.length / 7);

  /*
    A month is labelled at the first column that begins it. The label is
    skipped in the final column, where there is no room for the text to sit
    without running past the end of the grid.
  */
  const monthLabels: { week: number; label: string }[] = [];
  let lastMonth = -1;

  for (let week = 0; week < weekCount; week += 1) {
    const day = cells.slice(week * 7, week * 7 + 7).find(Boolean);

    if (!day) continue;

    const month = utc(day.date).getUTCMonth();

    if (month !== lastMonth) {
      lastMonth = month;
      if (week < weekCount - 1) {
        monthLabels.push({ week, label: monthFormat.format(utc(day.date)) });
      }
    }
  }

  const track = "calc(var(--contrib-cell) + var(--contrib-gap))";

  return (
    <CalendarInteractions>
      {/*
        Fixed cell size with horizontal scroll, rather than squares that
        shrink to fit. A year is 53 columns; scaling those into a 375px
        viewport gives roughly 4px squares, at which point the chart stops
        being readable as anything. Scrolling keeps the density honest and
        the reading intact at every width.
      */}
      <div
        data-calendar-scroll
        className="contribution-calendar -mx-1 overflow-x-auto px-1 pb-2"
      >
        <div className="min-w-max">
          <div
            className="relative h-[1.1rem]"
            style={{ marginLeft: "var(--contrib-labels)" }}
          >
            {monthLabels.map((month) => (
              <span
                key={`${month.week}-${month.label}`}
                className="type-eyebrow absolute top-0 tracking-[0.1em] text-[var(--text-faint)]"
                style={{ left: `calc(${month.week} * ${track})` }}
              >
                {month.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[var(--contrib-gap)]">
            <div
              aria-hidden
              className="grid w-[var(--contrib-labels)] gap-[var(--contrib-gap)]"
              style={{ gridTemplateRows: "repeat(7, var(--contrib-cell))" }}
            >
              {WEEKDAY_ROWS.map((label, row) => (
                <span
                  key={row}
                  className="contribution-weekday text-[var(--text-faint)]"
                >
                  {label}
                </span>
              ))}
            </div>

            {/*
              Column-flow grid: cells fill top-to-bottom down a week, then
              move to the next column, which is the order the day list is
              already in. No per-cell placement maths required.
            */}
            <div
              role="grid"
              aria-label={`${calendar.total.toLocaleString()} ${unit}s in the last year`}
              className="grid grid-flow-col gap-[var(--contrib-gap)]"
              style={{
                gridTemplateRows: "repeat(7, var(--contrib-cell))",
                gridAutoColumns: "var(--contrib-cell)",
              }}
            >
              {cells.map((cell, index) =>
                cell ? (
                  <span
                    key={cell.date}
                    role="gridcell"
                    tabIndex={-1}
                    data-date={cell.date}
                    /* Built here rather than in the client component so the
                       string is formatted once, on the server, in a fixed
                       zone — no locale drift between render and hydration. */
                    data-label={`${cell.count} ${unit}${cell.count === 1 ? "" : "s"} on ${dayFormat.format(utc(cell.date))}`}
                    className="rounded-[2px] transition-[outline-color] outline outline-transparent hover:outline-[var(--foreground)]"
                    style={{ backgroundColor: `var(--activity-${cell.level})` }}
                  />
                ) : (
                  <span key={`blank-${index}`} aria-hidden />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </CalendarInteractions>
  );
}
