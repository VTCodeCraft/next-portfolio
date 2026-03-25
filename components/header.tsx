"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      
      {/* GLASS BACKGROUND */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-md"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      />

      {/* NAV */}
      <nav className="relative px-8 py-3">
        <ul className="flex items-center justify-center gap-6 text-sm font-medium text-gray-600">
          
          {links.map((link) => (
            <motion.li
              key={link.hash}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                href={link.hash}
                className="px-3 py-1.5 rounded-full transition hover:text-black hover:bg-white/60"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}

        </ul>
      </nav>
    </header>
  );
}