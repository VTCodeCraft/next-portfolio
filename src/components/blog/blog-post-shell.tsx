"use client";

import type { ReactNode } from "react";

import {
  MotionMountArticle,
  MotionMountDiv,
} from "@/components/ui/reveal";

type BlogPostShellProps = {
  header: ReactNode;
  body: ReactNode;
};

export function BlogPostShell({ header, body }: BlogPostShellProps) {
  return (
    <MotionMountArticle className="mx-auto -mt-8 w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <MotionMountDiv delay={0.04}>{header}</MotionMountDiv>
        <MotionMountDiv
          delay={0.1}
          className="mx-auto mt-12 max-w-3xl rounded-[30px] border border-border bg-[var(--surface-glass)] px-5 py-8 shadow-[var(--shadow-card-xl)] sm:px-8 lg:px-10"
        >
          {body}
        </MotionMountDiv>
      </div>
    </MotionMountArticle>
  );
}
