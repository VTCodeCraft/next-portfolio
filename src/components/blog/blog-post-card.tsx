import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import { MotionMountListItem } from "@/components/ui/reveal";
import { formatDate, type Post } from "@/lib/blog";

/**
 * One tile in the archive grid.
 *
 * Cover, title, when and how long, excerpt, tags. The cover sits in its own
 * framed box rather than bleeding to the tile edge — a hairline and the body
 * radius, no shadow and no panel behind the text, so the tile is an image
 * with writing under it instead of a card floating off the page.
 */
export default function BlogPostCard({
  post,
  index = 0,
  /*
    h2 on /blog, where the tiles are the page's top-level sections. The prop
    exists so the same tile can drop a level if it is ever reused under
    another heading.
  */
  as: Heading = "h2",
}: {
  post: Post;
  index?: number;
  as?: "h2" | "h3";
}) {
  return (
    <MotionMountListItem
      /*
        Capped at the eighth tile. Past that the stagger stops reading as
        sequence and starts reading as lag, and the last tile of a long
        archive would arrive a second after the page had settled.
      */
      delay={0.05 + 0.05 * Math.min(index, 8)}
      distance={14}
    >
      {/* `relative` anchors the stretched link that makes the whole tile
          clickable; `group` drives the cover and title hover states. */}
      <article className="group relative flex flex-col gap-3">
        <div
          className="
            relative aspect-[16/9] w-full overflow-hidden
            rounded-[var(--radius)] border border-border
            bg-[var(--surface-muted)]
            transition-colors duration-200
            group-hover:border-[var(--text-subtle)]
            motion-reduce:transition-none
          "
        >
          {post.cover ? (
            /*
              `object-cover`, not `object-contain`.

              These covers are photographs at 3:2, so a contain fit would
              pillarbox every one of them inside the 16:9 frame. Cropping a
              photograph loses nothing; it would be the wrong call for a
              diagram, which is what the reference site is displaying.

              `sizes` matches the grid — full width in one column, a 432px
              tile in two — so the browser is not handed a 3840px source for
              a 432px box. Written in px rather than rem because that is what
              the loader parses when it picks srcset candidates.

              The first tile opens above the fold on every viewport, so it
              loads eagerly; the rest stay lazy.
            */
            <Image
              src={post.cover}
              alt=""
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="(max-width: 640px) 100vw, 448px"
              className="
                object-cover transition-transform duration-300
                group-hover:scale-[1.02]
                motion-reduce:transform-none motion-reduce:transition-none
              "
            />
          ) : null}
        </div>

        {/*
          Two lines of headroom so the metadata lines up across a row.

          Grid stretches the tiles to equal height, but it does not align
          anything inside them — a one-line title next to a two-line one put
          the date, the excerpt and the tags of the left tile a full line
          above its neighbour's, which read as a mistake rather than as
          ragged text.

          `2lh` rather than a pixel figure because `type-h2` is a clamp: a
          fixed height would be right at one viewport and wrong at the rest.
          Not combined with a clamp — a title longer than two lines pushes
          its own tile down instead of being truncated, since a headline is
          the one thing here that should never be cut off.
        */}
        <Heading className="type-h2 min-h-[2lh] text-foreground">
          {/*
            A real link on the title, stretched over the tile with a
            pseudo-element.

            Wrapping the whole tile in one <a> — which is what the reference
            does — works for the mouse and is poor for everything else: the
            accessible name of that link becomes its entire contents, so it
            announces as the title, the date, the read time, the excerpt and
            every tag read out as one run-on string. This way the tile is
            clickable, the name is the title, and the tags stay ordinary
            text.

            Underline rather than a colour shift on hover: `--primary`
            resolves to rgb(246,245,244) on the dark theme and `--foreground`
            resolves to exactly the same three values, so a colour hover
            would be invisible there. The palette is achromatic by design and
            has no accent to move to.
          */}
          <Link
            href={`/blog/${post.slugAsParams}`}
            className="
              decoration-1 underline-offset-[0.2em]
              after:absolute after:inset-0 after:content-['']
              group-hover:underline group-hover:decoration-[var(--text-subtle)]
            "
          >
            {post.title}
          </Link>
        </Heading>

        {/* `readingTime` is the string velite already derives from the post
            body — "3 min read" — not a second estimate made up here. */}
        <div className="type-meta flex flex-wrap items-center gap-x-4 gap-y-1 text-[var(--text-subtle)]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar aria-hidden className="h-3.5 w-3.5 shrink-0" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="h-3.5 w-3.5 shrink-0" />
            <span className="tabular-nums">{post.readingTime}</span>
          </span>
        </div>

        {/*
          Clamped rather than trusted to be short. The schema allows 320
          characters, which is six lines in a tile this wide and would leave
          one column of the grid taller than the other.
        */}
        <p className="type-body line-clamp-2 text-muted-foreground">
          {post.description}
        </p>

        {post.tags.length > 0 ? (
          /*
            Lowercase monospace, not the site's `type-eyebrow`.

            The eyebrow role uppercases and adds 0.16em of tracking, which is
            right for a label like ARCHIVE and wrong for a hashtag: "#MDX"
            stops looking like the tag the frontmatter actually contains.
            These are rendered as written.
          */
          <ul className="m-0 mt-1 flex list-none flex-wrap gap-x-2.5 gap-y-1 p-0">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="font-mono text-[0.8125rem] font-medium tracking-tight text-[var(--text-subtle)]"
              >
                #{tag}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </MotionMountListItem>
  );
}
