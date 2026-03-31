"use client";

import { HiMoon, HiSun } from "react-icons/hi2";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDarkMode = !root.classList.contains("dark");

    root.classList.toggle("dark", nextDarkMode);
    window.localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-gray-900 shadow-[0_6px_20px_rgba(15,23,42,0.12)] transition hover:scale-105 dark:border-white dark:bg-zinc-950 dark:text-white sm:h-11 sm:w-11"
    >
      <HiMoon className="text-[1.1rem] sm:text-[1.2rem] dark:hidden" />
      <HiSun className="hidden text-[1.1rem] dark:block sm:text-[1.2rem]" />
    </button>
  );
}
