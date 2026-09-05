import Image from "next/image";

import type { ProjectView } from "@/lib/projects";

/**
 * The visual slot for a featured project.
 *
 * No project in the repository ships a screenshot yet, so this currently
 * always renders the fallback. That fallback is deliberately typographic: a
 * mocked-up browser window or an invented dashboard would be a picture of
 * software that does not exist, which is worse than no picture at all. What
 * it shows instead is true — the project's name and the stack it was built
 * with, set in the site's own faces.
 *
 * When a real screenshot exists, set `image` on the project in lib/projects.ts
 * and it takes over with no change here.
 */
export default function ProjectVisual({
  project,
  priority = false,
}: {
  project: ProjectView;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[var(--surface-glass)]">
      {/*
        Aspect is held so the row never reflows as images load. The two cases
        use different ratios on purpose: 16:10 is a screenshot's shape, while
        the nameplate is a band. Giving the fallback a screenshot's proportions
        would make it read as an image that failed to load.
      */}
      <div
        className={`relative w-full ${project.image ? "aspect-[16/10]" : "aspect-[16/6] sm:aspect-[16/5]"}`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} interface screenshot`}
            fill
            priority={priority}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <Fallback project={project} />
        )}
      </div>
    </div>
  );
}

function Fallback({ project }: { project: ProjectView }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-between gap-6 px-6 sm:px-10"
    >
      <p className="type-statement text-[var(--text-subtle)]">
        {project.title}
      </p>

      {/* Right-aligned so the plate has two anchored edges and reads as a
          composed band rather than as an empty container with a word in it. */}
      <p className="type-eyebrow hidden text-right leading-[2] text-[var(--text-faint)] sm:block">
        {project.stack.slice(0, 3).join("  ·  ")}
      </p>
    </div>
  );
}
