import SectionHeading from "@/components/ui/section-heading";
import { experiences } from "@/lib/experience";

/**
 * Where I have worked, compressed to what belongs on a homepage.
 *
 * Company, role, dates and one line each. The full bullets live in
 * lib/experience.ts for a future /experience route — putting them here would
 * turn the homepage into the résumé it should be pointing at.
 */
export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-32">
      <SectionHeading
        index="04"
        rule
        meta={`${experiences.length} roles`}
      >
        Experience
      </SectionHeading>

      <ol className="m-0 list-none border-t border-border p-0">
        {experiences.map((item, index) => (
          <li key={item.company} className="border-b border-border">
            <article className="grid gap-x-8 gap-y-3 py-6 lg:grid-cols-[2.5rem_minmax(0,1fr)_auto] lg:items-baseline">
              <span
                aria-hidden
                className="type-eyebrow tabular-nums text-[var(--text-faint)]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="type-h3 text-foreground">{item.company}</h3>

                <p className="type-meta mt-1 text-muted-foreground">
                  {item.role}
                  <span aria-hidden className="mx-2 text-[var(--text-faint)]">
                    ·
                  </span>
                  {item.location}
                </p>

                <p className="type-meta type-prose mt-3 text-muted-foreground">
                  {item.descriptor}
                </p>

                {/* Secondary by construction: smaller, fainter, and after the
                    engineering line rather than inside it. */}
                {item.alsoWorkingWith ? (
                  <p className="type-eyebrow mt-3 leading-[1.9] text-[var(--text-faint)]">
                    Also working with{" "}
                    {item.alsoWorkingWith.join("  ·  ")}
                  </p>
                ) : null}

                {/* Renders only when a real link exists in the data. Nothing
                    is fabricated to fill the slot. */}
                {item.links.length > 0 ? (
                  <div className="mt-4 flex flex-wrap items-center gap-x-6">
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex min-h-11 items-center gap-1.5 type-button text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <span
                          aria-hidden
                          className="translate-y-px transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                        >
                          ↗
                        </span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <p className="type-eyebrow tabular-nums text-muted-foreground lg:text-right">
                {item.start} — {item.end}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
