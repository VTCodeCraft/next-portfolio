"use client";

import Link from "next/link";

import IdentityPanel from "@/components/sections/identity-panel";
import TextType from "@/components/TextType";
import SocialLinks from "@/components/ui/social-links";
import { MotionMountDiv, MotionMountSection } from "@/components/ui/reveal";

export default function Intro() {
  return (
    <MotionMountSection
      id="introduction"
      delay={0.05}
      className="scroll-mt-32"
    >
      {/* Rail widened from 16rem: the laptop is a landscape object and needs
          width to sit in the panel without crowding the edges. */}
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
        <div>
          {/* No avatar here: the portrait lives on the laptop screen in the
              identity panel, so a second copy would compete with it. */}
          <MotionMountDiv delay={0.08} distance={16}>
            <p className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--surface-available-dot)]" />
              <span className="type-eyebrow tracking-[0.16em] text-[var(--surface-available-text)]">
                Open to work
              </span>
            </p>
          </MotionMountDiv>

          <MotionMountDiv delay={0.12} distance={20}>
            {/*
              The typing effect starts from an empty string, so the heading text
              is always present in the markup and the animation is decorative.
              Removing this wrapper would ship an empty h1 to crawlers.
            */}
            <h1 className="mt-7 font-heading text-[2rem] font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
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

            <p className="mt-3 font-heading text-base text-muted-foreground sm:text-lg">
              Full-stack engineer
            </p>

            <p className="type-prose mt-6 text-[0.95rem] text-foreground sm:text-base">
              I build real-time and AI-powered products — voice pipelines,
              computer vision, browser SDKs — and ship them to people who
              actually use them.
            </p>
          </MotionMountDiv>

          <MotionMountDiv delay={0.18} distance={16}>
            <div className="mt-8 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
              <Link
                href="/projects"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-[0.85rem] font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
              >
                View my work
              </Link>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-[0.85rem] font-medium text-muted-foreground transition hover:border-primary hover:text-foreground active:scale-[0.98]"
              >
                Get in touch
              </a>
            </div>

            <SocialLinks className="mt-6" />
          </MotionMountDiv>
        </div>

        <MotionMountDiv delay={0.22} distance={20}>
          <IdentityPanel />
        </MotionMountDiv>
      </div>
    </MotionMountSection>
  );
}
