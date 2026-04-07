"use client";

import Image from "next/image";
import Link from "next/link";
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
      className="relative isolate -mx-4 -mt-14 flex w-auto justify-center px-4 pt-14 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      {/* CENTERED CONTAINER */}
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-10 lg:items-start lg:justify-start lg:gap-10">

        {/* CONTENT */}
        <div className="flex max-w-[34rem] flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 lg:hidden">
            <Image
              src="/profile.jpg"
              alt="Vishesh Tripathi"
              width={120}
              height={120}
              quality={95}
              priority
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl dark:border-white/20"
            />
          </div>

          {/* NAME */}
          <h1 className="font-[family:var(--font-heading)] text-3xl font-bold tracking-[-0.04em] dark:text-white sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]">
            Vishesh Tripathi
          </h1>

          {/* ROLE */}
          <p className="mt-1.5 text-lg text-neutral-500 dark:text-neutral-400 sm:text-2xl lg:text-[1.7rem]">
            Full-Stack Developer
          </p>

          {/* SOCIALS */}
          <div className="mt-4 flex flex-wrap justify-center gap-2.5 lg:justify-start">
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
          </div>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-[33rem] text-base leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-lg lg:text-[1.08rem]">
            <span className="font-bold">Hello, I&apos;m Vishesh.</span>{" "}
            I&apos;m a <span className="font-bold">full-stack developer</span> focused on{" "}
            building <span className="italic">scalable real-world applications</span>{" "}
            and solving problems using{" "}
            <span className="font-bold">DSA in Java</span>. I specialize in{" "}
            <span className="font-bold">React (Next.js)</span> and{" "}
            <span className="font-bold">backend systems</span>.
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href="https://x.com/VTCodeCraft_"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[0.95rem] text-white transition hover:scale-105 dark:border dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-black/90 sm:px-5"
            >
              <span>Connect on</span>
              <BsTwitterX className="text-lg text-white" />
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
          </div>

        </div>
      </div>
    </section>
  );
}
