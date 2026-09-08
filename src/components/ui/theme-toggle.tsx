"use client";

import { useRef } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import { useTheme } from "@/components/providers/theme-provider";

/**
 * Theme control for the header.
 *
 * The sweep is centred on this button, so the click hands its own position
 * to the provider rather than the provider guessing at one. Keyboard
 * activation has no pointer coordinates, so the button's own centre is used
 * and the animation still originates from the control.
 */
export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => {
        const rect = buttonRef.current?.getBoundingClientRect();

        toggleTheme(
          rect
            ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
            : undefined,
        );
      }}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
    >
      {/*
        Both glyphs are always mounted and crossfaded, rather than swapped on
        `theme`. Swapping would make the icon pop at the instant the class
        flips, which is the middle of the sweep — the change would read as a
        glitch inside the animation rather than as part of it.
      */}
      <span aria-hidden className="relative block h-[1.05rem] w-[1.05rem]">
        <HiOutlineSun
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 motion-reduce:transition-none ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        />
        <HiOutlineMoon
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 motion-reduce:transition-none ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        />
      </span>
    </button>
  );
}
