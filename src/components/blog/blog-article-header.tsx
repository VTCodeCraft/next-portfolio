import Image from "next/image";
import Link from "next/link";

import { formatDate, type Post } from "@/lib/blog";

/**
 * Masthead for a single note.
 *
 * Left-aligned, on the same axis as the body. The previous header centred the
 * title, the date, the description and a row of tag pills, then pushed the
 * back link to the right — five blocks on four different axes above a body
 * that was left-aligned, so nothing lined up with anything.
 *
 * Tags render as plain text rather than pills, matching the archive.
 */
export default function BlogArticleHeader({ post }: { post: Post }) {
  return (
    <header>
      <Link
        href="/blog"
        className="group/back inline-flex min-h-11 items-center gap-2 type-eyebrow text-[var(--text-subtle)] transition-colors hover:text-foreground motion-reduce:transition-none"
      >
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover/back:-translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
        >
          ←
        </span>
        Build notes
      </Link>

      {post.tags.length > 0 ? (
        <p className="type-eyebrow mt-8 text-[var(--text-subtle)]">
          {post.tags.join("  ·  ")}
        </p>
      ) : null}

      <h1 className="type-display mt-4 text-foreground">{post.title}</h1>

      <p className="type-body mt-5 text-muted-foreground">
        {post.description}
      </p>

      <p className="type-eyebrow mt-6 text-[var(--text-subtle)]">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden className="mx-2">
          ·
        </span>
        <span className="tabular-nums">{post.readingTime}</span>
      </p>

      {post.cover ? (
        /*
          Kept, but demoted. It used to be a 30px-radius panel with an
          extra-large shadow, which floated it off the page; a hairline and
          the body radius put it in the column with everything else.
        */
        <div className="relative mt-10 overflow-hidden rounded-[var(--radius)] border border-border bg-card">
          <Image
            src={post.cover}
            alt={`Cover image for ${post.title}`}
            width={1600}
            height={900}
            priority
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      ) : null}
    </header>
  );
}
