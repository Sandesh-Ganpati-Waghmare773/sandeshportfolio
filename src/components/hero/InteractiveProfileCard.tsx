"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { GraduationCap, Sparkles, Terminal } from "lucide-react";

/**
 * =========================================================================
 * PROFILE IMAGE CONFIGURATION
 * -------------------------------------------------------------------------
 * Sandesh: When you are ready to use your personal photo:
 * 1. Put your image in `public/images/` (e.g. `public/images/sandesh.jpg`)
 * 2. Change DEFAULT_IMAGE_SRC below to "/images/sandesh.jpg" or pass it
 *    via the `imageSrc` prop in `<Hero />`.
 * =========================================================================
 */
export const DEFAULT_IMAGE_SRC = "/images/sandesh.jpg";

interface InteractiveProfileCardProps {
  imageSrc?: string | null;
  alt?: string;
  className?: string;
}

export default function InteractiveProfileCard({
  imageSrc = DEFAULT_IMAGE_SRC,
  alt = "Sandesh Waghmare - Computer Engineering Student & Developer",
  className = "",
}: InteractiveProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Motion values tracking normalized mouse coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics-based spring damping for organic return to neutral
  const springConfig = { stiffness: 220, damping: 22, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle 3D tilt transforms: rotateX from Y-axis, rotateY from X-axis
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-9deg", "9deg"]);

  // Subtle parallax depth shift for inner content
  const depthX = useTransform(smoothMouseX, [-0.5, 0.5], ["-6px", "6px"]);
  const depthY = useTransform(smoothMouseY, [-0.5, 0.5], ["-6px", "6px"]);

  // Dynamic light sheen position following mouse
  const sheenX = useTransform(smoothMouseX, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(smoothMouseY, [-0.5, 0.5], ["0%", "100%"]);

  // Dynamic light sheen gradient following mouse
  const sheenBackground = useTransform(
    [sheenX, sheenY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.4) 0%, rgba(99,102,241,0.15) 35%, transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;

    // Relative mouse position within card
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Normalize from -0.5 (left/top) to +0.5 (right/bottom)
    mouseX.set(currentX / width - 0.5);
    mouseY.set(currentY / height - 0.5);
  };

  const handleMouseLeave = () => {
    // Smoothly spring back to flat neutral position
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className={`relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/5] mx-auto select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Background Decorative Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl opacity-75"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-20 rounded-full bg-blue-600/10 blur-[100px]"
      />

      {/* Decorative Orbital Ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 sm:-inset-6 -z-10 rounded-3xl border border-dashed border-indigo-500/20"
      />

      {/* 3D Tilt Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative w-full h-full rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(99,102,241,0.15)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(99,102,241,0.25)] group touch-pan-y"

      >
        {/* Subtle holographic sheen overlay */}
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl z-30 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
            style={{
              background: sheenBackground,
            }}
          />
        )}

        {/* Outer Corner Tech Accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-indigo-400/60 rounded-tl-sm z-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-indigo-400/60 rounded-tr-sm z-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-indigo-400/60 rounded-bl-sm z-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-indigo-400/60 rounded-br-sm z-20"
        />

        {/* Inner Card Layer with Depth Effect */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : depthX,
            y: shouldReduceMotion ? 0 : depthY,
            transform: "translateZ(26px)",
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0c0d14] border border-white/[0.08]"
        >
          {/* Profile Photo Display */}
          {imageSrc ? (
            <div className="relative w-full h-full">
              <Image
                src={imageSrc}
                alt={alt}
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px"
                className="object-cover object-top filter brightness-[0.98] contrast-[1.02] transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Subtle gradient vignette at bottom of image for seamless integration */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090d]/90 via-[#08090d]/20 to-transparent"
              />
            </div>
          ) : (
            /* Fallback Clean Avatar Graphic if no image path provided */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-950/40 via-[#0d0e17] to-purple-950/30 text-center">
              <div className="w-24 h-24 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-[0_0_25px_rgba(99,102,241,0.3)]">
                <Terminal className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                SANDESH WAGHMARE
              </h3>
              <p className="text-xs text-indigo-300/80 mt-1">
                Computer Engineering Student
              </p>
            </div>
          )}

          {/* Bottom Card Identity Strip */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 flex items-end justify-between backdrop-blur-md bg-gradient-to-t from-[#08090d]/95 via-[#08090d]/70 to-transparent border-t border-white/[0.06]">
            <div>
              <p className="text-[11px] font-mono tracking-widest uppercase text-indigo-400 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available to Collaborate
              </p>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                Sandesh Waghmare
              </h2>
              <p className="text-xs text-zinc-400">Student & Developer</p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-medium text-zinc-300 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Full-Stack</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Glassmorphic Badge 1: Top Right */}
        <motion.div
          style={{
            transform: "translateZ(48px)",
          }}
          className="absolute -top-3 sm:-top-4 -right-2 sm:-right-4 z-40 hidden xs:flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#0e101a]/90 border border-indigo-400/30 text-white shadow-xl shadow-black/60 backdrop-blur-xl"
        >
          <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 leading-none">
              Discipline
            </p>
            <p className="text-xs font-semibold text-white leading-tight mt-0.5">
              Computer Engineering
            </p>
          </div>
        </motion.div>

        {/* Floating Glassmorphic Badge 2: Bottom Left */}
        <motion.div
          style={{
            transform: "translateZ(44px)",
          }}
          className="absolute -bottom-3 sm:-bottom-4 -left-2 sm:-left-4 z-40 flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#0e101a]/90 border border-white/[0.12] text-white shadow-xl shadow-black/60 backdrop-blur-xl"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <p className="text-xs font-medium text-zinc-200">
            Interactive Experiences
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
