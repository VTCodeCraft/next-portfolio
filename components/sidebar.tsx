"use client";

import { useState } from "react";
import clsx from "clsx";
import { sections } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Sidebar() {
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  name: (typeof sections)[number]["name"],
  hash: string
) => {
  e.preventDefault();

  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // window.history.pushState(null, "", hash);

  setActiveSection(name);
  setIsOpen(false);
};

  return (
    <>
      {/* MOBILE */}
      <div className="fixed left-6 top-6 z-50 lg:hidden">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-full bg-white shadow-md dark:bg-white/10"
        >
          <span className="h-px w-5 bg-gray-900 dark:bg-white" />
          <span className="h-px w-5 bg-gray-900 dark:bg-white" />
          <span className="h-px w-5 bg-gray-900 dark:bg-white" />
        </button>

        {isOpen && (
          <aside className="mt-4 w-60 rounded-3xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <nav className="flex flex-col gap-6 text-gray-500 dark:text-white/70">
              {sections.map((item) => {
                const isActive = activeSection === item.name;

                return (
                  <a
                    key={item.hash}
                    href={item.hash}
                    onClick={(e) =>
                      handleClick(e, item.name, item.hash)
                    }
                    className="flex items-center gap-4 group"
                  >
                    <span
                      className={clsx(
                        "h-px",
                        isActive
                          ? "w-6 bg-black dark:bg-white"
                          : "w-4 bg-gray-300 group-hover:bg-black dark:bg-white/20 dark:group-hover:bg-white"
                      )}
                    />

                    <span
                      className={clsx(
                        isActive
                          ? "font-semibold text-black dark:text-white"
                          : "group-hover:text-black dark:group-hover:text-white"
                      )}
                    >
                      {item.name}
                    </span>
                  </a>
                );
              })}
            </nav>
          </aside>
        )}
      </div>

      {/* DESKTOP */}
      <aside className="hidden text-gray-500 dark:text-white/70 lg:flex lg:flex-col lg:gap-8">
        {sections.map((item) => {
          const isActive = activeSection === item.name;

          return (
            <a
              key={item.hash}
              href={item.hash}
              onClick={(e) =>
                handleClick(e, item.name, item.hash)
              }
              className="flex items-center gap-4 group"
            >
              <span
                className={clsx(
                  "h-px",
                  isActive
                    ? "w-6 bg-black dark:bg-white"
                    : "w-4 bg-gray-300 group-hover:bg-black dark:bg-white/20 dark:group-hover:bg-white"
                )}
              />

              <span
                className={clsx(
                  isActive
                    ? "font-semibold text-black dark:text-white"
                    : "group-hover:text-black dark:group-hover:text-white"
                )}
              >
                {item.name}
              </span>
            </a>
          );
        })}
      </aside>
    </>
  );
}
