"use client";

import { useState } from "react";

import SectionHeading from "@/components/ui/section-heading";
import { MotionMountDiv, MotionMountSection } from "@/components/ui/reveal";
import {
  skillCategories,
  specializedSkills,
  totalSkillCount,
  type Skill,
} from "@/lib/skills";

/**
 * The stack, as an editorial matrix.
 *
 * What this replaces was a sliding-tile puzzle over 24 coloured logo cards.
 * It was the loudest thing on the page and said nothing: a recruiter could
 * not scan it, the categories were invisible, and the colour made every
 * technology shout equally. This reads top to bottom, groups by what things
 * are for, and lets the names carry the weight.
 */
export default function Skills() {
  /*
    One shared readout instead of a tooltip per item.

    Fifty-odd floating popups would need a library, a portal and collision
    handling to say one short line. A single line that updates on hover costs
    nothing, never covers what it describes, and reads as instrumentation
    rather than as decoration.
  */
  const [active, setActive] = useState<Skill | null>(null);

  return (
    <MotionMountSection id="skills" delay={0.1} className="scroll-mt-32">
      {/* "N total" rather than "N technologies": the meta sits on one
          shrink-0 row with the title and rule, and the longer string pushed
          that row past the viewport at 375px. Matches the archive heading. */}
      <SectionHeading index="03" rule meta={`${totalSkillCount} total`}>
        Technical stack
      </SectionHeading>

      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="type-body type-prose text-muted-foreground">
            What I use to design, build, deploy and operate production
            software.
          </p>

          {/*
            Reserves its own height so the column does not shift as the
            readout fills and empties.
          */}
          <div className="mt-6 min-h-[3.25rem] border-t border-border pt-4">
            <p className="type-eyebrow text-foreground">
              {active ? active.name : "Hover to inspect"}
            </p>
            <p className="type-meta mt-1 text-[var(--text-faint)]">
              {active ? active.kind : " "}
            </p>
          </div>
        </div>

        <div>
          {skillCategories.map((category, index) => (
            <MotionMountDiv
              key={category.id}
              delay={0.04 * index}
              distance={12}
              className="border-t border-border py-5 first:border-t-0 first:pt-0"
            >
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="type-eyebrow tabular-nums text-[var(--text-faint)]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="type-eyebrow text-muted-foreground">
                  {category.label}
                </h3>
              </div>

              <ul className="m-0 mt-3.5 flex list-none flex-wrap gap-x-5 gap-y-2.5 p-0">
                {category.skills.map((skill) => (
                  <SkillItem
                    key={skill.name}
                    skill={skill}
                    onEnter={setActive}
                    onLeave={() => setActive(null)}
                  />
                ))}
              </ul>
            </MotionMountDiv>
          ))}
        </div>
      </div>

      {/*
        Held apart from the matrix rather than appended as another row: this
        is current work, not general stack, and the distinction is the point.
      */}
      <MotionMountDiv
        delay={0.3}
        distance={12}
        className="mt-10 rounded-lg border border-border bg-[var(--surface-glass)] p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="type-eyebrow text-foreground">
            Current / specialized
          </h3>
          <p className="type-meta text-[var(--text-faint)]">
            Real-time edge AI at Hyperion Future Tech
          </p>
        </div>

        <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-5 gap-y-2.5 p-0">
          {specializedSkills.map((skill) => (
            <SkillItem
              key={skill.name}
              skill={skill}
              onEnter={setActive}
              onLeave={() => setActive(null)}
            />
          ))}
        </ul>
      </MotionMountDiv>
    </MotionMountSection>
  );
}

function SkillItem({
  skill,
  onEnter,
  onLeave,
}: {
  skill: Skill;
  onEnter: (skill: Skill) => void;
  onLeave: () => void;
}) {
  const Icon = skill.icon;

  return (
    <li
      onMouseEnter={() => onEnter(skill)}
      onMouseLeave={onLeave}
      className="group flex items-center gap-2"
    >
      {Icon ? (
        /* Monochrome, and sized below the label. Brand colour on fifty marks
           at once is what turned the old version into a logo wall. */
        <Icon
          aria-hidden
          className="h-3.5 w-3.5 shrink-0 text-[var(--text-faint)] transition-colors duration-200 group-hover:text-foreground motion-reduce:transition-none"
        />
      ) : null}

      <span className="type-meta text-muted-foreground transition-colors duration-200 group-hover:text-foreground motion-reduce:transition-none">
        {skill.name}
      </span>

      {/*
        The kind is in the accessible tree for everyone, not only in the
        hover readout — otherwise this detail would exist for mouse users
        alone. The readout is the sighted-mouse convenience on top of it.
      */}
      <span className="sr-only">, {skill.kind}</span>
    </li>
  );
}
