import type { Metadata } from "next";
import Link from "next/link";

import ExperienceEntry from "@/components/experience/experience-entry";
import ExperienceHeader from "@/components/experience/experience-header";
import { experiences } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Experience",
  /* Was "real-time media and inference infrastructure for warehouse
     monitoring" — that work ships as the Vision Intelligence Engine now, and
     the description made no mention of the ERP delivery or the SEO layer. */
  description:
    "Software engineering in production — an agentic storefront builder with a proposal-and-approval safety model, a multi-tenant SEO intelligence layer, real-time media and GPU inference, and 15+ merged pull requests on a live ERP.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience | Vishesh Tripathi",
    description:
      "Software engineering in production — AI systems architecture, typed tool calling, multi-tenant backends, real-time media pipelines and shipped ERP work.",
    url: "/experience",
  },
};

/*
  Earliest role start, derived rather than written down. The header prints the
  year from it, so adding an older role updates the page by itself and there
  is no second place to forget.
*/
const sinceISO = experiences.reduce(
  (earliest, item) => (item.startISO < earliest ? item.startISO : earliest),
  experiences[0].startISO,
);

export default function ExperiencePage() {
  return (
    /*
      One centered column, narrower than the shell, and every block on the
      route sits in it — hero included. The shell sets the page gutters, this
      sets the measure, so the whole page shares one left edge instead of the
      introduction starting 180px left of the record it introduces.

      No sticky side index: nothing else on this site uses a rail, and two
      roles is not enough navigation to justify introducing one.
    */
    <div className="page-shell section-rhythm [&>*]:mx-auto [&>*]:w-full [&>*]:max-w-[52rem]">
      <ExperienceHeader roleCount={experiences.length} sinceISO={sinceISO} />

      <div className="space-y-20 lg:space-y-24">
        {experiences.map((item, index) => (
          <ExperienceEntry key={item.slug} item={item} index={index} />
        ))}
      </div>

      {/* Closing note rather than a second marketing block — the homepage
          contact section carries the full form. */}
      <section
        aria-labelledby="experience-contact-title"
        className="border-t border-border pt-10"
      >
        <h2
          id="experience-contact-title"
          className="type-statement text-foreground"
        >
          Looking for someone to build this kind of thing?
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
          <Link
            href="/projects"
            className="group/link inline-flex min-h-11 items-center gap-1.5 type-button text-muted-foreground transition-colors hover:text-foreground"
          >
            Selected work
            <span
              aria-hidden
              className="translate-y-px transition-transform duration-200 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
