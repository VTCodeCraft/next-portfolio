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
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto w-full max-w-[940px] px-4 sm:px-6">
        <div className="flex justify-center">
          <motion.div
            className="relative w-fit max-w-full"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div
              className="absolute inset-0 rounded-full border border-border/70 bg-background/75 shadow-sm backdrop-blur-md"
            />

            <nav className="relative flex items-center gap-2 px-1.5 py-1.5 sm:gap-4 sm:px-3.5 sm:py-2.5">
              <ul className="flex items-center justify-center gap-0.5 whitespace-nowrap text-[10px] font-medium sm:gap-3 sm:text-[12px]">
                {links.map((link) => (
                  <motion.li
                    key={link.href}
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <Link
                      href={link.href}
                      className={`block rounded-full px-2 py-1.5 leading-none transition sm:px-3 ${
                        pathname === link.href
                          ? "bg-accent text-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
        </div>
      </div>
    </header>
  );
}
