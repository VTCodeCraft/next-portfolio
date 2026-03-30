"use client";

import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";
import { motion } from "framer-motion";

function getPreferredTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const darkMode = getPreferredTheme();
    document.documentElement.classList.toggle("dark", darkMode);
    setIsDark(darkMode);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !isDark;

    document.documentElement.classList.toggle("dark", nextDarkMode);
    window.localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
    setIsDark(nextDarkMode);
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={{ scale: 0.94 }}
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-gray-900 shadow-[0_6px_20px_rgba(15,23,42,0.12)] transition hover:scale-105 dark:border-white dark:bg-zinc-950 dark:text-white sm:h-11 sm:w-11"
    >
      {mounted && isDark ? (
        <HiSun className="text-[1.1rem] sm:text-[1.2rem]" />
      ) : (
        <HiMoon className="text-[1.1rem] sm:text-[1.2rem]" />
      )}
    </motion.button>
  );
}
