"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Trophy,
  Calendar,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  FileText,
  X,
  Maximize2,
  Code2,
  Globe,
} from "lucide-react";
import { ACHIEVEMENTS, type Achievement } from "@/data/achievements";

export default function Achievements() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAchievement(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAchievement) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedAchievement]);

  return (
    <section
      id="achievements"
      aria-label="Achievements & Hackathons"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Warm Brown & Orange Clean Background Graphics */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(58,33,15,0.14)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[15%] right-[10%] w-[460px] h-[460px] bg-[radial-gradient(circle,rgba(90,45,12,0.12)_0%,rgba(255,138,0,0.02)_45%,transparent_70%)] blur-2xl" />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="achieve-contour"
              x1="100%"
              y1="0%"
              x2="40%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#4A260D" stopOpacity="0" />
              <stop offset="35%" stopColor="#5A2D0C" stopOpacity="0.28" />
              <stop offset="70%" stopColor="#7A3B0B" stopOpacity="0.32" />
              <stop offset="90%" stopColor="rgba(255, 138, 0, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 138, 0, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M 1480 80 C 1200 180, 1080 440, 1420 700"
            stroke="url(#achieve-contour)"
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
            <span>04 &bull; HONORS &amp; HACKATHONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Hackathons &amp;{" "}
            <span className="bg-gradient-to-r from-[#FF8A00] via-[#FFB020] to-[#FF9F1C] bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Verified competition accomplishments, hackathons, and institutional honors spanning
            national innovation initiatives and competitive technical challenges.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Achievements Showcase Grid (Distinct from carousel)       */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch max-w-5xl mx-auto">
          {ACHIEVEMENTS.map((item, idx) => {
            const CategoryIcon =
              item.category === "Hackathon"
                ? Trophy
                : item.category === "Competitive Coding"
                ? Code2
                : Globe;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.55,
                  delay: shouldReduceMotion ? 0 : idx * 0.15,
                }}
                className="group relative rounded-2xl bg-[#15181B] border border-[#292D32] hover:border-[#FF8A00]/50 transition-all duration-300 shadow-lg hover:shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(255,138,0,0.12)] flex flex-col justify-between overflow-hidden max-w-sm sm:max-w-none mx-auto w-full"
              >
                {/* Specular top border highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A00]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="space-y-3 p-4 sm:p-5">
                  {/* Top Bar: Badge, Metric, Verification */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FFB020] text-[11px] font-mono font-semibold">
                      <CategoryIcon className="w-3 h-3 text-[#FF8A00]" />
                      <span>{item.badge}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white group-hover:text-[#FFB020] transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1.5 truncate">
                      <Building2 className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                      <span className="truncate">{item.organization}</span>
                    </p>
                  </div>

                  {/* Certificate Interactive Preview Window */}
                  <div
                    onClick={() => setSelectedAchievement(item)}
                    className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#101214] border border-[#292D32] group-hover:border-[#FF8A00]/40 transition-all duration-300 cursor-pointer shadow-inner group/preview"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
                      className="object-cover object-top transition-transform duration-500 group-hover/preview:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0D0F]/90 via-transparent to-black/20"
                    />

                    {/* Hover Inspect Pill */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-xs">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15181B] border border-[#FF8A00]/60 text-[#FFB020] text-xs font-mono font-bold shadow-xl">
                        <Maximize2 className="w-3.5 h-3.5 text-[#FF8A00]" />
                        <span>Inspect</span>
                      </span>
                    </div>

                    {/* Date Pill at bottom left */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0B0D0F]/85 border border-[#292D32] text-[10px] font-mono text-zinc-300 backdrop-blur-md">
                      <Calendar className="w-3 h-3 text-[#FF8A00]" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 min-h-[2rem]">
                    {item.description}
                  </p>

                  {/* Skills / Focus Tags */}
                  <div className="space-y-1 pt-0.5">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                      Key Competencies
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#191C20] border border-[#292D32] text-zinc-300 flex items-center gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#FF8A00]" />
                          <span>{skill}</span>
                        </span>
                      ))}
                      {item.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono text-zinc-400 bg-white/[0.03]">
                          +{item.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2 border-t border-white/[0.04] mt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAchievement(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-white bg-[#191C20] hover:bg-[#292D32] border border-[#292D32] hover:border-[#FF8A00]/50 transition-all cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3 text-[#FF8A00]" />
                    <span>Inspect</span>
                  </button>

                  {item.pdfUrl && (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#0B0D0F] bg-[#FF8A00] hover:bg-[#E86F00] border border-[#FFB020]/40 transition-all shadow-[0_0_10px_rgba(255,138,0,0.18)] hover:shadow-[0_0_16px_rgba(255,138,0,0.3)]"
                    >
                      <FileText className="w-3 h-3" />
                      <span>PDF</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* High-Resolution Certificate Modal Lightbox                 */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#15181B] border border-[#292D32] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedAchievement(null)}
                aria-label="Close certificate preview"
                className="absolute top-5 right-5 p-2 rounded-xl bg-[#191C20] hover:bg-[#292D32] border border-[#292D32] hover:border-[#FF8A00]/50 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              {(() => {
                const ModalCategoryIcon =
                  selectedAchievement.category === "Hackathon"
                    ? Trophy
                    : selectedAchievement.category === "Competitive Coding"
                    ? Code2
                    : Globe;

                return (
                  <div className="space-y-2 pr-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FFB020] text-xs font-mono uppercase tracking-wider">
                      <ModalCategoryIcon className="w-3.5 h-3.5 text-[#FF8A00]" />
                      <span>{selectedAchievement.badge} &bull; Verified</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                      {selectedAchievement.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300">
                      Organized by{" "}
                      <span className="text-white font-semibold">
                        {selectedAchievement.organization}
                      </span>{" "}
                      &bull; {selectedAchievement.period}
                    </p>
                  </div>
                );
              })()}

              {/* Full Image Preview Container */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#101214] border border-[#292D32] shadow-inner">
                <Image
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Description & Competencies */}
              <div className="space-y-4 pt-2 border-t border-[#292D32]">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {selectedAchievement.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                    Verified Competencies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAchievement.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#191C20] border border-[#292D32] text-zinc-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8A00]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                {selectedAchievement.pdfUrl && (
                  <div className="pt-3">
                    <a
                      href={selectedAchievement.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#0B0D0F] bg-[#FF8A00] hover:bg-[#E86F00] shadow-[0_0_15px_rgba(255,138,0,0.25)] transition-all active:scale-95 border border-[#FFB020]/40"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Open Verified PDF Document</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
