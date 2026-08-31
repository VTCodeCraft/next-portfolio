"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  skillsData,
  skillIconsData,
  skillColors,
} from "@/lib/data";
import SectionHeading from "../ui/section-heading";
import { MotionMountSection } from "@/components/ui/reveal";

function createSeededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function shuffleTiles(
  arr: Array<string | null>,
  activeCols: number,
  totalTiles: number,
  random: () => number = Math.random,
) {
  const a = [...arr];
  let empty = a.indexOf(null);

  for (let i = 0; i < 200; i++) {
    const moves = [-activeCols, activeCols, -1, 1];
    const valid = moves
      .map((m) => empty + m)
      .filter((n) => n >= 0 && n < totalTiles);

    const next = valid[Math.floor(random() * valid.length)];
    [a[empty], a[next]] = [a[next], a[empty]];
    empty = next;
  }

  return a;
}

function buildInitialTiles(nextCols: number) {
  const total = nextCols * Math.floor(24 / nextCols);
  const initialTiles = [
    ...skillsData.slice(0, total - 1),
    null,
  ] as Array<string | null>;

  return shuffleTiles(
    initialTiles,
    nextCols,
    total,
    createSeededRandom(42),
  );
}

const SKILL_GROUPS = [
  { label: "Languages", items: "TypeScript · Java · Python · C/C++ · SQL" },
  { label: "Frontend", items: "React · Next.js · Tailwind · R3F · Framer Motion" },
  { label: "Backend", items: "Node · Express · GraphQL · REST · FastAPI" },
  { label: "Database", items: "PostgreSQL · MongoDB · Redis · Supabase" },
  { label: "Infra", items: "AWS · Docker · Vercel · CI/CD · Linux" },
  { label: "Tools", items: "Git · Postman · Figma · Chrome extensions" },
] as const;

export default function Skills() {

  const getColsForViewport = () =>
    typeof window !== "undefined" && window.visualViewport
      ? window.visualViewport.width < 650
        ? 4
        : 6
      : typeof window !== "undefined" && window.innerWidth < 650
        ? 4
        : 6;

  const [cols, setCols] = useState(6);
  const colsRef = useRef(6);
  const rows = Math.floor(24 / cols);
  const TOTAL = cols * rows;

  const [tiles, setTiles] = useState<Array<string | null>>(() =>
    buildInitialTiles(6),
  );

  const dragStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let frame: number | null = null;

    const applyCols = () => {
      frame = null;
      const nextCols = getColsForViewport();

      // Compared against a ref rather than inside a setCols updater: updaters
      // must be pure, and this one rebuilt the whole board as a side effect.
      if (nextCols === colsRef.current) return;

      colsRef.current = nextCols;
      setCols(nextCols);
      setTiles(buildInitialTiles(nextCols));
    };

    // Coalesce the resize burst into one measurement per frame.
    const handleResize = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(applyCols);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.visualViewport?.addEventListener("resize", handleResize);
    applyCols();

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);


  const getRow = (i: number) => Math.floor(i / cols);
  const getCol = (i: number) => i % cols;

  const isAdjacent = (a: number, b: number) => {
    const dr = Math.abs(getRow(a) - getRow(b));
    const dc = Math.abs(getCol(a) - getCol(b));
    return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
  };

  const darkSkillColors: Record<string, string> = {
    "Next.js": "#f8fafc",
    "GitHub": "#f8fafc",
    "Express.js": "#e5e7eb",
    "MySQL": "#93c5fd",
    "Java": "#67e8f9",
  };

  const emptyIndex = tiles.indexOf(null);
  const isMobile = cols === 4;

  //move tile
  const moveTile = (index: number) => {
    if (!isAdjacent(index, emptyIndex)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];
    setTiles(newTiles);
  };

  //drag
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (index: number, e: React.PointerEvent) => {
    if (!dragStart.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX < 5 && absY < 5) {
      moveTile(index);
      dragStart.current = null;
      return;
    }

    if (absX > absY) {
      if (dx > 0 && index === emptyIndex - 1) moveTile(index);
      if (dx < 0 && index === emptyIndex + 1) moveTile(index);
    } else {
      if (dy > 0 && index === emptyIndex - cols) moveTile(index);
      if (dy < 0 && index === emptyIndex + cols) moveTile(index);
    }

    dragStart.current = null;
  };

  /* ------------------ UI ------------------ */
  return (
    <MotionMountSection
      id="skills"
      delay={0.1}
      className="scroll-mt-32"
    >
      <SectionHeading index="03" rule meta="24 tools">
        What I work with
      </SectionHeading>

      <div className="w-full rounded-2xl border border-border bg-[var(--surface-glass)] p-4 shadow-[var(--shadow-card-strong)] backdrop-blur-xl">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {tiles.map((tile, index) => {
            const canMove = tile && isAdjacent(index, emptyIndex);

            if (!tile) {
              return (
                <div
                  key="empty"
                  className="h-16 rounded-lg border border-dashed border-border bg-[var(--surface-muted)] sm:h-20"
                />
              );
            }

            return (
              <div
                key={tile}
                onPointerDown={handlePointerDown}
                onPointerUp={(e) => handlePointerUp(index, e)}
                className={`relative flex ${isMobile ? "h-20" : "h-16"
                  } items-center justify-center rounded-lg border px-2 text-center transition-transform duration-200 ${canMove
                    ? "cursor-grab border-border bg-secondary shadow-lg active:cursor-grabbing hover:scale-[1.03] hover:shadow-xl text-secondary-foreground"
                    : "border-border bg-[var(--surface-muted)] text-muted-foreground"
                  }`}
              >
                {/* GLOW EFFECT */}
                {canMove && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--surface-accent-soft)] to-[var(--surface-accent-strong)] opacity-0 transition hover:opacity-100" />
                )}

                <div className="flex flex-col items-center justify-center gap-1 relative z-10">
                  <span
                    className={`${isMobile ? "text-[1.35rem]" : "text-[1.15rem]"}`}
                    style={{
                      color: darkSkillColors[tile] ?? skillColors[tile],
                      filter: "var(--skill-icon-shadow-dark)",
                    }}
                  >
                    {skillIconsData[tile]}
                  </span>

                  <span
                    className={`${isMobile ? "text-[11px]" : "text-[11px]"
                      } leading-tight font-semibold text-foreground`}
                  >
                    {tile}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BUTTON */}
      {/* Category index around the interaction: names the shape of the stack
          without turning it into a spreadsheet of every tool. */}
      <dl className="mt-6 m-0 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.label}
            className="flex items-baseline gap-3 border-t border-border pt-2.5"
          >
            <dt className="type-eyebrow w-[5.5rem] shrink-0 tracking-[0.14em]">
              {group.label}
            </dt>
            <dd className="m-0 type-meta text-muted-foreground">
              {group.items}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex w-full justify-center">
        <button
          onClick={() => {
            const INITIAL_TILES = [
              ...skillsData.slice(0, TOTAL - 1),
              null,
            ] as Array<string | null>;

            setTiles(shuffleTiles(INITIAL_TILES, cols, TOTAL));
          }}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-[0.78rem] font-medium text-muted-foreground transition hover:border-primary hover:text-foreground active:scale-[0.98]"
        >
          Shuffle
        </button>
      </div>
    </MotionMountSection>
  );
}

