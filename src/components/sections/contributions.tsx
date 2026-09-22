import SectionHeading from "@/components/ui/section-heading";
import ContributionCalendar from "@/components/ui/contribution-calendar";
import {
  getGithubCalendar,
  getLeetcodeCalendar,
  type ContributionCalendar as Calendar,
} from "@/lib/contributions";

/*
  All-time history chart, parked.

  The component and its fetch are still here — ui/contribution-history.tsx
  and getGithubHistory() in lib/contributions.ts — and both work: 19 months
  from Mar 2025, 1,396 contributions, peak 370 in Jul 2025. Switching it back
  on means uncommenting the import, the fetch and the render below.

  The fetch is commented out with the render rather than left running, so a
  parked chart does not keep making a request on every revalidation.
*/
// import ContributionHistoryChart from "@/components/ui/contribution-history";
// import { getGithubHistory } from "@/lib/contributions";

const GITHUB_LOGIN = "VTCodeCraft";

function Panel({
  label,
  unit,
  calendar,
  href,
}: {
  label: string;
  unit: string;
  calendar: Calendar | null;
  href: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline gap-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="type-eyebrow inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {label}
        </a>

        <span aria-hidden className="h-px flex-1 translate-y-[-0.2em] bg-border" />

        {calendar ? (
          <span className="type-meta tabular-nums text-[var(--text-subtle)]">
            {calendar.total.toLocaleString()} in the last year
          </span>
        ) : null}
      </div>

      {calendar ? (
        <ContributionCalendar calendar={calendar} unit={unit} />
      ) : (
        <p className="type-meta rounded-md border border-dashed border-border px-4 py-5 text-center text-muted-foreground">
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
    getGithubCalendar(GITHUB_LOGIN),
    getLeetcodeCalendar(GITHUB_LOGIN),
    // getGithubHistory(GITHUB_LOGIN),
  ]);

  if (!github && !leetcode) return null;

  return (
    <section id="contributions" className="scroll-mt-32">
      {/* The meta covers the calendars, which are a rolling year; the history
          chart below carries its own "All time" label. */}
      <SectionHeading index="01" rule meta="Last 12 months">
        Contributions
      </SectionHeading>

      <div className="space-y-9">
        <Panel
          label="GitHub"
          unit="contribution"
          calendar={github}
          href={`https://github.com/${GITHUB_LOGIN}`}
        />
        <Panel
          label="LeetCode"
          unit="submission"
          calendar={leetcode}
          href={`https://leetcode.com/u/${GITHUB_LOGIN}/`}
        />

        {/* {history ? <ContributionHistoryChart history={history} /> : null} */}
      </div>

      <div className="mt-6 flex items-center justify-end gap-1.5">
        <span className="type-eyebrow text-[var(--text-faint)]">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            aria-hidden
            className="h-[10px] w-[10px] rounded-[2px]"
            style={{ backgroundColor: `var(--activity-${level})` }}
          />
        ))}
        <span className="type-eyebrow text-[var(--text-faint)]">More</span>
      </div>
    </section>
  );
}
