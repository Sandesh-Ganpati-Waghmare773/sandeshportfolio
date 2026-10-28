"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import { gsap } from "gsap";
import Image from "next/image";
import IntroParticlesCanvas from "./IntroParticlesCanvas";

/**
 * =========================================================================
 * CINEMATIC INTRO CONFIGURATION
 * -------------------------------------------------------------------------
 * - ALWAYS_PLAY_INTRO: Set to true so intro plays on opening and refreshing.
 * - INTRO_SESSION_KEY: Key used in sessionStorage.
 * =========================================================================
 */
export const ALWAYS_PLAY_INTRO = true;
export const INTRO_SESSION_KEY = "sandesh_portfolio_intro_seen";

const emptySubscribe = () => () => {};

function getSessionIntroSeen(): boolean {
  if (ALWAYS_PLAY_INTRO) return false;
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function getReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function PortfolioIntro() {
  const hasSeenIntro = useSyncExternalStore(
    emptySubscribe,
    getSessionIntroSeen,
    () => false
  );
  const prefersReduced = useSyncExternalStore(
    emptySubscribe,
    getReducedMotion,
    () => false
  );

  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  // References for GSAP animated elements
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stage1Ref = useRef<HTMLDivElement | null>(null);
  const stage2Ref = useRef<HTMLDivElement | null>(null);
  const stage3Ref = useRef<HTMLDivElement | null>(null);
  const stage3BadgeRef = useRef<HTMLDivElement | null>(null);
  const stage3NameRef = useRef<HTMLHeadingElement | null>(null);
  const stage3SubRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const techGridRef = useRef<HTMLDivElement | null>(null);

  // Timeline reference for proper cleanup and skip handling
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isCompletingRef = useRef<boolean>(false);

  // Conclude intro, restore scrolling, save session flag
  const finishIntro = useCallback(() => {
    if (isCompletingRef.current) return;
    isCompletingRef.current = true;

    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    } catch {
      // In case sessionStorage is restricted in strict privacy modes
    }

    // Unlock body scroll smoothly
    document.body.style.overflow = "";

    // Unmount intro overlay
    setIsDismissed(true);
  }, []);

  // Quick cinematic exit transition (used by both completion and Skip Intro)
  const triggerExitTransition = useCallback(
    (isFast = false) => {
      if (isCompletingRef.current || !containerRef.current) return;
      setIsWarping(true);

      const duration = isFast ? 0.35 : 0.55;

      // Animate remaining text elements out with soft blur
      const textEls = [
        stage1Ref.current,
        stage2Ref.current,
        stage3Ref.current,
      ].filter(Boolean);
      if (textEls.length > 0) {
        gsap.to(textEls, {
          opacity: 0,
          y: -24,
          scale: 1.03,
          filter: "blur(8px)",
          duration: duration * 0.7,
          ease: "power2.in",
          overwrite: "auto",
        });
      }

      // Smoothly expand ambient light and fade out the dark veil into Hero
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.04,
        duration,
        ease: "power2.inOut",
        onComplete: finishIntro,
      });
    },
    [finishIntro]
  );

  // Skip button click handler
  const handleSkip = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    triggerExitTransition(true);
  }, [triggerExitTransition]);

  useEffect(() => {
    // If already seen or prefers reduced motion, do not start timeline
    if (hasSeenIntro || prefersReduced || isDismissed) {
      return;
    }

    const isMobileDevice =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    // Lock page scroll while intro is running
    document.body.style.overflow = "hidden";

    // Cursor tracking with subtle parallax easing (Desktop)
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      targetX = (e.clientX - window.innerWidth / 2) * 0.05;
      targetY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    const updateParallax = () => {
      if (!isMobileDevice) {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        if (ambientGlowRef.current) {
          ambientGlowRef.current.style.transform = `translate3d(${
            currentX * 1.5
          }px, ${currentY * 1.5}px, 0)`;
        }
        if (techGridRef.current) {
          techGridRef.current.style.transform = `translate3d(${
            -currentX * 0.5
          }px, ${-currentY * 0.5}px, 0)`;
        }
      }
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("pointermove", handlePointerMove);
    rafId = requestAnimationFrame(updateParallax);

    // Keyboard shortcut for Skip Intro (Escape or Enter)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Build cinematic GSAP Timeline (~6.8s total duration for clear, comfortable reading)
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        triggerExitTransition(false);
      },
    });
    timelineRef.current = tl;

    // Initial state setup
    gsap.set([stage1Ref.current, stage2Ref.current, stage3Ref.current], {
      opacity: 0,
      visibility: "hidden",
    });
    gsap.set(
      [
        stage3BadgeRef.current,
        stage3NameRef.current,
        stage3SubRef.current,
      ],
      { opacity: 0 }
    );

    // -------------------------------------------------------------
    // SEQUENCE 0.0s – 0.6s: Environment boot, dark atmosphere
    // -------------------------------------------------------------
    tl.to({}, { duration: 0.6 });

    // -------------------------------------------------------------
    // SEQUENCE 0.6s – 2.1s: "WELCOME" Cinematic Typography Reveal & Reading Hold
    // -------------------------------------------------------------
    tl.call(() => {
      gsap.set(stage1Ref.current, { visibility: "visible" });
    });
    tl.fromTo(
      stage1Ref.current,
      {
        opacity: 0,
        y: 24,
        scale: 0.95,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.85,
        ease: "power2.out",
      }
    );
    // Comfortable reading hold for WELCOME
    tl.to({}, { duration: 0.75 });

    // -------------------------------------------------------------
    // SEQUENCE 2: Transform into "WELCOME TO MY DIGITAL WORLD" & Hold
    // -------------------------------------------------------------
    tl.to(
      stage1Ref.current,
      {
        opacity: 0,
        y: -16,
        filter: "blur(6px)",
        duration: 0.35,
        ease: "power2.in",
      }
    );
    tl.call(() => {
      gsap.set(stage1Ref.current, { visibility: "hidden" });
      gsap.set(stage2Ref.current, { visibility: "visible" });
    });
    tl.fromTo(
      stage2Ref.current,
      {
        opacity: 0,
        y: 24,
        scale: 0.95,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "power2.out",
      },
      "<0.05"
    );
    // Hold so visitor reads "WELCOME TO MY DIGITAL WORLD"
    tl.to({}, { duration: 0.8 });

    // -------------------------------------------------------------
    // SEQUENCE 3: End "WELCOME TO MY DIGITAL WORLD" & show "SANDESH WAGHMARE" for 2s
    // -------------------------------------------------------------
    tl.to(
      stage2Ref.current,
      {
        opacity: 0,
        y: -18,
        filter: "blur(6px)",
        duration: 0.35,
        ease: "power2.in",
      }
    );
    tl.call(() => {
      gsap.set(stage2Ref.current, { visibility: "hidden" });
      gsap.set(stage3Ref.current, { opacity: 1, visibility: "visible" });
    });
    tl.fromTo(
      stage3BadgeRef.current,
      {
        opacity: 0,
        y: 15,
        scale: 0.92,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "<0.05"
    );
    tl.fromTo(
      stage3NameRef.current,
      {
        opacity: 0,
        y: 25,
        scale: 0.93,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "back.out(1.15)",
      },
      "<0.08"
    );

    // Reveal Subtitle synchronously
    tl.fromTo(
      stage3SubRef.current,
      {
        opacity: 0,
        y: 14,
        letterSpacing: "0.3em",
      },
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.26em",
        duration: 0.5,
        ease: "power2.out",
      },
      "<0.15"
    );

    // Keep the "SANDESH WAGHMARE" screen visible for 2 seconds (0.6s entrance + 1.4s hold)
    tl.to({}, { duration: 1.4 });

    // Cleanup when unmounting
    return () => {
      tl.kill();
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [hasSeenIntro, prefersReduced, isDismissed, triggerExitTransition, handleSkip]);

  if (hasSeenIntro || prefersReduced || isDismissed) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="portfolio-cinematic-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Intro"
      className="fixed inset-0 z-[100] w-full h-[100dvh] bg-[#08090d] text-zinc-100 flex items-center justify-center overflow-hidden select-none"
    >
      {/* Interactive Canvas Particles */}
      <IntroParticlesCanvas
        isWarping={isWarping}
        mousePosRef={mousePosRef}
      />

      {/* Tech Grid Background matching portfolio aesthetic */}
      <div
        ref={techGridRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
      </div>

      {/* Dynamic Ambient Glow following cursor */}
      <div
        ref={ambientGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="w-[500px] sm:w-[700px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/15 blur-[140px] rounded-full" />
      </div>

      {/* Top Right: Accessible Skip Intro Button */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30">
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip cinematic intro and go directly to portfolio"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-indigo-400/50 backdrop-blur-md shadow-lg transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
        >
          <span>Skip Intro</span>
          <span className="text-[10px] text-zinc-500 group-hover:text-indigo-300 transition-colors hidden sm:inline">
            [ESC]
          </span>
        </button>
      </div>

      {/* Main Animated Sequence Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center w-full flex items-center justify-center">
        {/* ============================================================ */}
        {/* STAGE 1: "WELCOME"                                           */}
        {/* ============================================================ */}
        <div
          ref={stage1Ref}
          style={{ opacity: 0, visibility: "hidden" }}
          className="absolute inset-0 flex flex-col items-center justify-center space-y-4 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>PORTFOLIO EXPERIENCE</span>
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(99,102,241,0.4)]">
            WELCOME
          </h2>
        </div>

        {/* ============================================================ */}
        {/* STAGE 2: "WELCOME TO MY DIGITAL WORLD"                       */}
        {/* ============================================================ */}
        <div
          ref={stage2Ref}
          style={{ opacity: 0, visibility: "hidden" }}
          className="absolute inset-0 flex flex-col items-center justify-center space-y-3 pointer-events-none"
        >
          <p className="text-sm sm:text-lg md:text-xl font-mono tracking-[0.32em] text-indigo-300/90 uppercase font-semibold">
            WELCOME TO MY
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(99,102,241,0.4)]">
            DIGITAL WORLD
          </h2>
        </div>

        {/* ============================================================ */}
        {/* STAGE 3: "SANDESH WAGHMARE" (Centerpiece Peak)               */}
        {/* ============================================================ */}
        <div
          ref={stage3Ref}
          style={{ opacity: 0, visibility: "hidden" }}
          className="relative flex flex-col items-center justify-center space-y-4 sm:space-y-5 pointer-events-none"
        >
          <div
            ref={stage3BadgeRef}
            style={{ opacity: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-mono tracking-widest uppercase shadow-[0_0_25px_rgba(99,102,241,0.3)] backdrop-blur-md"
          >
            <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0">
              <Image
                src="/images/logo-icon.png"
                alt="SW Logo"
                width={20}
                height={20}
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
              />
            </div>
            <span>HELLO, I&apos;M</span>
          </div>

          <h1
            ref={stage3NameRef}
            style={{ opacity: 0 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-[1.05]"
          >
            SANDESH{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_55px_rgba(129,140,248,0.55)]">
              WAGHMARE
            </span>
          </h1>

          <div
            ref={stage3SubRef}
            style={{ opacity: 0 }}
            className="space-y-2 pt-1"
          >
            <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.26em] text-zinc-300 uppercase flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
              <span>DEVELOPER</span>
              <span className="text-indigo-400 font-bold">•</span>
              <span>CREATOR</span>
              <span className="text-purple-400 font-bold">•</span>
              <span>PROBLEM SOLVER</span>
            </p>
            <div className="w-28 sm:w-40 h-[2px] mx-auto bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_12px_rgba(129,140,248,0.7)]" />
          </div>
        </div>
      </div>

      {/* Bottom Center: Subtle Loading Micro-Bar Indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-[2px] bg-white/[0.08] rounded-full overflow-hidden pointer-events-none"
      >
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-full animate-[pulse_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
