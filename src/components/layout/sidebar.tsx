"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import { sections } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";
import { MotionMountDiv } from "@/components/ui/reveal";

export default function Sidebar() {
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (name: (typeof sections)[number]["name"]) => {
    setActiveSection(name);
    setIsOpen(false);
  };

  return (
    <>
      {/* MOBILE */}
      <MotionMountDiv
        delay={0.08}
        distance={20}
        className="fixed left-6 top-6 z-50 lg:hidden"
      >
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-full border border-border bg-card shadow-md"
        >
          <span className="h-px w-5 bg-foreground" />
          <span className="h-px w-5 bg-foreground" />
          <span className="h-px w-5 bg-foreground" />
        </button>

        {isOpen && (
          <aside className="mt-4 w-60 rounded-3xl border border-border bg-card p-6 shadow-xl">
            <nav className="flex flex-col gap-6 text-muted-foreground">
              {sections.map((item) => {
                const isActive = activeSection === item.name;

                return (
                  <a
                    key={item.hash}
                    href={item.hash}
                    onClick={() => handleClick(item.name)}
                    className="sidebar-link flex items-center gap-4 group"
                  >
                    <motion.span
                      layout
                      className={clsx(
                        "h-px",
                        isActive
                          ? "w-6 bg-foreground"
                          : "w-4 bg-border group-hover:bg-foreground"
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />

                    <motion.span
                      layout
                      className={clsx(
                        isActive
                          ? "font-semibold text-foreground"
                          : "group-hover:text-foreground"
                      )}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {item.name}
                    </motion.span>
                  </a>
                );
              })}
            </nav>
          </aside>
        )}
      </MotionMountDiv>

      {/* DESKTOP */}
      <MotionMountDiv
        delay={0.1}
        distance={24}
        className="hidden text-muted-foreground lg:flex lg:flex-col lg:gap-8"
      >
        {sections.map((item) => {
          const isActive = activeSection === item.name;

          return (
            <a
              key={item.hash}
              href={item.hash}
              onClick={() => handleClick(item.name)}
              className="sidebar-link flex items-center gap-4 group"
            >
              <motion.span
                layout
                className={clsx(
                  "h-px",
                  isActive
                    ? "w-6 bg-foreground"
                    : "w-4 bg-border group-hover:bg-foreground"
                )}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              />

              <motion.span
                layout
                className={clsx(
                  isActive
                    ? "font-semibold text-foreground"
                    : "group-hover:text-foreground"
                )}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {item.name}
              </motion.span>
            </a>
          );
        })}
      </MotionMountDiv>
    </>
  );
}
