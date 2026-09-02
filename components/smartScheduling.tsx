"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EcoCard {
  id: number;
  title: string;
  description: string;
  image: string;
}

const ecoCards: EcoCard[] = [
  {
    id: 1,
    title: "Patient Books An Appointment",
    description:
      "Providing strategic loan consulting and lender matchmaking services tailored to your financial goals and funding requirements.",
    image: "/stack-img-1.png",
  },
  {
    id: 2,
    title: "Instant Multi-Channel Triage",
    description:
      "Smart intake via WhatsApp, voice notes, and calls with immediate response and intelligent doctor assignment.",
    image: "/stack-img-2.png",
  },
  {
    id: 3,
    title: "Live Doctor EHR Integration",
    description:
      "Automatically documents consultations into clean medical summaries and updates patient records in real time.",
    image: "/stack-img-3.png",
  },
  {
    id: 4,
    title: "Continuous Patient Follow-Up",
    description:
      "Automated care reminders, lab report deliveries, and post-treatment check-ins without receptionist overload.",
    image: "/stack-img-4.png",
  },
];

const NormaEcoSystem: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const interactionTimer = useRef<NodeJS.Timeout | null>(null);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ecoCards.length) % ecoCards.length);
    setUserInteracted(true);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setUserInteracted(false), 6000);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ecoCards.length);
    setUserInteracted(true);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setUserInteracted(false), 6000);
  }, []);

  // Auto cycle cards every 4 seconds unless interacted
  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ecoCards.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [userInteracted]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (deltaX > deltaY && deltaX > 15) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const minSwipeDistance = 40;
    if (isSwiping.current && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  };

  // Stack visibility
  const getVisibleCards = () => {
    const visible = [];
    const count = Math.min(ecoCards.length, 4);
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % ecoCards.length;
      visible.push({ ...ecoCards[index], stackPosition: i });
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="w-full bg-black text-white px-6 md:px-[3%] py-16 md:py-24 lg:py-28 overflow-hidden border-b border-[#262626]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-1 items-center">
        {/* Left Column: Heading, Description & Navigation Buttons */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-normal md:text-left text-center tracking-tight text-[#d8b4fe] leading-[1.18]">
              Smarter Scheduling From Start to Finish
            </h2>

            <p className="mt-6 sm:mt-8 text-sm sm:text-base lg:text-[22px] md:text-left text-center text-zinc-300 font-light leading-[1.2] tracking-tight">
              When a patient books an appointment via WhatsApp, voice note, or call,
              Norma instantly confirms it and notifies the right people—keeping
              your entire clinic aligned from the very start.
            </p>

            {/* Navigation Buttons Below Content */}
            <div className="mt-8 sm:mt-10 hidden md:flex items-center gap-4">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous card"
                className="w-12 h-12 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-purple-400/50 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next card"
                className="relative w-12 h-12 rounded-full bg-zinc-900/90 hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 shadow-lg cursor-pointer group"
              >
                {/* Circular Auto-Slide Progress Stroke */}
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                  viewBox="0 0 48 48"
                >
                  {/* Background Track */}
                  <circle
                    cx="24"
                    cy="24"
                    r="21"
                    className="stroke-zinc-700/80"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Animated Progress Indicator */}
                  {!userInteracted && (
                    <motion.circle
                      key={currentIndex}
                      cx="24"
                      cy="24"
                      r="21"
                      stroke="#d8b4fe"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 21}
                      initial={{ strokeDashoffset: 2 * Math.PI * 21 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{
                        duration: 4.5,
                        ease: "linear",
                      }}
                    />
                  )}
                </svg>

                <ChevronRight className="w-5 h-5 relative z-10" />
              </button>

              {/* Progress dots indicator */}
              {/* <div className="flex items-center gap-1.5 ml-2">
                {ecoCards.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setUserInteracted(true);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? "w-6 bg-purple-400"
                        : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div> */}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Stacked Cards Container */}
        <div
          className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-center touch-manipulation"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full aspect-[3/4] md:max-h-[90dvh] max-w-xl">
            <AnimatePresence mode="popLayout">
              {visibleCards.map((card) => {
                const stackPos = card.stackPosition;
                const isActive = stackPos === 0;

                // Responsive horizontal offsets for stack depth
                const xOffset = isMobile
                  ? stackPos * 14
                  : isTablet
                    ? stackPos * 22
                    : stackPos * 40;

                const yOffset = stackPos * (isMobile ? 3 : 5);
                const scale = 1 - stackPos * 0.045;

                return (
                  <motion.div
                    key={card.id}
                    initial={{
                      scale: 1 - stackPos * 0.045,
                      x: xOffset + 40,
                      y: yOffset,
                      opacity: 0,
                    }}
                    animate={{
                      scale: scale,
                      x: xOffset,
                      y: yOffset,
                      opacity: 1,
                      zIndex: 20 - stackPos,
                    }}
                    exit={{
                      scale: 0.9,
                      x: isMobile ? -140 : -220,
                      opacity: 0,
                      rotate: -4,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="absolute top-0 left-0 w-full h-full cursor-pointer select-none"
                    onClick={() => {
                      if (!isActive && !isSwiping.current) {
                        setCurrentIndex(
                          (prev) => (prev + stackPos) % ecoCards.length
                        );
                        setUserInteracted(true);
                      }
                    }}
                  >
                    <div className="relative w-full h-full rounded-[28px] sm:rounded-[34px] overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
                      {/* Card Image */}
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        // sizes="(max-width: 768px) 100vw, 540px"
                        priority={isActive}
                        className="object-cover object-center pointer-events-none "
                      />

                      {/* Stack layer dimming overlay for non-active background cards */}
                      {!isActive && (
                        <div
                          className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 pointer-events-none"
                          style={{ opacity: stackPos * 0.35 }}
                        />
                      )}

                      {/* Gradient Overlay for bottom text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

                      {/* Card Text on Active Card */}
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10">
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                          className="text-[22px] sm:text-xl md:text-3xl font-normal text-[#d8b4fe] tracking-tight leading-snug"
                        >
                          {card.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="mt-2 text-sm sm:text-base text-white font-light leading-[1.2] line-clamp-3"
                        >
                          {card.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NormaEcoSystem;