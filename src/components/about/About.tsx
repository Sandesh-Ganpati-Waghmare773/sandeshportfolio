"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  User,
  GraduationCap,
  Code2,
  Rocket,
  Flame,
  Sparkles,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import {
  STORY_PILLARS,
  EDUCATION_JOURNEY,
  QUICK_STATS,
  type StoryPillar,
  type EducationJourneyItem,
} from "@/data/about";

// Subtle interactive 3D card wrapper with localized amber spotlight
function DepthCard({
  children,
  className = "",
  variants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, isHovered: false });

  const springConfig = { stiffness: 260, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
    setSpotlightPos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setSpotlightPos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="relative h-full"
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full rounded-2xl sm:rounded-3xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/40 transition-colors duration-300 shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(255,138,0,0.1)] overflow-hidden ${className}`}
      >
        {!shouldReduceMotion && spotlightPos.isHovered && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-100 transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(320px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 138, 0, 0.08), transparent 70%)`,
            }}
          />
        )}
        <div
          style={{ transform: shouldReduceMotion ? "none" : "translateZ(12px)" }}
          className="relative z-20 h-full flex flex-col justify-between"
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pathStageRef = useRef<HTMLDivElement>(null);

  // Active step along the 3D Story Path (0 to STORY_PILLARS.length - 1)
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);

  // Background slow scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [-25, 35]);

  // Touch and drag tracking for 3D Story Path
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "User":
        return User;
      case "GraduationCap":
        return GraduationCap;
      case "Code2":
        return Code2;
      case "Rocket":
        return Rocket;
      case "Flame":
        return Flame;
      default:
        return Sparkles;
    }
  };

  const handleNextStory = useCallback(() => {
    setActiveStoryIdx((prev) => (prev + 1) % STORY_PILLARS.length);
  }, []);

  const handlePrevStory = useCallback(() => {
    setActiveStoryIdx((prev) => (prev - 1 + STORY_PILLARS.length) % STORY_PILLARS.length);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevStory();
      else if (e.key === "ArrowRight") handleNextStory();
    },
    [handleNextStory, handlePrevStory]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = dragStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNextStory();
      else handlePrevStory();
    }
    setDragStartX(null);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Sandesh Waghmare"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Warm Brown & Orange Contour Background Graphics with Slow Scroll Depth */}
      <motion.div
        aria-hidden="true"
        style={{
          y: shouldReduceMotion ? 0 : bgParallaxY,
        }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-[12%] left-[4%] w-[460px] h-[460px] bg-[radial-gradient(circle,rgba(58,33,15,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[15%] right-[6%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(90,45,12,0.16)_0%,rgba(255,138,0,0.03)_45%,transparent_70%)] blur-2xl" />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="about-contour-main" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0" />
              <stop offset="20%" stopColor="#4A260D" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#5A2D0C" stopOpacity="0.45" />
              <stop offset="75%" stopColor="#7A3B0B" stopOpacity="0.35" />
              <stop offset="90%" stopColor="rgba(255, 138, 0, 0.20)" />
              <stop offset="100%" stopColor="rgba(255, 138, 0, 0)" />
            </linearGradient>

            <linearGradient id="about-contour-secondary" x1="0%" y1="20%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A260D" stopOpacity="0" />
              <stop offset="30%" stopColor="#3A210F" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#5A2D0C" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#7A3B0B" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="about-ribbon-fill" x1="0%" y1="0%" x2="80%" y2="60%">
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0.10" />
              <stop offset="40%" stopColor="#4A260D" stopOpacity="0.08" />
              <stop offset="80%" stopColor="#5A2D0C" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#5A2D0C" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M -60 100 C 320 180, 580 320, 880 280 L 880 320 C 560 370, 300 240, -60 160 Z"
            fill="url(#about-ribbon-fill)"
          />

          <path
            d="M -60 100 C 320 180, 580 320, 880 280 C 1120 250, 1320 450, 1500 700"
            stroke="url(#about-contour-main)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />

          <path
            d="M -60 150 C 300 230, 560 370, 860 330 C 1100 300, 1300 500, 1500 750"
            stroke="url(#about-contour-secondary)"
            strokeWidth="0.85"
            strokeDasharray="7 5"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-24">
        {/* ========================================================= */}
        {/* Section Header                                            */}
        {/* ========================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FFB020] text-xs sm:text-sm font-mono tracking-widest uppercase backdrop-blur-md">
            <User className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>01 &bull; ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Engineering Ideas into{" "}
            <span className="bg-gradient-to-r from-[#FF8A00] via-[#FFB020] to-[#FF9F1C] bg-clip-text text-transparent">
              Interactive Reality
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            A look into who I am, my academic foundation in Computer Engineering,
            and my continuous drive to engineer intuitive, real-world digital solutions.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Quick Stats: Floating 3D Chips                            */}
        {/* ========================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {QUICK_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
              className="relative p-4 sm:p-5 rounded-2xl bg-[#15181B] border border-[#292D32] text-center hover:border-[#FF8A00]/40 transition-all duration-200 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(255,138,0,0.1)] overflow-hidden group"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#FF8A00]/30 transition-all"
              />
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                {stat.label}
              </p>
              <p className="text-sm sm:text-base font-bold text-white mt-1">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ========================================================= */}
        {/* 3D STORY PATH: Interactive Spatial Journey Through Pillars */}
        {/* ========================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center text-[#FF8A00]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>The Story &amp; Mindset</span>
                  <span className="text-xs font-mono text-[#FFB020] px-2 py-0.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20">
                    Pillar {activeStoryIdx + 1} of {STORY_PILLARS.length}
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Five pillars shaping how I build software and approach challenges
                </p>
              </div>
            </div>

            {/* Path Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handlePrevStory}
                aria-label="Previous Story Pillar"
                className="w-9 h-9 rounded-xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/50 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextStory}
                aria-label="Next Story Pillar"
                className="w-9 h-9 rounded-xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/50 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Milestone Waypoint Bar */}
          <div className="flex items-center justify-between gap-1 sm:gap-2 px-2 py-3 rounded-2xl bg-[#15181B]/80 border border-[#292D32] backdrop-blur-md overflow-x-auto">
            {STORY_PILLARS.map((p, idx) => {
              const isActive = idx === activeStoryIdx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveStoryIdx(idx)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] cursor-pointer ${
                    isActive
                      ? "bg-[#191C20] text-white border border-[#FF8A00]/40 shadow-[0_0_15px_rgba(255,138,0,0.15)] font-bold"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-[#FF8A00] animate-pulse" : "bg-zinc-600"
                    }`}
                  />
                  <span>0{idx + 1}</span>
                  <span className="hidden md:inline text-zinc-300">
                    {p.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3D Story Path Stage */}
          <div
            ref={pathStageRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Story and Mindset. Use left/right arrow keys or swipe to navigate"
            style={{ perspective: 1200 }}
            className="relative min-h-[380px] sm:min-h-[400px] w-full flex items-center justify-center overflow-hidden py-6 select-none focus:outline-none"
          >
            {/* Soft Ambient Spotlight behind active card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[460px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.12)_0%,transparent_70%)] blur-2xl"
            />

            <div
              className="relative w-full max-w-4xl h-[340px] sm:h-[360px] flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {STORY_PILLARS.map((pillar: StoryPillar, idx: number) => {
                const total = STORY_PILLARS.length;
                let offset = (idx - activeStoryIdx + total) % total;
                if (offset > total / 2) offset -= total;

                const isActive = offset === 0;
                const isAdjacent = Math.abs(offset) === 1;
                const isVisible = Math.abs(offset) <= 2;

                if (!isVisible) return null;

                const Icon = getIcon(pillar.icon);

                // 3D positioning along the depth story path
                const xOffset = shouldReduceMotion
                  ? offset * 105
                  : offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 85 : 140);
                const zDepth = shouldReduceMotion ? 0 : isActive ? 50 : -Math.abs(offset) * 120;
                const rotateY = shouldReduceMotion ? 0 : offset * -14;
                const scale = isActive ? 1.03 : 0.86 - Math.abs(offset) * 0.08;
                const opacity = isActive ? 1 : isAdjacent ? 0.65 : 0.25;

                return (
                  <motion.div
                    key={pillar.id}
                    onClick={() => setActiveStoryIdx(idx)}
                    style={{
                      position: "absolute",
                      transformStyle: "preserve-3d",
                      zIndex: 30 - Math.abs(offset) * 10,
                    }}
                    animate={{
                      x: `${xOffset}%`,
                      z: zDepth,
                      rotateY,
                      scale,
                      opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                    }}
                    className={`w-[88%] sm:w-[420px] md:w-[480px] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border backdrop-blur-xl transition-colors duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#15181B] border-[#FF8A00]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,138,0,0.18)]"
                        : "bg-[#15181B]/90 border-[#292D32] hover:border-[#FF8A00]/30 shadow-lg"
                    }`}
                  >
                    <div className="space-y-5">
                      {/* Top Bar: Pillar Badge and Icon */}
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-mono tracking-widest uppercase text-[#FFB020] bg-[#FF8A00]/10 border border-[#FF8A00]/25 px-3 py-1 rounded-full">
                          {pillar.badge}
                        </span>
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-200 ${
                            isActive
                              ? "bg-[#FF8A00]/15 border-[#FF8A00]/40 text-[#FFB020] scale-105"
                              : "bg-[#191C20] border-[#292D32] text-zinc-400"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Pillar Title */}
                      <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                        {pillar.title}
                      </h4>

                      {/* Pillar Summary */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                        {pillar.summary}
                      </p>

                      {/* Bottom Path Indicator */}
                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-500">Milestone</span>
                        <span className="text-[#FFB020] flex items-center gap-1.5 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                          0{idx + 1} of 0{STORY_PILLARS.length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Education & Academic Journey: 3D Layered Academic Stage   */}
        {/* ========================================================= */}
        <div className="space-y-8 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center text-[#FF8A00]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Education &amp; Academic Journey
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Formal education and technical foundation in Computer Engineering
              </p>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{ perspective: 1200 }}
          >
            {EDUCATION_JOURNEY.map((edu: EducationJourneyItem) => (
              <DepthCard
                key={edu.id}
                variants={itemVariants}
                className="p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Bar with Period and Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFB020] bg-[#FF8A00]/10 border border-[#FF8A00]/20 px-2.5 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {edu.status}
                    </span>
                  </div>

                  {/* Degree & College */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#FFB020] transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 flex items-center gap-1.5 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                      <span>{edu.institution}</span>
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-xs font-medium text-zinc-500 group-hover:text-[#FFB020] transition-colors">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF8A00]" />
                  <span>Verified Academic Credential</span>
                </div>
              </DepthCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
