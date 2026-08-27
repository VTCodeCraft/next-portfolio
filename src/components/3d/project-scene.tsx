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

/*
  Default 3/4 angle of the laptop, in radians. This is the only value that
  controls how side-on the machine reads, so it lives here rather than inline.

  Negative turns the keyboard toward the bottom-right of the frame.

    -0.26  ≈ 15°  nearly face-on, base reads flat
    -0.42  ≈ 24°  balanced 3/4 — screen wide, keyboard clearly visible
    -0.52  ≈ 30°
    -0.62  ≈ 35°  too side-on; screen narrows and the base skews steeply

  Pitch stays near zero so the screen remains upright; the camera's own
  elevation supplies the downward angle.
*/
const LAPTOP_YAW = -0.42;

/* ─── ambient particle ring (decorative mesh) ────────────────────── */
function LaptopRig() {
  const { size } = useThree();
  const isSmallScreen = size.width < 650;

  /*
    rotationIntensity is 0 on purpose. Float oscillates rotation continuously,
    so with a fixed camera the model settled at a different yaw on every load —
    the angle looked inconsistent between reloads. Only the vertical drift
    remains, which keeps the scene alive without moving the framing.
  */
  return (
    <Float speed={1.1} rotationIntensity={0} floatIntensity={0.22}>
      <Center>
        {/*
          One framing at every width. The scale and offset used to differ
          between breakpoints, which changed where the model sat relative to
          the camera and made it read as a different rotation on narrow
          screens than on wide ones.

          With autorotate removed this is the single angle a visitor sees, so
          it is set close to front-on: enough yaw to show the machine has
          depth, not so much that the screen turns away.
        */}
        <group
          scale={isSmallScreen ? 1.2 : 1.42}
          position={[0, -0.15, 0]}
          rotation={[0.02, LAPTOP_YAW, 0]}
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

  /*
    dpr can be changed on a live renderer, so it stays responsive.

    Capped at 2 rather than clamped to 1 on narrow viewports. That clamp dated
    from when this scene was a full-width band; in the hero panel the canvas is
    only a few hundred pixels across, so rendering at 1x was the single biggest
    cause of the screen looking soft — far more than texture resolution. At
    this size the extra fill rate is negligible.
  */
  const dpr = useMemo<[number, number]>(
    () => (isMobile ? [1, 1.75] : [1, 2]),
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
          // Pulled back from 1.0: with the key light gone the scene no longer
          // needs headroom, and a lower exposure keeps highlights off the
          // glossy shell.
          gl.toneMappingExposure = 0.72;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = PCFSoftShadowMap;
          gl.domElement.addEventListener("webglcontextlost", handleContextLost);
          setIsGlReady(true);
        }}
      >
        {/*
          Lighting is image-based rather than lamp-based.

          There used to be an intensity-48 spotlight aimed at the laptop, which
          read as a bare bulb parked in front of the screen — a hard white
          hotspot with a sharp falloff. It is gone. Shading now comes from the
          HDR environment, which wraps the model and keeps it three-dimensional
          without any single direction dominating.

          Removing it also means no light casts shadow maps any more, so the
          per-frame shadow pass is gone; ContactShadows still grounds the model.
        */}
        <ambientLight intensity={0.35} />

        {/* Soft directional shaping only — enough to define edges, far too low
            to produce a specular hotspot. */}
        <directionalLight position={[-5, 3.5, 2.5]} intensity={0.45} />

        <pointLight
          position={[0, 3, -3]}
          intensity={1.2}
          distance={8}
          color={sceneColors.accent}
        />

        {/*
          preset="city" resolved to a 1.5 MB HDR fetched from raw.githack.com
          on every visit. Same asset, self-hosted: identical lighting, no
          third-party CDN in the critical path for the scene.

          Lightformer intensities are low: these are emissive panels, so at
          higher values they reflect off the glossy shell as bright rectangles.
        */}
        <Environment files="/hdri/potsdamer_platz_1k.hdr" resolution={256}>
          <Lightformer form="rect" intensity={0.35} position={[6, 2, 2]} rotation={[0, -Math.PI / 4.5, 0]} scale={[4, 6, 1]} />
          <Lightformer form="rect" intensity={0.28} position={[-6, 1.8, 2]} rotation={[0, Math.PI / 4.5, 0]} scale={[3.8, 5.5, 1]} />
          <Lightformer
            form="ring"
            intensity={0.2}
            position={[0, 6, -4]}
            rotation={[Math.PI / 2.4, 0, 0]}
            scale={[6.5, 6.5, 1]}
            color={sceneColors.ring}
          />
        </Environment>

        <Suspense fallback={<CanvasLoader />}>
          <SceneReady onReady={handleSceneReady} />
          <LaptopRig />


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
