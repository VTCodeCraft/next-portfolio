"use client";

import { Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  Float,
} from "@react-three/drei";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { myProjects } from "@/lib/data";
import { FaGithub, FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { ACESFilmicToneMapping, PCFSoftShadowMap, Vector2 } from "three";
import CanvasLoader from "./canvas-loader";
import { DemoComputer } from "./demo-computer";
import SectionHeading from "./section-heading";

/* ─── animation helpers ────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  viewport: { once: true, amount: 0.2 },
});

/* ─── ambient particle ring (decorative mesh) ────────────────────── */
function LaptopRig() {
  const { size } = useThree();
  const isSmallScreen = size.width < 650;

  return (
    <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.18}>
      <Center>
        <group
          scale={isSmallScreen ? 1.05 : 1.42}
          position={[0, isSmallScreen ? -1.34 : -1.52, 0]}
          rotation={[0.01, 0, 0]}
        >
          <DemoComputer />
        </group>
      </Center>
    </Float>
  );
}

/* ─── 3-D scene ────────────────────────────────────────────────────── */
function ProjectScene() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      performance={{ min: 0.75 }}
      shadows="soft"
      camera={{ position: [0, 0.65, 4.2], fov: 30 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.06} />

      <spotLight
        position={[6, 5, 3]}
        angle={0.28}
        penumbra={0.95}
        intensity={48}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]}
      />

      <directionalLight
        position={[-5, 3.5, 2.5]}
        intensity={1.6}
        castShadow
        shadow-bias={-0.00012}
        shadow-mapSize={[1024, 1024]}
      />

      {/* Cool blue rim lights */}
      <pointLight position={[3.5, 1.5, 2.5]} intensity={6} distance={7} color="#a5b4fc" />
      <pointLight position={[-3.5, 1.2, 2.2]} intensity={5} distance={6.5} color="#818cf8" />
      {/* Subtle warm backlight */}
      <pointLight position={[0, 3, -3]} intensity={3} distance={8} color="#f0abfc" />

      <Environment preset="city" resolution={512}>
        <Lightformer form="rect" intensity={1.4} position={[6, 2, 2]} rotation={[0, -Math.PI / 4.5, 0]} scale={[4, 6, 1]} />
        <Lightformer form="rect" intensity={1.1} position={[-6, 1.8, 2]} rotation={[0, Math.PI / 4.5, 0]} scale={[3.8, 5.5, 1]} />
        <Lightformer form="ring" intensity={0.6} position={[0, 6, -4]} rotation={[Math.PI / 2.4, 0, 0]} scale={[8, 8, 1]} color="#c7d2fe" />
      </Environment>

      <Suspense fallback={<CanvasLoader />}>
        <LaptopRig />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.65}
          scale={10}
          blur={3}
          far={3.5}
          resolution={512}
          color="#0f0f1a"
        />
      </Suspense>

      {/* Post-processing */}
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom intensity={0.45} luminanceThreshold={0.78} luminanceSmoothing={0.1} mipmapBlur />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0008, 0.0008)}
        />
        <BrightnessContrast brightness={0.02} contrast={0.12} />
        <HueSaturation saturation={0.18} />
        <Vignette eskil={false} offset={0.28} darkness={0.65} />
      </EffectComposer>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.55}
        enableDamping
        dampingFactor={0.06}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.95}
        target={[0, -0.1, 0]}
      />
    </Canvas>
  );
}

