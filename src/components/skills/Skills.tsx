"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  Code2,
  Layout,
  Wrench,
  Cpu,
  Sparkles,
  Terminal,
  Database,
  Server,
  Binary,
  Boxes,
  Layers,
  Globe,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sliders,
} from "lucide-react";
import {
  SKILL_CATEGORIES,
  type SkillItem,
} from "@/data/skills";

// Helper icon component providing crisp tech icons
function SkillTechIcon({ icon, className = "w-5 h-5" }: { icon: string; className?: string }) {
  switch (icon) {
    case "Cpp":
      return (
        <span className="font-mono font-bold text-xs text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
          C++
        </span>
      );
    case "C":
      return (
        <span className="font-mono font-bold text-xs text-zinc-300 bg-zinc-500/10 px-1.5 py-0.5 rounded border border-zinc-500/20">
          C
        </span>
      );
    case "Python":
      return (
        <span className="font-mono font-bold text-xs text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
          PY
        </span>
      );
    case "Java":
      return (
        <span className="font-mono font-bold text-xs text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
          JAVA
        </span>
      );
    case "Nodejs":
      return (
        <span className="font-mono font-bold text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
          NODE
        </span>
      );
    case "Express":
      return (
        <span className="font-mono font-bold text-xs text-zinc-300 bg-zinc-500/10 px-1.5 py-0.5 rounded border border-zinc-500/20">
          EXPRESS
        </span>
      );
    case "JavaScript":
      return (
        <span className="font-mono font-bold text-xs text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20">
          JS
        </span>
      );
    case "TypeScript":
      return (
        <span className="font-mono font-bold text-xs text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
          TS
        </span>
      );
    case "React":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <ellipse cx="12" cy="12" rx="10" ry="4" className="text-cyan-400" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" className="text-cyan-400" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" className="text-cyan-400" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-cyan-400" />
        </svg>
      );
    case "Nextjs":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.8 14.5-5.2-7.8h-1.5v6.6h1.3v-5l4.8 6.2h.6z" />
        </svg>
      );
    case "HtmlCss":
      return (
        <span className="font-mono font-bold text-xs text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
          HTML/CSS
        </span>
      );
    case "Tailwind":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case "Flutter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-cyan-400`}>
          <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm0 11.457L8.457 17.314l3.7 3.7 2.157-2.157 5.886 5.143h7.372l-9.572-8.371 4.115-4.172h-7.8z" />
        </svg>
      );
    case "Dart":
      return (
        <span className="font-mono font-bold text-xs text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">
          DART
        </span>
      );
    case "Kotlin":
      return (
        <span className="font-mono font-bold text-xs text-[#FFB020] bg-[#FF8A00]/10 px-1.5 py-0.5 rounded border border-[#FF8A00]/20">
          KOTLIN
        </span>
      );
    case "Swift":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-orange-400`}>
          <path d="M20.25 18.75C17.5 21.5 12.8 22 8.7 19.9c4.2-.6 7.4-2.8 9.3-5.7-3.1 1.3-6.5 1.4-9.6.3-1.6-.6-3-1.5-4.1-2.7 1.8.4 3.7.4 5.5-.1C5.2 10.4 3.4 7.7 3 4.5c1.6 1.7 3.7 2.8 6 3.2C7.3 5.4 7.6 2.8 9.5.7c.3 3.6 2.7 6.8 6.1 8 1.5.5 3 .6 4.5.3-2 2.1-4.7 3.5-7.6 3.9 3.2.1 6.3-1 8.8-3 .4 3.1-.4 6.2-2.05 8.85z" />
        </svg>
      );
    case "Figma":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M7 3h5v5H7a2.5 2.5 0 0 1 0-5z" fill="#F24E1E" />
          <path d="M12 3h5a2.5 2.5 0 0 1 0 5h-5V3z" fill="#FF7262" />
          <path d="M7 8h5v5H7a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
          <circle cx="14.5" cy="10.5" r="2.5" fill="#1ABCFE" />
          <path d="M7 13h5v5a2.5 2.5 0 1 1-5 0v-5z" fill="#0ACF83" />
        </svg>
      );
    case "WordPress":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-sky-400`}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.25c4.13 0 7.58 2.87 8.48 6.75l-4.59 12.57-3.14-9.35 1.55-.42a.45.45 0 0 0 .32-.43.45.45 0 0 0-.45-.45h-3.32a.45.45 0 0 0-.45.45c0 .23.17.41.38.44l1.32.26-2.12 6.13-1.62-4.9-1.35-4.08a8.73 8.73 0 0 1 4.67-1.39zm-8.73 8.75c0-1.84.6-3.54 1.62-4.92l4.8 13.15a8.73 8.73 0 0 1-6.42-8.23zm8.73 8.75c-1.31 0-2.54-.31-3.63-.86l3.63-10.52 3.68 10.49c-1.12.58-2.37.89-3.68.89zm7.1-3.83-3.61-10.42c.86-.07 1.65-.24 1.65-.24a.45.45 0 0 0 .4-.45.45.45 0 0 0-.45-.45h-2.31a.45.45 0 0 0-.45.45c0 .24.16.42.36.45l1.04.18-1.51 4.39-1.92-5.59a8.73 8.73 0 0 1 6.8 11.68z" />
        </svg>
      );
    case "Git":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-orange-500`}>
          <path d="M2.6 10.59 10.59 2.6a2 2 0 0 1 2.82 0l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0L2.6 13.41a2 2 0 0 1 0-2.82zm10.81 4.82a1.5 1.5 0 1 0-1.41-2.02l-2.18-1.09a1.5 1.5 0 0 0-.41-.71 1.5 1.5 0 1 0-1 1.41v2.18a1.5 1.5 0 1 0 1.41 1.41V14.4l2.18 1.09c.12.38.35.7.67.92h.02a1.5 1.5 0 0 0 .72-.0z" />
        </svg>
      );
    case "VSCode":
      return (
        <span className="font-mono font-bold text-xs text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
          VS CODE
        </span>
      );
    case "Postman":
      return (
        <span className="font-mono font-bold text-xs text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
          POSTMAN
        </span>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-sky-400`}>
          <path d="M22.5 10.5c-.3-.2-1.2-.4-2-.2-.2-.5-.6-1-1.1-1.3l-.6-.3-.3.6c-.3.7-.3 1.5 0 2.2-.6.3-1.6.4-2.5.4H2c-.6 0-1 .4-1 1 0 4.4 3.6 8 8 8 5.3 0 9.7-3.9 10-9.2.8-.2 1.6-.7 2.1-1.4l.4-.6-.5-.4zM7 7h2v2H7V7zm3 0h2v2h-2V7zm-6 3h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-6-6h2v2h-2V4zm3 0h2v2h-2V4z" />
        </svg>
      );
    case "FramerMotion":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-[#FF8A00]`}>
          <path d="M4 2h16v8h-8zM4 10h8l8 8H4zM4 18h8v6z" />
        </svg>
      );
    case "Smartphone":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-[#FFB020]`}>
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case "Cloud":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-[#FF8A00]`}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case "Binary":
      return <Binary className={className} />;
    case "Boxes":
      return <Boxes className={className} />;
    case "Database":
      return <Database className={className} />;
    case "Server":
      return <Server className={className} />;
    case "Terminal":
      return <Terminal className={className} />;
    case "Network":
      return <Globe className={className} />;
    case "Cpu":
      return <Cpu className={className} />;
    default:
      return <Layers className={className} />;
  }
}

