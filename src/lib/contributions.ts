/**
 * Contribution calendars for the homepage proof section.
 *
 * Both sources are fetched server-side and cached for a day. Neither is
 * allowed to break the page: every failure path returns null and the section
 * renders an honest empty state rather than invented activity.
 */

export type ContributionDay = {
  date: string;
  count: number;
  /** 0 (none) to 4 (highest), matching the four-step legend. */
  level: number;
};

export type ContributionCalendar = {
  total: number;
  days: ContributionDay[];
};

const DAY = 60 * 60 * 24;

/** Buckets raw counts into the four legend steps used by both calendars. */
function toLevels(days: { date: string; count: number }[]): ContributionDay[] {
  const active = days.filter((d) => d.count > 0).map((d) => d.count);

  if (active.length === 0) {
    return days.map((d) => ({ ...d, level: 0 }));
  }

  const sorted = [...active].sort((a, b) => a - b);
  const at = (q: number) => sorted[Math.floor((sorted.length - 1) * q)];
  const [low, mid, high] = [at(0.4), at(0.7), at(0.9)];

  return days.map((d) => {
    if (d.count <= 0) return { ...d, level: 0 };
    if (d.count <= low) return { ...d, level: 1 };
    if (d.count <= mid) return { ...d, level: 2 };
    if (d.count <= high) return { ...d, level: 3 };
    return { ...d, level: 4 };
  });
}

/**
 * GitHub's own contribution calendar is GraphQL-only and needs a token, so
 * this used to return null whenever GITHUB_TOKEN was unset — which is why the
 * section has been rendering its unavailable state in production.
 *
 * There are two sources now. With a token, GraphQL is preferred: it is
 * first-party and it can include private contributions. Without one, the
 * public aggregator is used, which reads the same calendar GitHub renders on
 * the profile page. Either way the fetch happens on the server and nothing
 * reaches the browser but the resulting day list.
 */
export async function getGithubCalendar(
  login: string,
): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;

  const calendar = token
    ? await getGithubCalendarFromGraphql(login, token)
    : null;

  return calendar ?? getGithubCalendarFromPublicApi(login);
}

async function getGithubCalendarFromGraphql(
  login: string,
  token: string,
): Promise<ContributionCalendar | null> {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks { contributionDays { date contributionCount } }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login } }),
      next: { revalidate: DAY },
    });

    if (!response.ok) return null;

    const json = await response.json();
    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) return null;

    const days = calendar.weeks.flatMap(
      (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        })),
    );

    return { total: calendar.totalContributions, days: toLevels(days) };
  } catch {
    return null;
  }
}

/**
 * Public aggregator over the same calendar GitHub renders on a profile page.
 * No credentials, so there is no secret to leak and nothing to configure.
 *
 * Its `level` field is GitHub's own bucketing, so it is used as-is rather than
 * re-derived: the percentile split in toLevels is a reasonable guess, but this
 * is the real thing.
 */
async function getGithubCalendarFromPublicApi(
  login: string,
): Promise<ContributionCalendar | null> {
  type PublicDay = { date: string; count: number; level: number };

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(login)}?y=last`,
      { next: { revalidate: DAY } },
    );

    if (!response.ok) return null;

    const json = (await response.json()) as {
      total?: Record<string, number>;
      contributions?: PublicDay[];
    };

    const contributions = json.contributions;

    if (!Array.isArray(contributions) || contributions.length === 0) return null;

    const days = contributions.map((day) => ({
      date: day.date,
      count: day.count,
      level: Math.min(4, Math.max(0, day.level ?? 0)),
    }));

    const total =
      json.total?.lastYear ??
      days.reduce((sum, day) => sum + day.count, 0);

    return { total, days };
  } catch {
    return null;
  }
}

export type ContributionMonth = {
  /** "2025-07" */
  month: string;
  count: number;
};

export type ContributionHistory = {
  months: ContributionMonth[];
  total: number;
  /** Highest single month, so a chart can scale without a second pass. */
  peak: ContributionMonth;
  /** First and last month carrying activity. */
  from: string;
  to: string;
};

/**
 * Every month of recorded activity, not just the trailing year.
 *
 * The aggregator's `y=all` returns each year's daily rows in one response, so
 * the whole history costs the same single request the calendar already makes.
 *
 * "Contributions", not "commits", everywhere this surfaces: GitHub's number
 * folds in pull requests, issues and reviews alongside commits, and labelling
 * it commits would overstate it. Counting real commits needs the search API,
 * which is authenticated, rate-limited to 30 requests a minute, and blind to
 * private repositories — it would report a smaller and less honest number than
 * the calendar immediately above it.
 */
export async function getGithubHistory(
  login: string,
): Promise<ContributionHistory | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(login)}?y=all`,
      { next: { revalidate: DAY } },
    );

    if (!response.ok) return null;

    const json = (await response.json()) as {
      contributions?: { date: string; count: number }[];
    };

    if (!Array.isArray(json.contributions)) return null;

    /*
      The response runs to the end of the current calendar year, so the months
      after today come back as zeros. Charting them would draw empty columns
      for months that have not happened yet.
    */
    const today = new Date().toISOString().slice(0, 10);

    const byMonth = new Map<string, number>();

    for (const day of json.contributions) {
      if (day.date > today) continue;
      const month = day.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + day.count);
    }

    const ordered = [...byMonth.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, count]) => ({ month, count }));

    /*
      Leading empty months are dropped — the account exists before the first
      commit, and a chart that opens with a run of blank columns is showing
      the age of the account rather than the shape of the work. Gaps after
      that first month are kept: a quiet month is a real data point.
    */
    const firstActive = ordered.findIndex((m) => m.count > 0);

    if (firstActive === -1) return null;

    const months = ordered.slice(firstActive);
    const total = months.reduce((sum, m) => sum + m.count, 0);
    const peak = months.reduce((a, b) => (b.count > a.count ? b : a));

    return {
      months,
      total,
      peak,
      from: months[0].month,
      to: months[months.length - 1].month,
    };
  } catch {
    return null;
  }
}

/**
 * LeetCode has no official API. This uses the same public GraphQL endpoint the
 * profile page calls, so it can change without notice — hence the same
 * fail-quietly contract as above.
 */
export async function getLeetcodeCalendar(
  username: string,
): Promise<ContributionCalendar | null> {
  const query = `
    query($username: String!) {
      matchedUser(username: $username) {
        userCalendar { submissionCalendar }
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: DAY },
    });

    if (!response.ok) return null;

    const json = await response.json();
    const raw = json?.data?.matchedUser?.userCalendar?.submissionCalendar;

    if (!raw) return null;

    // Keyed by unix-second timestamp as a string.
    const parsed: Record<string, number> = JSON.parse(raw);
    const byDate = new Map<string, number>();

    for (const [seconds, count] of Object.entries(parsed)) {
      const date = new Date(Number(seconds) * 1000).toISOString().slice(0, 10);
      byDate.set(date, (byDate.get(date) ?? 0) + count);
    }

    // Fill the trailing year so the grid is continuous, not sparse.
    const days: { date: string; count: number }[] = [];
    const cursor = new Date();
    cursor.setUTCHours(0, 0, 0, 0);

    for (let i = 364; i >= 0; i -= 1) {
      const day = new Date(cursor);
      day.setUTCDate(cursor.getUTCDate() - i);
      const key = day.toISOString().slice(0, 10);
      days.push({ date: key, count: byDate.get(key) ?? 0 });
    }

    const total = days.reduce((sum, day) => sum + day.count, 0);

    return { total, days: toLevels(days) };
  } catch {
    return null;
  }
}
