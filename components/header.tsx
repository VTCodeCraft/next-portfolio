"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import ThemeToggle from "./theme-toggle";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">

      {/* NAV CONTAINER */}
      <motion.div
        className="relative w-fit max-w-[calc(100vw-7rem)]"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 rounded-full border border-white/30 bg-white/60 shadow-sm backdrop-blur-md dark:border-white/12 dark:bg-black/65 dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
        />

        {/* NAV */}
        <nav className="relative flex items-center gap-3 px-2 py-1.5 sm:gap-4 sm:px-3.5">
          <ul className="flex items-center justify-center gap-1 whitespace-nowrap text-[10px] font-medium sm:gap-3 sm:text-[12px]">

            {links.map((link) => (
              <motion.li
                key={link.href}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  href={link.href}
                  className={`rounded-full px-2.5 py-1.5 transition sm:px-3 ${
                    pathname === link.href
                      ? "bg-gray-100 text-black shadow-sm dark:bg-white/12 dark:text-white"
                      : "text-gray-600 hover:bg-white/70 hover:text-black dark:text-white/80 dark:hover:bg-white/8 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}

          </ul>
          {/* Re-enable these when you want light mode back */}
          {/* <span className="h-7 w-px bg-black/10 dark:bg-white/10" />
          <ThemeToggle /> */}
        </nav>
      </motion.div>
    </header>
  );
}
