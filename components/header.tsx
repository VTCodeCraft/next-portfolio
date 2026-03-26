"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
      
      {/* NAV CONTAINER */}
      <div className="relative w-fit">
        
        {/* BACKGROUND */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-md border border-white/30 shadow-sm"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        />

        {/* NAV */}
        <nav className="relative px-4 sm:px-5 py-2">
          <ul className="flex items-center justify-center gap-2 sm:gap-4 text-[12px] sm:text-[13px] font-medium whitespace-nowrap">
            
            {links.map((link) => (
              <motion.li
                key={link.href}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  href={link.href}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition ${
                    pathname === link.href
                      ? "bg-gray-100 text-black shadow-sm"
                      : "text-gray-600 hover:text-black hover:bg-white/70"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}

          </ul>
        </nav>
      </div>
    </header>
  );
}