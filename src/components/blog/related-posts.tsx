import Link from "next/link";

import { formatDate, type Post } from "@/lib/blog";

/**
 * What to read next.
 *
 * Deliberately not the archive tile. A tile is a cover plus four lines, and
 * two of them side by side need about 860px; this sits at the bottom of a
 * 36rem reading column, where the same tiles would be 264px wide and the
 * covers would be thumbnails. Stacking them full width instead would put
 * two more hero images under an article that already opened with one.
 *
 * So it is a list of titles with their dates — a footer for the article
 * rather than a second archive.
 */
export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="mt-20">
      <h2
        id="related-title"
        className="type-eyebrow mb-2 text-muted-foreground"
      >
        More build notes
      </h2>

      <ul className="m-0 list-none p-0">
        {posts.map((post) => (
          <li key={post.slugAsParams}>
            <Link
              href={`/blog/${post.slugAsParams}`}
              className="
                group flex flex-col gap-1 border-b border-border py-4
                transition-colors duration-200
                hover:border-[var(--text-subtle)]
                focus-visible:bg-[var(--surface-accent-soft)]
                sm:flex-row sm:items-baseline sm:justify-between sm:gap-6
                motion-reduce:transition-none
              "
            >
              <span
                className="
                  type-h3 min-w-0 text-foreground
                  decoration-1 underline-offset-[0.2em]
                  group-hover:underline
                  group-hover:decoration-[var(--text-subtle)]
                "
              >
                {post.title}
              </span>

              <span className="type-meta shrink-0 text-[var(--text-subtle)]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden className="mx-2">
                  ·
                </span>
                <span className="tabular-nums">{post.readingTime}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
