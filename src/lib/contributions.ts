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
 * GitHub exposes the contribution calendar through the GraphQL API only, which
 * requires a token. Without GITHUB_TOKEN set the section degrades rather than
 * showing placeholder squares.
 */
export async function getGithubCalendar(
  login: string,
): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) return null;

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
