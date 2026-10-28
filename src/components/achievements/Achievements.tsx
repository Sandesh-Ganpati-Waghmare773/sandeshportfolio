"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Trophy,
  Target,
  Award,
  Users,
  Star,
  Sparkles,
  Calendar,
  Building2,
} from "lucide-react";
import { ACHIEVEMENTS, type Achievement } from "@/data/achievements";

export default function Achievements() {
  const shouldReduceMotion = useReducedMotion();

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section
      id="achievements"
      aria-label="Achievements & Milestones"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Warm Brown & Orange Clean Background Graphics */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Faint warm illumination */}
        <div className="absolute top-[25%] left-[12%] w-[460px] h-[460px] bg-[radial-gradient(circle,rgba(58,33,15,0.14)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(90,45,12,0.12)_0%,rgba(255,138,0,0.02)_45%,transparent_70%)] blur-2xl" />

        {/* Solitary thin arc in upper-right corner */}
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

          {/* Solitary Sweeping Arc */}
          <path
            d="M 1480 80 C 1200 180, 1080 440, 1420 700"
            stroke="url(#achieve-arc-grad)"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FFB020] text-xs sm:text-sm font-mono tracking-widest uppercase backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>04 &bull; HONORS &amp; IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Recognitions &amp;{" "}
            <span className="bg-gradient-to-r from-[#FF8A00] via-[#FFB020] to-[#FF9F1C] bg-clip-text text-transparent">
              Milestones
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Meaningful accomplishments spanning competitive hackathons, continuous algorithmic
            practice, departmental awards, and collaborative student leadership.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Achievements Grid                                         */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {ACHIEVEMENTS.map((item: Achievement, index: number) => {
            const Icon = getCategoryIcon(item.category);
            // Highlight the first card with distinctive gradient treatment
            const isTop = index === 0;

            return (
              <motion.article
                key={item.id}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { y: -4, transition: { duration: 0.2 } }
                }
                className={`group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between backdrop-blur-xl ${
                  isTop
                    ? "bg-[#15181B] border-[#FF8A00]/40 hover:border-[#FF8A00]/70 shadow-lg shadow-[rgba(255,138,0,0.06)]"
                    : "bg-[#15181B] border-[#292D32] hover:border-[#FF8A00]/40"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon, Period, and Metric Highlight */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-200 group-hover:scale-105 ${
                        isTop
                          ? "bg-[#FF8A00]/15 border-[#FF8A00]/30 text-[#FFB020]"
                          : "bg-[#191C20] border-[#292D32] text-zinc-300 group-hover:text-white group-hover:border-[#FF8A00]/40"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#191C20] border border-[#292D32] text-zinc-300">
                        {item.metric}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
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
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFB020] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{item.organization}</span>
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Footer Badge */}
                <div className="mt-6 pt-4 border-t border-[#292D32] flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono">Status</span>
                  <span className="font-medium text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {item.badge}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
