"use client";

import React from "react";
import Image from "next/image";
import heroBanner from "@/public/hero_banner.png";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white selection:bg-purple-500/30 selection:text-white isolate">
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={heroBanner}
          alt="Norma AI - Superconnected Workflow"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </div>

      {/* Atmospheric Overlays for Readability & Depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-transparent h-48 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 z-[1] w-full md:w-3/4 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Hero Main Content */}
      <div className="relative z-10  w-full px-6 md:md:px-[3%] pt-32 pb-12 sm:pb-16 md:pb-20 mt-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 lg:gap-12">
          {/* Left Column: Headline, Tagline, & Description */}
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-tight text-white leading-none lg:leading-[1.12]">
              Superconnected <br />
              <span className="text-white">Workflow With </span>
              <span className="text-[#c4b5fd] font-medium drop-shadow-[0_0_25px_rgba(196,181,253,0.35)]">
                Norma
              </span>
            </h1>

            <p className="mt-4 sm:mt-5 text-lg sm:text-xl font-normal text-zinc-100 tracking-tight leading-[1.2] md:leading-none">
              Better Connections Lead To Better Outcomes
            </p>

            <p className="mt-5 sm:mt-6 text-sm sm:text-[15px] text-white font-light leading-[1.3] lg:leading-relaxed max-w-xl">
              Norma doesn&apos;t just assist healthcare—she connects it. Every patient,
              every conversation, every detail, remembered. One platform. Four
              specialized agents. Start with what you need today and scale as you
              grow.
            </p>
          </div>

          {/* Right Column: CTA Button */}
          <div className="md:self-end flex-shrink-0 pt-4 md:pt-0">
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
    </section>
  );
};

export default Hero;