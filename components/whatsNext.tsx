"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const paragraph =
  "We started in Dubai because the UAE is the most connected, most progressive, most ambitious healthcare market in the Gulf. Because DHA and MOHAP are building the regulatory foundation for what AI-powered healthcare looks like. Because Dubai is where the future of Gulf healthcare gets decided. From Dubai we go to Saudi Arabia. Then the broader Gulf. Then the markets that need this most — Nigeria, Kenya, the Philippines, Bangladesh, Brazil. Every country where clinics run on trust and human effort instead of legacy infrastructure.";

const punchline1 = "Not built for a few.";
const punchline2 = "Built for healthcare everywhere.";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetColor?: string;
  className?: string;
}

const Word: React.FC<WordProps> = ({
  children,
  progress,
  range,
  targetColor = "#FFFFFF",
  className = "",
}) => {
  const color = useTransform(progress, range, ["#3F3F46", targetColor]);

  return (
    <span className={`relative inline-block mr-[0.28em] ${className}`}>
      <motion.span style={{ color }}>{children}</motion.span>
    </span>
  );
};

const WhatsNext: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphWords = paragraph.split(" ");
  const punchline1Words = punchline1.split(" ");
  const punchline2Words = punchline2.split(" ");

  const totalWords =
    paragraphWords.length + punchline1Words.length + punchline2Words.length;

  // Track scroll progress of the pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const START_OFFSET = 0.05;
  const END_OFFSET = 0.85;

  const getWordRange = (index: number): [number, number] => {
    const step = (END_OFFSET - START_OFFSET) / totalWords;
    const start = START_OFFSET + index * step;
    const end = start + step * 1.4;
    return [start, Math.min(1, end)];
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[250vh] bg-black text-white selection:bg-purple-500/30"
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col justify-center px-6 md:px-[5%] lg:px-[3%] overflow-hidden">
        {/* Ambient purple backlight */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-purple-900/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto w-full flex flex-col">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-[50px] font-normal tracking-tight text-[#D3C5F6] mb-8 sm:mb-12"
          >
            Building What&apos;s Next
          </motion.h2>

          {/* Scroll Reveal Editorial Paragraph */}
          <p className="text-sm sm:text-xl md:text-[22px] lg:text-[22px] text-right md:text-left font-normal leading-[1.2] md:leading-[1.4] tracking-tight">
            {paragraphWords.map((word, i) => {
              return (
                <Word
                  key={`para-${i}`}
                  progress={scrollYProgress}
                  range={getWordRange(i)}
                >
                  {word}
                </Word>
              );
            })}
          </p>

          {/* Final Punchline with Reveal Effect */}
          <div className="mt-10 sm:mt-16 md:mt-20 flex flex-col md:gap-1.5">
            <p className="text-xl sm:text-2xl lg:text-[34px] font-light tracking-tight">
              {punchline1Words.map((word, idx) => {
                const globalIndex = paragraphWords.length + idx;
                return (
                  <Word
                    key={`p1-${idx}`}
                    progress={scrollYProgress}
                    range={getWordRange(globalIndex)}
                  >
                    {word}
                  </Word>
                );
              })}
            </p>
            <h3 className="text-3xl sm:text-5xl lg:text-[60px] font-normal tracking-tight leading-tight">
              {punchline2Words.map((word, idx) => {
                const globalIndex =
                  paragraphWords.length + punchline1Words.length + idx;
                return (
                  <React.Fragment key={`p2-${idx}`}>
                    <Word
                      progress={scrollYProgress}
                      range={getWordRange(globalIndex)}
                    >
                      {word}
                    </Word>
                    {idx === 1 && <br className="md:hidden" />}
                  </React.Fragment>
                );
              })}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNext;