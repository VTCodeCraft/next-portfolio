"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { myProjects } from "@/lib/data";
import { FaGithub } from "react-icons/fa";
import { ACESFilmicToneMapping, PCFSoftShadowMap } from "three";
import CanvasLoader from "./canvas-loader";
import { DemoComputer } from "./demo-computer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, amount: 0.25 },
});

function ProjectScene() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.75]}
      performance={{ min: 0.8 }}
      shadows="soft"
      camera={{ position: [0, 0.72, 4.35], fov: 32 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;
      }}
    >
      <ambientLight intensity={0.1} />

      <spotLight
        position={[5.8, 4.6, 2.8]}
        angle={0.3}
        penumbra={0.9}
        intensity={34}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <directionalLight
        position={[-5.5, 3.4, 2.4]}
        intensity={1.35}
        castShadow
        shadow-bias={-0.00012}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight position={[3.2, 1.2, 2.4]} intensity={12} distance={6.5} color="#d7e7ff" />
      <pointLight position={[-3.2, 1.15, 2.2]} intensity={10} distance={6.2} color="#cfdcff" />

      <Environment preset="studio" resolution={256}>
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[5.4, 1.8, 2.1]}
          rotation={[0, -Math.PI / 5, 0]}
          scale={[3.8, 5.5, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.75}
          position={[-5.2, 1.7, 2.2]}
          rotation={[0, Math.PI / 5, 0]}
          scale={[3.6, 5.2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.45}
          position={[0, 5.4, -3.6]}
          rotation={[Math.PI / 2.8, 0, 0]}
          scale={[6, 3, 1]}
        />
      </Environment>

      <Suspense fallback={<CanvasLoader />}>
        <Center>
          <group scale={1.40} position={[0, -1.50, 0]} rotation={[0.01, 0, 0]}>
            <DemoComputer />
          </group>
        </Center>

        <ContactShadows
          position={[0, -1.48, 0]}
          opacity={0.52}
          scale={8}
          blur={2.4}
          far={3.2}
          resolution={512}
          color="#000000"
        />
      </Suspense>

      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom
          intensity={0.42}
          luminanceThreshold={0.82}
          luminanceSmoothing={0.22}
          mipmapBlur
        />
        <BrightnessContrast brightness={0.01} contrast={0.1} />
        <HueSaturation saturation={0.08} />
      </EffectComposer>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.7}
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.9}
        target={[0, -0.05, 0]}
      />
    </Canvas>
  );
}

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
    <motion.section
      id="projects"
      className="mx-auto w-full max-w-6xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div {...fadeUp(0)} className="mb-4 flex flex-col items-start">
          <h1 className="font-[family:var(--font-heading)] text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.85rem]">
            My Projects
          </h1>
          <div className="mt-3 h-1 w-[90px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        </motion.div>

        <div className="mt-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-[460px_minmax(0,1fr)] lg:items-stretch">
          <motion.div
            {...fadeUp(0.08)}
            className="relative flex flex-col gap-3 rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(24,25,28,0.98),rgba(18,19,22,0.99))] px-4 py-4 text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)] lg:h-[420px] lg:w-[460px]"
          >
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
          </motion.div>

          <motion.div
            {...fadeUp(0.16)}
            className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(16,19,26,0.98),rgba(9,11,17,0.98))] shadow-[0_14px_30px_rgba(0,0,0,0.16)] lg:h-[420px]"
          >
            <ProjectScene />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
