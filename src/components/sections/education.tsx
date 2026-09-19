import SectionHeading from "@/components/ui/section-heading";
import { coursework, education } from "@/lib/experience";

/**
 * Academic record, separated from work.
 *
 * These used to share a list with the internships, which read as though the
 * degree were a third job. They answer different questions and now sit apart.
 *
 * The result is given its own column: a CGPA is the one number in this
 * section anyone scans for, and it deserves to be findable rather than
 * buried at the end of a sentence.
 */
export default function Education() {
  return (
    <section id="education" className="scroll-mt-32">
      <SectionHeading index="05" rule meta={`${education.length} records`}>
        Education
      </SectionHeading>

      <ol className="m-0 list-none border-t border-border p-0">
        {education.map((item, index) => (
          <li key={item.school} className="border-b border-border">
            <article className="grid gap-x-8 gap-y-3 py-6 lg:grid-cols-[2.5rem_minmax(0,1fr)_auto_auto] lg:items-baseline">
              <span
                aria-hidden
                className="type-eyebrow tabular-nums text-[var(--text-faint)]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="type-h3 text-foreground">
                  {item.school}
                  {item.qualifier ? (
                    <span className="type-meta ml-2 text-[var(--text-faint)]">
                      {item.qualifier}
                    </span>
                  ) : null}
                </h3>

                <p className="type-meta mt-1 text-muted-foreground">
                  {item.degree}
                  <span aria-hidden className="mx-2 text-[var(--text-faint)]">
                    ·
                  </span>
                  {item.location}
                </p>
              </div>

              {/* Omitted rather than left blank when an entry carries no
                  result — the date column then sits where the result would
                  have been, which keeps the row from ending in dead space. */}
              {item.result ? (
                <p className="type-meta tabular-nums text-foreground lg:text-right">
                  {item.resultLabel ? (
                    <span className="type-eyebrow mr-2 text-[var(--text-faint)]">
                      {item.resultLabel}
                    </span>
                  ) : null}
                  {item.result}
                </p>
              ) : null}

              {/*
                Pinned to the last column. Each row is its own grid, so an
                entry with no result would otherwise let its dates fall into
                the vacated result slot — measured 32px left of the row above,
                which reads as a broken column rather than as a gap.
              */}
              <p className="type-eyebrow tabular-nums text-muted-foreground lg:col-start-4 lg:text-right">
                {item.start} — {item.end}
              </p>
            </article>
          </li>
        ))}
      </ol>

      {/* One line, not a transcript. Enough to show the fundamentals are
          formal rather than self-declared. */}
      <p className="type-eyebrow mt-5 leading-[1.9] text-[var(--text-faint)]">
        Coursework  ·  {coursework.join("  ·  ")}
      </p>
    </section>
  );
}
