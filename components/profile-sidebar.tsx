"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProfileSidebar() {
         return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Image
        src="/profile.jpg"
        alt="Vishesh Tripathi"
        width={120}
        height={120}
        quality={95}
        priority
        className="h-50 w-50 rounded-full object-cover border-4 border-white shadow-xl"
      />
    </motion.div>
  );
}