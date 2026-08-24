"use client";

import type { ReactNode } from "react";
import { MotionMountDiv, MotionMountSection } from "@/components/ui/reveal";

type BlogPageShellProps = {
  intro: ReactNode;
  content: ReactNode;
};

export function BlogPageShell({ intro, content }: BlogPageShellProps) {
  return (
    <section className="page-shell -mt-8 pb-20">
      <MotionMountDiv delay={0.04} className="flex flex-col items-start">
        {intro}
      </MotionMountDiv>

      <MotionMountSection delay={0.1} className="mt-8 space-y-10">
        {content}
      </MotionMountSection>
    </section>
  );
}
