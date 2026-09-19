import Link from "next/link";

import SectionHeading from "@/components/ui/section-heading";

type Note = {
  title: string;
  slugAsParams: string;
  readingTime: string;
  date: string;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
    new Date(date),
  );

/**
 * Writing, framed as notes from building rather than articles.
 *
 * The posts are currently about this site's own architecture, so "Build notes"
 * describes them honestly instead of overselling them as essays.
 */
export default function BuildNotes({ notes }: { notes: Note[] }) {
  if (notes.length === 0) return null;

  return (
    <section id="writing" className="scroll-mt-32">
      <SectionHeading index="06" rule>
        Build notes
      </SectionHeading>

      <ul className="m-0 list-none p-0">
        {notes.map((note) => (
          <li key={note.slugAsParams} className="border-t border-border">
            <Link
              href={`/blog/${note.slugAsParams}`}
              className="group flex min-h-11 flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-3.5"
            >
              <span className="type-body leading-snug text-foreground transition group-hover:text-primary">
                {note.title}
              </span>
              <span className="type-eyebrow flex shrink-0 items-baseline gap-2.5 tabular-nums tracking-[0.12em]">
                <time dateTime={note.date}>{formatDate(note.date)}</time>
                <span aria-hidden>·</span>
                <span>{note.readingTime}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-border pt-5">
        <Link
          href="/blog"
          className="type-eyebrow inline-flex min-h-11 items-center gap-2 tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
        >
          All notes ↗
        </Link>
      </div>
    </section>
  );
}
