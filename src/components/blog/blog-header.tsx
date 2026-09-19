import { MotionMountSection } from "@/components/ui/reveal";

/**
 * Route hero for the archive.
 *
 * An eyebrow, a title and one line. The old version put the intro sentence
 * inside a 28px-radius glass panel with a strong shadow, which gave a single
 * paragraph the same visual weight as an article — the panel was the loudest
 * thing above the fold and there was nothing in it worth looking at.
 *
 * No counter, no "N posts". The only numbers on this page come from the
 * frontmatter.
 */
export default function BlogHeader() {
  return (
    <MotionMountSection delay={0.05} aria-labelledby="blog-title">
      <p className="type-eyebrow text-[var(--text-subtle)]">Writing</p>

      <h1 id="blog-title" className="type-display mt-4 text-foreground">
        Build Notes
      </h1>

      <p className="type-prose type-body mt-4 text-muted-foreground">
        Things I build, break, learn, and figure out along the way.
      </p>
    </MotionMountSection>
  );
}
