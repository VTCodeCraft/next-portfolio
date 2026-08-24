"use client";

import dynamic from "next/dynamic";

/*
  The 3D chunk (three + @react-three + postprocessing) is ~1.2 MB, so it loads
  as its own chunk after the page is interactive rather than blocking render.
*/
const ProjectScene = dynamic(() => import("../3d/project-scene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Full-bleed band between the hero and the work.
 *
 * Not a card — hairline top and bottom only, so the scene reads as part of the
 * page rather than an embedded widget.
 */
export default function LaptopBand() {
  return (
    <section
      aria-label="Interactive 3D scene"
      className="full-bleed border-y border-border"
      style={{
        background:
          "radial-gradient(ellipse at 50% 22%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 62%)",
      }}
    >
      <div className="h-[240px] sm:h-[300px] lg:h-[340px]">
        <ProjectScene />
      </div>

      <div className="px-5 pb-9 text-center">
        <p className="type-eyebrow tracking-[0.22em]">Drag to explore</p>

        {/*
          Small on purpose. Meant to be found, not announced.
        */}
        <p className="mx-auto mt-4 max-w-[34ch] font-mono text-[0.62rem] leading-[1.9] text-[var(--text-faint)]">
          Thank you, laptop.
          <br />
          For the late nights, broken builds,
          <br />
          and somehow-working fixes.
        </p>
      </div>
    </section>
  );
}
