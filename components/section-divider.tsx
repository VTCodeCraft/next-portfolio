"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SectionDivider() {
         return (
                  <div className="w-full flex justify-center my-24">

                           <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="relative w-full max-w-3xl h-px bg-linear-to-r from-transparent via-neutral-300 to-transparent"
                           />

                  </div>
         );
}