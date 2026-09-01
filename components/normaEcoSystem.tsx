"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EcosystemCard {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
}

const ecosystemCards: EcosystemCard[] = [
  {
    id: "desk",
    title: "Norma Desk",
  },
  {
    id: "voice",
    title: "Norma Voice",
  },
  {
    id: "scribe",
    title: "Norma Scribe",
  },
  {
    id: "super-connector",
    title: "Norma",
    subtitle: "Super Connector",
  },
];

const NormaEcoSystem: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pauseAutoScroll = useCallback(() => {
    setUserInteracted(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setUserInteracted(false);
    }, 6000);
  }, []);

  const handlePrev = useCallback(() => {
    setSlideDirection("left");
    setActiveIndex((prev) => (prev - 1 + ecosystemCards.length) % ecosystemCards.length);
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  const handleNext = useCallback(() => {
    setSlideDirection("right");
    setActiveIndex((prev) => (prev + 1) % ecosystemCards.length);
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  // Auto-advance slides periodically on mobile
  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setSlideDirection("right");
      setActiveIndex((prev) => (prev + 1) % ecosystemCards.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [userInteracted]);

  return (
    <section className="relative w-full py-24 md:py-32 px-4 sm:px-6 lg:px-[3%] bg-black text-white selection:bg-purple-500/30 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[350px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col items-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal tracking-tight text-[#D3C5F6] text-center mb-10 sm:mb-14 md:mb-20"
        >
          Explore the Norma Ecosystem
        </motion.h2>

        {/* ========================================================================= */}
        {/* MOBILE AUTO-SLIDER (< sm) WITH TOUCH DRAG/SWIPE */}
        {/* ========================================================================= */}
        <div className="w-full flex sm:hidden flex-col items-center">
          <div className="relative w-full max-w-sm px-2 touch-pan-y overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={ecosystemCards[activeIndex].id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -35 || info.velocity.x < -250) {
                    handleNext();
                  } else if (info.offset.x > 35 || info.velocity.x > 250) {
                    handlePrev();
                  }
                }}
                initial={{
                  opacity: 0,
                  x: slideDirection === "right" ? 60 : -60,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: slideDirection === "right" ? -60 : 60,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group relative rounded-2xl min-h-[420px] p-6 flex flex-col justify-between overflow-hidden bg-white text-black shadow-[0_20px_60px_rgba(255,255,255,0.12)] select-none cursor-grab active:cursor-grabbing"
              >
                {/* Top Right Arrow */}
                <div className="flex justify-end w-full h-8">
                  <ArrowUpRight className="w-6 h-6 text-black stroke-[2]" />
                </div>

                {/* Center Media: Video */}
                <div className="flex items-center justify-center my-auto w-full pointer-events-none">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <Image
                      src="/ai-gif.gif"
                      alt="Norma AI Animation"
                      width={160}
                      height={160}
                      unoptimized
                      priority
                      className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
                    />
                  </div>
                </div>

                {/* Bottom Left Title */}
                <div className="mt-auto pointer-events-none">
                  <h3 className="text-2xl font-normal tracking-tight leading-tight text-black">
                    {ecosystemCards[activeIndex].title}
                    {ecosystemCards[activeIndex].subtitle && (
                      <>
                        <br />
                        {ecosystemCards[activeIndex].subtitle}
                      </>
                    )}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Dot Progress Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {ecosystemCards.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => {
                  setSlideDirection(idx > activeIndex ? "right" : "left");
                  setActiveIndex(idx);
                  pauseAutoScroll();
                }}
                aria-label={`Slide to ${card.title}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-7 bg-[#C4B5FD]"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET GRID (sm and above) */}
        {/* ========================================================================= */}
        <div className="hidden sm:grid w-full grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4">
          {ecosystemCards.map((card, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={card.id}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveIndex(index);
                }}
                className={`group relative rounded-2xl md:rounded-[22px] min-h-[380px] sm:min-h-[65dvh] p-6 sm:p-8 flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none select-none ${
                  isActive
                    ? "bg-white text-black shadow-[0_20px_60px_rgba(255,255,255,0.12)] scale-[1.01]"
                    : "bg-[#383838] hover:bg-[#404040] text-white"
                }`}
              >
                {/* Top Right Arrow (shown on active/hover) */}
                <div className="flex justify-end w-full h-8">
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ArrowUpRight className="w-6 h-6 text-black stroke-[2]" />
                    </motion.div>
                  )}
                </div>

                {/* Center Media: Video on Hover / Active */}
                <div className="flex items-center justify-center my-auto w-full">
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.80, ease: "easeOut" }}
                        className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center"
                      >
                        <Image
                          src="/ai-gif.gif"
                          alt="Norma AI Animation"
                          width={160}
                          height={160}
                          unoptimized
                          priority
                          className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-36 h-36 sm:w-40 sm:h-40" />
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Left Title */}
                <div className="mt-auto">
                  <h3
                    className={`text-xl sm:text-3xl font-normal tracking-tight leading-tight transition-colors duration-300 ${
                      isActive ? "text-black" : "text-white"
                    }`}
                  >
                    {card.title}
                    {card.subtitle && (
                      <>
                        <br />
                        {card.subtitle}
                      </>
                    )}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NormaEcoSystem;