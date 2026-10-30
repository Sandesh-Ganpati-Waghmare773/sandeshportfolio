"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Sparkles,
  FolderGit2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// 3D Deck Card Component with internal parallax and multi-plane depth
function CinematicDeckCard({
  project,
  offset,
  isActive,
  onSelect,
}: {
  project: Project;
  offset: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 24 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["3.5deg", "-3.5deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-3.5deg", "3.5deg"]);
  const imageX = useTransform(smoothX, [-0.5, 0.5], ["-10px", "10px"]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], ["-8px", "8px"]);

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

  // 3D Deck calculation
  const absOffset = Math.abs(offset);
  const xPercent = shouldReduceMotion ? offset * 105 : offset * 52;
  const zDepth = shouldReduceMotion ? 0 : isActive ? 60 : -absOffset * 150;
  const yRotation = shouldReduceMotion ? 0 : offset * -20;
  const scale = isActive ? 1.02 : Math.max(0.72, 0.88 - absOffset * 0.1);
  const opacity = isActive ? 1 : Math.max(0.2, 0.68 - absOffset * 0.25);

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
      className={`w-[90%] sm:w-[480px] md:w-[560px] rounded-3xl bg-[#15181B] border transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer ${
        isActive
          ? "border-[#FF8A00]/60 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(255,138,0,0.22)]"
          : "border-[#292D32] hover:border-[#FF8A00]/30 shadow-lg"
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
        {/* Spotlight illumination on active card */}
        {!shouldReduceMotion && isActive && spotlight.isHovered && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(420px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 138, 0, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Specular top highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Project Visual Area */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#101214] border-b border-[#292D32]">
          {project.image ? (
            <motion.div
              style={{
                x: shouldReduceMotion || !isActive ? 0 : imageX,
                y: shouldReduceMotion || !isActive ? 0 : imageY,
                scale: 1.05,
              }}
              className="relative w-full h-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 90vw, 560px"
                className="object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#15181B] via-transparent to-black/20"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#15181B] via-[#101214] to-[#191C20] text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FF8A00]/10 border border-[#FF8A00]/25 flex items-center justify-center text-[#FF8A00] mb-2 shadow-[0_0_15px_rgba(255,138,0,0.15)]">
                <FolderGit2 className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-white tracking-wide">
                {project.title}
              </p>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs line-clamp-1">
                {project.tagline}
              </p>
            </div>
          )}

          {/* Category Pill in screenshot header */}
          <div className="absolute top-3.5 left-3.5 z-20">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#FFB020] bg-[#101214]/90 border border-[#FF8A00]/30 px-2.5 py-1 rounded-full backdrop-blur-md">
              {project.category}
            </span>
          </div>

          {project.stats && (
            <div className="absolute top-3.5 right-3.5 z-20">
              <span className="text-[11px] font-mono font-medium text-emerald-400 bg-[#101214]/90 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                {project.stats}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div
          style={{ transform: shouldReduceMotion ? "none" : "translateZ(14px)" }}
          className="p-6 sm:p-7 space-y-4 relative z-20"
        >
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#FFB020] font-medium">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-[#191C20] border border-[#292D32] text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#0B0D0F] bg-[#FF8A00] hover:bg-[#E86F00] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white bg-[#191C20] border border-[#292D32] hover:border-[#FF8A00]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              )}
            </div>

            <span className="text-xs font-mono text-zinc-500">
              Featured Project
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const deckStageRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeDeckIdx, setActiveDeckIdx] = useState<number>(0);

  // Background slow scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [-25, 30]);

  // Touch and drag tracking
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "websites", label: "Websites" },
    { id: "apps", label: "Apps" },
    { id: "ai-agents", label: "AI Agents" },
    { id: "google-business-profile", label: "Google Business Profile" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const handleNextProject = useCallback(() => {
    if (filteredProjects.length === 0) return;
    setActiveDeckIdx((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const handlePrevProject = useCallback(() => {
    if (filteredProjects.length === 0) return;
    setActiveDeckIdx(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
  }, [filteredProjects.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevProject();
      else if (e.key === "ArrowRight") handleNextProject();
    },
    [handleNextProject, handlePrevProject]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = dragStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNextProject();
      else handlePrevProject();
    }
    setDragStartX(null);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects and Software Engineering Work"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Warm Brown & Orange Curved Background Graphics with Scroll Parallax */}
      <motion.div
        aria-hidden="true"
        style={{
          y: shouldReduceMotion ? 0 : bgParallaxY,
        }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-[20%] right-[5%] w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(90,45,12,0.15)_0%,rgba(58,33,15,0.08)_45%,transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[20%] left-[8%] w-[440px] h-[440px] bg-[radial-gradient(circle,rgba(58,33,15,0.14)_0%,transparent_70%)] blur-3xl" />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="proj-deck-grad" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0" />
              <stop offset="30%" stopColor="#5A2D0C" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#7A3B0B" stopOpacity="0.30" />
              <stop offset="90%" stopColor="rgba(255, 138, 0, 0.18)" />
              <stop offset="100%" stopColor="rgba(255, 138, 0, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M -100 200 C 350 240, 750 480, 1100 420 C 1320 380, 1420 540, 1540 680"
            stroke="url(#proj-deck-grad)"
            strokeWidth="1.25"
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
            <FolderGit2 className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>03 &bull; CRAFTED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#FF8A00] via-[#FFB020] to-[#FF9F1C] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            A curated selection of software applications, algorithm visualizers,
            and digital platforms engineered with modern architectures and clean code.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Filter Tabs                                               */}
        {/* ========================================================= */}
        <div className="flex justify-center">
          <nav
            role="tablist"
            aria-label="Project Category Filter"
            className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#15181B] border border-[#292D32] backdrop-blur-xl shadow-inner max-w-full"
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveFilter(tab.id);
                    setActiveDeckIdx(0);
                  }}
                  className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-project-filter"
                      className="absolute inset-0 rounded-xl bg-[#191C20] border border-[#292D32] shadow-[0_0_12px_rgba(255,138,0,0.15)]"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 350, damping: 30 }
                      }
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ========================================================= */}
        {/* 3D PROJECT DECK STAGE                                     */}
        {/* ========================================================= */}
        {filteredProjects.length === 0 ? (
          /* High-impact 3D Blueprint Deck Preview Stage (When PROJECTS has 0 entries) */
          <div
            style={{ perspective: 1200 }}
            className="relative min-h-[460px] sm:min-h-[500px] w-full flex items-center justify-center overflow-hidden py-8 select-none"
          >
            {/* Ambient depth lighting */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[520px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.14)_0%,transparent_70%)] blur-2xl"
            />

            <div
              className="relative w-full max-w-4xl h-[360px] flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Flanking Angled Blueprint Plane Left */}
              <div
                aria-hidden="true"
                style={{
                  transform: shouldReduceMotion
                    ? "none"
                    : "translateX(-48%) translateZ(-140px) rotateY(24deg) scale(0.85)",
                  opacity: 0.4,
                  transformStyle: "preserve-3d",
                }}
                className="absolute w-[85%] sm:w-[460px] h-[320px] rounded-3xl bg-[#15181B]/80 border border-dashed border-[#292D32] p-6 hidden sm:flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">Preview // 01</span>
                  <div className="w-8 h-8 rounded-lg bg-[#191C20] border border-[#292D32]" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-white/[0.05] rounded" />
                  <div className="h-3 w-1/2 bg-white/[0.03] rounded" />
                </div>
              </div>

              {/* Center Active 3D Deck Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  transform: shouldReduceMotion ? "none" : "translateZ(50px)",
                  transformStyle: "preserve-3d",
                  zIndex: 20,
                }}
                className="w-[90%] sm:w-[500px] md:w-[540px] rounded-3xl bg-[#15181B] border border-[#FF8A00]/50 p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(255,138,0,0.2)] text-center space-y-6 relative overflow-hidden backdrop-blur-xl"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A00]/60 to-transparent"
                />

                <div className="w-16 h-16 rounded-2xl bg-[#FF8A00]/15 border border-[#FF8A00]/30 flex items-center justify-center text-[#FF8A00] mx-auto shadow-[0_0_25px_rgba(255,138,0,0.25)]">
                  <FolderGit2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Projects In Active Staging
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Selected live web platforms, applications, and client showcases for this
                    category are currently being assembled for interactive presentation.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#191C20] border border-[#FF8A00]/30 text-xs font-mono text-[#FFB020]">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF8A00] animate-pulse" />
                  <span>Curated Showcase Coming Soon</span>
                </div>
              </motion.div>

              {/* Flanking Angled Blueprint Plane Right */}
              <div
                aria-hidden="true"
                style={{
                  transform: shouldReduceMotion
                    ? "none"
                    : "translateX(48%) translateZ(-140px) rotateY(-24deg) scale(0.85)",
                  opacity: 0.4,
                  transformStyle: "preserve-3d",
                }}
                className="absolute w-[85%] sm:w-[460px] h-[320px] rounded-3xl bg-[#15181B]/80 border border-dashed border-[#292D32] p-6 hidden sm:flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">Preview // 02</span>
                  <div className="w-8 h-8 rounded-lg bg-[#191C20] border border-[#292D32]" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-white/[0.05] rounded" />
                  <div className="h-3 w-1/2 bg-white/[0.03] rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Multi-Project Cinematic 3D Deck when projects are populated */
          <div className="space-y-6">
            <div
              ref={deckStageRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              aria-label="Project Showcase. Use arrow keys or swipe to cycle projects"
              style={{ perspective: 1300 }}
              className="relative min-h-[520px] sm:min-h-[560px] w-full flex items-center justify-center overflow-hidden py-8 select-none focus:outline-none"
            >
              {/* Ambient warmth */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute w-[520px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.12)_0%,transparent_70%)] blur-3xl"
              />

              <div
                className="relative w-full max-w-4xl h-[480px] flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {filteredProjects.map((project: Project, idx: number) => {
                  const N = filteredProjects.length;
                  let offset = (idx - activeDeckIdx + N) % N;
                  if (offset > N / 2) offset -= N;
                  const isVisible = Math.abs(offset) <= 2;

                  if (!isVisible) return null;

                  return (
                    <CinematicDeckCard
                      key={project.id}
                      project={project}
                      offset={offset}
                      isActive={offset === 0}
                      onSelect={() => setActiveDeckIdx(idx)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between max-w-md mx-auto pt-2">
              <button
                type="button"
                onClick={handlePrevProject}
                aria-label="Previous Project"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/50 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1.5">
                {filteredProjects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveDeckIdx(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === activeDeckIdx
                        ? "w-6 bg-[#FF8A00]"
                        : "w-2 bg-[#292D32] hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextProject}
                aria-label="Next Project"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/50 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
