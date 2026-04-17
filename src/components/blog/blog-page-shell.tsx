"use client";

import type { ReactNode } from "react";
import { MotionMountDiv, MotionMountSection } from "@/components/ui/reveal";

type BlogPageShellProps = {
  intro: ReactNode;
  content: ReactNode;
};

export function BlogPageShell({ intro, content }: BlogPageShellProps) {
  return (
    <section className="mx-auto -mt-8 w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
      <MotionMountDiv
        delay={0.04}
        className="mx-auto flex max-w-5xl flex-col items-start"
      >
        {intro}
      </MotionMountDiv>

      <MotionMountSection
        delay={0.1}
        className="mx-auto mt-8 max-w-5xl space-y-10"
      >
        {content}
      </MotionMountSection>
    </section>
  );
}
