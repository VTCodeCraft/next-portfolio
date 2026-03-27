"use client";

import React, { useEffect, useState, useRef } from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/active-section-context";
import { motion } from "framer-motion";

const COLS = 6;
const ROWS = 4;
const TOTAL = COLS * ROWS;

function getRow(i: number) {
  return Math.floor(i / COLS);
}
function getCol(i: number) {
  return i % COLS;
}

function isAdjacent(a: number, b: number) {
  const dr = Math.abs(getRow(a) - getRow(b));
  const dc = Math.abs(getCol(a) - getCol(b));
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

// ✅ solvable shuffle (important)
function shuffleTiles(arr: (string | null)[]) {
  const a = [...arr];
  let empty = a.indexOf(null);

  for (let i = 0; i < 200; i++) {
    const moves = [-COLS, COLS, -1, 1];
    const valid = moves
      .map((m) => empty + m)
      .filter((n) => n >= 0 && n < TOTAL);

    const next = valid[Math.floor(Math.random() * valid.length)];
    [a[empty], a[next]] = [a[next], a[empty]];
    empty = next;
  }

  return a;
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const { setActiveSection } = useActiveSectionContext();

  useEffect(() => {
    if (inView) setActiveSection("Skills");
  }, [inView, setActiveSection]);

  // 🎮 state
  const initialTiles = [...skillsData.slice(0, TOTAL - 1), null];
  const [tiles, setTiles] = useState<(string | null)[]>(() =>
    shuffleTiles(initialTiles)
  );

  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const emptyIndex = tiles.indexOf(null);

  const moveTile = (index: number) => {
    if (!isAdjacent(index, emptyIndex)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];
    setTiles(newTiles);
  };

  // 🖱️ drag start
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  // 🖱️ drag end → detect direction
  const handlePointerUp = (index: number, e: React.PointerEvent) => {
    if (!dragStart.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // small movement → treat as click
    if (absX < 5 && absY < 5) {
      moveTile(index);
      return;
    }

    const empty = emptyIndex;

    // horizontal swipe
    if (absX > absY) {
      if (dx > 0 && index === empty - 1) moveTile(index); // right
      if (dx < 0 && index === empty + 1) moveTile(index); // left
    } else {
      // vertical swipe
      if (dy > 0 && index === empty - COLS) moveTile(index); // down
      if (dy < 0 && index === empty + COLS) moveTile(index); // up
    }

    dragStart.current = null;
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[60rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>Technical Skills</SectionHeading>

      {/* 🎮 BOARD */}
      <div className="mx-auto mt-10 w-[720px] rounded-2xl bg-white/70 backdrop-blur-md border border-black/10 p-4 shadow-lg">

        <div className="grid grid-cols-6 gap-3">
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

                className={`h-16 flex items-center justify-center rounded-lg text-xs font-medium px-2 text-center transition
                  ${
                    canMove
                      ? "bg-white shadow-md cursor-grab active:cursor-grabbing"
                      : "bg-gray-100 text-gray-400"
                  }`}
              >
                {tile}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 🔄 SHUFFLE */}
      <button
        onClick={() => setTiles(shuffleTiles(initialTiles))}
        className="mt-6 px-5 py-2 rounded-xl bg-gray-900 text-white text-sm hover:scale-105 transition"
      >
        Shuffle
      </button>
    </section>
  );
}