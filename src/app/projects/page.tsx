import type { Metadata } from "next";

import FeaturedProject from "@/components/projects/featured-project";
import ProjectArchive from "@/components/projects/project-archive";
import SectionHeading from "@/components/ui/section-heading";
import { MotionMountDiv, MotionMountSection } from "@/components/ui/reveal";
import { allProjects, featuredProjects } from "@/lib/projects";

const GITHUB_HREF = "https://github.com/VTCodeCraft";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering work — an AI voice interview coach, a browser-native gesture CAPTCHA, a timezone-aware scheduling platform, and other shipped tools.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Vishesh Tripathi",
    description:
      "Selected engineering work — AI voice pipelines, computer-vision CAPTCHA, finance and scheduling systems, and developer tooling.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="page-shell section-rhythm">
      {/*
        Compact by design. The archive is the point of this route, so the
        introduction states what the work is and gets out of the way rather
        than occupying a viewport of its own.
      */}
      <MotionMountSection delay={0.05} aria-labelledby="projects-title">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <h1 id="projects-title" className="type-display text-foreground">
              Selected work
            </h1>
            <p className="type-prose type-body mt-5 text-muted-foreground">
              Products, tools and experiments built across full-stack
              engineering, AI systems and browser tooling. Live links and
              source where they exist.
            </p>
          </div>

          {/* Counts are read off the data, so they cannot drift out of date. */}
          <dl className="flex shrink-0 gap-8 sm:gap-10">
            <div>
              <dt className="type-eyebrow text-[var(--text-faint)]">Projects</dt>
              <dd className="type-h3 m-0 mt-1.5 tabular-nums text-foreground">
                {allProjects.length}
              </dd>
            </div>
            <div>
              <dt className="type-eyebrow text-[var(--text-faint)]">Featured</dt>
              <dd className="type-h3 m-0 mt-1.5 tabular-nums text-foreground">
                {featuredProjects.length}
              </dd>
            </div>
          </dl>
        </div>
      </MotionMountSection>

      <section aria-labelledby="featured-title">
        <SectionHeading index="01" rule meta="Deep dives">
          <span id="featured-title">Featured</span>
        </SectionHeading>

        {/*
          The first two entries are two-column splits with the preview on
          opposite sides; the last stacks. Running all three as alternating
          splits is the arrangement that makes a project list read as
          generated, so the pattern breaks before it establishes itself.

          Clutchly is first and reads text-left, preview-right.
        */}
        <div className="space-y-20 lg:space-y-28">
          {featuredProjects.map((project, index) => {
            const isLast = index === featuredProjects.length - 1;

            return (
              <MotionMountDiv key={project.slug} delay={0.04 * index} distance={20}>
                <FeaturedProject
                  project={project}
                  index={index}
                  total={featuredProjects.length}
                  variant={isLast ? "lead" : "split"}
                  side={index % 2 === 0 ? "left" : "right"}
                />
              </MotionMountDiv>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="archive-title">
        <SectionHeading index="02" rule meta={`${allProjects.length} total`}>
          <span id="archive-title">Archive</span>
        </SectionHeading>

        <ProjectArchive projects={allProjects} />
      </section>

      {/* Closing note rather than a second marketing block: the contact
          section on the homepage already carries the full form. */}
      <section aria-labelledby="projects-contact-title" className="border-t border-border pt-10">
        <h2 id="projects-contact-title" className="type-statement text-foreground">
          Have something worth building?
        </h2>
        <p className="type-prose type-body mt-4 text-muted-foreground">
          Open to internships, full-time roles and collaborations. I usually
          reply within a day.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="mailto:work.vishesh12.05@gmail.com"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 type-button text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
          >
            Email me
          </a>
          <a
            href={GITHUB_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 type-button text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
