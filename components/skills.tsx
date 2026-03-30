"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  skillsData,
  skillIconsData,
  skillColors,
} from "@/lib/data";
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

export default function Skills() {
  const [cols, setCols] = useState(6);
  const rows = Math.floor(24 / cols);
  const TOTAL = cols * rows;

  const [tiles, setTiles] = useState<Array<string | null>>([]);

  const dragStart = useRef<{ x: number; y: number } | null>(null);

  /* ------------------ RESPONSIVE ------------------ */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCols(4);
      else setCols(6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ------------------ HELPERS ------------------ */
  const getRow = (i: number) => Math.floor(i / cols);
  const getCol = (i: number) => i % cols;

  const isAdjacent = (a: number, b: number) => {
    const dr = Math.abs(getRow(a) - getRow(b));
    const dc = Math.abs(getCol(a) - getCol(b));
    return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
  };

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

  /* ------------------ INIT ------------------ */
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

      <motion.div className="mx-auto mt-10 w-full max-w-[720px] rounded-2xl border border-white/20 bg-gradient-to-br from-white/60 to-white/30 p-4 shadow-2xl backdrop-blur-xl lg:mx-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
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
                  className="h-16 sm:h-20 rounded-lg border border-dashed border-white/30"
                />
              );
            }

            return (
              <motion.div
                key={tile}
                layout
                onPointerDown={handlePointerDown}
                onPointerUp={(e) => handlePointerUp(index, e)}
                whileHover={
                  canMove
                    ? {
                      scale: 1.1,
                      rotate: 1,
                    }
                    : {}
                }
                whileTap={canMove ? { scale: 0.92 } : {}}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                }}
                className={`relative flex ${isMobile ? "h-20" : "h-16"
                  } items-center justify-center rounded-lg px-2 text-center transition ${canMove
                    ? "cursor-grab bg-white/80 shadow-lg active:cursor-grabbing hover:shadow-2xl"
                    : "bg-gray-100/40 text-gray-400 opacity-60"
                  }`}
              >
                {/* GLOW EFFECT */}
                {canMove && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-md opacity-0 hover:opacity-100 transition" />
                )}

                <div className="flex flex-col items-center justify-center gap-1 relative z-10">
                  <span
                    className={`${isMobile ? "text-xl" : "text-lg"}`}
                    style={{
                      color: skillColors[tile],
                      filter: "drop-shadow(0 0 6px rgba(0,0,0,0.3))",
                    }}
                  >
                    {skillIconsData[tile]}
                  </span>

                  <span
                    className={`${isMobile ? "text-[11px]" : "text-[10px]"
                      } leading-tight font-medium`}
                  >
                    {tile}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* BUTTON */}
      <motion.div className="mx-auto mt-6 flex w-full max-w-[720px] justify-center lg:mx-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => {
            const INITIAL_TILES = [
              ...skillsData.slice(0, TOTAL - 1),
              null,
            ] as Array<string | null>;

            setTiles(shuffleTiles(INITIAL_TILES));
          }}
          className="rounded-xl bg-gradient-to-r from-gray-900 to-black px-6 py-2 text-sm text-white shadow-lg transition hover:scale-110 active:scale-95"
        >
          Shuffle
        </button>
      </motion.div>
    </section>
  );
}
