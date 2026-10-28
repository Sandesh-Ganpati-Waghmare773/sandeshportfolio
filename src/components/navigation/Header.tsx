"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@/data/navigation";

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  const shouldReduceMotion = useReducedMotion();
  const isManualScrolling = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position to update header appearance and active section
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > 20;
    setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));

    // If user clicked a navigation item, pause automatic scroll spy briefly
    if (isManualScrolling.current) return;

    // Detect if at the very top
    if (scrollY < 80) {
      setActiveSection((prev) => (prev !== "home" ? "home" : prev));
      return;
    }

    // Detect if at the very bottom of the page
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 60) {
      const lastId = NAV_ITEMS[NAV_ITEMS.length - 1].id;
      setActiveSection((prev) => (prev !== lastId ? lastId : prev));
      return;
    }

    // Compute active section based on proximity to header
    const headerOffset = 140;
    let currentActive = NAV_ITEMS[0].id;

    for (let i = 0; i < NAV_ITEMS.length; i++) {
      const item = NAV_ITEMS[i];
      const element = document.getElementById(item.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
          currentActive = item.id;
          break;
        } else if (rect.top <= headerOffset) {
          currentActive = item.id;
        }
      }
    }

    setActiveSection((prev) => (prev !== currentActive ? currentActive : prev));
  }, []);


  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial evaluation deferred to animation frame
    const animId = window.requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(animId);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Close mobile menu on resize to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Smooth scroll handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setIsMobileMenuOpen(false);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      isManualScrolling.current = true;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      targetElement.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });

      // Update URL hash without jumping
      window.history.pushState(null, "", href);

      // Re-enable scroll spy after scroll animation finishes
      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 800);
    }
  };

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 30 };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0D0F]/90 backdrop-blur-md border-b border-[#292D32] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home", "home")}
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] rounded-lg p-1 transition-transform active:scale-95"
            aria-label="Sandesh Portfolio Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#15181B] border border-[#292D32] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(255,138,0,0.15)] group-hover:border-[#FF8A00]/60 group-hover:shadow-[0_0_20px_rgba(255,138,0,0.3)] transition-all duration-300">
              <Image
                src="/images/logo-icon.png"
                alt="Sandesh Waghmare Logo"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,138,0,0.35)] group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-sans leading-none">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-[#FFB020] transition-colors">
                  SANDESH
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
              </div>
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#FF8A00] uppercase group-hover:text-[#FFB020] transition-colors mt-0.5">
                WAGHMARE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center rounded-full bg-[#101214]/85 border border-[#292D32] p-1 shadow-inner backdrop-blur-md"
          >
            <ul className="flex items-center gap-0.5 list-none m-0 p-0">
              {NAV_ITEMS.map((item: NavItem) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href, item.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors duration-200 rounded-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] ${
                        isActive
                          ? "text-white"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* Active Indicator Underline / Background Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="desktop-active-indicator"
                          className="absolute inset-0 rounded-full bg-[#191C20] border border-[#292D32] shadow-[0_0_12px_rgba(255,138,0,0.15)]"
                          transition={springTransition}
                        />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="desktop-active-dot"
                          className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-[#FF8A00] to-[#FFB020] rounded-full"
                          transition={springTransition}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action / Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Quick Contact CTA (Desktop/Tablet) */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact", "contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full bg-[#FF8A00] hover:bg-[#E86F00] text-[#0B0D0F] shadow-[0_0_15px_rgba(255,138,0,0.3)] hover:shadow-[0_0_20px_rgba(255,138,0,0.45)] transition-all duration-200 border border-[#FFB020]/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0B0D0F]" />
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-[#292D32] hover:border-[#FF8A00]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00]"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#FF8A00]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden px-4 pt-3 pb-4"
          >
            <nav
              aria-label="Mobile Navigation"
              className="max-w-7xl mx-auto rounded-2xl bg-[#101214]/95 border border-[#292D32] backdrop-blur-2xl p-3 shadow-2xl shadow-black/80"
            >
              <ul className="flex flex-col gap-1 list-none m-0 p-0">
                {NAV_ITEMS.map((item: NavItem, index: number) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href, item.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] ${
                          isActive
                            ? "bg-[#15181B] text-white border-l-2 border-[#FF8A00] font-semibold"
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-zinc-500">
                            0{index + 1}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {isActive && (
                          <span className="flex items-center gap-1 text-xs text-[#FF8A00]">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            <span>Active</span>
                          </span>
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile CTA */}
              <div className="mt-3 pt-3 border-t border-[#292D32]">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact", "contact")}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-[#FF8A00] hover:bg-[#E86F00] text-[#0B0D0F] shadow-md shadow-[#FF8A00]/20 transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Connect With Sandesh</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0B0D0F]" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
