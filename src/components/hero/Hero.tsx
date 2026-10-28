"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  Send,
  Sparkles,
} from "lucide-react";
import InteractiveProfileCard from "./InteractiveProfileCard";
import { SOCIAL_PROFILES } from "@/data/contact";
import SocialIcon from "@/components/common/SocialIcon";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Smooth scroll handler for hero CTA buttons
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  // Easing curve for premium entrance feel
  const transitionCurve = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const };

  // 1. Small introduction animation variant
  const introVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...transitionCurve, delay: shouldReduceMotion ? 0 : 0.15 },
    },
  };

  // 2. Name reveal animation variant
  const nameVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...transitionCurve, delay: shouldReduceMotion ? 0 : 0.3 },
    },
  };

  // 3. Role animation variant
  const roleVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...transitionCurve, delay: shouldReduceMotion ? 0 : 0.45 },
    },
  };

  // 4. Description animation variant
  const descVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...transitionCurve, delay: shouldReduceMotion ? 0 : 0.6 },
    },
  };

  // 5. Buttons and Social Links animation variant
  const actionsVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...transitionCurve, delay: shouldReduceMotion ? 0 : 0.75 },
    },
  };

  // 6. Profile image / card entrance variant
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.94,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 240,
            damping: 24,
            delay: 0.9,
          },
    },
  };



  return (
    <section
      id="home"
      aria-label="Home / Hero Section"
      className="relative min-h-screen lg:min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Subtle Warm Brown & Orange Flowing Background Graphics */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Soft radial illumination behind/around profile card (right) and subtle lower-left warmth */}
        <div className="absolute top-1/2 right-[5%] lg:right-[10%] -translate-y-1/2 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(90,45,12,0.22)_0%,rgba(58,33,15,0.12)_45%,transparent_70%)] blur-2xl" />
        <div className="absolute top-1/2 right-[8%] lg:right-[12%] -translate-y-1/2 w-[340px] h-[340px] bg-[#FF8A00]/[0.035] blur-[100px] rounded-full" />
        <div className="absolute bottom-10 left-[3%] w-[440px] h-[440px] bg-[radial-gradient(circle,rgba(58,33,15,0.18)_0%,transparent_70%)] blur-3xl" />

        {/* Large flowing curved lines & ribbon sweeping from lower-left to right behind profile card */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Flowing ribbon soft gradient fill */}
            <linearGradient id="hero-ribbon-fill" x1="0%" y1="100%" x2="100%" y2="25%">
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0" />
              <stop offset="25%" stopColor="#4A260D" stopOpacity="0.12" />
              <stop offset="55%" stopColor="#5A2D0C" stopOpacity="0.18" />
              <stop offset="80%" stopColor="#7A3B0B" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#7A3B0B" stopOpacity="0" />
            </linearGradient>

            {/* Upper sweeping contour stroke */}
            <linearGradient id="hero-stroke-upper" x1="0%" y1="100%" x2="100%" y2="20%">
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0" />
              <stop offset="25%" stopColor="#4A260D" stopOpacity="0.35" />
              <stop offset="55%" stopColor="#5A2D0C" stopOpacity="0.55" />
              <stop offset="80%" stopColor="#7A3B0B" stopOpacity="0.50" />
              <stop offset="90%" stopColor="rgba(255, 138, 0, 0.25)" />
              <stop offset="100%" stopColor="rgba(255, 138, 0, 0)" />
            </linearGradient>

            {/* Lower sweeping contour stroke */}
            <linearGradient id="hero-stroke-lower" x1="0%" y1="100%" x2="100%" y2="30%">
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0" />
              <stop offset="30%" stopColor="#4A260D" stopOpacity="0.30" />
              <stop offset="65%" stopColor="#5A2D0C" stopOpacity="0.40" />
              <stop offset="85%" stopColor="#7A3B0B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7A3B0B" stopOpacity="0" />
            </linearGradient>

            {/* Ambient secondary wave stroke */}
            <linearGradient id="hero-stroke-secondary" x1="10%" y1="90%" x2="90%" y2="10%">
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0" />
              <stop offset="40%" stopColor="#4A260D" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#5A2D0C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgba(255, 138, 0, 0)" />
            </linearGradient>

            {/* Geometric accent line gradient */}
            <linearGradient id="hero-diag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A260D" stopOpacity="0" />
              <stop offset="50%" stopColor="#5A2D0C" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#3A210F" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Flowing Ribbon Path */}
          <path
            d="M -100 860 C 240 820, 520 730, 760 570 C 980 420, 1160 300, 1540 250 L 1540 310 C 1180 360, 1000 480, 780 630 C 530 800, 250 880, -100 910 Z"
            fill="url(#hero-ribbon-fill)"
          />

          {/* Upper Sweeping Arc / Crest Contour Line */}
          <path
            d="M -100 860 C 240 820, 520 730, 760 570 C 980 420, 1160 300, 1540 250"
            stroke="url(#hero-stroke-upper)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />

          {/* Lower Sweeping Contour Line */}
          <path
            d="M -100 910 C 250 880, 530 800, 780 630 C 1000 480, 1180 360, 1540 310"
            stroke="url(#hero-stroke-lower)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />

          {/* Secondary Whispering Harmonic Wave (Rising Higher toward upper right) */}
          <path
            d="M 50 930 C 400 880, 720 700, 990 490 C 1200 320, 1380 200, 1540 130"
            stroke="url(#hero-stroke-secondary)"
            strokeWidth="0.85"
            strokeDasharray="8 6"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />

          {/* Subtle Geometric Diagonal Accent Line in Upper-Right Corner */}
          <path
            d="M 1240 80 L 1480 320"
            stroke="url(#hero-diag-grad)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ========================================================= */}
          {/* LEFT SIDE: Hero Introduction, Name, Role, CTAs, Socials   */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6 sm:space-y-7">
            {/* Step 1: Small Introduction Badge */}
            <motion.div
              variants={introVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FFB020] text-xs sm:text-sm font-mono tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(255,138,0,0.1)]">
                <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
                <span>HELLO, I&apos;M</span>
              </div>
            </motion.div>

            {/* Step 2: Large Heading - SANDESH WAGHMARE */}
            <motion.div
              variants={nameVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                SANDESH{" "}
                <span className="bg-gradient-to-r from-[#FF8A00] via-[#FFB020] to-[#FF9F1C] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,138,0,0.2)]">
                  WAGHMARE
                </span>
              </h1>
            </motion.div>

            {/* Step 3: Role - Computer Engineering Student & Developer */}
            <motion.div
              variants={roleVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="inline-block">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-300 flex items-center justify-center lg:justify-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#FF8A00] hidden sm:inline-block shrink-0" />
                  <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    Computer Engineering Student &amp; Developer
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Step 4: Short Professional Description */}
            <motion.div
              variants={descVariants}
              initial="hidden"
              animate="visible"
              className="max-w-xl mx-auto lg:mx-0"
            >
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-normal">
                Passionate about building responsive, modern web applications and
                interactive digital experiences. Combining foundational computer
                engineering principles with creative frontend design to solve real-world problems.
              </p>
            </motion.div>

            {/* Step 5: Buttons & Social Links */}
            <motion.div
              variants={actionsVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 pt-2"
            >
              {/* Primary & Secondary CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
                {/* Button 1: Explore My Work -> #projects */}
                <a
                  href="#projects"
                  onClick={(e) => handleScrollTo(e, "projects")}
                  className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#0B0D0F] bg-[#FF8A00] hover:bg-[#E86F00] shadow-[0_0_20px_rgba(255,138,0,0.3)] hover:shadow-[0_0_30px_rgba(232,111,0,0.45)] transition-all duration-200 active:scale-95 border border-[#FFB020]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4 text-[#0B0D0F] transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                {/* Button 2: Let's Connect -> #contact */}
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "contact")}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-zinc-200 hover:text-white bg-[#15181B] hover:bg-[#191C20] border border-[#292D32] hover:border-[#3F444D] backdrop-blur-md shadow-sm transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
                >
                  <Send className="w-4 h-4 text-[#FF8A00] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span>Let&apos;s Connect</span>
                </a>
              </div>

              {/* Social Profile Icons */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 mr-1 hidden sm:inline-block">
                  Connect:
                </span>
                {SOCIAL_PROFILES.map((social) => {
                  const isExternal = !social.href.startsWith("mailto:");
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={social.ariaLabel}
                      title={social.ariaLabel}
                      className="group relative p-2.5 rounded-xl bg-[#15181B] hover:bg-[#191C20] border border-[#292D32] hover:border-[#FF8A00]/50 text-zinc-400 hover:text-white transition-all duration-200 hover:shadow-[0_0_15px_rgba(255,138,0,0.2)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
                    >
                      <SocialIcon
                        icon={social.icon}
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 group-hover:scale-110"
                      />
                      {/* Tooltip on hover */}
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-medium bg-[#15181B] border border-[#292D32] text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Interactive 3D Profile Card with Photo        */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex justify-center items-center">
            {/* Step 6: Profile Image / Card Enters */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="w-full flex justify-center"
            >
              <InteractiveProfileCard />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
