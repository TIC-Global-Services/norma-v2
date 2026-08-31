"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const leftLinks = [
  { label: "Desk", href: "#desk" },
  { label: "Voice", href: "#voice" },
  { label: "Scribe", href: "#scribe" },
  { label: "Super Connector", href: "#super-connector" },
];

const rightLinks = [
  { label: "Instagram", href: "https://instagram.com", target: "_blank" },
  { label: "LinkedIn", href: "https://linkedin.com", target: "_blank" },
  { label: "Twitter", href: "https://twitter.com", target: "_blank" },
  { label: "Facebook", href: "https://facebook.com", target: "_blank" },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-black text-white selection:bg-purple-500/30 overflow-hidden pt-12 pb-10 px-4 sm:px-6 lg:px-[3%]">
      {/* Background ambient lighting */}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-900/15 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="w-full mx-auto flex flex-col justify-between md:min-h-[540px]">
        {/* Navigation Links Row */}
        <div className="flex flex-wrap items-end lg:items-center justify-center lg:ustify-between gap-6 pt-4 md:pb-8">
          {/* Left Product Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 md:gap-10">
            {leftLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm sm:text-base text-zinc-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Social Links */}
          <nav className=" hidden md:flex flex-wrap items-center gap-6 sm:gap-8 md:gap-10">
            {rightLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.target}
                rel="noreferrer"
                className="text-sm sm:text-base text-zinc-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Giant Centerpiece / Call to Action with exact gradient fade */}
        <div className="flex flex-col items-center justify-center my-auto py-16 md:py-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-[30px] font-light text-[#D3C5F6] mb-2 sm:mb-4 tracking-tight"
          >
            Got a question?
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-7xl sm:text-9xl md:text-[160px] lg:text-[200px] xl:text-[200px] font-normal tracking-tight leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#E2D8F2] via-[#6D6284] to-transparent [mask-image:linear-gradient(to_bottom,white_40%,rgba(255,255,255,0.05)_90%)] transition-all duration-300"
          >
            Ask Norma
          </motion.h1>
        </div>
             <nav className=" md:hidden flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
            {rightLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.target}
                rel="noreferrer"
                className="text-sm sm:text-base text-zinc-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        {/* Bottom Metadata & Copyright Row */}
        <div className="pt-10 flex flex-col lg:flex-row items-center lg:justify-between justify-end lg:gap-6 gap-y-4 text-xs sm:text-sm text-white font-light">
          {/* Left Copyright */}
          <p className="text-center lg:text-left order-2 lg:order-1 text-zinc-400">
            2026 <span className="text-[#D3C5F6]">Norma AI.</span> Built for healthcare. Designed for trust.
          </p>

          {/* Center Contact Details */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 order-1 lg:order-2">
            <a
              href="mailto:Support@normaai.one"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-[#2A2930] flex items-center justify-center text-[10px] font-medium text-zinc-300">
                M
              </span>
              <span>Support@normaai.one</span>
            </a>

            <a
              href="tel:+9719876543210"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-[#2A2930] flex items-center justify-center text-[10px] font-medium text-zinc-300">
                T
              </span>
              <span>+971 9876543210</span>
            </a>
          </div>

          {/* Right Attribution */}
          <p className="text-center lg:text-right order-3 text-zinc-400">
            Designed and Developed by{" "}
            <span className="text-[#D3C5F6]">TIC Global Services</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;