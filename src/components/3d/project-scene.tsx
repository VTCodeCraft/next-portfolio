"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { ACESFilmicToneMapping, PCFSoftShadowMap, Vector2 } from "three";
import CanvasLoader from "../ui/canvas-loader";
import { DemoComputer } from "./demo-computer";

/* ─── ambient particle ring (decorative mesh) ────────────────────── */
function LaptopRig() {
  const { size } = useThree();
  const isSmallScreen = size.width < 650;

  return (
    <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.18}>
      <Center>
        {/*
          Slight yaw so the screen is angled toward the camera rather than
          edge-on. With autorotate removed the view is fixed, so this is the
          one angle a visitor sees.
        */}
        <group
          scale={isSmallScreen ? 1.05 : 1.42}
          position={[0, isSmallScreen ? -1.34 : -1.52, 0]}
          rotation={[0.01, -0.35, 0]}
        >
          <DemoComputer />
        </group>
      </Center>
    </Float>
  );
}

function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
}

function getThemeColor(name: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  return value || fallback;
}

/**
 * The scene still animates continuously (Float keeps a slow drift), so
 * frameloop="demand" is not an option. Instead the loop is suspended whenever
 * the canvas is scrolled out of view or the tab is hidden.
 */
function useRenderActive(target: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(true);
  const visibleRef = useRef(true);

  useEffect(() => {
    const element = target.current;

    if (!element) return;

    const sync = () => setActive(visibleRef.current && !document.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        sync();
      },
      { rootMargin: "120px" },
    );

    observer.observe(element);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [target]);

  return active;
}

const MOBILE_QUERY = "(max-width: 650px)";

