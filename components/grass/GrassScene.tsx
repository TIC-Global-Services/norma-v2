"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three/webgpu";
import { createGrassScene, type GrassSceneHandle } from "./createGrassScene";
import { playerConfig } from "./playerConfig";

export default function GrassScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / playerConfig.SCROLL_INTRO_THRESHOLD_PX));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let renderer: THREE.WebGPURenderer | null = null;
    let scene: GrassSceneHandle | null = null;

    const resize = () => scene?.onResize();

    (async () => {
      try {
        // React Strict Mode's dev-only mount→cleanup→mount runs all THREE
        // synchronously in one tick, with no await in between. Without this
        // yield, `new THREE.WebGPURenderer()` + `renderer.init()` below would
        // fire synchronously during the FIRST mount, before its cleanup has
        // even run to set `cancelled` — so the second mount's renderer starts
        // initializing concurrently with the first, both racing to claim the
        // same <canvas>'s GPU context. Yielding one microtask here lets the
        // first mount's cleanup (which is synchronous) land first, so its
        // `cancelled` check below is already true and it bails before ever
        // touching the canvas — only the second (real) mount constructs a
        // renderer. This is what was producing two "WebGPU is not available"
        // logs and, on real mobile GPUs, "WebGL Device Lost" from two live
        // contexts fighting over one canvas.
        await Promise.resolve();
        if (cancelled) return;

        // no forceWebGL — WebGPURenderer probes for real WebGPU first and
        // silently falls back to a WebGL2 backend when unavailable (nearly
        // every mobile browser today). createGrassScene() then separately
        // picks Grass vs. FallbackGrass depending on what that backend
        // supports. This try/catch exists so that if init() (or scene setup)
        // fails for any OTHER reason — e.g. no WebGL2 context at all — the
        // user gets a visible message instead of a silently blank canvas,
        // which is what a device with no console access just looks like.
        // ?forceWebGL=1 lets us test the mobile/non-WebGPU code path on a
        // desktop browser that does have WebGPU, instead of needing an
        // actual old device — remove once mobile rendering is confirmed good
        const forceWebGL = new URLSearchParams(window.location.search).has("forceWebGL");
        renderer = new THREE.WebGPURenderer({ canvas, antialias: true, forceWebGL });
        await renderer.init();
        // dispose only AFTER init() actually settles — disposing mid-init
        // tears down a WebGL2 context that isn't finished being created, and
        // on a React Strict Mode dev double-mount the effect re-runs
        // immediately after, creating a SECOND renderer/context while this
        // one is still winding down. Two live GPU contexts on one mobile GPU
        // at once is a real, observed trigger for "WebGL Device Lost".
        if (cancelled) {
          renderer.dispose();
          return;
        }

        scene = await createGrassScene(renderer, canvas);
        if (cancelled) {
          scene.dispose();
          renderer.dispose();
          return;
        }

        scene.start();
        window.addEventListener("resize", resize);
      } catch (err) {
        console.error("[GrassScene] failed to start:", err);
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      // renderer/scene disposal happens above, inside the async chain, once
      // init()/createGrassScene() actually settle — see comment there
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
              {/* Left Column: Crossfading Headline, Tagline, & Description */}
              <div className="relative max-w-4xl min-h-[220px] md:min-h-[250px] flex items-end">
                {/* Phase 1 (Initial: 0% to ~45% scroll) */}
                <div
                  className={`transition-all duration-700 ease-out ${
                    scrollProgress < 0.45
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-6 pointer-events-none absolute inset-0"
                  }`}
                >
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

                {/* Phase 2 (Mid to End: >= 45% scroll) */}
                <div
                  className={`transition-all duration-700 ease-out ${
                    scrollProgress >= 0.45
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-6 pointer-events-none absolute inset-0"
                  }`}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-normal text-center md:text-left tracking-tight text-white leading-none lg:leading-[1.12]">
                    One Intelligent Layer <br /> Every Healthcare Connection
                  </h1>
                  {/* <span className="text-white text-4xl sm:text-5xl lg:text-[62px] font-normal text-center md:text-left tracking-tight text-white leading-none lg:leading-[1.12]"></span> */}

                  <p className="mt-5 sm:mt-6 text-base sm:text-lg text-zinc-200 font-light leading-[1.2]  md:max-w-xl text-center md:text-left">
                    From the first patient conversation to the final follow-up, NORMA brings communication, automation, and healthcare systems together in one seamless ecosystem.
                  </p>
                </div>
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
            <p className="max-w-md text-sm">This experience couldn&apos;t start on this device/browser. {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
