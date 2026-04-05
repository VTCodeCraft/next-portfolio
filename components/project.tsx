"use client";

import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { myProjects } from "@/lib/data";
import { FaGithub } from "react-icons/fa";

export default function Project() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const projectCount = myProjects.length;
  const currentProject = myProjects[selectedProjectIndex];

  const handleNavigation = (direction: "previous" | "next") => {
    setSelectedProjectIndex((prev) => {
      if (direction === "previous") {
        return prev === 0 ? projectCount - 1 : prev - 1;
      }

      return prev === projectCount - 1 ? 0 : prev + 1;
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      ".animatedText",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
  }, [selectedProjectIndex]);

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="mx-auto w-full max-w-[1080px]">
        <div className="mb-4 flex flex-col items-start">
          <h1 className="font-[family:var(--font-heading)] text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.85rem]">
            My Projects
          </h1>
          <div className="mt-3 h-1 w-[90px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        </div>

        <div className="mt-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-[460px_minmax(0,1fr)] lg:items-stretch">
          <div className="relative flex flex-col gap-3 rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(24,25,28,0.98),rgba(18,19,22,0.99))] px-4 py-4 text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)] lg:h-[420px] lg:w-[460px]">
            {"featured" in currentProject && currentProject.featured && (
              <div className="absolute right-3 top-3 rounded-full border border-cyan-300/18 bg-cyan-400/10 px-2.5 py-1 text-[10px] text-cyan-100">
                Featured
              </div>
            )}

            <div className="mt-3 flex flex-col gap-2.5">
              <p className="animatedText max-w-[19rem] text-[1.28rem] font-semibold leading-tight tracking-[-0.04em] sm:text-[1.42rem]">
                {currentProject.title}
              </p>

              <ul className="animatedText max-w-[22rem] space-y-2 text-[0.78rem] leading-5 text-neutral-300">
                {currentProject.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-[0.2rem] text-cyan-300">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex max-w-[24rem] flex-wrap gap-1.5">
              {currentProject.tags.map((tag) => {
                const Icon = tag.icon;

                return (
                  <div
                    key={tag.id}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[0.72rem] text-white/90 transition hover:scale-105"
                  >
                    <Icon className="text-[0.78rem]" />
                    {tag.name}
                  </div>
                );
              })}
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.8rem] text-cyan-300 transition hover:text-cyan-200 hover:underline"
                >
                  Check Live Site ↗
                </a>
                <a
                  href={currentProject.repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.8rem] text-white/75 transition hover:text-white"
                >
                  <FaGithub className="text-[0.85rem]" />
                  Repo
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigation("previous")}
                  className="rounded-2xl border border-white/10 bg-white/8 px-3 py-1.5 text-[0.76rem] text-white transition hover:bg-white/14"
                >
                  ← Prev
                </button>

                <button
                  onClick={() => handleNavigation("next")}
                  className="rounded-2xl border border-white/10 bg-white/8 px-3 py-1.5 text-[0.76rem] text-white transition hover:bg-white/14"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div className="flex min-h-[12.25rem] items-center justify-center rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(16,19,26,0.98),rgba(9,11,17,0.98))] p-4 text-center text-neutral-500 shadow-[0_14px_30px_rgba(0,0,0,0.16)] lg:h-[420px]">
            <p className="text-[0.8rem] sm:text-[0.86rem]">
              Project Preview / 3D / Image here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
