"use client";

import React from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
  ArrowUp,
} from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@/data/navigation";
import { SOCIAL_PROFILES, CONTACT_INFO } from "@/data/contact";
import SocialIcon from "@/components/common/SocialIcon";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();


  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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

  return (
    <footer
      role="contentinfo"
      aria-label="Footer"
      className="relative w-full border-t border-white/[0.08] bg-[#06070a] text-zinc-400 overflow-hidden"
    >
      {/* Decorative Top Ambient Border Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      {/* Background Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/[0.03] blur-[140px] rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pb-14">
        {/* Main Grid: Info, Navigation Shortcuts, Socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/[0.06]">
          {/* Column 1: Brand & Identity (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "home")}
              className="group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 transition-transform active:scale-95"
              aria-label="Back to Top - Sandesh Waghmare"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#0c0d16] via-[#101222] to-[#151228] border border-indigo-500/30 flex items-center justify-center p-1.5 shadow-[0_0_18px_rgba(99,102,241,0.2)] group-hover:border-indigo-400/60 group-hover:shadow-[0_0_22px_rgba(99,102,241,0.4)] transition-all duration-300">
                <Image
                  src="/images/logo-icon.png"
                  alt="Sandesh Waghmare Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-1 font-sans">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-indigo-300 transition-colors">
                  SANDESH WAGHMARE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              </div>
            </a>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Computer Engineering Student &amp; Developer passionate about crafting
              responsive, high-performance web applications and intuitive digital experiences.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs text-zinc-400">
                Based in <span className="text-zinc-200">Pune, India</span> &bull; Open to opportunities
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Shortcuts (4 cols) */}
          <div className="md:col-span-4 space-y-3.5">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
              Navigation Shortcuts
            </p>
            <nav aria-label="Footer Navigation">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 list-none p-0 m-0">
                {NAV_ITEMS.map((item: NavItem) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleScrollTo(e, item.id)}
                      className="text-xs sm:text-sm text-zinc-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded py-0.5"
                    >
                      <span className="text-[10px] text-zinc-600 font-mono">/</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Social Profiles & Direct Contact (3 cols) */}
          <div className="md:col-span-3 space-y-3.5">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
              Connect &amp; Socials
            </p>

            <div className="flex flex-wrap gap-2 pt-0.5">
              {SOCIAL_PROFILES.map((social) => {
                const isExternal = !social.href.startsWith("mailto:");
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={social.ariaLabel}
                    title={social.ariaLabel}
                    className="group p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-indigo-500/40 text-zinc-400 hover:text-white transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-sm"
                  >
                    <SocialIcon
                      icon={social.icon}
                      className="w-4 h-4 transition-transform group-hover:scale-110"
                    />
                  </a>
                );
              })}
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-zinc-500">Need direct contact?</p>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                aria-label="Email Sandesh Waghmare"
                title="Email Sandesh Waghmare"
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>
              &copy; {currentYear}{" "}
              <span className="text-zinc-300 font-medium">Sandesh Waghmare</span>.
              All rights reserved.
            </span>
          </div>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of the page"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-indigo-500/30 text-zinc-400 hover:text-white transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 text-indigo-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
