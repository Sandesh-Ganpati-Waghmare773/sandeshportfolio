"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import {
  CERTIFICATES,
  CERTIFICATE_CATEGORIES,
  type Certificate,
} from "@/data/certificates";

export default function Certificates() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Parallax camera tilt angles (degrees)
  const [stageRotateX, setStageRotateX] = useState<number>(0);
  const [stageRotateY, setStageRotateY] = useState<number>(0);

  // Touch gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Autoplay timer reference
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered certificates based on selected category
  const filteredCertificates = useMemo(() => {
    return activeCategory === "all"
      ? CERTIFICATES
      : CERTIFICATES.filter((cert) => cert.category === activeCategory);
  }, [activeCategory]);

  const totalCards = filteredCertificates.length;

  // Detect mobile device breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Safe clamped active index for circular math
  const safeActiveIndex = totalCards > 0 ? activeIndex % totalCards : 0;

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (totalCards <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    if (totalCards <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  // Autoplay management (5-second intervals, paused when hovered/interacting)
  useEffect(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    if (isPlaying && !isHovered && totalCards > 1 && !shouldReduceMotion) {
      autoplayTimerRef.current = setInterval(() => {
        goToNext();
      }, 5000);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPlaying, isHovered, totalCards, shouldReduceMotion, goToNext]);

  // Subtle interactive parallax tilt based on mouse position over stage
  const handleMouseMoveStage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2; // -1 to +1
    const normY = (y / rect.height - 0.5) * 2; // -1 to +1

    // Very gentle camera tilt (max -2.5deg to 2.5deg)
    setStageRotateX(-normY * 2.5);
    setStageRotateY(normX * 4);
  };

  const handleMouseLeaveStage = () => {
    setIsHovered(false);
    setStageRotateX(0);
    setStageRotateY(0);
  };

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Detect horizontal swipe
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  // Card click handler: clicking side cards rotates them to front-center
  const handleCardClick = (targetIndex: number, offset: number) => {
    if (offset !== 0) {
      setActiveIndex(targetIndex);
    }
  };

  /**
   * Calculate 3D cylindrical geometry for card at offset `d`
   * d = 0: front-center
   * d > 0: right/back curve
   * d < 0: left/back curve
   */
  const getCardGeometry = (d: number, isCenter: boolean) => {
    // Stage perspective constants
    const radius = isMobile ? 360 : 540;
    const angleStepDeg = isMobile ? 38 : 34;

    const angleDeg = d * angleStepDeg;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Horizontal arc position along cylinder
    const x = Math.sin(angleRad) * radius;

    // Depth: center card is closest; sides recede backwards in Z
    const z = (Math.cos(angleRad) - 1) * radius + (isCenter ? 35 : 0);

    // Rotation around Y axis facing inwards toward the viewer
    const rotateY = -d * (isMobile ? 26 : 28);

    // Perspective scale
    const scale = isCenter ? 1.0 : Math.max(0.72, 1 - Math.abs(d) * 0.12);

    // Opacity based on distance along the cylindrical track
    let opacity = 1;
    if (Math.abs(d) === 0) opacity = 1;
    else if (Math.abs(d) === 1) opacity = 0.85;
    else if (Math.abs(d) === 2) opacity = isMobile ? 0 : 0.5;
    else opacity = 0; // Behind cylinder

    // Proper depth layering (center card is always on top)
    const zIndex = isCenter ? 50 : 40 - Math.round(Math.abs(d) * 10);

    // Physical lighting depth shading (darker when further back)
    const shadowOverlayOpacity = isCenter
      ? 0
      : Math.min(0.55, Math.abs(d) * 0.28);

    const isVisible = opacity > 0;

    return {
      x,
      z,
      rotateY,
      scale,
      opacity,
      zIndex,
      shadowOverlayOpacity,
      isVisible,
    };
  };

  return (
    <section
      id="certificates"
      aria-label="Certificates"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] scroll-mt-20 overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-indigo-600/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-12">
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
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>05 &bull; CERTIFICATES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Verified{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              Certificates
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            A comprehensive record of course completions, industry internships,
            technical publications, and computer engineering credentials.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* Category Filter Tabs                                      */}
        {/* ========================================================= */}
        <div className="flex justify-center">
          <nav
            role="tablist"
            aria-label="Certificate Category Filter"
            className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-inner max-w-full"
          >
            {CERTIFICATE_CATEGORIES.map((tab) => {
              const isActive = activeCategory === tab.id;
              const count =
                tab.id === "all"
                  ? CERTIFICATES.length
                  : CERTIFICATES.filter((c) => c.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setActiveIndex(0);
                  }}
                  className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-cert-filter"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/10 border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 350, damping: 30 }
                      }
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-indigo-500/30 text-indigo-200"
                        : "bg-white/[0.06] text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ========================================================= */}
        {/* TRUE 3D SPATIAL CYLINDER CAROUSEL STAGE                   */}
        {/* ========================================================= */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="3D Certificate Carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeaveStage}
          onMouseMove={handleMouseMoveStage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full overflow-hidden select-none py-6 sm:py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-3xl"
        >
          {/* 3D Perspective Viewport */}
          <div
            className="relative w-full h-[520px] sm:h-[560px] md:h-[580px] flex items-center justify-center overflow-visible"
            style={{ perspective: isMobile ? "1000px" : "1350px" }}
          >
            {/* 3D Stage Container with Parallax Camera Tilt */}
            <div
              className="relative w-full h-full flex items-center justify-center pointer-events-none"
              style={{
                transformStyle: "preserve-3d",
                transform: shouldReduceMotion
                  ? "none"
                  : `rotateX(${stageRotateX}deg) rotateY(${stageRotateY}deg)`,
                transition: "transform 250ms ease-out",
              }}
            >
              {filteredCertificates.map((cert: Certificate, index: number) => {
                // Shortest circular offset from safe active index
                let offset = index - safeActiveIndex;
                if (totalCards > 1) {
                  while (offset > totalCards / 2) offset -= totalCards;
                  while (offset < -totalCards / 2) offset += totalCards;
                }

                const isCenter = offset === 0;
                const {
                  x,
                  z,
                  rotateY,
                  scale,
                  opacity,
                  zIndex,
                  shadowOverlayOpacity,
                  isVisible,
                } = getCardGeometry(offset, isCenter);

                if (!isVisible) return null;

                return (
                  <div
                    key={cert.id}
                    onClick={() => handleCardClick(index, offset)}
                    style={{
                      position: "absolute",
                      transformStyle: "preserve-3d",
                      transform: shouldReduceMotion
                        ? `translateX(${x}px) scale(${scale})`
                        : `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      pointerEvents: isCenter ? "auto" : "auto",
                      cursor: isCenter ? "default" : "pointer",
                      transition: shouldReduceMotion
                        ? "none"
                        : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease",
                    }}
                    className={`w-[86vw] max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] ${
                      !isCenter ? "hover:scale-[0.92]" : ""
                    }`}
                  >
                    {/* Center Card Ambient Glow Backlight */}
                    {isCenter && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 blur-xl opacity-75"
                      />
                    )}

                    {/* Physical Display Card Panel */}
                    <article
                      className={`group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#121420] via-[#0d0e17] to-[#0a0b12] border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                        isCenter
                          ? "border-indigo-400/50 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(99,102,241,0.25)] hover:border-indigo-400/70"
                          : "border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-indigo-400/40"
                      }`}
                    >
                      {/* Physical Lighting Shading Overlay (Darker when further back in 3D) */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-30 rounded-2xl sm:rounded-3xl bg-black transition-opacity duration-500"
                        style={{ opacity: shadowOverlayOpacity }}
                      />

                      {/* Top Specular Sheen Highlight */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent z-20"
                      />

                      <div>
                        {/* Certificate Preview Image */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0c0d16] border-b border-white/[0.06]">
                          <Image
                            src={cert.image}
                            alt={`${cert.title} Certificate`}
                            fill
                            sizes="(max-width: 768px) 100vw, 420px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            priority={isCenter}
                          />
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0b12] via-transparent to-transparent opacity-80"
                          />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-300 bg-[#08090d]/85 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                              {cert.category}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full backdrop-blur-md">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          </div>

                          {/* Issuer Floating on Image Bottom */}
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300 z-10">
                            <span className="font-semibold text-white drop-shadow">
                              {cert.issuer}
                            </span>
                            {cert.duration && (
                              <span className="inline-flex items-center gap-1 text-zinc-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                                <Clock className="w-3 h-3 text-indigo-400" />
                                <span>{cert.duration}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 sm:p-6 space-y-3.5">
                          <div>
                            <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-500 mb-1.5">
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                                <span>{cert.date}</span>
                              </span>
                              {cert.credentialId && (
                                <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[130px]">
                                  ID: {cert.credentialId}
                                </span>
                              )}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors leading-snug line-clamp-2">
                              {cert.title}
                            </h3>
                          </div>

                          {/* Skills Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {cert.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                              >
                                <CheckCircle2 className="w-2.5 h-2.5 text-indigo-400" />
                                <span>{skill}</span>
                              </span>
                            ))}
                            {cert.skills.length > 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono text-zinc-400 bg-white/[0.03]">
                                +{cert.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-5 pt-0 sm:p-6 sm:pt-0 border-t border-white/[0.04] mt-2 flex items-center gap-2 relative z-30">
                        {cert.pdfUrl ? (
                          <a
                            href={cert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (!isCenter) {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveIndex(index);
                              }
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-indigo-400/40 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer shadow-sm"
                            aria-label={`View PDF certificate for ${cert.title}`}
                          >
                            <FileText className="w-4 h-4 text-indigo-400" />
                            <span>View Certificate (PDF)</span>
                          </a>
                        ) : (
                          <a
                            href={cert.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (!isCenter) {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveIndex(index);
                              }
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-indigo-400/40 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer shadow-sm"
                            aria-label={`View certificate image for ${cert.title}`}
                          >
                            <FileText className="w-4 h-4 text-indigo-400" />
                            <span>View Certificate</span>
                          </a>
                        )}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>

            {/* Left Circular 3D Navigation Control Button */}
            {totalCards > 1 && (
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous certificate in 3D carousel"
                className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-3.5 rounded-full bg-[#0d0e17]/80 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-400/50 text-zinc-300 hover:text-white backdrop-blur-xl shadow-2xl transition-all duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer group"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>
            )}

            {/* Right Circular 3D Navigation Control Button */}
            {totalCards > 1 && (
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next certificate in 3D carousel"
                className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-3.5 rounded-full bg-[#0d0e17]/80 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-400/50 text-zinc-300 hover:text-white backdrop-blur-xl shadow-2xl transition-all duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer group"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            )}
          </div>

          {/* ========================================================= */}
          {/* Bottom Controls Bar: Dots, Counter, Autoplay Toggle       */}
          {/* ========================================================= */}
          {totalCards > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4">
              {/* Pagination Dots */}
              <div
                role="tablist"
                aria-label="Carousel pagination"
                className="flex items-center gap-2"
              >
                {filteredCertificates.map((c, i) => {
                  const isCurrent = i === safeActiveIndex;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      aria-label={`Go to certificate ${i + 1}: ${c.title}`}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer ${
                        isCurrent
                          ? "w-8 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Status Pill: Counter & Autoplay Toggle */}
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400 backdrop-blur-md">
                <span className="text-zinc-200 font-semibold">
                  0{safeActiveIndex + 1}
                </span>
                <span className="text-zinc-600">/</span>
                <span>0{totalCards}</span>

                <span className="w-1 h-1 rounded-full bg-zinc-600" />

                {/* Autoplay Play/Pause Button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-label={
                    isPlaying
                      ? "Pause certificate autoplay"
                      : "Start certificate autoplay"
                  }
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-indigo-400" />
                      <span className="text-[11px]">Auto 5s</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-zinc-400" />
                      <span className="text-[11px]">Paused</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
