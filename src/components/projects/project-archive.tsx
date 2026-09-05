import type { ProjectView } from "@/lib/projects";

import ProjectLinks from "./project-links";

/**
 * The full archive, denser than the featured section.
 *
 * Rows, not cards: six bordered boxes stacked vertically would be six
 * containers competing with each other, and the elevation would communicate
 * nothing since every row has equal standing. A single hairline between rows
 * does the same grouping work and leaves the project names as the only thing
 * with visual weight.
 */
export default function ProjectArchive({
  projects,
}: {
  projects: ProjectView[];
}) {
  return (
    <ol className="m-0 list-none border-t border-border p-0">
      {projects.map((project, index) => (
        <li key={project.slug} className="border-b border-border">
          <div
            className="
              group grid gap-x-8 gap-y-3 py-6
              transition-colors
              lg:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,15rem)_auto]
              lg:items-baseline lg:py-5
            "
          >
            <span
              aria-hidden
              className="type-eyebrow tabular-nums text-[var(--text-faint)]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <h3 className="type-h3 text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="type-meta type-prose mt-1.5 text-muted-foreground">
                {project.summary}
              </p>
            </div>

            {/* Below lg this sits under the summary; the eyebrow's tracking
                keeps it reading as metadata rather than as a second sentence. */}
            <p className="type-eyebrow leading-[1.9] text-[var(--text-subtle)]">
              {project.stack.join("  ·  ")}
            </p>

            <ProjectLinks project={project} className="lg:justify-end" />
          </div>
        </li>
      ))}
    </ol>
  );
}
