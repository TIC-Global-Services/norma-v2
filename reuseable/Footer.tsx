"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TextType from "./textType";

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const leftLinks = [
  { label: "Desk", href: "#desk" },
  { label: "Voice", href: "#voice" },
  { label: "Scribe", href: "#scribe" },
  { label: "Super Connector", href: "#super-connector" },
];

const rightLinks = [
  { label: "Instagram", href: "https://instagram.com", target: "_blank", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", target: "_blank", icon: LinkedinIcon },
  { label: "Twitter", href: "https://twitter.com", target: "_blank", icon: TwitterIcon },
  { label: "Facebook", href: "https://facebook.com", target: "_blank", icon: FacebookIcon },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-black text-white selection:bg-purple-500/30 overflow-hidden pt-12 pb-10 px-4 sm:px-6 lg:px-[3%]">
      {/* Background ambient lighting */}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-900/15 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="w-full mx-auto flex flex-col justify-between md:min-h-[540px]">
        {/* Navigation Links Row */}
        <div className="flex flex-wrap items-end lg:items-center justify-center lg:justify-between gap-6 pt-4 md:pb-8">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <TextType
              as="h1"
              text="Ask Norma"
              typingSpeed={120}
              pauseDuration={3000}
              deletingSpeed={70}
              loop={false}
              startOnVisible={true}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-[#D3C5F6] [background-clip:unset] [color:#D3C5F6]"
              className="text-7xl sm:text-9xl md:text-[160px] lg:text-[200px] xl:text-[200px] font-normal tracking-tight leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#E2D8F2] via-[#6D6284] to-transparent [mask-image:linear-gradient(to_bottom,white_40%,rgba(255,255,255,0.05)_90%)] transition-all duration-300"
            />
          </motion.div>
          <div className="flex flex-wrap  md:hidden text-sm items-center justify-start gap-2 mt-5 sm:gap-8 order-1 lg:order-2">
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
        </div>
        
        {/* Mobile Social Links with Logos */}
        <nav className="md:hidden flex items-center justify-center gap-2 my-5">
          {rightLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.target}
                rel="noreferrer"
                aria-label={link.label}
                className="w-10 h-10 rounded-full bg-[#2A2930]/80 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
        </nav>
        {/* Bottom Metadata & Copyright Row */}
        <div className="md:pt-10 flex flex-col lg:flex-row items-center mt-10 lg:justify-between justify-end lg:gap-6 gap-y-4 text-xs sm:text-sm text-white font-light">
          {/* Left Copyright */}
          <p className="text-center text-base lg:text-left order-2 lg:order-1 text-zinc-400">
            2026 <span className="text-[#D3C5F6]">Norma AI.</span><br className="md:hidden"/> Built for healthcare. Designed for trust.
          </p>

          {/* Center Contact Details */}
          <div className="hidden md:flex flex-wrap items-center justify-start gap-3 sm:gap-8 order-1 lg:order-2">
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
          <p className="text-center text-sm lg:text-right order-3 text-zinc-400 mt-4">
            Designed and Developed by{" "}
            <span className="text-[#D3C5F6]">TIC Global Services</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;