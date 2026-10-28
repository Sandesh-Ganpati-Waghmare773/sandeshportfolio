"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
} from "lucide-react";
import {
  STORY_PILLARS,
  EDUCATION_JOURNEY,
  QUICK_STATS,
  type StoryPillar,
  type EducationJourneyItem,
} from "@/data/about";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  // Helper to map icon identifier to Lucide component
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
      id="about"
      aria-label="About Sandesh Waghmare"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Background Decorative Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#FF8A00]/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-600/5 blur-[140px] rounded-full" />
      </div>

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
        {/* Quick Stats Grid                                          */}
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
              className="p-4 sm:p-5 rounded-2xl bg-[#15181B] border border-[#292D32] text-center hover:border-[#FF8A00]/40 transition-all duration-200"
            >
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
        {/* Story Narrative Grid (Who I am, Engineering, Craft, Impact) */}
        {/* ========================================================= */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center text-[#FF8A00]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Story &amp; Mindset
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Five pillars shaping how I build software and approach challenges
              </p>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {STORY_PILLARS.map((pillar: StoryPillar, idx: number) => {
              const Icon = getIcon(pillar.icon);
              // Make the continuous learning card span full width on large screens for visual balance
              const isLast = idx === STORY_PILLARS.length - 1;
              return (
                <motion.div
                  key={pillar.id}
                  variants={itemVariants}
                  className={`group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/40 transition-all duration-300 flex flex-col justify-between ${
                    isLast ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header: Badge & Icon */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] font-mono tracking-widest uppercase text-[#FFB020] bg-[#FF8A00]/10 border border-[#FF8A00]/20 px-2.5 py-1 rounded-full">
                        {pillar.badge}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#191C20] border border-[#292D32] flex items-center justify-center text-[#FFB020] group-hover:text-white group-hover:scale-105 group-hover:border-[#FF8A00]/50 transition-all duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFB020] transition-colors">
                      {pillar.title}
                    </h4>

                    {/* Summary */}
                    <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                      {pillar.summary}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-xs font-medium text-zinc-500 group-hover:text-[#FFB020] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                    <span>Active Focus</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Education & Academic Journey                              */}
        {/* ========================================================= */}
        <div className="space-y-8 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center text-[#FF8A00]">
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
          >
            {EDUCATION_JOURNEY.map((edu: EducationJourneyItem) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className="relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/40 transition-all duration-300 flex flex-col justify-between group"
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
