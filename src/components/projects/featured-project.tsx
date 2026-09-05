import type { ProjectView } from "@/lib/projects";

import ProjectLinks from "./project-links";
import ProjectVisual from "./project-visual";

type Props = {
  project: ProjectView;
  index: number;
  total: number;
  /**
   * "split" is the two-column arrangement, "lead" stacks the visual under
   * full-width text. The last featured entry uses lead so the section does
   * not run three identical alternating rows, which is the arrangement that
   * makes a project list read as a template.
   */
  variant: "lead" | "split";
  /** Only meaningful for "split": which side the text sits on. */
  side?: "left" | "right";
};

export default function FeaturedProject({
  project,
  index,
  total,
  variant,
  side = "left",
}: Props) {
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  const text = (
    <div>
      <p className="type-eyebrow tabular-nums text-[var(--text-faint)]">
        {counter}
      </p>

      <h3 className="type-statement mt-4 text-foreground">{project.title}</h3>

      <p className="type-prose type-body mt-4 text-muted-foreground">
        {project.summary}
      </p>

      {/* Stack as a single tracked line rather than a row of coloured chips.
          The technologies are context for the project, not the content. */}
      <p className="type-eyebrow mt-6 leading-[2] text-[var(--text-subtle)]">
        {project.stack.join("  ·  ")}
      </p>

      <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
        {project.detail.map((point) => (
          <li
            key={point}
            className="type-meta type-prose text-muted-foreground"
          >
            {point}
          </li>
        ))}
      </ul>

      {/* Omitted entirely when the project has no authored outcome, rather
          than filled with a generic claim. */}
      {project.outcome ? (
        <p className="type-meta mt-5 border-l border-border pl-4 text-[var(--text-subtle)]">
          {project.outcome}
        </p>
      ) : null}

      <ProjectLinks project={project} className="mt-7" />
    </div>
  );

  if (variant === "lead") {
    return (
      <article className="grid gap-8">
        <div className="lg:max-w-[46rem]">{text}</div>
        <ProjectVisual project={project} priority />
      </article>
    );
  }

  /*
    45/55 rather than an even split: the preview needs the larger share to
    read as a product rather than a thumbnail, while the text column lands
    near its comfortable measure at this page width. Below lg both columns
    become full width and the preview follows the text, which is the order
    the content should be read in anyway.
  */
  /* Columns are sized by role, not by position: the preview keeps the larger
     share whichever side it lands on, so mirroring the layout does not shrink
     it. Written as two whole class strings because Tailwind resolves classes
     at build time and cannot see an interpolated fragment. */
  const columns =
    side === "right"
      ? "lg:grid-cols-[55fr_45fr]"
      : "lg:grid-cols-[45fr_55fr]";

  return (
    <article
      className={`grid items-start gap-8 lg:gap-12 xl:gap-16 ${columns}`}
    >
      {/* min-w-0 on both tracks: grid items default to an automatic minimum
          of their content, so a single long unbreakable string anywhere
          inside would widen the column rather than wrap or truncate. */}
      <div className={`min-w-0 ${side === "right" ? "lg:order-2" : ""}`}>
        {text}
      </div>
      <div className={`min-w-0 ${side === "right" ? "lg:order-1" : ""}`}>
        <ProjectVisual project={project} />
      </div>
    </article>
  );
}
