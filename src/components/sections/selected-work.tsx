import Link from "next/link";

import SectionHeading from "@/components/ui/section-heading";
import { myProjects } from "@/lib/data";

type Flagship = (typeof myProjects)[number] & {
  shortTitle: string;
  summary: string;
  stack: string;
  outcome: string;
  flagship: number;
};

const isFlagship = (project: (typeof myProjects)[number]): project is Flagship =>
  "flagship" in project;

const flagships = myProjects
  .filter(isFlagship)
  .slice()
  .sort((a, b) => a.flagship - b.flagship);

/**
 * Curated index rather than every project. Each row leads with what the thing
 * is, then what it is built with, then the engineering detail worth knowing —
 * screenshots and architecture belong on the detail route, not here.
 */
export default function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-32">
      <SectionHeading
        index="02"
        rule
        meta={`${flagships.length} of ${myProjects.length}`}
      >
        Selected work
      </SectionHeading>

      <ul className="m-0 list-none p-0">
        {flagships.map((project) => (
          <li key={project.shortTitle} className="border-t border-border">
            <article className="group relative py-6 transition-colors">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="font-heading text-lg font-medium tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary">
                  {/*
                    Stretched link: the whole row is the primary target, while
                    the repo link below stays independently clickable.
                  */}
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {project.shortTitle}
                  </Link>
                </h3>

                <span className="type-eyebrow shrink-0 tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-primary">
                  Live ↗
                </span>
              </div>

              <p className="type-prose mt-2.5 text-[0.88rem] text-muted-foreground">
                {project.summary}
              </p>

              <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
                {project.stack}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-[0.78rem] leading-relaxed text-[var(--text-subtle)]">
                  {project.outcome}
                </p>

                <Link
                  href={project.repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-eyebrow relative z-10 inline-flex min-h-11 items-center tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
                >
                  Repository ↗
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="border-t border-border pt-5">
        <Link
          href="/projects"
          className="type-eyebrow inline-flex min-h-11 items-center tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
        >
          All {myProjects.length} projects ↗
        </Link>
      </div>
    </section>
  );
}
