import SectionHeading from "@/components/ui/section-heading";
import {
  getGithubCalendar,
  getLeetcodeCalendar,
  type ContributionCalendar,
} from "@/lib/contributions";

const LEVEL_CLASS = [
  "bg-[var(--surface-muted)] ring-1 ring-inset ring-border",
  "bg-[color-mix(in_oklab,var(--primary)_28%,transparent)]",
  "bg-[color-mix(in_oklab,var(--primary)_48%,transparent)]",
  "bg-[color-mix(in_oklab,var(--primary)_72%,transparent)]",
  "bg-primary",
];

function Calendar({
  label,
  calendar,
  href,
}: {
  label: string;
  calendar: ContributionCalendar | null;
  href: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline gap-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="type-eyebrow inline-flex min-h-11 items-center tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
        >
          {label}
        </a>
        <span aria-hidden className="h-px flex-1 translate-y-[-0.2em] bg-border" />
        {calendar ? (
          <span className="type-eyebrow tabular-nums tracking-[0.12em]">
            {calendar.total.toLocaleString()}
          </span>
        ) : null}
      </div>

      {calendar ? (
        <ul
          className="flex list-none gap-[3px] overflow-hidden p-0"
          style={{ flexDirection: "column", flexWrap: "wrap", height: "calc(7 * 11px)" }}
        >
          {calendar.days.map((day) => (
            <li
              key={day.date}
              title={`${day.count} on ${day.date}`}
              className={`h-2 w-2 shrink-0 rounded-[2px] ${LEVEL_CLASS[day.level]}`}
            />
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border px-4 py-5 text-center text-[0.72rem] text-muted-foreground">
          {label} activity is unavailable right now.
        </p>
      )}
    </div>
  );
}

/**
 * Credibility through activity rather than claims. Both calendars are fetched
 * server-side and cached daily; if either source is unreachable that calendar
 * says so instead of rendering invented squares.
 */
export default async function Contributions() {
  const [github, leetcode] = await Promise.all([
    getGithubCalendar("VTCodeCraft"),
    getLeetcodeCalendar("VTCodeCraft"),
  ]);

  if (!github && !leetcode) return null;

  return (
    <section id="contributions" className="scroll-mt-32">
      <SectionHeading index="01" rule meta="Last 12 months">
        Contributions
      </SectionHeading>

      <div className="space-y-6">
        <Calendar
          label="GitHub"
          calendar={github}
          href="https://github.com/VTCodeCraft"
        />
        <Calendar
          label="LeetCode"
          calendar={leetcode}
          href="https://leetcode.com/u/VTCodeCraft/"
        />
      </div>

      <div className="mt-5 flex items-center justify-end gap-1.5">
        <span className="type-eyebrow tracking-[0.12em]">Less</span>
        {LEVEL_CLASS.map((level, index) => (
          <span
            key={index}
            aria-hidden
            className={`h-2 w-2 rounded-[2px] ${level}`}
          />
        ))}
        <span className="type-eyebrow tracking-[0.12em]">More</span>
      </div>
    </section>
  );
}
