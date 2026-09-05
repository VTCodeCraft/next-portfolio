/**
 * Presentation view-model for the projects route.
 *
 * myProjects in data.ts is the source of truth and stays untouched, but its
 * entries are uneven: the two flagship projects carry `summary`, `stack` and
 * `outcome`, the rest only carry `points` and `tags`. Normalising that here
 * keeps the components free of `"summary" in project` checks, and keeps the
 * content editable in one place.
 *
 * Nothing is invented. Every field is either read directly or derived from
 * data that already exists — `stack` falls back to the tag names, `summary`
 * to the first bullet. Fields with no source (year, category) are absent
 * rather than guessed.
 */

import { myProjects } from "./data";

export type ProjectView = {
  slug: string;
  /** Short display name: "Clutchly", not "Clutchly - AI Voice Interview Coach". */
  title: string;
  /** One line. Falls back to the first bullet when no summary is authored. */
  summary: string;
  /** The authored bullets, used for the featured entries' detail. */
  detail: readonly string[];
  stack: string[];
  outcome?: string;
  /** Absent when the project has no deployment (data stores "#" for those). */
  liveHref?: string;
  repoHref: string;
  featured: boolean;
  /**
   * Screenshot path under /public. No project has one yet, so every entry
   * currently renders the typographic fallback. Adding a real screenshot is a
   * one-line change here — no component edits.
   */
  image?: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type RawProject = (typeof myProjects)[number];

function toView(project: RawProject): ProjectView {
  // The union is heterogeneous, so optional fields are read through `in`.
  const summary =
    "summary" in project ? project.summary : project.points[0];
  const stack =
    "stack" in project
      ? project.stack.split("·").map((part) => part.trim())
      : project.tags.map((tag) => tag.name);
  const title =
    "shortTitle" in project ? project.shortTitle : project.title.split(" - ")[0];

  return {
    slug: slugify(title),
    title,
    summary,
    detail: project.points,
    stack,
    outcome: "outcome" in project ? project.outcome : undefined,
    liveHref: project.href === "#" ? undefined : project.href,
    repoHref: project.repoHref,
    featured: "featured" in project && project.featured === true,
  };
}

/**
 * Featured first, ranked by the authored `flagship` order rather than by
 * position in the array. Everything else keeps its original order.
 */
function rank(project: RawProject) {
  return "flagship" in project ? project.flagship : Number.MAX_SAFE_INTEGER;
}

export const allProjects: ProjectView[] = myProjects.map(toView);

export const featuredProjects: ProjectView[] = myProjects
  .filter((project) => "featured" in project && project.featured === true)
  .slice()
  .sort((a, b) => rank(a) - rank(b))
  .map(toView);