/**
 * Resolved synchronously on the first render. This component is loaded with
 * `ssr: false`, so reading matchMedia during render cannot cause a hydration
 * mismatch — and it keeps `dpr` / `gl` stable from the very first frame instead
 * of reconfiguring the renderer one tick after mount.
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(query.matches);

    sync();
    query.addEventListener("change", sync);

    return () => query.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

/* ─── 3-D scene ────────────────────────────────────────────────────── */
export default function ProjectScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isActive = useRenderActive(wrapperRef);
  const isMobile = useIsMobile();
  const [isModelReady, setIsModelReady] = useState(false);

  // EffectComposer.setRenderer() reads renderer.getContext().getContextAttributes().
  // If the context is not live that returns null and throws on `.alpha`, so the
  // render loop may only be suspended once onCreated confirms the renderer.
  const [isGlReady, setIsGlReady] = useState(false);

  /*
    This component is code-split, so it mounts after the page does. React
    StrictMode (dev only) double-invokes that mount: R3F would build a renderer,
    then the simulated unmount disposes it and force-loses the WebGL context,
    leaving the reused <canvas> element with a dead context — a blank white box.

    Deferring the Canvas by one effect tick means the renderer is created after
    StrictMode has finished its mount/unmount/remount cycle, so it is built once
    against a live context. Remounting the Canvas to recover instead would spin
    up a second R3F root and draw the model twice.
  */
  // Stable: an inline arrow would re-run SceneReady's effect on every render,
  // immediately flipping the loader back off during a rebuild.
  const handleSceneReady = useCallback(() => setIsModelReady(true), []);

  const [canvasGeneration, setCanvasGeneration] = useState(0);
  const generationRef = useRef(0);

  const handleContextLost = () => {
    if (generationRef.current >= 3) return;

    generationRef.current += 1;
    setIsGlReady(false);
    // Put the loader back while the replacement Canvas builds, otherwise the
    // model is visibly drawn, torn down and drawn again on load.
    setIsModelReady(false);
    setCanvasGeneration(generationRef.current);
  };

  /*
    Belt and braces: React drops the previous <canvas> when the key changes, but
    a stale one surviving would draw the model a second time on top of the live
    scene. After every generation, keep only the newest canvas in the wrapper.
  */
  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const canvases = wrapper.querySelectorAll("canvas");

    for (let i = 0; i < canvases.length - 1; i += 1) {
      canvases[i].remove();
    }
  }, [canvasGeneration]);

  // dpr can be changed on a live renderer, so it stays responsive.
  const dpr = useMemo<[number, number]>(
    () => (isMobile ? [1, 1] : [1, 1.5]),
    [isMobile],
  );

  /*
    antialias is fixed at context creation and cannot be changed afterwards.
    Remounting the Canvas to change it leaked a WebGL context per breakpoint
    crossing until the browser hit its live-context cap and started killing
    them — which renders the canvas as a blank white box. Resolve it once and
    never touch it again, so the Canvas mounts exactly once.
  */
  const glOptions = useMemo(
    () => ({
      antialias:
        typeof window === "undefined" ||
        !window.matchMedia(MOBILE_QUERY).matches,
      alpha: true,
      powerPreference: "high-performance" as const,
    }),
    [],
  );


  const [sceneColors, setSceneColors] = useState({
    accent: "#2563eb",
    ring: "#93c5fd",
    shadow: "#08131d",
  });

  useEffect(() => {
    const syncSceneColors = () => {
      setSceneColors({
        accent: getThemeColor("--project-scene-accent", "#2563eb"),
        ring: getThemeColor("--project-scene-ring", "#93c5fd"),
        shadow: getThemeColor("--project-scene-shadow", "#08131d"),
      });
    };

    syncSceneColors();

    const observer = new MutationObserver(syncSceneColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "var(--project-scene-floor)" }}
      />
      <Canvas
        key={canvasGeneration}
        className="relative z-[1] h-full w-full"
        frameloop={isGlReady && !isActive ? "never" : "always"}
        dpr={dpr}
        performance={{ min: 0.7 }}
        shadows="soft"
        camera={{ position: [0, 0.65, 4.2], fov: 30 }}
        gl={glOptions}
        onCreated={({ gl }) => {
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = PCFSoftShadowMap;
          gl.domElement.addEventListener("webglcontextlost", handleContextLost);
          setIsGlReady(true);
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
          shadow-mapSize={isMobile ? [512, 512] : [1024, 1024]}
        />

        {/*
          Fill light. Previously also cast shadows, which meant a second full
          shadow-map render every frame for a contribution hidden under the
          key light's shadow and the contact shadows.
        */}
        <directionalLight position={[-5, 3.5, 2.5]} intensity={1.6} />

        {/* Subtle warm backlight */}
        <pointLight
          position={[0, 3, -3]}
          intensity={3}
          distance={8}
          color={sceneColors.accent}
        />

        {/*
          preset="city" resolved to a 1.5 MB HDR fetched from raw.githack.com
          on every visit. Same asset, self-hosted: identical lighting, no
          third-party CDN in the critical path for the scene.
        */}
        <Environment files="/hdri/potsdamer_platz_1k.hdr" resolution={256}>
          <Lightformer form="rect" intensity={1.4} position={[6, 2, 2]} rotation={[0, -Math.PI / 4.5, 0]} scale={[4, 6, 1]} />
          <Lightformer form="rect" intensity={1.1} position={[-6, 1.8, 2]} rotation={[0, Math.PI / 4.5, 0]} scale={[3.8, 5.5, 1]} />
          <Lightformer
            form="ring"
            intensity={0.6}
            position={[0, 6, -4]}
            rotation={[Math.PI / 2.4, 0, 0]}
            scale={[6.5, 6.5, 1]}
            color={sceneColors.ring}
          />
        </Environment>

        <Suspense fallback={<CanvasLoader />}>
          <SceneReady onReady={handleSceneReady} />
          <LaptopRig />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.32}
            scale={10}
            blur={4.2}
            far={3.5}
            resolution={isMobile ? 128 : 256}
            color={sceneColors.shadow}
          />

          {/*
            Kept inside the Suspense boundary. EffectComposer.setRenderer()
            dereferences renderer.getContext().getContextAttributes(), so it
            must not mount before the renderer has a live context — which is
            what threw "Cannot read properties of null (reading 'alpha')".

            Post-processing is skipped on mobile, where the full-screen passes
            cost more than the effects are worth on a small viewport.
          */}
          {!isMobile && (
            <EffectComposer enableNormalPass={false} multisampling={0}>
              <Bloom intensity={0.4} luminanceThreshold={0.8} luminanceSmoothing={0.1} mipmapBlur />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={new Vector2(0.0006, 0.0006)}
              />
              <BrightnessContrast brightness={0.02} contrast={0.12} />
              <HueSaturation saturation={0.18} />
              <Vignette eskil={false} offset={0.28} darkness={0.65} />
            </EffectComposer>
          )}
        </Suspense>

        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.95}
          target={[0, -0.1, 0]}
        />
      </Canvas>

      {!isModelReady && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[var(--project-loader-backdrop)] backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-3">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--project-loader-track)] border-t-primary" />
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Loading Model
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
