"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { BsTwitterX , BsTwitter } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { useSectionInView } from "@/lib/hooks";


export default function Intro() {

  const ref = useSectionInView("Introduction" , 0.75);

  // const [ref, inView] = useInView({
  //   threshold: 0.75,
  // });
  // const { setActiveSection } = useActiveSectionContext();

  // useEffect(() => {
  //   if (inView) {
  //     setActiveSection("Introduction");
  //   }
  // }, [inView, setActiveSection]);
  
  return (
    <section
      id="introduction"
      ref={ref}
      className="relative isolate flex w-full justify-center overflow-visible scroll-mt-28 lg:justify-start"
    >
      <div className="pointer-events-none absolute inset-x-[-18rem] top-[-8rem] -z-10 hidden h-[34rem] dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_26%,rgba(22,93,145,0.48),transparent_30%),radial-gradient(circle_at_62%_36%,rgba(13,74,122,0.28),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(8,40,67,0.18),transparent_26%)] blur-[24px]" />
      </div>
      
      {/* CENTERED CONTAINER */}
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-10 lg:items-start lg:justify-start lg:gap-10">

        {/* CONTENT */}
        <div className="flex max-w-[34rem] flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            className="mb-6 lg:hidden"
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
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl dark:border-white/20"
            />
          </motion.div>

          {/* NAME */}
          <motion.h1
            className="font-[family:var(--font-heading)] text-3xl font-bold tracking-[-0.04em] dark:text-white sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            Vishesh Tripathi
          </motion.h1>

          {/* ROLE */}
          <motion.p
            className="mt-1.5 text-lg text-neutral-500 dark:text-neutral-400 sm:text-2xl lg:text-[1.7rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            Full-Stack Developer
          </motion.p>

          {/* SOCIALS */}
          <motion.div
            className="mt-4 flex flex-wrap justify-center gap-2.5 lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="https://github.com/VTCodeCraft"
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.9rem] shadow-md transition hover:scale-105 dark:border dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:px-4"
            >
              <FaGithub />
              GitHub
            </Link>

            <Link
              href="https://x.com/VTCodeCraft_"
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.9rem] shadow-md transition hover:scale-105 dark:border dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:px-4"
            >
              <BsTwitter/>
              X
            </Link>

            <Link
              href="https://linkedin.com/in/vishesh-tripathi-6b6a41213"
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.9rem] shadow-md transition hover:scale-105 dark:border dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:px-4"
            >
              <FaLinkedin />
              LinkedIn
            </Link>

            <Link
              href="https://leetcode.com/u/VTCodeCraft/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.9rem] shadow-md transition hover:scale-105 dark:border dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:px-4"
            >
              <SiLeetcode />
              LeetCode
            </Link>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            className="mt-6 max-w-[33rem] text-base leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-lg lg:text-[1.08rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <span className="font-bold">Hello, I&apos;m Vishesh.</span>{" "}
            I&apos;m a <span className="font-bold">full-stack developer</span> focused on{" "}
            building <span className="italic">scalable real-world applications</span>{" "}
            and solving problems using{" "}
            <span className="font-bold">DSA in Java</span>. I specialize in{" "}
            <span className="font-bold">React (Next.js)</span> and{" "}
            <span className="font-bold">backend systems</span>.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="https://x.com/VTCodeCraft_"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-[0.95rem] text-white transition hover:scale-105 dark:border dark:border-cyan-400/20 dark:bg-cyan-400/12 dark:text-white dark:hover:bg-cyan-400/18 sm:px-5"
            >
              <span>Connect on</span>
              <BsTwitterX className="text-lg" />
            </Link>

            <a
              href="https://drive.google.com/file/d/1-xtUGMoIuXq_9fDntOD4Cc0xmlwfKBHs/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[0.95rem] transition hover:scale-105 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:px-5"
            >
              Resume
              <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
