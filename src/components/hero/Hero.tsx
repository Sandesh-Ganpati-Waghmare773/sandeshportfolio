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
      {/* Background Decorative Tech Grid & Ambient Radial Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full" />
        {/* Ambient Right Orb */}
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 blur-[140px] rounded-full" />
        {/* Ambient Left Orb */}
        <div className="absolute bottom-1/4 left-10 w-[350px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full" />
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-mono tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
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
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(129,140,248,0.25)]">
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
                  <Sparkles className="w-5 h-5 text-indigo-400 hidden sm:inline-block shrink-0" />
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
                  className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] transition-all duration-200 active:scale-95 border border-indigo-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4 text-indigo-100 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                {/* Button 2: Let's Connect -> #contact */}
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "contact")}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/[0.22] backdrop-blur-md shadow-sm transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Send className="w-4 h-4 text-indigo-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
                      className="group relative p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-indigo-400/40 text-zinc-400 hover:text-white transition-all duration-200 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                      <SocialIcon
                        icon={social.icon}
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 group-hover:scale-110"
                      />
                      {/* Tooltip on hover */}
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-900 border border-white/10 text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
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
