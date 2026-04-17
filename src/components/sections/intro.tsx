"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { BsTwitter, BsTwitterX } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { useSectionInView } from "@/lib/hooks";
import TextType from "@/components/TextType";
import { MotionMountDiv, MotionMountSection } from "@/components/ui/reveal";

export default function Intro() {
  const ref = useSectionInView("Introduction", 0.75);

  return (
    <MotionMountSection
      id="introduction"
      ref={ref}
      delay={0.05}
      className="relative isolate -mx-4 -mt-14 flex w-auto scroll-mt-28 justify-center px-4 pt-14 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-10 lg:items-start lg:justify-start lg:gap-10">
        <div className="flex w-full max-w-[48rem] flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 flex flex-col items-center gap-4 lg:hidden">
            <MotionMountDiv delay={0.08} distance={20}>
              <Image
                src="/images/profile.jpg"
                alt="Vishesh Tripathi"
                width={120}
                height={120}
                quality={95}
                priority
                className="h-32 w-32 rounded-full border-4 border-border bg-card object-cover shadow-xl"
              />
            </MotionMountDiv>
            <MotionMountDiv delay={0.14} distance={18}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-available-border)] bg-[var(--surface-available-bg)] px-4 py-2 font-mono text-[0.78rem] text-[var(--surface-available-text)] shadow-[var(--shadow-status)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--surface-available-dot)]" />
                Available for work
              </span>
            </MotionMountDiv>
          </div>

          <TextType
            as="h1"
            text="Vishesh Tripathi"
            typingSpeed={50}
            pauseDuration={2000}
            showCursor
            cursorCharacter="_"
            deletingSpeed={50}
            loop={true}
            variableSpeed={{ min: 60, max: 120 }}
            cursorBlinkDuration={0.5}
            className="font-[family:var(--font-heading)] text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
          />

          <p className="mt-1.5 text-lg text-muted-foreground sm:text-2xl lg:text-[1.7rem]">
            Full-Stack Developer
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            <Link
              href="https://github.com/VTCodeCraft"
              target="_blank"
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[0.9rem] text-card-foreground shadow-md transition hover:scale-105 hover:bg-accent sm:px-4"
            >
              <FaGithub />
              GitHub
            </Link>

            <Link
              href="https://x.com/VTCodeCraft_"
              target="_blank"
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[0.9rem] text-card-foreground shadow-md transition hover:scale-105 hover:bg-accent sm:px-4"
            >
              <BsTwitter />
              X
            </Link>

            <Link
              href="https://linkedin.com/in/vishesh-tripathi-6b6a41213"
              target="_blank"
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[0.9rem] text-card-foreground shadow-md transition hover:scale-105 hover:bg-accent sm:px-4"
            >
              <FaLinkedin />
              LinkedIn
            </Link>

            <Link
              href="https://leetcode.com/u/VTCodeCraft/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[0.9rem] text-card-foreground shadow-md transition hover:scale-105 hover:bg-accent sm:px-4"
            >
              <SiLeetcode />
              LeetCode
            </Link>
          </div>

          <p className="mt-6 w-full max-w-none text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-[1.08rem]">
            <span className="font-semibold text-foreground">Hey, I&apos;m a Full-Stack Developer</span> with experience building{" "}
            <span className="font-semibold text-foreground">web applications, API-driven systems, Chrome extensions, and scalable backend features</span>.
            <br />
            <span className="block h-2" aria-hidden />
            I work primarily with <span className="font-semibold text-foreground">Next.js, React, TypeScript, and modern backend technologies</span>, with a strong focus on{" "}
            <span className="font-semibold text-foreground">performance, clean architecture, and user-friendly products</span>.
            <br />
            <span className="block h-2" aria-hidden />
            I also strengthen my problem-solving foundation through{" "}
            <span className="font-semibold text-foreground">Data Structures and Algorithms in Java</span>.
            <br />
            <span className="block h-2" aria-hidden />
            <span className="font-semibold text-foreground">Open to work:</span>{" "}
            <span>Internships, full-time roles, freelance work, and collaborations.</span>{" "}
            <a
              href="mailto:work.vishesh12.05@gmail.com"
              className="font-semibold text-foreground underline decoration-primary/60 underline-offset-4 transition hover:text-primary hover:decoration-primary"
            >
              Let&apos;s talk
            </a>
            .
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href="https://x.com/VTCodeCraft_"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[0.95rem] text-primary-foreground transition hover:scale-105 hover:opacity-90 sm:px-5"
            >
              <span>Connect on</span>
              <BsTwitterX className="text-lg text-primary-foreground" />
            </Link>

            <a
              href="https://drive.google.com/file/d/1-xtUGMoIuXq_9fDntOD4Cc0xmlwfKBHs/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[0.95rem] text-card-foreground transition hover:scale-105 hover:bg-accent sm:px-5"
            >
              Resume
              <HiDownload className="opacity-60 transition group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </MotionMountSection>
  );
}
