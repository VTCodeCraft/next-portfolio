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
 * Homepage work section: a curated three, not the full six.
 *
 * Each entry reads name -> what it is -> what it is built with -> the
 * engineering detail worth knowing. The stack and outcome lines are what
 * separate this from a list of side projects.
 */
export default function SelectedWork() {
  return (
    <section id="work" className="page-column scroll-mt-32">
      <SectionHeading index="01" rule>
        Selected work
      </SectionHeading>

      <ul className="m-0 list-none p-0">
        {flagships.map((project) => (
          <li key={project.shortTitle} className="border-t border-border">
            <article className="py-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-heading text-base font-medium tracking-[-0.03em] text-foreground sm:text-[1.05rem]">
                  {project.shortTitle}
                </h3>
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-eyebrow shrink-0 tracking-[0.16em] text-primary transition hover:text-foreground"
                >
                  Live ↗
                </Link>
              </div>

              <p className="mt-2 text-[0.82rem] leading-relaxed text-muted-foreground">
                {project.summary}
              </p>

              <p className="mt-2.5 font-mono text-[0.68rem] leading-relaxed tracking-[0.02em] text-muted-foreground">
                {project.stack}
              </p>

              <p className="mt-2 text-[0.75rem] leading-relaxed text-[var(--text-subtle)]">
                {project.outcome}
              </p>
            </article>
          </li>
        ))}
      </ul>

      <div className="border-t border-border pt-5">
        <Link
          href="/projects"
          className="type-eyebrow inline-flex items-center gap-2 tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
        >
          All {myProjects.length} projects ↗
        </Link>
      </div>
    </section>
  );
}
