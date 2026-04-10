"use client";

import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-7 flex w-full flex-col items-center lg:items-start">
      <h2 className="font-[family:var(--font-heading)] text-center text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-left">
        {children}
      </h2>

      <div className="mt-3 h-px w-[95px] rounded-full bg-gradient-to-r from-primary via-muted-foreground to-transparent" />
    </div>
  );
}
