import React from "react";
import clsx from "clsx";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  /** Every route needs exactly one h1; sections below it stay h2. */
  as?: "h1" | "h2";
};

export default function SectionHeading({
  children,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mx-auto mb-7 flex w-full flex-col items-center lg:items-start",
        className,
      )}
    >
      <Heading className="font-[family:var(--font-heading)] text-center text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-left">
        {children}
      </Heading>

      <div className="mt-3 h-px w-[95px] rounded-full bg-gradient-to-r from-primary via-muted-foreground to-transparent" />
    </div>
  );
}
