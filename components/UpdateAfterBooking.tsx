"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const UpdateAfterBooking: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress as the section enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Smooth out the scroll animation with spring physics
  const rawY = useTransform(scrollYProgress, [0, 1], [160, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.3, 0.7, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const smoothY = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.8 });
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 90, damping: 22 });
  const smoothScale = useSpring(rawScale, { stiffness: 90, damping: 22 });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] py-20 md:py-28 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-purple-500/30"
    >
      {/* Subtle radial ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[680px] h-[500px] sm:h-[680px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal tracking-tight text-[#E8DEF8] mb-10 md:mb-14"
        >
          Who Gets <br className="md:hidden"/> Updated After Booking
        </motion.h2>

        {/* Mobile Phone Mockup with scroll-driven entrance */}
        <motion.div
          style={{
            y: smoothY,
            opacity: smoothOpacity,
            scale: smoothScale,
          }}
          className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] flex items-center justify-center will-change-transform mb-8 md:mb-12 overflow-hidden"
        >
          {/* Subtle bottom shadow / glow beneath phone */}
          <div className="absolute -bottom-6 w-3/4 h-24 bg-purple-600/20 blur-2xl rounded-full pointer-events-none" />

          <Image
            src="/mobile.png"
            alt="Norman AI WhatsApp Booking Update on Mobile"
            width={400}
            height={500}
            priority
            className="w-full h-auto object-contain select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />

          {/* Bottom Gradient Fade Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        </motion.div>

        {/* Bottom Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-[22px] leading-[1.3] md:max-w-4xl font-light text-zinc-300 md:px-4"
        >
          <span className="text-white font-normal">Patient</span>{" "}
          <span className="text-zinc-500">–</span>{" "}
          <span className="text-[#C4B5FD] font-medium">WhatsApp</span>{" "}
          <span className="text-zinc-500">-</span> Instant booking confirmation —
          doctor name, date, time, location, and a calendar link.
        </motion.p>
      </div>
    </section>
  );
};

export default UpdateAfterBooking;
