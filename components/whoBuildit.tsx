"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BuilderPerson {
  id: string;
  name: string;
  role?: string;
  bio: string;
}

const people: BuilderPerson[] = [
  {
    id: "zohaib",
    name: "Zohaib",
    bio: "In his early twenties, Zohaib saw what most people his age never look for, a gap the size of a continent in the way healthcare communicates. A business analytics mind that doesn't accept broken systems. He didn't wait for the industry to fix itself.",
  },
  {
    id: "mansoor",
    name: "Mansoor",
    bio: "With a deep background in distributed systems and healthcare infrastructure, Mansoor engineered Norma's real-time messaging pipeline, ensuring zero-loss patient routing and enterprise EHR compliance.",
  },
  {
    id: "alexander",
    name: "Alexander",
    bio: "A specialist in applied machine intelligence and medical NLP, Alexander shaped Norma's multilingual extraction models to handle complex clinical nuance across English, Arabic, and regional dialects.",
  },
];

const WhoBuiltIt: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full py-24 md:py-32 px-4 sm:px-6 lg:px-[5%] bg-black text-white selection:bg-purple-500/30 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-900/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className=" flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-6xl mx-auto mb-14 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-[50px] font-normal tracking-tight text-[#E8DEF8] mb-5 leading-tight"
          >
            The People Who Built It
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base md:text-[22px] text-white font-light leading-[1.3] max-w-5xl mx-auto"
          >
            Three people. Three very different paths. One shared belief — that
            the way healthcare communicates in the Gulf was broken, that the
            intelligence layer was missing, and that both were entirely fixable.
          </motion.p>
        </div>

        {/* Interactive Expandable Cards with Hover Effect */}
        <div className="w-full flex flex-col md:flex-row  md:h-[480px] lg:h-[520px]">
          {people.map((person, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={person.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveIndex(index);
                }}
                className={`relative  p-6 sm:p-8 lg:px-8 cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] border border-zinc-800/80 focus-visible:outline-none flex flex-col justify-between 
                  ${
                  isActive
                    ? "bg-[#09090B] flex-[2.4] lg:flex-[2.8] shadow-[0_10px_40px_rgba(0,0,0,0.8)] border-[#E3E3E3] min-h-[300px] md:min-h-0"
                    : "bg-[#27272A]/70 hover:bg-[#27272A]/90 flex-1 min-h-[120px] md:min-h-0"
                }
                `
              }
              >
                {/* Active Card Content */}
                {isActive ? (
                  <div className="flex flex-col justify-end h-full z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mt-auto"
                    >
                      <h3 className="text-2xl sm:text-3xl md:text-[2.5rem] font-normal tracking-tight text-white mb-4">
                        {person.name}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-xl font-light leading-[1.3] text-[#6A6968] max-w-xl">
                        {person.bio}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  /* Inactive Card Content - Vertical Rotated Name */
                  <div className="hidden md:flex items-end justify-start h-full w-full py-8">
                    <span
                      style={{ writingMode: "vertical-rl" }}
                      className="rotate-180 text-3xl lg:text-[5rem] font-normal tracking-tight text-zinc-200 transition-colors duration-300 select-none whitespace-nowrap"
                    >
                      {person.name}
                    </span>
                  </div>
                )}

                {/* Mobile Fallback when not active */}
                {!isActive && (
                  <div className="flex md:hidden items-center justify-between h-full">
                    <span className="text-xl font-medium text-zinc-300">
                      {person.name}
                    </span>
                    <span className="text-xs text-zinc-500">Tap to expand</span>
                  </div>
                )}

                {/* Subtle gradient highlights */}
                {/* <div
                  className={`absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                /> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoBuiltIt;
