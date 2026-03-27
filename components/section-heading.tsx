"use client";

import React from "react";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center mb-12">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-semibold text-center tracking-tight"
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