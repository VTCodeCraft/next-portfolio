import type { WorkRow } from "@/lib/experience";

import { ExperienceLinks } from "./experience-link";

/**
 * Numbered rows separated by hairlines.
 *
 * Used twice: for the engineering strands inside the storefront work, and for
 * the four shipped surfaces at the previous role. Both are lists of four
 * things with a title and a paragraph, so they are one component — four cards
 * would have been four boxes saying the same thing louder.
 *
 * The index column collapses on phones: a fixed 2.5rem gutter at 375px steals
 * width the prose needs more.
 */
export default function SelectedWork({
  label,
  headingId,
  title,
  rows,
}: {
  label: string;
  headingId: string;
  title: string;
  rows: WorkRow[];
}) {
  if (rows.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className="border-t border-border pt-6">
      <p className="type-eyebrow text-[var(--text-subtle)]">{label}</p>
      <h3 id={headingId} className="type-h3 mt-3 text-foreground">
        {title}
      </h3>

      <ol className="m-0 mt-6 list-none border-t border-border p-0">
        {rows.map((row, index) => (
          <li key={row.title} className="border-b border-border">
            <div className="grid gap-x-6 gap-y-1.5 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)]">
              <span
                aria-hidden
                className="type-eyebrow tabular-nums text-[var(--text-faint)] sm:pt-[0.2em]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h4 className="type-h3 text-foreground">{row.title}</h4>
                <p className="type-prose type-body mt-2 text-muted-foreground">
                  {row.body}
                </p>
                {row.links ? <ExperienceLinks links={row.links} /> : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
