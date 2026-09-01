"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hamburger, HamburgerIcon, Menu } from "lucide-react";

interface NavBarProps {
  className?: string;
}

export const NormaLogo = ({ className = "h-7 w-7" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric oval resonance / soundwave icon */}
    <ellipse cx="20" cy="20" rx="18" ry="18" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" />
    <ellipse cx="20" cy="20" rx="14" ry="17" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
    <ellipse cx="20" cy="20" rx="10" ry="15" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.7" />
    <ellipse cx="20" cy="20" rx="6" ry="12" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.9" />
    <ellipse cx="20" cy="20" rx="2.5" ry="8" fill="currentColor" />
  </svg>
);

const NavBar: React.FC<NavBarProps> = ({ className = "" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`w-full z-50 ${className}`}>
      <div className="px-6 md:px-[3%] py-5 sm:py-6 grid grid-cols-3 items-center">
        {/* Left Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px] text-zinc-400 font-normal justify-self-start">
          <Link
            href="#about"
            className="hover:text-white transition-colors duration-200"
          >
            About Norma
          </Link>
          <Link
            href="#product"
            className="hover:text-white transition-colors duration-200"
          >
            Product
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-white transition-colors duration-200"
          >
            How It Works
          </Link>
        </nav>
        {/* Mobile spacer for left column */}
        <div className="md:hidden" />

        {/* Center Logo */}
        <Link
          href="/"
          className="relative w-[240px] h-[40px] sm:w-[280px] sm:h-[45px] justify-self-center"
        >
          <Image
            src="/norma-ai_logo.png"
            alt="Norma AI"
            fill
            className="object-cover select-none"
          />
        </Link>

        {/* Right Navigation & Action */}
        <div className="flex items-center gap-5 sm:gap-6 justify-self-end">
          <Link
            href="#login"
            className="text-[14px] text-zinc-400 hover:text-white transition-colors duration-200 font-normal hidden sm:inline-block"
          >
            Login
          </Link>

          {/* Grid / Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md hidden md:flex items-center justify-center transition-all duration-200 text-white cursor-pointer active:scale-95 shadow-sm"
          >
            <Image
              src="/specs_export.png"
              alt="Menu"
              width={18}
              height={18}
              className="object-contain select-none"
            />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden"
          >
            <Menu size={20} color="#fff" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-2 pb-6 bg-black/80 backdrop-blur-xl border-b border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 text-zinc-300 text-sm">
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              About Norma
            </Link>
            <Link
              href="#product"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              Product
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              How It Works
            </Link>
            <Link
              href="#login"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 sm:hidden border-t border-white/10 pt-3"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
