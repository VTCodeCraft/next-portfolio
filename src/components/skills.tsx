"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  skillsData,
  skillIconsData,
  skillColors,
} from "@/lib/data";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

function createSeededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

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
  const rows = Math.floor(24 / cols);
  const TOTAL = cols * rows;

  const [tiles, setTiles] = useState<Array<string | null>>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const dragStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setCols(getColsForViewport());
    };

    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      setIsDarkMode(root.classList.contains("dark"));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const getRow = (i: number) => Math.floor(i / cols);
  const getCol = (i: number) => i % cols;

  const isAdjacent = (a: number, b: number) => {
    const dr = Math.abs(getRow(a) - getRow(b));
    const dc = Math.abs(getCol(a) - getCol(b));
    return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
  };

  //shuffle 
  function shuffleTiles(
    arr: Array<string | null>,
    random: () => number = Math.random
  ) {
    const a = [...arr];
    let empty = a.indexOf(null);

    for (let i = 0; i < 200; i++) {
      const moves = [-cols, cols, -1, 1];
      const valid = moves
        .map((m) => empty + m)
        .filter((n) => n >= 0 && n < TOTAL);

      const next = valid[Math.floor(random() * valid.length)];
      [a[empty], a[next]] = [a[next], a[empty]];
      empty = next;
    }

    return a;
  }

  const darkSkillColors: Record<string, string> = {
    "Next.js": "#f8fafc",
    "GitHub": "#f8fafc",
    "Express.js": "#e5e7eb",
    "MySQL": "#93c5fd",
    "Java": "#67e8f9",
  };

  // init
  useEffect(() => {
    const INITIAL_TILES = [
      ...skillsData.slice(0, TOTAL - 1),
      null,
    ] as Array<string | null>;

    const shuffled = shuffleTiles(
      INITIAL_TILES,
      createSeededRandom(42)
    );

    setTiles(shuffled);
  }, [cols]);

  const ref = useSectionInView("Skills", 0.5);
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
    <section
      id="skills"
      ref={ref}
      className="max-w-[60rem] scroll-mt-28 text-center"
    >
      <SectionHeading>Technical Skills</SectionHeading>

      <div className="mx-auto mt-10 w-full max-w-[720px] rounded-2xl border border-border bg-card/80 p-4 shadow-2xl backdrop-blur-xl lg:mx-0">
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
                  className="h-16 rounded-lg border border-dashed border-border bg-background/60 sm:h-20"
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
                    : "border-border bg-background/70 text-muted-foreground"
                  }`}
              >
                {/* GLOW EFFECT */}
                {canMove && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/40 opacity-0 transition hover:opacity-100" />
                )}

                <div className="flex flex-col items-center justify-center gap-1 relative z-10">
                  <span
                    className={`${isMobile ? "text-[1.35rem]" : "text-[1.15rem]"}`}
                    style={{
                      color: isDarkMode
                        ? darkSkillColors[tile] ?? skillColors[tile]
                        : skillColors[tile],
                      filter: isDarkMode
                        ? "drop-shadow(0 0 10px rgba(255,255,255,0.04))"
                        : "drop-shadow(0 0 6px rgba(0,0,0,0.3))",
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
      <div className="mx-auto mt-6 flex w-full max-w-[720px] justify-center lg:mx-0">
        <button
          onClick={() => {
            const INITIAL_TILES = [
              ...skillsData.slice(0, TOTAL - 1),
              null,
            ] as Array<string | null>;

            setTiles(shuffleTiles(INITIAL_TILES));
          }}
          className="rounded-xl bg-primary px-6 py-2 text-sm text-primary-foreground shadow-lg transition hover:scale-110 hover:opacity-90 active:scale-95"
        >
          Shuffle
        </button>
      </div>
    </section>
  );
}
