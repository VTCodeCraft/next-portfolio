import type { ProjectView } from "@/lib/projects";

import ProjectLinks from "./project-links";
import ProjectVisual from "./project-visual";

type Props = {
  project: ProjectView;
  index: number;
  total: number;
  /**
   * "lead" stacks the visual under full-width text; "split" is the two-column
   * arrangement. The first featured project uses lead so the section does not
   * open with three identical alternating rows, which is the layout that makes
   * a project list read as a template.
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

  return (
    <article className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
      <div className={side === "right" ? "lg:order-2" : undefined}>{text}</div>
      <div className={side === "right" ? "lg:order-1" : undefined}>
        <ProjectVisual project={project} />
      </div>
    </article>
  );
}
