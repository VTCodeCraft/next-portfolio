"use client";

import Image from "next/image";

export default function ProfileSidebar() {
         return (
    <div>
      <Image
        src="/assets/profile.jpg"
        alt="Vishesh Tripathi"
        width={120}
        height={120}
        quality={95}
        priority
        className="h-32 w-32 rounded-full border-4 border-border bg-card object-cover shadow-xl xl:h-36 xl:w-36"
      />
    </div>
  );
}
