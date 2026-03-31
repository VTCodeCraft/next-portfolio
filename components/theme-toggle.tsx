"use client";

import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";

function getInitialTheme() {
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark");
  }

  return false;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !isDark;

    document.documentElement.classList.toggle("dark", nextDarkMode);
    window.localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
    setIsDark(nextDarkMode);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-gray-900 shadow-[0_6px_20px_rgba(15,23,42,0.12)] transition hover:scale-105 dark:border-white dark:bg-zinc-950 dark:text-white sm:h-11 sm:w-11"
    >
      {isDark ? (
        <HiSun className="text-[1.1rem] sm:text-[1.2rem]" />
      ) : (
        <HiMoon className="text-[1.1rem] sm:text-[1.2rem]" />
      )}
    </button>
  );
}
