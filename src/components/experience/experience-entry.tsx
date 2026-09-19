import { MotionMountArticle } from "@/components/ui/reveal";
import type { Experience } from "@/lib/experience";

import EngineeringFocus from "./engineering-focus";
import ExperienceHighlights from "./experience-highlights";
import { ExperienceLinks } from "./experience-link";
import ExperienceMeta from "./experience-meta";
import ExperienceMetrics from "./experience-metrics";
import SelectedWork from "./selected-work";
import TechnologyList from "./technology-list";

/**
 * One role, assembled from whatever the data actually carries.
 *
 * Every block below is conditional. A role with a flagship project renders a
 * featured block, engineering focus, metrics and strands; a role that is four
 * shipped surfaces renders rows and two outcome figures. Neither shape is
 * special-cased in the page — the data decides, so adding a third role means
 * adding data.
 *
 * The index sits in a left gutter on large screens and above the company name
 * below that. A fixed rail at 375px would cost the prose most of a word per
 * line, which is the difference between scannable and cramped.
 */
export default function ExperienceEntry({
  item,
  index,
}: {
  item: Experience;
  index: number;
}) {
  const ordinal = String(index + 1).padStart(2, "0");
  const headingId = `${item.slug}-title`;

  return (
    /*
      Mount reveal, not a scroll reveal. An in-view reveal fires when a share
      of the element is visible, and a role here is several viewports tall —
      the threshold is unreachable, so the entry animates in never and the
      page renders blank. Revealing on mount also means the record is present
      the moment the route paints, which is what a document should do.
    */
    <MotionMountArticle
      aria-labelledby={headingId}
      delay={0.04 + index * 0.05}
      distance={20}
      className="border-t border-border pt-8 lg:grid lg:grid-cols-[4rem_minmax(0,1fr)] lg:gap-x-10"
    >
      <p
        aria-hidden
        className="type-eyebrow tabular-nums text-[var(--text-faint)] lg:pt-[0.35em]"
      >
        {ordinal}
      </p>

      <div className="mt-4 min-w-0 lg:mt-0">
        <ExperienceMeta item={item} headingId={headingId} />

        <p className="type-prose type-body mt-5 text-muted-foreground">
          {item.intro}
        </p>

        <div className="mt-6">
          <TechnologyList label="Core stack" items={item.technologies} />
        </div>

        {/* Blocks below the intro share one rhythm, set here rather than as a
            margin on each child, so a block can be added without matching a
            spacing value by hand. */}
        <div className="mt-10 space-y-10">
          {item.featured ? (
            <section
              aria-labelledby={`${item.slug}-featured-title`}
              className="border-t border-border pt-6"
            >
              <p className="type-eyebrow text-[var(--text-subtle)]">
                {item.featured.kicker}
              </p>
              <h3
                id={`${item.slug}-featured-title`}
                className="type-h3 mt-3 text-foreground"
              >
                {item.featured.name}
              </h3>

              <div className="mt-4 space-y-4">
                {item.featured.summary.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="type-prose type-body text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <ExperienceLinks links={item.featured.links} />

              {item.featured.contribution ? (
                <p className="type-prose type-meta mt-5 border-l border-border pl-5 text-[var(--text-subtle)] sm:pl-6">
                  {item.featured.contribution}
                </p>
              ) : null}

              <div className="mt-10 space-y-10">
                <EngineeringFocus items={item.featured.engineeringFocus} />

                <div className="border-t border-border pt-6">
                  <TechnologyList
                    label="Technologies"
                    items={item.featured.technologies}
                  />
                </div>

                <ExperienceMetrics
                  label="Architecture"
                  metrics={item.featured.architecture}
                  note={item.featured.architectureNote}
                />

                <ExperienceMetrics
                  label="Proof"
                  metrics={item.featured.proof}
                  note={item.featured.proofNote}
                />
              </div>
            </section>
          ) : null}

          {item.selectedWork ? (
            <SelectedWork
              label="Inside the build"
              headingId={`${item.slug}-selected-title`}
              title="Selected engineering work"
              rows={item.selectedWork}
            />
          ) : null}

          {item.spotlight ? (
            <ExperienceHighlights
              work={item.spotlight}
              headingId={`${item.slug}-spotlight-title`}
            />
          ) : null}

          {item.projects ? (
            <SelectedWork
              label="Shipped"
              headingId={`${item.slug}-projects-title`}
              title="What I built"
              rows={item.projects}
            />
          ) : null}

          {item.metrics ? (
            <ExperienceMetrics label="Outcomes" metrics={item.metrics} />
          ) : null}
        </div>
      </div>
    </MotionMountArticle>
  );
}
