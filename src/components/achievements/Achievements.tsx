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
      {/* Background Decorative Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-600/5 blur-[150px] rounded-full" />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-mono tracking-widest uppercase backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>04 &bull; HONORS &amp; IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Recognitions &amp;{" "}
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-indigo-300 bg-clip-text text-transparent">
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
                    ? "bg-gradient-to-b from-amber-500/[0.08] via-white/[0.02] to-transparent border-amber-500/30 hover:border-amber-400/50 shadow-lg shadow-amber-500/5"
                    : "bg-gradient-to-b from-white/[0.04] to-white/[0.01] border-white/[0.08] hover:border-indigo-400/40 hover:bg-white/[0.06]"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon, Period, and Metric Highlight */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-200 group-hover:scale-105 ${
                        isTop
                          ? "bg-amber-500/20 border-amber-400/30 text-amber-300"
                          : "bg-white/[0.05] border-white/10 text-indigo-300 group-hover:border-indigo-400/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-zinc-300">
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
                    <span className="text-[11px] font-mono tracking-wider uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
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
                <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs">
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