// Category header icon selector
function CategoryHeaderIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "Code2":
      return <Code2 className="w-5 h-5 text-[#FF8A00]" />;
    case "Layout":
      return <Layout className="w-5 h-5 text-[#FFB020]" />;
    case "Wrench":
      return <Wrench className="w-5 h-5 text-[#FF8A00]" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-[#FFB020]" />;
    default:
      return <Sparkles className="w-5 h-5 text-[#FF8A00]" />;
  }
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  // Category state
  const [selectedCategory, setSelectedCategory] = useState<string>("programming");
  // Active focused skill index within the current category
  const [activeSkillIdx, setActiveSkillIdx] = useState<number>(0);
  // View mode: "spatial" (3D ecosystem) or "detailed"
  const [viewMode, setViewMode] = useState<"spatial" | "detailed">("spatial");

  // Drag rotation angle (in radians)
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const startAngleRef = useRef<number>(0);

  // Background slow scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgArcParallaxY = useTransform(scrollYProgress, [0, 1], [-20, 30]);

  // Current category skills
  const activeCategory =
    SKILL_CATEGORIES.find((cat) => cat.id === selectedCategory) || SKILL_CATEGORIES[0];
  const skillsList = activeCategory.skills;

  // Touch and Mouse Drag Handlers for rotating the 3D ecosystem
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    dragStartXRef.current = clientX;
    startAngleRef.current = rotationAngle;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartXRef.current;
    // Map pixels to rotation radians (300px = full circle)
    const newAngle = startAngleRef.current + (deltaX / 300) * Math.PI;
    setRotationAngle(newAngle);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Next / Previous rotation step controls
  const stepRotation = (direction: 1 | -1) => {
    const step = (2 * Math.PI) / skillsList.length;
    setRotationAngle((prev) => prev - direction * step);
    setActiveSkillIdx((prev) => (prev + direction + skillsList.length) % skillsList.length);
  };

  const filterTabs = [
    { id: "programming", label: "Programming" },
    { id: "frontend", label: "Frontend" },
    { id: "tools", label: "Tools & Technologies" },
    { id: "core-cs", label: "Other Technical Skills" },
  ];

  const currentSkill = skillsList[activeSkillIdx] || skillsList[0];

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="Skills & Technical Expertise"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Warm Brown & Orange Flowing Background Graphics with Scroll Parallax */}
      <motion.div
        aria-hidden="true"
        style={{
          y: shouldReduceMotion ? 0 : bgArcParallaxY,
        }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-[35%] left-[8%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(58,33,15,0.16)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[12%] w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(90,45,12,0.12)_0%,rgba(255,138,0,0.025)_45%,transparent_70%)] blur-2xl" />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skills-arc-grad" x1="100%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#4A260D" stopOpacity="0" />
              <stop offset="25%" stopColor="#5A2D0C" stopOpacity="0.35" />
              <stop offset="65%" stopColor="#7A3B0B" stopOpacity="0.40" />
              <stop offset="85%" stopColor="rgba(255, 138, 0, 0.18)" />
              <stop offset="100%" stopColor="rgba(255, 138, 0, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M 1480 180 C 1220 320, 1140 620, 1480 820"
            stroke="url(#skills-arc-grad)"
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
            <Cpu className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>02 &bull; TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-[#FF8A00] via-[#FFB020] to-[#FF9F1C] bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            A comprehensive overview of languages, frontend frameworks, engineering tools,
            and computer science foundations I use to build real-world digital solutions.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Top Controls: Category Tabs & View Mode Toggle            */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <nav
            role="tablist"
            aria-label="Skill Categories Filter"
            className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#15181B] border border-[#292D32] backdrop-blur-xl shadow-inner max-w-full"
          >
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedCategory(tab.id);
                    setActiveSkillIdx(0);
                    setRotationAngle(0);
                  }}
                  className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] cursor-pointer ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-skills-tab"
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

          {/* View Mode Toggle: Interactive vs Grid List */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#15181B] border border-[#292D32] text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode("spatial")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "spatial"
                  ? "bg-[#FF8A00]/15 text-[#FFB020] border border-[#FF8A00]/30 font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Interactive View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("detailed")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "detailed"
                  ? "bg-[#FF8A00]/15 text-[#FFB020] border border-[#FF8A00]/30 font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Active Category Description Header                        */}
        {/* ========================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#15181B]/80 border border-[#292D32] flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#191C20] border border-[#292D32] flex items-center justify-center shadow-sm">
              <CategoryHeaderIcon icon={activeCategory.icon} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {activeCategory.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                {activeCategory.description}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#FFB020] bg-[#FF8A00]/10 border border-[#FF8A00]/20 px-3 py-1 rounded-full self-start sm:self-auto whitespace-nowrap">
            {skillsList.length} Technologies Listed
          </span>
        </div>

        {/* ========================================================= */}
        {/* VIEW MODE 1: Interactive Spatial Ecosystem                */}
        {/* ========================================================= */}
        {viewMode === "spatial" && (
          <div className="space-y-8">
            {/* Interactive Orbit Stage */}
            <div
              ref={orbitContainerRef}
              onMouseDown={(e) => handlePointerDown(e.clientX)}
              onMouseMove={(e) => handlePointerMove(e.clientX)}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
              onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
              onTouchEnd={handlePointerUp}
              style={{ perspective: 1200 }}
              className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center overflow-hidden rounded-3xl bg-[#101214] border border-[#292D32] shadow-2xl select-none cursor-grab active:cursor-grabbing"
            >
              {/* Central Category Hub */}
              <div
                aria-hidden="true"
                style={{ transform: "translateZ(0px)" }}
                className="pointer-events-none absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-[#FF8A00]/30 flex flex-col items-center justify-center p-4 text-center bg-radial from-[#FF8A00]/10 via-[#15181B] to-[#101214] shadow-[0_0_35px_rgba(255,138,0,0.12)] z-10"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF8A00]/15 border border-[#FF8A00]/30 flex items-center justify-center text-[#FF8A00] mb-1.5">
                  <CategoryHeaderIcon icon={activeCategory.icon} />
                </div>
                <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                  {activeCategory.title.split(" ")[0]}
                </p>
                <p className="text-[9px] font-mono text-[#FFB020]">Overview</p>
              </div>

              {/* Orbital Ring Guidelines */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute w-[90%] sm:w-[580px] h-[280px] sm:h-[340px] rounded-[50%] border border-[#292D32]/60 rotate-x-[60deg] shadow-inner"
              />

              {/* Drag Hint Overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#15181B]/90 border border-[#292D32] text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 backdrop-blur-md z-30"
              >
                <Sliders className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Drag or swipe horizontally &bull; Click to focus</span>
              </div>

              {/* 3D Spatial Satellite Skills */}
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {skillsList.map((skill: SkillItem, idx: number) => {
                  const N = skillsList.length;
                  const angle = (2 * Math.PI * idx) / N + rotationAngle;
                  const isFeatured = !!skill.featured;

                  // Elliptical 3D orbit radii
                  const rx = typeof window !== "undefined" && window.innerWidth < 640 ? 150 : 280;
                  const ry = typeof window !== "undefined" && window.innerWidth < 640 ? 60 : 100;

                  const x = Math.sin(angle) * rx;
                  const y = Math.cos(angle) * ry;
                  const z = Math.cos(angle) * 160 + (isFeatured ? 25 : 0);

                  // Normalized depth from 0 (back) to 1 (front)
                  const depthFactor = (z + 185) / 370;
                  const scale = shouldReduceMotion ? 1 : 0.82 + depthFactor * 0.28;
                  const opacity = shouldReduceMotion ? 1 : 0.45 + depthFactor * 0.55;
                  const isFront = z > 20;
                  const isSelected = idx === activeSkillIdx;

                  return (
                    <motion.div
                      key={skill.name}
                      onClick={() => setActiveSkillIdx(idx)}
                      style={{
                        position: "absolute",
                        transformStyle: "preserve-3d",
                        zIndex: Math.round(z + 300),
                      }}
                      animate={{
                        x,
                        y,
                        z,
                        scale: isSelected ? scale * 1.08 : scale,
                        opacity,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 28,
                      }}
                      className={`cursor-pointer select-none p-3.5 sm:p-4 rounded-2xl border backdrop-blur-xl transition-colors duration-200 flex items-center gap-3 shadow-lg ${
                        isSelected
                          ? "bg-[#15181B] border-[#FF8A00] shadow-[0_0_25px_rgba(255,138,0,0.35)]"
                          : isFront
                          ? "bg-[#15181B]/95 border-[#FF8A00]/40 hover:border-[#FF8A00]/80"
                          : "bg-[#15181B]/75 border-[#292D32] hover:border-zinc-500"
                      }`}
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#191C20] border border-[#292D32] flex items-center justify-center shrink-0">
                        <SkillTechIcon icon={skill.icon} />
                      </div>
                      <div className="min-w-0 pr-1">
                        <p className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-1.5">
                          <span>{skill.name}</span>
                          {isFeatured && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] shrink-0" />
                          )}
                        </p>
                        <p className="text-[10px] font-mono text-[#FFB020] uppercase truncate">
                          {skill.level}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Focused Skill HUD Stage & Step Controls */}
            <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#15181B] border border-[#292D32] shadow-xl relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A00]/40 to-transparent"
              />

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Left: Skill Identity & Description */}
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#191C20] border border-[#FF8A00]/40 flex items-center justify-center text-white shadow-md">
                      <SkillTechIcon icon={currentSkill.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl sm:text-2xl font-bold text-white">
                          {currentSkill.name}
                        </h4>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#FF8A00]/15 text-[#FFB020] border border-[#FF8A00]/30">
                          <CheckCircle className="w-3 h-3 text-[#FF8A00]" />
                          <span>{currentSkill.level}</span>
                        </span>
                      </div>
                      {currentSkill.badge && (
                        <p className="text-xs font-mono text-zinc-400 uppercase tracking-wide">
                          {currentSkill.badge}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {currentSkill.description}
                  </p>
                </div>

                {/* Right: Orbit Navigation Controls */}
                <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => stepRotation(-1)}
                      aria-label="Previous Skill"
                      className="px-3.5 py-2 rounded-xl bg-[#191C20] border border-[#292D32] hover:border-[#FF8A00]/50 text-zinc-200 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Prev</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => stepRotation(1)}
                      aria-label="Next Skill"
                      className="px-3.5 py-2 rounded-xl bg-[#191C20] border border-[#292D32] hover:border-[#FF8A00]/50 text-zinc-200 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRotationAngle(0);
                        setActiveSkillIdx(0);
                      }}
                      aria-label="Reset View"
                      title="Reset View"
                      className="p-2 rounded-xl bg-[#191C20] border border-[#292D32] hover:border-[#FF8A00]/50 text-zinc-400 hover:text-white transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs font-mono text-zinc-500">
                    Technology {activeSkillIdx + 1} of {skillsList.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW MODE 2: Detailed Card Grid (Accessible View)          */}
        {/* ========================================================= */}
        {viewMode === "detailed" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillsList.map((skill: SkillItem) => (
              <div
                key={skill.name}
                className="p-5 rounded-2xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/50 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#191C20] border border-[#292D32] flex items-center justify-center">
                      <SkillTechIcon icon={skill.icon} />
                    </div>
                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FFB020]">
                      {skill.level}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {skill.name}
                    </h4>
                    {skill.badge && (
                      <p className="text-[11px] font-mono text-zinc-400 uppercase">
                        {skill.badge}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.04] text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                  <span>Core Technical Skill</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
