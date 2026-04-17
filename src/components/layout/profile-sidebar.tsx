"use client";

import Image from "next/image";
import { MotionMountDiv } from "@/components/ui/reveal";

export default function ProfileSidebar() {
  return (
    <MotionMountDiv
      delay={0.14}
      className="flex flex-col items-center gap-4"
    >
      <MotionMountDiv delay={0.18} distance={20}>
        <Image
          src="/images/profile.jpg"
          alt="Vishesh Tripathi"
          width={120}
          height={120}
          quality={95}
          priority
          className="h-32 w-32 rounded-full border-4 border-border bg-card object-cover shadow-xl xl:h-36 xl:w-36"
        />
      </MotionMountDiv>
      <MotionMountDiv delay={0.24} distance={18}>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-available-border)] bg-[var(--surface-available-bg)] px-4 py-2 font-mono text-[0.78rem] text-[var(--surface-available-text)] shadow-[var(--shadow-status)]">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--surface-available-dot)]" />
          Available for work
        </span>
      </MotionMountDiv>
    </MotionMountDiv>
  );
}
