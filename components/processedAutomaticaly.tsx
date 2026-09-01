"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface DocumentFeature {
  id: string;
  category?: string;
  title?: string;
  isCenterOrb?: boolean;
}

const features: DocumentFeature[] = [
  { id: "lab", category: "Lab", title: "Analysis" },
  { id: "prescription", category: "Prescription", title: "Management" },
  { id: "insurance", category: "Insurance", title: "Verification" },
  { id: "referral", category: "Referral", title: "Processing" },
  { id: "formats", category: "Supported", title: "Formats" },
  { id: "identity", category: "Identity", title: "Verification" },
  { id: "orb", isCenterOrb: true },
  { id: "imaging", category: "Medical", title: "Imaging" },
];

const ProcessedAutomatically: React.FC = () => {
  return (
    <section className="relative w-full py-24 md:py-32 px-4 sm:px-6 lg:px-[5%] bg-black text-white selection:bg-purple-500/30 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-900/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-lg md:text-[2.125rem] text-[#D3C5F6] font-normal tracking-tight"
          >
            Every Document
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#D3C5F6] leading-[1.1] mb-6"
          >
            Processed Automatically
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-[22px] text-white font-light leading-[1.3]  lg:max-w-5xl lg:mx-auto"
          >
            Patients can upload reports, prescriptions, insurance cards,
            referrals, or medical documents directly through WhatsApp. Norma
            reads each document using AI-powered OCR, extracts important<br className="hidden lg:block"/>
            information, files it correctly, and routes it to the appropriate
            healthcare team.
          </motion.p>
        </div>

        {/* Mobile Marquee (Single Row) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="w-full md:hidden flex relative overflow-hidden py-2"
        >
          {/* Side Gradients for clean marquee fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

          <div className="flex overflow-hidden border-y border-zinc-800/80">
            <motion.div
              className="flex shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              {[
                ...features,
                ...features,
                ...features,
                ...features,
              ].map((item, index) => (
                <div
                  key={`marquee-${item.id}-${index}`}
                  className="group relative flex flex-col items-center justify-center px-8 py-6 min-w-[200px] gap-2 shrink-0 text-center border-r border-zinc-800/80"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {item.isCenterOrb ? (
                    <div className="relative flex items-center justify-center w-20 h-20">
                      <Image
                        src="/ai_image.png"
                        alt="AI"
                        fill
                        className="object-cover select-none"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center z-10">
                      <span className="text-xl text-zinc-400 font-light tracking-tight leading-none mb-1.5">
                        {item.category}
                      </span>
                      <span className="text-3xl font-normal tracking-tight text-white leading-tight">
                        {item.title}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="hidden md:grid w-full grid-cols-4 bg-black/40 backdrop-blur-sm"
        >
          {features.map((item, index) => {
            const isDesktopRightBorder = index % 4 !== 3;
            const isDesktopBottomBorder = index < 4;

            return (
              <div
                key={item.id}
                className={`group relative flex flex-col items-center justify-center p-8 sm:p-10 min-h-[160px] sm:min-h-[190px] text-center transition-all duration-300 hover:bg-zinc-900/40 border-zinc-800/80 ${
                  isDesktopRightBorder ? "md:border-r" : "md:border-r-0"
                } ${isDesktopBottomBorder ? "md:border-b" : "md:border-b-0"}`}
              >
                {/* Subtle card hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {item.isCenterOrb ? (
                  /* 3D Iridescent Orb */
                  <div className="relative flex items-center justify-center w-20 h-20 sm:w-30 sm:h-30">
                    <Image
                      src="/ai_image.png"
                      alt="AI"
                      fill
                      className="object-cover select-none"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center z-10">
                    <span className="text-xs sm:text-xl text-white font-light tracking-tight leading-none transition-colors group-hover:text-zinc-200">
                      {item.category}
                    </span>
                    <span className="text-xl sm:text-2xl leading-none lg:text-[40px] font-normal tracking-tight text-white transition-transform duration-300 group-hover:scale-[1.03]">
                      {item.title}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessedAutomatically;
