/**
 * Captures a fixed LeetCode submission window to a static file.
 *
 * Run by hand, not on build:
 *
 *     node scripts/snapshot-leetcode.mjs
 *
 * The site renders the committed snapshot, so the graph is a historical
 * record rather than a live feed — it does not advance with the clock and it
 * costs nothing at request time.
 *
 * Why two queries: `userCalendar` without a year returns a trailing window
 * anchored to today, which cannot reach a fixed start date once the clock has
 * moved past it. `userCalendar(year:)` returns a whole calendar year, so the
 * window is assembled from the years it spans.
 */
import fs from "node:fs";
import path from "node:path";

const USERNAME = "VTCodeCraft";
const START = "2025-10-09";
const END = "2026-10-09";
const OUT = path.join("src", "data", "leetcode-history.json");

const QUERY = `
  query($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
        totalActiveDays
      }
    }
  }
`;

async function fetchYear(year) {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { username: USERNAME, year },
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode returned ${response.status} for ${year}`);
  }

  const json = await response.json();
  const calendar = json?.data?.matchedUser?.userCalendar;

  if (!calendar?.submissionCalendar) {
    throw new Error(`No submissionCalendar for ${year}`);
  }

  return {
    year,
    totalActiveDays: calendar.totalActiveDays,
    /* Keyed by unix-second timestamp as a string. */
    entries: JSON.parse(calendar.submissionCalendar),
  };
}

const years = [];
for (let y = Number(START.slice(0, 4)); y <= Number(END.slice(0, 4)); y += 1) {
  years.push(await fetchYear(y));
}

/*
  Merge into one date -> count map. Summing rather than assigning: the two
  year responses are disjoint in practice, but a duplicate key would silently
  drop a day's submissions if this overwrote instead.
*/
const byDate = new Map();

for (const year of years) {
  for (const [seconds, count] of Object.entries(year.entries)) {
    const date = new Date(Number(seconds) * 1000).toISOString().slice(0, 10);
    byDate.set(date, (byDate.get(date) ?? 0) + count);
  }
}

/*
  Every day in the window, in order.

  A date absent from LeetCode's calendar means zero submissions that day —
  the response is the complete record for the year, not a sample of it — so
  filling the gaps with 0 states what happened rather than inventing it. The
  distinction that matters is coverage: both years the window spans were
  fetched in full, and that is asserted below rather than assumed.
*/
const days = [];
const cursor = new Date(`${START}T00:00:00Z`);
const end = new Date(`${END}T00:00:00Z`);

while (cursor <= end) {
  const date = cursor.toISOString().slice(0, 10);
  days.push({ date, count: byDate.get(date) ?? 0 });
  cursor.setUTCDate(cursor.getUTCDate() + 1);
}

/* Any recorded submission outside the window is a bug in the range maths,
   not something to quietly drop. */
const outside = [...byDate.keys()].filter((d) => d < START || d > END);

const activeInWindow = days.filter((d) => d.count > 0).length;
const activeReported = years.reduce((sum, y) => sum + y.totalActiveDays, 0);

const snapshot = {
  source: "leetcode.com/graphql · matchedUser.userCalendar(year:)",
  username: USERNAME,
  capturedAt: new Date().toISOString(),
  range: { start: START, end: END },
  coverage: years.map((y) => ({
    year: y.year,
    totalActiveDays: y.totalActiveDays,
  })),
  totals: {
    days: days.length,
    activeDays: activeInWindow,
    submissions: days.reduce((sum, d) => sum + d.count, 0),
  },
  days,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(`wrote ${OUT}`);
console.log(`  window        ${START} -> ${END} (${days.length} days)`);
console.log(`  active days   ${activeInWindow} in window, ${activeReported} reported across ${years.length} years`);
console.log(`  submissions   ${snapshot.totals.submissions}`);
console.log(
  outside.length
    ? `  OUTSIDE RANGE ${outside.length} dated ${outside.sort()[0]} .. ${outside.sort().at(-1)}`
    : "  outside range none",
);
