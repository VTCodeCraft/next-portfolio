"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { BsTwitter } from "react-icons/bs";
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
    <section id="introduction" ref={ref} className="flex w-full justify-center lg:justify-start scroll-mt-28"
    >
      
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
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-xl"
            />
          </motion.div>

          {/* NAME */}
          <motion.h1
            className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            Vishesh Tripathi
          </motion.h1>

          {/* ROLE */}
          <motion.p
            className="mt-1.5 text-lg text-neutral-500 sm:text-2xl lg:text-[1.7rem]"
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
              className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.9rem] shadow-md transition hover:scale-105 sm:px-4"
            >
              <FaGithub />
              GitHub
            </Link>

            <Link
              href="https://x.com/VTCodeCraft_"
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.9rem] shadow-md transition hover:scale-105 sm:px-4"
            >
              <BsTwitter />
              X
            </Link>

            <Link
              href="https://linkedin.com/in/vishesh-tripathi-6b6a41213"
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.9rem] shadow-md transition hover:scale-105 sm:px-4"
            >
              <FaLinkedin />
              LinkedIn
            </Link>

            <Link
              href="https://leetcode.com/u/VTCodeCraft/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.9rem] shadow-md transition hover:scale-105 sm:px-4"
            >
              <SiLeetcode />
              LeetCode
            </Link>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            className="mt-6 max-w-[33rem] text-base leading-relaxed text-neutral-700 sm:text-lg lg:text-[1.08rem]"
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
              className="group flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-[0.95rem] text-white transition hover:scale-105 sm:px-5"
            >
              <span>Connect on</span>
              <BsTwitter className="text-lg" />
            </Link>

            <a
              href="/Vishesh_Tripathi_Resume.pdf"
              download="Vishesh-Tripathi-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[0.95rem] transition hover:scale-105 sm:px-5"
            >
              Download CV
              <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
