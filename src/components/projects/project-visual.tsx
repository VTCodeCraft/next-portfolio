import Image from "next/image";

import type { ProjectView } from "@/lib/projects";

import ProjectLivePreview from "./project-live-preview";

/**
 * The visual slot for a featured project, in order of preference:
 *
 *   1. a real screenshot, when one is set on the project
 *   2. the deployed site itself, when the project has a live URL
 *   3. a typographic nameplate
 *
 * The live embed is the interesting case: it is the actual product rather
 * than a picture of it, so it cannot go stale and cannot be flattering in a
 * way the real thing is not. The nameplate stays as the floor — an invented
 * dashboard mockup would be a picture of software that does not exist, which
 * is worse than showing no picture.
 */
export default function ProjectVisual({
  project,
  priority = false,
}: {
  project: ProjectView;
  priority?: boolean;
}) {
  if (!project.image && project.liveHref) {
    return (
      <ProjectLivePreview
        href={project.liveHref}
        title={project.title}
        fallback={<Plate project={project} />}
      />
    );
  }

  return <Plate project={project} priority={priority} />;
}

function Plate({
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
