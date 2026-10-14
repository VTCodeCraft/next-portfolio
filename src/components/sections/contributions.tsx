import SectionHeading from "@/components/ui/section-heading";
import ContributionCalendar from "@/components/ui/contribution-calendar";
import {
  getGithubCalendar,
  type ContributionCalendar as Calendar,
} from "@/lib/contributions";
import {
  leetcodeHistory,
  leetcodeRange,
  leetcodeRangeLabel,
} from "@/lib/leetcode-history";

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
  /*
    Two phrasings, because the two places read differently.

    `meta` follows the count on the rule — "663 submissions, historical".
    `period` follows "{n} {unit}s" in the grid's accessible name, which
    already supplies the noun — "663 submissions between Oct 09, 2025 and
    Oct 09, 2026". Reusing one string for both produced "663 submissions
    submissions, historical".
  */
  meta = "in the last year",
  period = "in the last year",
  /**
   * Optional line under the grid, for a calendar that is not a live feed.
   * Carries the exact window so the dates are stated rather than implied by
   * the month labels.
   */
  note,
}: {
  label: string;
  unit: string;
  calendar: Calendar | null;
  href: string;
  meta?: string;
  period?: string;
  note?: string;
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
            {calendar.total.toLocaleString()} {meta}
          </span>
        ) : null}
      </div>

      {calendar ? (
        <ContributionCalendar
          calendar={calendar}
          unit={unit}
          period={period}
        />
      ) : (
        <p className="type-meta rounded-md border border-dashed border-border px-4 py-5 text-center text-muted-foreground">
          {label} activity is unavailable right now.
        </p>
      )}

      {calendar && note ? (
        <p className="type-eyebrow mt-2 text-[var(--text-faint)]">{note}</p>
      ) : null}
    </div>
  );
}

/**
 * Credibility through activity rather than claims.
 *
 * The two calendars are no longer the same kind of thing. GitHub is fetched
 * server-side and cached daily — a rolling twelve months that moves. LeetCode
 * is a committed snapshot of a closed period, so it makes no request, does
 * not advance with the clock, and is labelled as history rather than left to
 * look like a live feed that went quiet.
 */
export default async function Contributions() {
  const github = await getGithubCalendar(GITHUB_LOGIN);

  if (!github && !leetcodeHistory) return null;

  return (
    <section id="contributions" className="scroll-mt-32">
      {/* No section-level period any more: the two panels now cover different
          windows and each states its own. */}
      <SectionHeading index="01" rule>
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
          calendar={leetcodeHistory}
          href={`https://leetcode.com/u/${GITHUB_LOGIN}/`}
          meta="submissions, historical"
          period={`between ${leetcodeRange.start} and ${leetcodeRange.end}`}
          note={`Historical activity · ${leetcodeRangeLabel}`}
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
