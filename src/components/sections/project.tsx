"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { m, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { myProjects, skillColors } from "@/lib/data";
import { FaGithub, FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import SectionHeading from "../ui/section-heading";

const AUTO_ADVANCE_MS = 6000;

/*
  three + @react-three + postprocessing is ~1.2 MB of the route's JS. Loading it
  statically meant the whole bundle had to parse before the page could render.
  It now ships as its own chunk, fetched once the canvas card is near the
  viewport.
*/
const ProjectScene = dynamic(() => import("../3d/project-scene"), {
  ssr: false,
  loading: () => null,
});

/* ─── animation helpers ────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  viewport: { once: true, amount: 0.2 },
});

const getTagColor = (tagName: string) => {
  if (skillColors[tagName]) return skillColors[tagName];
  if (tagName.startsWith("React")) return skillColors.React;
  if (tagName.startsWith("Tailwind")) return skillColors["Tailwind CSS"];
  return undefined;
};

/* ─── main component ─────────────────────────────────────────────── */
export default function Project() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const projectCount = myProjects.length;
  const currentProject = myProjects[selectedProjectIndex];

  const handleNavigation = (direction: "previous" | "next") => {
    setSelectedProjectIndex((prev) =>
      direction === "previous"
        ? prev === 0 ? projectCount - 1 : prev - 1
        : prev === projectCount - 1 ? 0 : prev + 1
    );
  };

  // auto-advance; timer resets on any index change, pauses while hovering the info card
  useEffect(() => {
    if (isAutoPaused) return;

    const timer = setInterval(() => {
      setSelectedProjectIndex((prev) => (prev === projectCount - 1 ? 0 : prev + 1));
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [isAutoPaused, selectedProjectIndex, projectCount]);

  useGSAP(() => {
    gsap.fromTo(
      ".animatedText",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out" }
    );
  }, [selectedProjectIndex]);

  return (
    <m.section
      id="projects"
      className="relative mx-auto mb-0 w-full max-w-[1100px] px-2 py-0 sm:px-4 lg:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* ── decorative background glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 -translate-x-1/2 -top-20 h-[420px] w-[420px] rounded-full bg-[var(--project-glow-primary)] blur-[96px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-[var(--project-glow-secondary)] blur-[80px]"
      />

      <div className="relative w-full">

        {/* ── heading ── */}
        <m.div {...fadeUp(0)} className="mb-3 flex flex-col items-start">
          <SectionHeading>My Projects</SectionHeading>
        </m.div>

        {/* ── grid ── */}
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,436px)_1fr] lg:items-stretch">

          {/* ── info card ── */}
          <m.div
            {...fadeUp(0.1)}
            onMouseEnter={() => setIsAutoPaused(true)}
            onMouseLeave={() => setIsAutoPaused(false)}
            className="order-2 group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-[var(--surface-glass-strong)] px-4 py-4 text-card-foreground shadow-[var(--shadow-card)] lg:order-1 lg:h-[386px] lg:w-[436px]"
          >
            {/* corner glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--surface-accent-soft)] blur-2xl transition-all duration-700 group-hover:bg-[var(--surface-accent-strong)]" />

            {/* featured badge */}
            {"featured" in currentProject && currentProject.featured && (
              <m.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-[var(--surface-available-border)] bg-[var(--surface-available-bg)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-primary"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Featured
              </m.div>
            )}

            {/* index indicator */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.6rem] tabular-nums text-[var(--text-subtle)]">
                {String(selectedProjectIndex + 1).padStart(2, "0")} /{" "}
                {String(projectCount).padStart(2, "0")}
              </span>
              <div className="flex gap-1">
                {myProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedProjectIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === selectedProjectIndex
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-muted hover:bg-muted-foreground/50"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* title + bullets */}
            <div className="flex flex-col gap-2.5">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.p
                  key={currentProject.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-[20rem] text-[1.16rem] font-bold leading-tight tracking-[-0.04em]"
                >
                  {currentProject.title}
                </m.p>
              </AnimatePresence>

              <ul className="animatedText space-y-1.5">
                {currentProject.points.map((point) => (
                  <li key={point} className="flex gap-2 text-[0.72rem] leading-relaxed text-muted-foreground">
                    <span className="mt-px shrink-0 text-primary">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* tech tags */}
            <div className="animatedText flex max-w-[22rem] flex-wrap gap-1.5">
              {currentProject.tags.map((tag) => {
                const Icon = tag.icon;
                const iconColor = getTagColor(tag.name);
                return (
                  <div
                    key={tag.id}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2 py-0.5 text-[0.66rem] text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-accent hover:text-foreground"
                  >
                    <Icon style={{ fontSize: "0.68rem", color: iconColor }} />
                    {tag.name}
                  </div>
                );
              })}
            </div>

            {/* actions */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
              <div className="flex items-center gap-3">
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 rounded-lg bg-[var(--surface-available-bg)] px-2.5 py-1.5 text-[0.72rem] font-medium text-primary ring-1 ring-[var(--surface-available-border)] transition hover:bg-[var(--surface-accent-soft)] hover:ring-primary"
                >
                  <FaExternalLinkAlt className="text-[0.65rem] transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  Live Site
                </a>
                <a
                  href={currentProject.repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.72rem] text-muted-foreground transition hover:text-foreground"
                >
                  <FaGithub />
                  Repo
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigation("previous")}
                  className="flex h-7 w-7 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition hover:border-primary hover:bg-accent hover:text-foreground"
                >
                  <FaArrowLeft style={{ fontSize: "0.72rem" }} />
                </button>
                <button
                  onClick={() => handleNavigation("next")}
                  className="flex h-7 w-7 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition hover:border-primary hover:bg-accent hover:text-foreground"
                >
                  <FaArrowRight style={{ fontSize: "0.72rem" }} />
                </button>
              </div>
            </div>
          </m.div>

          {/* ── canvas card ── */}
          <m.div
            {...fadeUp(0.18)}
            className="order-1 relative h-[280px] overflow-hidden rounded-lg border border-border bg-[var(--surface-glass-strong)] shadow-[var(--shadow-card)] sm:h-[340px] sm:rounded-2xl lg:order-2 lg:h-[386px]"
          >
            {/* grid overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--project-grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--project-grid-line) 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* corner accents */}
            <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-[var(--project-frame-border)]" />
            <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-[var(--project-frame-border)]" />
            <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[var(--project-frame-border)]" />
            <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[var(--project-frame-border)]" />

            {/* bottom gradient fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--surface-overlay)] to-transparent" />

            <ProjectScene />

            {/* "drag to rotate" hint */}
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[0.54rem] tracking-widest text-[var(--text-faint)] uppercase">
              Drag to explore
            </p>
          </m.div>
        </div>
      </div>
    </m.section>
  );
}

