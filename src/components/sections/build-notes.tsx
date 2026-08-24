import Link from "next/link";

import SectionHeading from "@/components/ui/section-heading";

type Note = {
  title: string;
  slugAsParams: string;
  readingTime: string;
};

/**
 * Writing, framed as notes from building rather than articles.
 *
 * The posts are currently about this site's own architecture, so "Build notes"
 * describes them honestly instead of overselling them as essays.
 */
export default function BuildNotes({ notes }: { notes: Note[] }) {
  if (notes.length === 0) return null;

  return (
    <section id="writing" className="page-column scroll-mt-32">
      <SectionHeading index="04" rule>
        Build notes
      </SectionHeading>

      <ul className="m-0 list-none p-0">
        {notes.map((note) => (
          <li key={note.slugAsParams} className="border-t border-border">
            <Link
              href={`/blog/${note.slugAsParams}`}
              className="group flex items-baseline justify-between gap-5 py-3.5"
            >
              <span className="text-[0.82rem] leading-snug text-foreground transition group-hover:text-primary">
                {note.title}
              </span>
              <span className="type-eyebrow shrink-0 tabular-nums tracking-[0.12em]">
                {note.readingTime}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-border pt-5">
        <Link
          href="/blog"
          className="type-eyebrow inline-flex items-center gap-2 tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
        >
          All notes ↗
        </Link>
      </div>
    </section>
  );
}
