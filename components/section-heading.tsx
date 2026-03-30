"use client";

import React from "react";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 flex w-full flex-col items-center lg:items-start">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-[family:var(--font-heading)] text-center text-3xl font-semibold tracking-[-0.04em] dark:text-white sm:text-4xl lg:text-left"
      >
        {children}
      </motion.h2>

      {/* Gradient underline */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "95px" }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="h-1 mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      />

    </div>
  );
}
