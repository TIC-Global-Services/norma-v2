"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const paragraph =
  "We started in Dubai because the UAE is the most connected, most progressive, most ambitious healthcare market in the Gulf. Because DHA and MOHAP are building the regulatory foundation for what AI-powered healthcare looks like. Because Dubai is where the future of Gulf healthcare gets decided. From Dubai we go to Saudi Arabia. Then the broader Gulf. Then the markets that need this most — Nigeria, Kenya, the Philippines, Bangladesh, Brazil. Every country where clinics run on trust and human effort instead of legacy infrastructure.";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const color = useTransform(progress, range, ["#3F3F46", "#FFFFFF"]);

  return (
    <span className="relative inline-block mr-[0.28em]">
      <motion.span style={{ color }}>{children}</motion.span>
    </span>
  );
};

const WhatsNext: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = paragraph.split(" ");

  // Track scroll progress of the paragraph across mobile and desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-36 px-6 md:px-[5%] lg:px-[3%] bg-black text-white selection:bg-purple-500/30 overflow-hidden"
    >
      {/* Ambient purple backlight */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-purple-900/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl lg:text-[50px] font-normal tracking-tight text-[#D3C5F6] mb-10 sm:mb-12"
        >
          Building What&apos;s Next
        </motion.h2>

        {/* Scroll Reveal Editorial Paragraph */}
        <p className="text-xl sm:text-xl md:text-[22px] lg:text-[22px] font-normal leading-[1.4] tracking-tight">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>

        {/* Final Punchline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 sm:mt-24 flex flex-col gap-1.5"
        >
          <p className="text-xl sm:text-2xl lg:text-[34px] font-light text-[#AAAAAA] tracking-tight">
            Not built for a few.
          </p>
          <h3 className="text-3xl sm:text-5xl lg:text-[60px] font-normal tracking-tight text-[#AAAAAA] leading-tight">
            Built for healthcare everywhere.
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsNext;