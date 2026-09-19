import { posts } from "#site/content";

/**
 * One place that decides what "the archive" is.
 *
 * The published filter and the newest-first sort used to be written out in
 * the route file, which meant the list page and the related-notes block could
 * disagree about ordering — and an unpublished draft could reach one of them
 * and not the other. Everything that reads posts goes through here.
 */
export type Post = (typeof posts)[number];

export const publishedPosts: Post[] = [...posts]
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getPost = (slug: string): Post | undefined =>
  publishedPosts.find((post) => post.slugAsParams === slug);

/**
 * "Apr 12, 2026". Rendered through `type-eyebrow`, which uppercases it.
 *
 * Deliberately not built by hand from the ISO string: `new Date("2026-04-12")`
 * parses as UTC midnight, so formatting it in a timezone behind UTC prints
 * the previous day. Passing the parts through Intl with a UTC timezone keeps
 * the date the frontmatter actually says.
 */
export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

/**
 * Notes that share a tag first, then the newest of whatever is left.
 *
 * Derived from the tags already in the frontmatter — nothing here declares a
 * relationship the content does not.
 */
export const getRelatedPosts = (current: Post, limit = 3): Post[] => {
  const sharedTagCount = (post: Post) =>
    post.tags.filter((tag) => current.tags.includes(tag)).length;

  return publishedPosts
    .filter((post) => post.slugAsParams !== current.slugAsParams)
    .sort(
      (a, b) =>
        sharedTagCount(b) - sharedTagCount(a) ||
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    .slice(0, limit);
};
