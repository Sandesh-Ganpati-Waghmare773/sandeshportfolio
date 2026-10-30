"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  Trophy,
  Target,
  Award,
  Users,
  Star,
  Sparkles,
  Calendar,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { ACHIEVEMENTS, type Achievement } from "@/data/achievements";

// 3D Pedestal Card Component
function PedestalCard({
  item,
  offset,
  isActive,
  onSelect,
  Icon,
}: {
  item: Achievement;
  offset: number;
  isActive: boolean;
  onSelect: () => void;
  Icon: React.ElementType;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 24 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-3deg", "3deg"]);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !isActive) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
    setSpotlight({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setSpotlight((prev) => ({ ...prev, isHovered: false }));
  };

  const absOffset = Math.abs(offset);
  const xPercent = shouldReduceMotion ? offset * 105 : offset * 54;
  const zDepth = shouldReduceMotion ? 0 : isActive ? 70 : -absOffset * 150;
  const yRotation = shouldReduceMotion ? 0 : offset * -22;
  const scale = isActive ? 1.03 : Math.max(0.72, 0.87 - absOffset * 0.09);
  const opacity = isActive ? 1 : Math.max(0.2, 0.65 - absOffset * 0.22);

  return (
    <motion.div
      ref={cardRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
        zIndex: 30 - absOffset * 10,
      }}
      animate={{
        x: `${xPercent}%`,
        z: zDepth,
        rotateY: yRotation,
        scale,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26,
      }}
      className={`w-[90%] sm:w-[460px] md:w-[520px] rounded-3xl p-6 sm:p-8 border transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer select-none backdrop-blur-xl ${
        isActive
          ? "bg-[#15181B] border-[#FF8A00]/60 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(255,138,0,0.22)]"
          : "bg-[#15181B]/85 border-[#292D32] hover:border-[#FF8A00]/30 shadow-lg"
      }`}
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion || !isActive ? 0 : rotateX,
          rotateY: shouldReduceMotion || !isActive ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full flex flex-col justify-between"
      >
        {/* Soft amber spotlight illumination on active pedestal */}
        {!shouldReduceMotion && isActive && spotlight.isHovered && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 138, 0, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Specular top-edge line highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div
          className="space-y-4 relative z-20"
          style={{ transform: shouldReduceMotion ? "none" : "translateZ(14px)" }}
        >
          {/* Top Bar: Icon, Metric Tag, and Period */}
          <div className="flex items-center justify-between gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-200 ${
                isActive
                  ? "bg-[#FF8A00]/15 border-[#FF8A00]/35 text-[#FFB020] scale-105"
                  : "bg-[#191C20] border-[#292D32] text-zinc-400"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#191C20] border border-[#FF8A00]/30 text-[#FFB020] shadow-sm">
                {item.metric}
              </span>
              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.period}</span>
              </span>
            </div>
          </div>

          {/* Category Pill */}
          <div className="pt-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#FFB020] bg-[#FF8A00]/10 border border-[#FF8A00]/20 px-2.5 py-0.5 rounded-full">
              {item.category}
            </span>
          </div>

          {/* Title & Organization */}
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
              <span>{item.organization}</span>
            </p>
          </div>

          {/* Detailed Narrative */}
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
            {item.description}
          </p>
        </div>

        {/* Footer: Pedestal Badge & Recognition Indicator */}
        <div
          className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs relative z-20"
          style={{ transform: shouldReduceMotion ? "none" : "translateZ(8px)" }}
        >
          <span className="text-zinc-500 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Milestone</span>
          </span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {item.badge}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Achievements() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const galleryStageRef = useRef<HTMLDivElement>(null);

  // Active pedestal index (0 to ACHIEVEMENTS.length - 1)
  const [activePedestalIdx, setActivePedestalIdx] = useState<number>(0);

  // Background slow scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgArcParallaxY = useTransform(scrollYProgress, [0, 1], [-20, 25]);

  // Touch and drag tracking
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Competition":
        return Trophy;
      case "Coding Milestone":
        return Target;
      case "Project Recognition":
        return Award;
      case "Leadership":
        return Users;
      case "Selection":
        return Star;
      default:
        return Sparkles;
    }
  };

  const handleNextAchievement = useCallback(() => {
    setActivePedestalIdx((prev) => (prev + 1) % ACHIEVEMENTS.length);
  }, []);

  const handlePrevAchievement = useCallback(() => {
    setActivePedestalIdx((prev) => (prev - 1 + ACHIEVEMENTS.length) % ACHIEVEMENTS.length);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevAchievement();
      else if (e.key === "ArrowRight") handleNextAchievement();
    },
    [handleNextAchievement, handlePrevAchievement]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = dragStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNextAchievement();
      else handlePrevAchievement();
    }
    setDragStartX(null);
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      aria-label="Achievements & Milestones"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Warm Brown & Orange Clean Background Graphics with Parallax Depth */}
      <motion.div
        aria-hidden="true"
        style={{
          y: shouldReduceMotion ? 0 : bgArcParallaxY,
        }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-[25%] left-[12%] w-[460px] h-[460px] bg-[radial-gradient(circle,rgba(58,33,15,0.14)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(90,45,12,0.12)_0%,rgba(255,138,0,0.02)_45%,transparent_70%)] blur-2xl" />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="achieve-arc-grad" x1="100%" y1="0%" x2="60%" y2="80%">
              <stop offset="0%" stopColor="#4A260D" stopOpacity="0" />
              <stop offset="30%" stopColor="#5A2D0C" stopOpacity="0.30" />
              <stop offset="70%" stopColor="#7A3B0B" stopOpacity="0.35" />
              <stop offset="90%" stopColor="rgba(255, 138, 0, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 138, 0, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M 1480 80 C 1200 180, 1080 440, 1420 700"
            stroke="url(#achieve-arc-grad)"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full space-y-12 sm:space-y-16">
        {/* ========================================================= */}
        {/* Section Header                                            */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FFB020] text-xs sm:text-sm font-mono tracking-widest uppercase backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>04 &bull; HONORS &amp; IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Honors &amp;{" "}
            <span className="bg-gradient-to-r from-[#FF8A00] via-[#FFB020] to-[#FF9F1C] bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Meaningful accomplishments spanning competitive hackathons, continuous algorithmic practice,
            departmental awards, and student leadership.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* 3D PEDESTAL STAGE                                         */}
        {/* ========================================================= */}
        <div className="space-y-8">
          <div
            ref={galleryStageRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Honors and Achievements gallery. Use arrow keys or swipe to navigate"
            style={{ perspective: 1350 }}
            className="relative min-h-[460px] sm:min-h-[500px] w-full flex items-center justify-center overflow-hidden py-6 select-none focus:outline-none"
          >
            {/* Glowing Pedestal Base Underneath Active Card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-8 w-[380px] sm:w-[460px] h-[70px] rounded-[50%] bg-[radial-gradient(ellipse,rgba(255,138,0,0.22)_0%,rgba(255,138,0,0.05)_50%,transparent_75%)] blur-xl"
            />

            {/* Ambient Radial Illumination */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[520px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.1)_0%,transparent_70%)] blur-3xl"
            />

            <div
              className="relative w-full max-w-4xl h-[420px] flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {ACHIEVEMENTS.map((item: Achievement, idx: number) => {
                const total = ACHIEVEMENTS.length;
                let offset = (idx - activePedestalIdx + total) % total;
                if (offset > total / 2) offset -= total;
                const isVisible = Math.abs(offset) <= 2;

                if (!isVisible) return null;

                const Icon = getCategoryIcon(item.category);

                return (
                  <PedestalCard
                    key={item.id}
                    item={item}
                    offset={offset}
                    isActive={offset === 0}
                    onSelect={() => setActivePedestalIdx(idx)}
                    Icon={Icon}
                  />
                );
              })}
            </div>
          </div>

          {/* Interactive Pedestal Waypoint Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto px-4">
            <button
              type="button"
              onClick={handlePrevAchievement}
              aria-label="Previous Achievement"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/50 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Thumbnail waypoint pills */}
            <div className="flex items-center gap-2">
              {ACHIEVEMENTS.map((ach, i) => {
                const isSelected = i === activePedestalIdx;
                const AchIcon = getCategoryIcon(ach.category);
                return (
                  <button
                    key={ach.id}
                    type="button"
                    onClick={() => setActivePedestalIdx(i)}
                    aria-label={`Select ${ach.title}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#191C20] text-white border border-[#FF8A00]/50 shadow-[0_0_12px_rgba(255,138,0,0.2)] font-bold"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <AchIcon className={`w-3.5 h-3.5 ${isSelected ? "text-[#FF8A00]" : "text-zinc-500"}`} />
                    <span className="hidden md:inline">{ach.metric.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNextAchievement}
              aria-label="Next Achievement"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/50 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
