"use client";

import { m } from "framer-motion";
import clsx from "clsx";
import { sections } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";
import { MotionMountDiv } from "@/components/ui/reveal";

/**
 * Section index for the homepage spine.
 *
 * Desktop only. The header already owns route navigation, so rendering a
 * second navigation system on small screens put two competing menus on the
 * same page; below lg the homepage is a linear scroll and does not need one.
 *
 * Deliberately quiet: monospace, small, muted, sitting against a hairline. It
 * should read as an index of the page, not as a control surface competing with
 * the content.
 */
export default function Sidebar() {
  const { activeSection, setActiveSection } = useActiveSectionContext();

  return (
    <MotionMountDiv
      delay={0.1}
      distance={24}
      className="relative flex flex-col gap-5 border-l border-border pl-5"
    >
      {sections.map((item, itemIndex) => {
        const isActive = activeSection === item.name;

        return (
          <a
            key={item.hash}
            href={item.hash}
            onClick={() => setActiveSection(item.name)}
            aria-current={isActive ? "true" : undefined}
            className="sidebar-link group relative flex items-baseline gap-2.5"
          >
            {/* Active marker sits on the rail itself, replacing the previous
                free-floating dash. */}
            <m.span
              aria-hidden
              className={clsx(
                "absolute -left-5 top-1/2 h-px w-3 origin-left -translate-y-1/2",
                isActive ? "bg-foreground" : "bg-border group-hover:bg-muted-foreground",
              )}
              animate={{ scaleX: isActive ? 1 : 0.45 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            <span
              aria-hidden
              className="font-mono text-[0.62rem] tabular-nums text-[var(--text-faint)]"
            >
              {String(itemIndex + 1).padStart(2, "0")}
            </span>

            <span
              className={clsx(
                "font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-200",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              {item.name}
            </span>
          </a>
        );
      })}
    </MotionMountDiv>
  );
}
