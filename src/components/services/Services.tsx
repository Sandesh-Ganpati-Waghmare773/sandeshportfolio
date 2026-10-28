"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Globe,
  Smartphone,
  FileCode,
  Bot,
  MapPin,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Layers,
} from "lucide-react";
import { SERVICES, type ServiceItem } from "@/data/services";

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return Globe;
      case "Smartphone":
        return Smartphone;
      case "FileCode":
        return FileCode;
      case "Bot":
        return Bot;
      case "MapPin":
        return MapPin;
      default:
        return Layers;
    }
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
      window.history.pushState(null, "", "#contact");
    }
  };

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
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
      id="services"
      aria-label="Services & Technical Solutions"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-indigo-600/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-20">
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
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>06 &bull; SERVICES &amp; EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Tailored Development &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              Digital Solutions
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Combining Computer Engineering principles with modern frontend craft
            to engineer reliable, accessible, and high-performance digital experiences.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Services Grid                                             */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="flex flex-wrap justify-center gap-6 sm:gap-8"
        >
          {SERVICES.map((service: ServiceItem) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <motion.article
                key={service.id}
                variants={cardVariants}
                className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] ${service.accentBorder}`}
              >
                {/* Background Ambient Highlight */}
                <div
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10`}
                />

                <div className="space-y-6">
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                      SERVICE {service.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-indigo-300 group-hover:text-white group-hover:scale-105 group-hover:border-indigo-400/50 group-hover:shadow-[0_0_18px_rgba(99,102,241,0.3)] transition-all duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-indigo-300/80 mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="space-y-2.5 pt-2 border-t border-white/[0.05]">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                      Key Deliverables
                    </p>
                    <ul className="space-y-2 list-none p-0 m-0">
                      {service.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Section: Technologies & Discuss Link */}
                <div className="mt-8 pt-5 border-t border-white/[0.06] space-y-4">
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-1">
                    <a
                      href="#contact"
                      onClick={handleScrollToContact}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 group-hover:translate-x-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* ========================================================= */}
        {/* Bottom Callout Banner                                      */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-blue-900/30 border border-indigo-500/20 backdrop-blur-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>COLLABORATION &amp; PROJECTS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have a project or custom requirements in mind?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              I am open to discuss ideas, technical feasibility, frontend architectures,
              or freelance work tailored to your scope.
            </p>
          </div>

          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all duration-200 active:scale-95 border border-indigo-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <span>Let&apos;s Discuss Your Project</span>
            <ArrowRight className="w-4 h-4 text-indigo-100" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
