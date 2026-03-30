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
        className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl xl:h-36 xl:w-36"
      />
    </motion.div>
  );
}
