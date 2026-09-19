import type { SpotlightWork } from "@/lib/experience";

import TechnologyList from "./technology-list";

/**
 * A second body of work inside the same role.
 *
 * Set apart from the featured project by a left rule rather than by a card:
 * the page already has one border language — hairlines — and a filled panel
 * here would read as a different component from a different system.
 *
 * The headline figure is the only number on this route allowed to be large.
 * It is the strongest supported result in the role, so it gets the weight and
 * nothing else competes for it.
 */
export default function ExperienceHighlights({
  work,
  headingId,
}: {
  work: SpotlightWork;
  headingId: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-border pt-6"
    >
      <p className="type-eyebrow text-[var(--text-subtle)]">{work.kicker}</p>
      <h3 id={headingId} className="type-h3 mt-3 text-foreground">
        {work.name}
      </h3>

      <div className="mt-4 space-y-4">
        {work.summary.map((paragraph) => (
          <p key={paragraph} className="type-prose type-body text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      {work.headline ? (
        /*
          Indented behind a rule so the figure reads as a pulled-out result
          rather than as another paragraph that happens to start with a
          number. border-l is the same hairline everything else uses.
        */
        <div className="mt-7 border-l border-border pl-5 sm:pl-6">
          <p className="type-eyebrow text-[var(--text-subtle)]">
            {work.headline.label}
          </p>
          <p className="type-statement mt-2 tabular-nums text-foreground">
            {work.headline.value}
          </p>
          <p className="type-prose type-meta mt-2.5 text-muted-foreground">
            {work.headline.note}
          </p>
        </div>
      ) : null}

      <ul className="m-0 mt-7 list-none border-t border-border p-0">
        {work.points.map((point) => (
          <li
            key={point}
            className="type-prose type-body border-b border-border py-3.5 text-muted-foreground"
          >
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <TechnologyList label="Stack" items={work.technologies} />
      </div>
    </section>
  );
}
