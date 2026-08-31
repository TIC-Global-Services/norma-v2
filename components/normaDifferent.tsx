"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureCard {
  id: string;
  subhead?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  isCentered?: boolean;
  flexClass?: string;
}

interface ColumnData {
  id: string;
  className?: string;
  header?: {
    subhead: string;
    title: string;
  };
  cards: FeatureCard[];
}

const columnsData: ColumnData[] = [
  {
    id: "left-column",
    cards: [
      {
        id: "memory",
        subhead: "Persistent",
        title: "Memory",
        image: "/memory.png",
        imageAlt: "Persistent Memory Database",
        description:
          "Every patient, every conversation, every preference—remembered forever. Not just in this session.",
        imageClassName: "w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36",
      },
      {
        id: "integration",
        subhead: "Zero",
        title: "Integration",
        image: "/itegration.png",
        imageAlt: "Zero Integration Lightning",
        description:
          "Connect your WhatsApp number. That's it. Works with any EHR or standalone.",
        imageClassName: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32",
      },
    ],
  },
  {
    id: "center-column",
    className: "md:col-span-2 lg:col-span-1",
    header: {
      subhead: "What makes",
      title: "Norma different",
    },
    cards: [
      {
        id: "hours",
        title: "After-Hours Autonomy",
        image: "/hours.png",
        imageAlt: "After-Hours Autonomy Hourglass",
        description:
          "Your clinic closes. Norma keeps working. 24/7 with the same quality.",
        isCentered: true,
        flexClass: "flex-[1.3] min-h-[320px] sm:min-h-[350px]",
        imageClassName: "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28",
      },
      {
        id: "human-quality",
        title: "Human Quality",
        image: "/human-quality.png",
        imageAlt: "Human Quality AI",
        description:
          "ElevenLabs voice that sounds natural. Intelligence that feels warm, not robotic.",
        isCentered: true,
        flexClass: "flex-1 min-h-[260px] sm:min-h-[280px]",
        imageClassName: "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24",
      },
    ],
  },
  {
    id: "right-column",
    cards: [
      {
        id: "multilingual",
        subhead: "True",
        title: "Multilingual",
        image: "/multilingual.png",
        imageAlt: "True Multilingual Globe",
        description:
          "100+ languages including Arabic, Hindi, Urdu, Tagalog. Speaks your patients' language.",
        imageClassName: "w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36",
      },
      {
        id: "gcc",
        subhead: "Built",
        title: "For GCC",
        image: "/lock.png",
        imageAlt: "Built For GCC Security Lock",
        description:
          "DHA, MOHAP, HIPAA, GDPR, ISO 27001 compliant. Your data stays in the region.",
        imageClassName: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32",
      },
    ],
  },
];

const NormaDifferent: React.FC = () => {
  const centerHeader = columnsData.find((col) => col.header)?.header;

  return (
    <section className="relative w-full bg-black text-white px-4 sm:px-6 lg:px-[3%] py-16 lg:py-24 overflow-hidden border-b border-[#262626]">
      <div className="">
        {/* Mobile / Tablet Header (hidden on desktop where header sits in center column) */}
        {centerHeader && (
          <div className="block lg:hidden text-center mb-10">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-3xl text-[#C4B5FD] font-light leading-none"
            >
              {centerHeader.subhead}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-[3.125rem] font-normal text-[#C4B5FD] tracking-tight leading-none"
            >
              {centerHeader.title}
            </motion.h2>
          </div>
        )}

        {/* 3-Column Bento Grid rendered from Array of Objects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {columnsData.map((column, colIndex) => (
            <div
              key={column.id}
              className={`flex flex-col gap-5 lg:gap-4 h-full ${
                column.className || ""
              }`}
            >
              {/* Desktop Center Column Header */}
              {column.header && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="hidden lg:flex flex-col items-center justify-center text-center py-2"
                >
                  <p className="text-xl lg:text-[22px] text-[#C4B5FD] font-light leading-none">
                    {column.header.subhead}
                  </p>
                  <h2 className="text-3xl lg:text-[44px] font-normal text-[#C4B5FD] tracking-tight leading-tight mt-1.5">
                    {column.header.title}
                  </h2>
                </motion.div>
              )}

              {/* Cards within Column */}
              {column.cards.map((card, cardIndex) => {
                const delay = (colIndex * 2 + cardIndex) * 0.06;

                if (card.isCentered) {
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay }}
                      className={`group relative rounded-[14px] bg-[#242427] border border-white/[0.07] hover:border-purple-400/30 p-6 sm:p-7 lg:p-8 flex flex-col items-center text-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20 ${
                        card.flexClass || "flex-1 min-h-[300px]"
                      }`}
                    >
                      <div
                        className={`relative ${
                          card.imageClassName || "w-20 h-20"
                        } mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Image
                          src={card.image}
                          alt={card.imageAlt}
                          fill
                          className="object-cover select-none"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl lg:text-[2.125rem] font-normal text-white tracking-tight mb-2">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-lg text-zinc-400 font-light leading-[1.3] max-w-sm mx-auto">
                          {card.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay }}
                    className={`group relative rounded-[14px] bg-[#242427] border border-white/[0.07] hover:border-purple-400/30 p-6 sm:p-7 lg:p-8 flex flex-col justify-between flex-1 min-h-[300px] sm:min-h-[330px] transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20 ${
                      card.flexClass || ""
                    }`}
                  >
                    <div>
                      {card.subhead && (
                        <span className="text-sm sm:text-xl text-zinc-300 font-light block leading-none">
                          {card.subhead}
                        </span>
                      )}
                      <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-normal text-white tracking-tight leading-none">
                        {card.title}
                      </h3>
                    </div>

                    <div
                      className={`relative ${
                        card.imageClassName || "w-28 h-28"
                      } mx-auto my-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        className="object-cover select-none"
                      />
                    </div>

                    <p className="text-xs sm:text-lg text-zinc-400 font-light leading-[1.3] max-w-sm">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NormaDifferent;