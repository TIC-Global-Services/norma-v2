"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface ComparisonRow {
  feature: string;
  norma: boolean | string;
  others: boolean | string;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Persistent patient memory",
    norma: true,
    others: false,
  },
  {
    feature: "100+ languages",
    norma: true,
    others: "English only",
  },
  {
    feature: "WhatsApp native",
    norma: true,
    others: false,
  },
  {
    feature: "Zero setup required",
    norma: true,
    others: "Requires EHR stack",
  },
  {
    feature: "DHA & MOHAP compliant",
    norma: true,
    others: false,
  },
  {
    feature: "Any EHR integration",
    norma: true,
    others: "Locked to specific systems",
  },
  {
    feature: "Monthly contracts",
    norma: true,
    others: "Annual only",
  },
];

const GulfClinic: React.FC = () => {
  return (
    <section className="relative w-full py-24 md:py-32 px-4 sm:px-6 lg:px-[5%] bg-black text-white selection:bg-purple-500/30 overflow-hidden">
      {/* Ambient glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-900/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal tracking-tight text-[#D3C5F6] text-center mb-12 md:mb-16"
        >
          Why Gulf clinics choose Norma
        </motion.h2>

        {/* Comparison Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full rounded-2xl border border-zinc-800/90 bg-[#0C0D0E]/80 backdrop-blur-md overflow-hidden shadow-2xl"
        >
          {/* Header Row */}
          <div className="grid grid-cols-12 border-b border-zinc-800/90 text-sm sm:text-lg font-normal text-zinc-300">
            <div className="col-span-6 sm:col-span-6 p-4 sm:p-5 pl-6 sm:pl-8 text-left font-medium text-white">
              Feature
            </div>
            <div className="col-span-3 sm:col-span-3 p-4 sm:p-5 text-center font-medium text-white border-l border-zinc-800/90 bg-white/[0.02]">
              Norma
            </div>
            <div className="col-span-3 sm:col-span-3 p-4 sm:p-5 text-center font-medium text-white border-l border-zinc-800/90">
              Others
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-zinc-800/80">
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center text-xs sm:text-sm md:text-base transition-colors duration-200 hover:bg-white/[0.02]"
              >
                {/* Feature Name */}
                <div className="col-span-6 sm:col-span-6 p-4 sm:p-5 pl-6 sm:pl-8 text-left text-zinc-300 font-light">
                  {row.feature}
                </div>

                {/* Norma Column */}
                <div className="col-span-3 sm:col-span-3 p-4 sm:p-5 flex items-center justify-center border-l border-zinc-800/90 bg-[#B9B9B9]/5">
                  {row.norma === true ? (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFFFFF] flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2DB06A] stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-zinc-200 font-medium">{row.norma}</span>
                  )}
                </div>

                {/* Others Column */}
                <div className="col-span-3 sm:col-span-3 p-4 sm:p-5 flex items-center justify-center border-l border-zinc-800/90 text-center">
                  {row.others === false ? (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFFFFF] flex items-center justify-center shadow-sm">
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF0000] stroke-[2]" />
                    </div>
                  ) : row.others === true ? (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFFFFF] flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2DB06A] stroke-[2]" />
                    </div>
                  ) : (
                    <span className="text-white font-light text-xs sm:text-sm">
                      {row.others}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GulfClinic;
