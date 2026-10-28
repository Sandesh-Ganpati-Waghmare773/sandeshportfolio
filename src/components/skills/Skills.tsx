"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
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
} from "lucide-react";
import {
  SKILL_CATEGORIES,
  type SkillCategory,
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
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
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
        <span className="font-mono font-bold text-xs text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
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
        <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-violet-400`}>
          <path d="M4 2h16v8h-8zM4 10h8l8 8H4zM4 18h8v6z" />
        </svg>
      );
    case "Smartphone":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-purple-400`}>
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case "Cloud":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-indigo-400`}>
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
      return <Code2 className="w-5 h-5 text-indigo-400" />;
    case "Layout":
      return <Layout className="w-5 h-5 text-purple-400" />;
    case "Wrench":
      return <Wrench className="w-5 h-5 text-cyan-400" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-emerald-400" />;
    default:
      return <Sparkles className="w-5 h-5 text-indigo-400" />;
  }
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const shouldReduceMotion = useReducedMotion();

  // Filter categories or show all
  const filteredCategories =
    selectedCategory === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  const filterTabs = [
    { id: "all", label: "All Skills" },
    { id: "programming", label: "Programming" },
    { id: "frontend", label: "Frontend" },
    { id: "tools", label: "Tools & Technologies" },
    { id: "core-cs", label: "Other Technical Skills" },
  ];

  return (
    <section
      id="skills"
      aria-label="Skills & Technical Expertise"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-purple-600/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-indigo-600/5 blur-[140px] rounded-full" />
      </div>

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-mono tracking-widest uppercase backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>02 &bull; TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            A comprehensive overview of languages, frontend frameworks, engineering tools,
            and computer science foundations I use to build real-world digital solutions.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Interactive Category Filter Tabs                          */}
        {/* ========================================================= */}
        <div className="flex justify-center">
          <nav
            role="tablist"
            aria-label="Skill Categories Filter"
            className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-inner max-w-full"
          >
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-skills-tab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/10 border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
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
        {/* Skills Categories and Cards Grid                          */}
        {/* ========================================================= */}
        <div className="space-y-14 sm:space-y-16">
          <AnimatePresence mode="wait">
            {filteredCategories.map((category: SkillCategory) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shadow-sm">
                      <CategoryHeaderIcon icon={category.icon} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 self-start sm:self-auto">
                    {category.skills.length} skills listed
                  </span>
                </div>

                {/* Skill Cards Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                >
                  {category.skills.map((skill: SkillItem) => (
                    <motion.div
                      key={skill.name}
                      variants={cardVariants}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : { y: -4, transition: { duration: 0.2 } }
                      }
                      className="group relative p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent border border-white/[0.08] hover:border-indigo-400/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.15)]"
                    >
                      <div className="space-y-3">
                        {/* Top row: Icon & Proficiency Label */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-200 group-hover:border-indigo-400/50 group-hover:scale-105 transition-all duration-200">
                            <SkillTechIcon icon={skill.icon} />
                          </div>
                          {/* Proficiency Badge (NO fake percentages) */}
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            <CheckCircle className="w-3 h-3 text-indigo-400" />
                            <span>{skill.level}</span>
                          </span>
                        </div>

                        {/* Skill Name */}
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                            {skill.name}
                          </h4>
                          {skill.badge && (
                            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                              {skill.badge}
                            </span>
                          )}
                        </div>

                        {/* Practical Description */}
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {/* Bottom Subtle Indicator */}
                      <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                        <span>Application Focus</span>
                        <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
