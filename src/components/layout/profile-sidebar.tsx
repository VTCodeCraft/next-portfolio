"use client";

import Image from "next/image";

export default function ProfileSidebar() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src="/images/profile.jpg"
        alt="Vishesh Tripathi"
        width={120}
        height={120}
        quality={95}
        priority
        className="h-32 w-32 rounded-full border-4 border-border bg-card object-cover shadow-xl xl:h-36 xl:w-36"
      />
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-2 font-mono text-[0.78rem] text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.12)]">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        Available for work
      </span>
    </div>
  );
}
