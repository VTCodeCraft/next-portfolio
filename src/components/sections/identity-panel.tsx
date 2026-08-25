"use client";

import dynamic from "next/dynamic";

import { identityMeta } from "@/lib/data";

/*
  The same code-split scene the projects route uses — three + @react-three +
  postprocessing is ~1.2 MB, so it stays out of the initial bundle and loads
  after the page is interactive. Visibility gating, DPR clamping and the
  frameloop suspension all live inside the component and are untouched here.
*/
const ProjectScene = dynamic(() => import("../3d/project-scene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero side panel: the laptop, its note, and a short identity record.
 *
 * Sized as a panel rather than a stage — the scene is an identity anchor here,
 * not the page's centrepiece.
 */
export default function IdentityPanel() {
  return (
    <aside aria-label="At a glance" className="w-full">
      <div className="overflow-hidden rounded-2xl border border-border bg-[var(--surface-glass)] shadow-[var(--shadow-card)]">
        <div className="h-[168px] w-full sm:h-[190px]">
          <ProjectScene />
        </div>

        <p className="type-eyebrow border-t border-border py-2.5 text-center tracking-[0.16em]">
          Drag to rotate
        </p>
      </div>

      {/* Meant to be found, not announced. */}
      <p className="mt-4 text-center font-mono text-[0.6rem] leading-[1.95] text-[var(--text-faint)]">
        Thank you, laptop.
        <br />
        For the late nights, broken builds,
        <br />
        and somehow-working fixes.
      </p>

      <dl className="mt-5 m-0">
        {identityMeta.map((item) => (
          <div key={item.label} className="border-t border-border py-2.5 last:border-b">
            <dt className="type-eyebrow tracking-[0.16em]">{item.label}</dt>
            <dd
              className={`m-0 mt-1 text-[0.78rem] text-muted-foreground ${
                "mono" in item && item.mono ? "font-mono tabular-nums" : ""
              }`}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
