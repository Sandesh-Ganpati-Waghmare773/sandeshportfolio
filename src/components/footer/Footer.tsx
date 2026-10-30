"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUp,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@/data/navigation";
import { SOCIAL_PROFILES, CONTACT_INFO } from "@/data/contact";
import SocialIcon from "@/components/common/SocialIcon";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  // Email copy state
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Subtle cursor-responsive depth for decorative background layers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 90, damping: 20 };
  const bgParallaxX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    springConfig
  );
  const bgParallaxY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-8, 8]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = footerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    window.history.pushState(null, "", "#home");
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="contentinfo"
      aria-label="Footer"
      className="relative w-full border-t border-[#292D32] bg-[#0B0D0F] text-zinc-400 overflow-hidden"
    >
      {/* Decorative Top Ambient Border Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A00]/50 to-transparent"
      />

      {/* ========================================================= */}
      {/* Subtle Abstract Dark Brown/Orange Background Curves        */}
      {/* ========================================================= */}
      <motion.div
        aria-hidden="true"
        style={{
          x: shouldReduceMotion ? 0 : bgParallaxX,
          y: shouldReduceMotion ? 0 : bgParallaxY,
        }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Ambient warm radial illumination */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-[radial-gradient(ellipse,rgba(58,33,15,0.22)_0%,rgba(255,138,0,0.03)_40%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-[10%] w-[460px] h-[280px] bg-[radial-gradient(circle,rgba(90,45,12,0.18)_0%,transparent_70%)] blur-2xl" />

        {/* Abstract geometric curved lines matching the rest of the site */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="footer-contour-main"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="80%"
            >
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0" />
              <stop offset="25%" stopColor="#4A260D" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#5A2D0C" stopOpacity="0.38" />
              <stop offset="85%" stopColor="#7A3B0B" stopOpacity="0.28" />
              <stop offset="95%" stopColor="rgba(255, 138, 0, 0.16)" />
              <stop offset="100%" stopColor="rgba(255, 138, 0, 0)" />
            </linearGradient>

            <linearGradient
              id="footer-contour-dashed"
              x1="0%"
              y1="20%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#4A260D" stopOpacity="0" />
              <stop offset="35%" stopColor="#3A210F" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#5A2D0C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7A3B0B" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              id="footer-ribbon"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#3A210F" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#5A2D0C" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#5A2D0C" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Faint ribbon fill */}
          <path
            d="M -40 200 C 340 120, 680 340, 1080 180 L 1080 230 C 680 390, 340 170, -40 250 Z"
            fill="url(#footer-ribbon)"
          />

          {/* Sweeping dynamic contour lines */}
          <path
            d="M -40 200 C 340 120, 680 340, 1080 180 C 1240 120, 1380 240, 1500 320"
            stroke="url(#footer-contour-main)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />

          <path
            d="M -40 250 C 320 170, 660 390, 1060 230 C 1220 170, 1360 290, 1500 370"
            stroke="url(#footer-contour-dashed)"
            strokeWidth="0.85"
            strokeDasharray="6 5"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pb-14 relative z-10">
        {/* ========================================================= */}
        {/* Main 3-Column Grid                                        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 pb-12 border-b border-[#292D32]">
          {/* ------------------------------------------------------- */}
          {/* Column 1: Brand & Identity (5 cols)                     */}
          {/* ------------------------------------------------------- */}
          <div className="md:col-span-5 space-y-5">
            {/* Logo & Name with restrained orange illumination */}
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "home")}
              className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] rounded-2xl p-1 transition-all active:scale-95"
              aria-label="Back to Top - Sandesh Waghmare"
            >
              <div className="relative w-11 h-11 rounded-2xl bg-[#15181B] border border-[#292D32] flex items-center justify-center p-2 shadow-[0_0_20px_rgba(255,138,0,0.18)] group-hover:border-[#FF8A00]/60 group-hover:shadow-[0_0_28px_rgba(255,138,0,0.32)] transition-all duration-300">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 rounded-2xl bg-[radial-gradient(circle,rgba(255,138,0,0.25)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <Image
                  src="/images/logo-icon.png"
                  alt="Sandesh Waghmare Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,138,0,0.4)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-sans">
                  <span className="font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-[#FFB020] transition-colors">
                    SANDESH WAGHMARE
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] shadow-[0_0_8px_#FF8A00]" />
                </div>
                <span className="text-[11px] font-mono text-zinc-500 tracking-wider uppercase">
                  Software &amp; Web Developer
                </span>
              </div>
            </a>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Computer Engineering Student &amp; Developer passionate about crafting
              responsive, high-performance web applications and intuitive digital
              experiences.
            </p>

            {/* Status & Location Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#15181B] border border-[#292D32] text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-zinc-400 text-[11px] sm:text-xs">
                Based in <span className="text-zinc-200 font-medium">Pune, India</span> &bull;{" "}
                <span className="text-emerald-400 font-medium">Available for Work</span>
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* Column 2: Navigation Shortcuts (3 cols)                  */}
          {/* ------------------------------------------------------- */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                Navigation
              </p>
            </div>

            <nav aria-label="Footer Navigation">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 list-none p-0 m-0">
                {NAV_ITEMS.map((item: NavItem) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleScrollTo(e, item.id)}
                      className="group relative inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF8A00] rounded py-0.5"
                    >
                      {/* Animated sliding arrow indicator */}
                      <ArrowRight className="w-3 h-3 text-[#FF8A00] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                      <span className="relative">
                        {item.label}
                        {/* Elegant orange underline expansion on hover */}
                        <span
                          aria-hidden="true"
                          className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-gradient-to-r from-[#FF8A00] to-[#FFB020] group-hover:w-full transition-all duration-300 ease-out"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ------------------------------------------------------- */}
          {/* Column 3: Contact & Socials (4 cols)                    */}
          {/* ------------------------------------------------------- */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                Connect
              </p>
            </div>

            {/* Interactive "Let's build something together →" Card */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "contact")}
              className="group block p-4 rounded-2xl bg-[#15181B] hover:bg-[#191C20] border border-[#292D32] hover:border-[#FF8A00]/50 transition-all duration-300 shadow-sm hover:shadow-[0_8px_24px_rgba(255,138,0,0.12)] relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A00]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-[11px] font-mono text-[#FFB020] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#FF8A00]" />
                    <span>Have a project in mind?</span>
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FFB020] transition-colors">
                    Let&apos;s build something together
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#191C20] border border-[#292D32] group-hover:border-[#FF8A00]/60 flex items-center justify-center text-zinc-400 group-hover:text-[#0B0D0F] group-hover:bg-[#FF8A00] transition-all duration-200 shrink-0">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
                </div>
              </div>
            </a>

            {/* Direct Email Address with One-Click Copy */}
            <div className="p-3 rounded-xl bg-[#15181B]/80 border border-[#292D32] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-6 h-6 rounded-lg bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center text-[#FF8A00] shrink-0">
                  <Mail className="w-3 h-3" />
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  aria-label="Email Sandesh Waghmare"
                  title="Email Sandesh Waghmare"
                  className="text-xs font-mono text-zinc-300 hover:text-[#FFB020] transition-colors truncate focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF8A00] rounded"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                title={copiedEmail ? "Email Copied!" : "Copy email address"}
                className="p-1.5 rounded-lg bg-[#191C20] hover:bg-[#292D32] border border-[#292D32] hover:border-[#FF8A00]/40 text-zinc-400 hover:text-white transition-all shrink-0 cursor-pointer"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-400 hover:text-[#FF8A00]" />
                )}
              </button>
            </div>

            {/* Social Buttons with Subtle Interactive Depth & Lift */}
            <div className="space-y-2 pt-0.5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                Professional Channels
              </p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_PROFILES.map((social) => {
                  const isExternal = !social.href.startsWith("mailto:");
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={social.ariaLabel}
                      title={social.ariaLabel}
                      whileHover={
                        shouldReduceMotion ? {} : { y: -3, scale: 1.05 }
                      }
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="group p-2.5 rounded-xl bg-[#15181B] hover:bg-[#191C20] border border-[#292D32] hover:border-[#FF8A00]/50 text-zinc-400 hover:text-white transition-colors shadow-sm hover:shadow-[0_6px_18px_rgba(255,138,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] cursor-pointer"
                    >
                      <SocialIcon
                        icon={social.icon}
                        className="w-4 h-4 transition-transform group-hover:scale-110"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Bottom Bar: Copyright & Enhanced Back to Top              */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
            <span>
              &copy; {currentYear}{" "}
              <span className="text-zinc-300 font-medium">Sandesh Waghmare</span>.
              All rights reserved.
            </span>
            <span className="hidden sm:inline text-zinc-600">&bull;</span>
            <span className="text-zinc-500">
              Crafted with Next.js &amp; Tailwind CSS
            </span>
          </div>

          {/* Enhanced Back to Top Button */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top of the page"
            className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#15181B] hover:bg-[#191C20] border border-[#292D32] hover:border-[#FF8A00]/50 text-zinc-300 hover:text-white transition-all duration-200 shadow-sm hover:shadow-[0_0_20px_rgba(255,138,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] cursor-pointer"
          >
            <span className="text-xs font-mono">Back to Top</span>
            <div className="w-5 h-5 rounded-lg bg-[#191C20] group-hover:bg-[#FF8A00]/15 border border-[#292D32] group-hover:border-[#FF8A00]/40 flex items-center justify-center transition-colors">
              <ArrowUp className="w-3 h-3 transition-transform duration-200 group-hover:-translate-y-0.5 text-[#FF8A00]" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
