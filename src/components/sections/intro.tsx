"use client";

import Image from "next/image";
import Link from "next/link";
import TextType from "@/components/TextType";
import { MotionMountDiv, MotionMountSection } from "@/components/ui/reveal";

export default function Intro() {
  return (
    <MotionMountSection
      id="introduction"
      delay={0.05}
      className="page-column scroll-mt-32 text-center"
    >
      {/*
        Identity cluster: portrait paired with location and availability as a
        single unit. Reads as a passport line rather than a profile card, and
        never competes with the display type below it.
      */}
      <MotionMountDiv delay={0.08} distance={16}>
        <div className="inline-flex items-center gap-3">
          <Image
            src="/images/profile.png"
            alt="Vishesh Tripathi"
            width={144}
            height={144}
            quality={75}
            priority
            className="h-11 w-11 shrink-0 rounded-xl border border-border bg-card object-cover"
          />
          <div className="text-left">
            <p className="type-eyebrow tracking-[0.16em]">New Delhi, India</p>
            <p className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--surface-available-dot)]" />
              <span className="type-eyebrow tracking-[0.16em] text-[var(--surface-available-text)]">
                Open to work
              </span>
            </p>
          </div>
        </div>
      </MotionMountDiv>

      <MotionMountDiv delay={0.12} distance={20}>
        {/*
          The typing effect starts from an empty string, so the real heading
          text is always present and the animation is decorative.
        */}
        <h1 className="mt-6 font-heading text-[2rem] font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[3.4rem]">
          <span className="sr-only">
            Vishesh Tripathi — Full-stack engineer
          </span>
          <span aria-hidden="true">
            <TextType
              as="span"
              text="Vishesh Tripathi"
              typingSpeed={50}
              pauseDuration={2400}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              loop
              variableSpeed={{ min: 60, max: 120 }}
              cursorBlinkDuration={0.5}
            />
          </span>
        </h1>

        <p className="mt-3 font-heading text-sm text-muted-foreground sm:text-base">
          Full-stack engineer
        </p>

        <p className="mx-auto mt-6 max-w-[46ch] text-[0.92rem] leading-[1.75] text-foreground sm:text-base">
          I build real-time and AI-powered products — voice pipelines, computer
          vision, browser SDKs — and ship them to people who actually use them.
        </p>
      </MotionMountDiv>

      <MotionMountDiv delay={0.18} distance={16}>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-[0.82rem] font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
          >
            View my work
          </Link>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-[0.82rem] font-medium text-muted-foreground transition hover:border-primary hover:text-foreground active:scale-[0.98]"
          >
            Get in touch
          </a>
        </div>
      </MotionMountDiv>
    </MotionMountSection>
  );
}
