import type { ProjectView } from "@/lib/projects";

/**
 * Live and source actions.
 *
 * The live link is omitted rather than disabled when a project has no
 * deployment: a greyed-out "Live" that cannot be clicked reads as a broken
 * link, while its absence reads as an accurate statement about the project.
 */
export default function ProjectLinks({
  project,
  className = "",
}: {
  project: ProjectView;
  className?: string;
}) {
  const linkClass =
    "group/link inline-flex min-h-11 items-center gap-1.5 type-button text-muted-foreground transition-colors hover:text-foreground";

  return (
    <div className={`flex flex-wrap items-center gap-x-6 ${className}`}>
      {project.liveHref ? (
        <a
          href={project.liveHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} text-foreground`}
        >
          Live site
          <Arrow />
        </a>
      ) : null}

      <a
        href={project.repoHref}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        Source
        <Arrow />
      </a>
    </div>
  );
}

/* 2px of travel on hover. Enough to register as a response, not enough to
   read as an animation. */
function Arrow() {
  return (
    <span
      aria-hidden
      className="translate-y-px transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0 motion-reduce:group-hover/link:translate-y-px"
    >
      ↗
    </span>
  );
}
