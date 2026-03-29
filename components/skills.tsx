"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/lib/data";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

/* ------------------ SEEDED RANDOM ------------------ */
function createSeededRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

/* ------------------ COMPONENT ------------------ */
export default function Skills() {
  const [cols, setCols] = useState(6); // default desktop
  const rows = Math.floor(24 / cols);
  const TOTAL = cols * rows;

  const [tiles, setTiles] = useState<Array<string | null>>([]);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  /* ------------------ RESPONSIVE ------------------ */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCols(4); // mobile
      } else {
        setCols(6); // desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ------------------ GRID HELPERS ------------------ */
  function getRow(i: number) {
    return Math.floor(i / cols);
  }

  function getCol(i: number) {
    return i % cols;
  }

  function isAdjacent(a: number, b: number) {
    const dr = Math.abs(getRow(a) - getRow(b));
    const dc = Math.abs(getCol(a) - getCol(b));
    return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
  }

  /* ------------------ SHUFFLE ------------------ */
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

  /* ------------------ INITIALIZE ------------------ */
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
  }, [cols]); // re-init when layout changes

  /* ------------------ ACTIVE SECTION ------------------ */
  const ref = useSectionInView("Skills", 0.5);

  const emptyIndex = tiles.indexOf(null);

  /* ------------------ MOVE TILE ------------------ */
  const moveTile = (index: number) => {
    if (!isAdjacent(index, emptyIndex)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];
    setTiles(newTiles);
  };

  /* ------------------ DRAG ------------------ */
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (index: number, e: React.PointerEvent) => {
    if (!dragStart.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // tap
    if (absX < 5 && absY < 5) {
      moveTile(index);
      dragStart.current = null;
      return;
    }

    // swipe
    if (absX > absY) {
      if (dx > 0 && index === emptyIndex - 1) moveTile(index);
      if (dx < 0 && index === emptyIndex + 1) moveTile(index);
    } else {
      if (dy > 0 && index === emptyIndex - cols) moveTile(index);
      if (dy < 0 && index === emptyIndex + cols) moveTile(index);
    }

    dragStart.current = null;
  };

  const isMobile = cols === 4;

  /* ------------------ UI ------------------ */
  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[60rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>Technical Skills</SectionHeading>

      <div className="mx-auto mt-10 w-full max-w-[720px] rounded-2xl border border-black/10 bg-white/70 p-4 shadow-lg backdrop-blur-md">
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
                  className="h-16 rounded-lg border border-dashed border-black/10"
                />
              );
            }

            return (
              <motion.div
                key={tile}
                layout
                onPointerDown={handlePointerDown}
                onPointerUp={(e) => handlePointerUp(index, e)}
                whileHover={canMove ? { scale: 1.05 } : {}}
                whileTap={canMove ? { scale: 0.95 } : {}}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 600,
                    damping: 35,
                  },
                }}
                className={`flex ${
                  isMobile ? "h-20" : "h-16"
                } items-center justify-center rounded-lg px-2 text-center text-xs font-medium transition ${
                  canMove
                    ? "cursor-grab bg-white shadow-md active:cursor-grabbing"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {tile}
              </motion.div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => {
          const INITIAL_TILES = [
            ...skillsData.slice(0, TOTAL - 1),
            null,
          ] as Array<string | null>;

          setTiles(shuffleTiles(INITIAL_TILES));
        }}
        className="mt-6 rounded-xl bg-gray-900 px-5 py-2 text-sm text-white transition hover:scale-105"
      >
        Shuffle
      </button>
    </section>
  );
}