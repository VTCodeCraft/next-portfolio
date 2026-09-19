"use client";

import { useState } from "react";

import SectionHeading from "@/components/ui/section-heading";
import { MotionMountDiv, MotionMountSection } from "@/components/ui/reveal";
import {
  skillCategories,
  specialization,
  totalSkillCount,
  type Skill,
} from "@/lib/skills";

/**
 * The stack, as an editorial matrix.
 *
 * Ordered for a software-engineering read rather than by novelty: languages,
 * what is built with them, what stores and runs it, then the fundamentals.
 * Names are real DOM text — the icons are decoration, so anything reading the
 * page for content finds "TypeScript" and "PostgreSQL", not an SVG.
 */
export default function Skills() {
  /*
    One shared readout instead of a tooltip per item. Fifty floating popups
    would need a library, a portal and collision handling to say one short
    line; a single line that updates on hover costs nothing and never covers
    the thing it describes.
  */
  const [active, setActive] = useState<Skill | null>(null);

  return (
    <MotionMountSection id="skills" delay={0.1} className="scroll-mt-32">
      <SectionHeading index="03" rule meta={`${totalSkillCount} total`}>
        Technical stack
      </SectionHeading>

      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="type-body type-prose text-muted-foreground">
            What I use to design, build, deploy and operate production
            software.
          </p>

          {/* Reserves its height so the column does not shift as the readout
              fills and empties. */}
          <div className="mt-6 min-h-[3.25rem] border-t border-border pt-4">
            <p className="type-eyebrow text-foreground">
              {active ? active.name : "Hover to inspect"}
            </p>
            <p className="type-meta mt-1 text-[var(--text-faint)]">
              {active ? active.kind : " "}
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
                    key={`${category.id}-${skill.name}`}
                    skill={skill}
                    isActive={active?.name === skill.name}
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
        Domains, not tools. Held to one line under the matrix so the work
        reads as "an engineer who also builds these systems" rather than as a
        second stack competing with the first.
      */}
      <MotionMountDiv
        delay={0.28}
        distance={12}
        className="mt-8 flex flex-col gap-x-6 gap-y-2 border-t border-border pt-5 sm:flex-row sm:items-baseline"
      >
        <h3 className="type-eyebrow shrink-0 text-foreground">
          Current specialization
        </h3>
        <p className="type-meta text-muted-foreground">
          {specialization.join("  ·  ")}
        </p>
      </MotionMountDiv>
    </MotionMountSection>
  );
}

function SkillItem({
  skill,
  isActive,
  onEnter,
  onLeave,
}: {
  skill: Skill;
  isActive: boolean;
  onEnter: (skill: Skill) => void;
  onLeave: () => void;
}) {
  const Icon = skill.icon;

  return (
    <li
      onMouseEnter={() => onEnter(skill)}
      onMouseLeave={onLeave}
      /*
        `cursor-help` rather than a custom cursor element. It is the pointer
        the platform already uses for "there is more information here", it
        costs nothing, it does not follow the mouse around the page, and it
        does nothing at all on touch — which is correct, since there is no
        hover to indicate there.
      */
      className="group flex cursor-help items-center gap-2"
    >
      {/*
        No colour transition on these two, deliberately.

        A CSS transition on `color` whose value comes from a theme-switched
        custom property pins the old resolved colour when the theme class
        flips and never re-resolves the changed var — the label keeps the
        previous theme's colour until a reload. Measured: 6.11:1 on light
        with the transition removed, 2.86:1 with it present, from the same
        declaration. Forcing `transition: none` on the element fixed it
        outright, which is what identified the cause.

        The hover colour therefore changes instantly. That is the trade:
        a correct colour in both themes over a 200ms fade.
      */}
      {Icon ? (
        /*
          Colour is driven from the same state that feeds the readout rather
          than from a group-hover class. The brand value is per-skill data, so
          a utility class cannot carry it, and keeping one source for "which
          skill is being inspected" means the icon, the label and the readout
          cannot disagree.

          Falls back to the foreground colour where no brand colour is set —
          Next.js, Express, Vercel and the rest whose marks are black.
        */
        <Icon
          aria-hidden
          style={{
            color: isActive
              ? (skill.color ?? "var(--foreground)")
              : "var(--text-faint)",
          }}
          className="h-3.5 w-3.5 shrink-0"
        />
      ) : null}

      {/*
        The label goes to full foreground rather than to the brand colour.
        Several of these brands are yellow or near-black — JavaScript, Linux,
        Next.js — and colouring the word would drop it below readable contrast
        on one theme or the other. The icon carries the brand; the word stays
        legible.
      */}
      <span
        style={{
          color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
        }}
        className="type-meta"
      >
        {skill.name}
      </span>

      {/* In the accessible tree for everyone, so the detail is not
          mouse-only. */}
      <span className="sr-only">, {skill.kind}</span>
    </li>
  );
}