/* ─── main component ─────────────────────────────────────────────── */
export default function Project() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const projectCount = myProjects.length;
  const currentProject = myProjects[selectedProjectIndex];

  const handleNavigation = (direction: "previous" | "next") => {
    setSelectedProjectIndex((prev) =>
      direction === "previous"
        ? prev === 0 ? projectCount - 1 : prev - 1
        : prev === projectCount - 1 ? 0 : prev + 1
    );
  };

  useGSAP(() => {
    gsap.fromTo(
      ".animatedText",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out" }
    );
  }, [selectedProjectIndex]);

  return (
    <motion.section
      id="projects"
      className="relative mx-auto w-full max-w-[1100px] px-2 py-1 sm:px-4 lg:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* ── decorative background glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 -translate-x-1/2 -top-20 h-[420px] w-[420px] rounded-full bg-primary/8 blur-[96px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-accent/10 blur-[80px]"
      />

      <div className="relative w-full">

        {/* ── heading ── */}
        <motion.div {...fadeUp(0)} className="mb-4 flex flex-col items-start">
          <SectionHeading>My Projects</SectionHeading>
        </motion.div>

        {/* ── grid ── */}
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,436px)_1fr] lg:items-stretch">

          {/* ── info card ── */}
          <motion.div
            {...fadeUp(0.1)}
            className="order-2 group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border/70 bg-card/95 px-4 py-4 text-card-foreground shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] lg:order-1 lg:h-[386px] lg:w-[436px]"
          >
            {/* corner glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl transition-all duration-700 group-hover:bg-primary/16" />

            {/* featured badge */}
            {"featured" in currentProject && currentProject.featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-primary"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Featured
              </motion.div>
            )}

            {/* index indicator */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.6rem] tabular-nums text-muted-foreground/70">
                {String(selectedProjectIndex + 1).padStart(2, "0")} /{" "}
                {String(projectCount).padStart(2, "0")}
              </span>
              <div className="flex gap-1">
                {myProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedProjectIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === selectedProjectIndex
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-muted hover:bg-muted-foreground/50"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* title + bullets */}
            <div className="flex flex-col gap-2.5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentProject.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="animatedText max-w-[20rem] text-[1.16rem] font-bold leading-tight tracking-[-0.04em]"
                >
                  {currentProject.title}
                </motion.p>
              </AnimatePresence>

              <ul className="animatedText space-y-1.5">
                {currentProject.points.map((point) => (
                  <li key={point} className="flex gap-2 text-[0.72rem] leading-relaxed text-muted-foreground">
                    <span className="mt-px shrink-0 text-primary">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* tech tags */}
            <div className="animatedText flex max-w-[22rem] flex-wrap gap-1.5">
              {currentProject.tags.map((tag) => {
                const Icon = tag.icon;
                return (
                  <div
                    key={tag.id}
                    className="flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/50 px-2 py-0.5 text-[0.66rem] text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-primary/30 hover:bg-accent/60 hover:text-foreground"
                  >
                    <Icon className="text-primary" style={{ fontSize: "0.68rem" }} />
                    {tag.name}
                  </div>
                );
              })}
            </div>

            {/* actions */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3">
              <div className="flex items-center gap-3">
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 rounded-lg bg-primary/12 px-2.5 py-1.5 text-[0.72rem] font-medium text-primary ring-1 ring-primary/20 transition hover:bg-primary/18 hover:ring-primary/30"
                >
                  <FaExternalLinkAlt className="text-[0.65rem] transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  Live Site
                </a>
                <a
                  href={currentProject.repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.72rem] text-muted-foreground transition hover:text-foreground"
                >
                  <FaGithub />
                  Repo
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigation("previous")}
                  className="flex h-7 w-7 items-center justify-center rounded-xl border border-border/70 bg-secondary/50 text-muted-foreground transition hover:border-primary/35 hover:bg-accent/60 hover:text-foreground"
                >
                  <FaArrowLeft style={{ fontSize: "0.72rem" }} />
                </button>
                <button
                  onClick={() => handleNavigation("next")}
                  className="flex h-7 w-7 items-center justify-center rounded-xl border border-border/70 bg-secondary/50 text-muted-foreground transition hover:border-primary/35 hover:bg-accent/60 hover:text-foreground"
                >
                  <FaArrowRight style={{ fontSize: "0.72rem" }} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── canvas card ── */}
          <motion.div
            {...fadeUp(0.18)}
            className="order-1 relative overflow-hidden rounded-lg border border-border/70 bg-card/90 shadow-[0_20px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] sm:rounded-2xl lg:order-2 lg:h-[386px]"
          >
            {/* grid overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* corner accents */}
            <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-primary/25" />
            <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-primary/25" />
            <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-primary/25" />
            <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-primary/25" />

            {/* bottom gradient fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />

            <ProjectScene />

            {/* "drag to rotate" hint */}
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[0.54rem] tracking-widest text-muted-foreground/50 uppercase">
              Auto-rotating · Drag to explore
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
