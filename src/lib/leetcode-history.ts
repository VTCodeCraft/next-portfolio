import snapshot from "@/data/leetcode-history.json";

import { toLevels, type ContributionCalendar } from "@/lib/contributions";

/**
 * A fixed LeetCode window, read from a committed snapshot.
 *
 * The live query this replaces returned a trailing twelve months anchored to
 * today, so the graph walked forward every day and grew a tail of empty
 * squares after the activity stopped — a chart that said "not solving
 * anything lately" more loudly than it said what had been solved.
 *
 * This is a record of a period instead. It does not move, it makes no request
 * at render time, and it is regenerated only by running
 * `node scripts/snapshot-leetcode.mjs` on purpose.
 *
 * Zeroes in the snapshot are real. LeetCode's calendar response is the
 * complete record for a year rather than a sample of it, so a date it omits
 * had no submissions — and the generator asserts coverage by checking its
 * captured active-day count against the figure LeetCode reports for each
 * year, so a short response fails loudly rather than arriving as a quiet run
 * of blanks.
 */
export const leetcodeRange = snapshot.range;

/** "Oct 09, 2025 — Oct 09, 2026", formatted once, in UTC. */
const label = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export const leetcodeRangeLabel = `${label.format(
  new Date(`${snapshot.range.start}T00:00:00Z`),
)} — ${label.format(new Date(`${snapshot.range.end}T00:00:00Z`))}`;

export const leetcodeHistory: ContributionCalendar = {
  total: snapshot.totals.submissions,
  days: toLevels(snapshot.days),
};
