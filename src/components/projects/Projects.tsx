"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  FolderGit2,
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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const shouldReduceMotion = useReducedMotion();

  // Filter projects dynamically
  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category === activeFilter;
  });

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "websites", label: "Websites" },
    { id: "apps", label: "Apps" },
    { id: "ai-agents", label: "AI Agents" },
    { id: "google-business-profile", label: "Google Business Profile" },
  ];

  return (
    <section
      id="projects"
      aria-label="Projects Portfolio"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full" />
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
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>03 &bull; CRAFTED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            A selection of software applications, algorithm visualizers, and digital platforms
            engineered with modern architectures, clean code, and interactive user interfaces.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Filter Tabs                                               */}
        {/* ========================================================= */}
        <div className="flex justify-center">
          <nav
            role="tablist"
            aria-label="Project Category Filter"
            className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-inner max-w-full"
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-project-filter"
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
        {/* Projects Grid / Empty State                               */}
        {/* ========================================================= */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center p-12 sm:p-16 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center max-w-xl mx-auto space-y-4 shadow-inner"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FolderGit2 className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Projects Coming Soon
              </h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Selected projects, live applications, and client showcases for this category will be featured here shortly.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Section Under Active Preparation</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project: Project) => (
                <motion.article
                  key={project.id}
                  layout
                  variants={cardVariants}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent border border-white/[0.08] hover:border-indigo-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(99,102,241,0.15)]"
                >
                  <div>
                    {/* Project Image Banner */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0a0b12] border-b border-white/[0.06]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-transparent opacity-80"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-300 bg-[#08090d]/80 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                            <Sparkles className="w-3 h-3" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 sm:p-7 space-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-indigo-400 mt-0.5">
                          {project.tagline}
                        </p>
                      </div>

                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action Links */}
                  <div className="p-6 sm:p-7 pt-0 flex items-center justify-between gap-3 border-t border-white/[0.04] mt-4">
                    {/* GitHub Repo Link */}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-zinc-500 italic">
                        Internal Project
                      </span>
                    )}

                    {/* Live Demo Link (if available) */}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.25)] transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                        aria-label={`Open live demonstration of ${project.title}`}
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-4 h-4 text-indigo-200" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-zinc-500 italic">
                        Preview on Request
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
