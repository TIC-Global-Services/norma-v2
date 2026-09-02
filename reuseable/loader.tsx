"use client";

import React, { useEffect, useState } from "react";

interface LoaderProps {
  /** Optional custom progress (0 - 100). If not provided, simulates smooth initial page load. */
  progress?: number;
  /** Optional callback fired when progress reaches 100% and fade out starts */
  onComplete?: () => void;
  /** Minimum duration in ms for the loader in auto mode (default: 1800ms) */
  minDuration?: number;
}

export default function Loader({
  progress: externalProgress,
  onComplete,
  minDuration = 1800,
}: LoaderProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  const isControlled = typeof externalProgress === "number";
  const currentProgress = Math.min(
    100,
    Math.max(0, isControlled ? externalProgress : internalProgress)
  );

  // Automatic smooth progress when not controlled externally
  useEffect(() => {
    if (isControlled) return;

    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / minDuration);

      // Ease-out cubic progression for a natural feel
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      const nextProgress = Math.round(eased * 100);

      setInternalProgress(nextProgress);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setInternalProgress(100);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isControlled, minDuration]);

  // Handle completion & fadeout
  useEffect(() => {
    if (currentProgress >= 100 && !isFinished) {
      setIsFinished(true);
      onComplete?.();

      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 700); // matches fade duration

      return () => clearTimeout(timer);
    }
  }, [currentProgress, isFinished, onComplete]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-out select-none ${
        isFinished ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex w-52 sm:w-64 flex-col items-center gap-4">
        {/* Sleek Minimal Progress Bar */}
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full bg-white transition-[width] duration-150 ease-out"
            style={{ width: `${currentProgress}%` }}
          />
        </div>

        {/* Minimal Percentage Display */}
        <div className="flex w-full items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400">
          <span className="uppercase text-zinc-500">Norma</span>
          <span className="text-white font-medium">{Math.round(currentProgress)}%</span>
        </div>
      </div>
    </div>
  );
}