"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three/webgpu";
import { createGrassScene, type GrassSceneHandle } from "./createGrassScene";
import { UnsupportedGrassRendererError } from "./Grass";
import { playerConfig } from "./playerConfig";

export default function GrassScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let renderer: THREE.WebGPURenderer | null = null;
    let scene: GrassSceneHandle | null = null;

    const resize = () => scene?.onResize();

    (async () => {
      try {
        renderer = new THREE.WebGPURenderer({ canvas, antialias: true });
        await renderer.init();
        if (cancelled) {
          renderer.dispose();
          return;
        }

        scene = await createGrassScene(renderer, canvas);
        if (cancelled) {
          scene.dispose();
          return;
        }

        scene.start();
        window.addEventListener("resize", resize);
      } catch (err: unknown) {
        if (cancelled) return;
        console.error("Failed to initialize Grass Scene:", err);
        if (err instanceof UnsupportedGrassRendererError) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      }
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      scene?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    // pin: the hero (canvas) sticks to the viewport for SCROLL_INTRO_THRESHOLD_PX
    // of extra scroll height, then releases and scrolls away normally — and
    // re-pins automatically if the user scrolls back up, since that's just
    // how position:sticky works. createGrassScene.ts assumes this sits at
    // document top (scrollY == progress through this pin) — keep it first on the page.
    <div style={{ height: `calc(100vh + ${playerConfig.SCROLL_INTRO_THRESHOLD_PX}px)` }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {/* fades the canvas into the next section's flat #050208 background
            instead of cutting hard at the pin's bottom edge */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[35vh]"
          style={{ background: "linear-gradient(to bottom, transparent, #050208 85%)" }}
        />

        {/* Hero Content Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end">
          <div className="w-full px-6 md:px-[3%] pt-32 pb-12 sm:pb-16 md:pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 lg:gap-12">
              {/* Left Column: Headline, Tagline, & Description */}
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-normal text-center md:text-left tracking-tight text-white leading-none lg:leading-[1.12]">
                  Superconnected <br />
                  <span className="text-white">Workflow With </span>
                  <span className="text-[#c4b5fd] font-medium drop-shadow-[0_0_25px_rgba(196,181,253,0.35)]">
                    Norma
                  </span>
                </h1>

                <p className="mt-4 sm:mt-5 text-xl sm:text-xl font-normal text-center md:text-left text-zinc-100 tracking-tight leading-[1.2] md:leading-none">
                  Better Connections <br className="md:hidden" /> Lead To Better Outcomes
                </p>

                <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white font-light leading-[1.2] lg:leading-relaxed md:max-w-xl text-center md:text-left">
                  Norma doesn&apos;t just assist healthcare—she connects it. Every patient,
                  every conversation, every detail, remembered. One platform. Four
                  specialized agents. Start with what you need today and scale as you
                  grow.
                </p>
              </div>

              {/* Right Column: CTA Button */}
              <div className="self-center md:self-end flex-shrink-0 pt-0 md:pt-0 pointer-events-auto">
                <button
                  type="button"
                  className="group relative inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-purple-400/40 backdrop-blur-xl text-white text-sm sm:text-[15px] font-normal tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-purple-950/40 cursor-pointer"
                >
                  <span>Start a Conversation</span>

                  {/* Soundwave/AI Spark Graphic */}
                  <div className="flex items-center gap-[2.5px] h-4 text-purple-300">
                    <span className="w-[2px] h-2 bg-current rounded-full group-hover:h-3 transition-all duration-200" />
                    <span className="w-[2px] h-3.5 bg-current rounded-full group-hover:h-4 transition-all duration-200" />
                    <span className="w-[2px] h-2.5 bg-current rounded-full group-hover:h-2 transition-all duration-200" />
                    <span className="w-[2px] h-4.5 bg-current rounded-full group-hover:h-3.5 transition-all duration-200" />
                    <span className="w-[2px] h-2 bg-current rounded-full group-hover:h-3 transition-all duration-200" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-8 text-center text-white">
            <p className="max-w-md text-sm">
              This grass demo needs a browser with the WebGPU{" "}
              <code className="rounded bg-white/10 px-1">indirect-first-instance</code> feature
              (current Chrome or Edge). {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
