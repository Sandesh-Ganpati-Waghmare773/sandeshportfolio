"use client";

import React, { useEffect, useRef } from "react";

interface IntroParticlesCanvasProps {
  isWarping?: boolean;
  mousePosRef?: React.RefObject<{ x: number; y: number }>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function IntroParticlesCanvas({
  isWarping = false,
  mousePosRef,
}: IntroParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const isMobileDevice =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    // Particle colors matching portfolio theme
    const colors = [
      "rgba(165, 180, 252,", // Indigo-300
      "rgba(192, 132, 252,", // Purple-300
      "rgba(147, 197, 253,", // Blue-300
      "rgba(224, 231, 255,", // Indigo-100
    ];

    // Responsive particle count (fewer on mobile for peak performance)
    const particleCount = isMobileDevice ? 32 : 55;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseRadius = Math.random() * 1.5 + 0.8;
      const baseAlpha = Math.random() * 0.5 + 0.25;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.35 - 0.15,
        radius: baseRadius,
        baseRadius,
        alpha: baseAlpha,
        baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    let time = 0;
    const centerX = () => width / 2;
    const centerY = () => height / 2;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const mouse = mousePosRef?.current || { x: width / 2, y: height / 2 };

      // Render subtle connection lines for digital tech space feel
      const maxDist = isMobileDevice ? 65 : 85;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and render individual particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isWarping) {
          // Accelerate outward from center during final exit transition
          const dx = p.x - centerX();
          const dy = p.y - centerY();
          const dist = Math.hypot(dx, dy) || 1;
          p.vx += (dx / dist) * 0.7;
          p.vy += (dy / dist) * 0.7;
        } else {
          // Cursor reaction on desktop
          if (!isMobileDevice) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            const avoidDist = 110;

            if (dist < avoidDist && dist > 0) {
              const force = (1 - dist / avoidDist) * 1.2;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          } else {
            // Ambient subtle oscillation on mobile/touch
            p.x += Math.sin(time + p.pulsePhase) * 0.2;
          }
        }

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;

        // Pulse alpha gently
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw particle with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(129, 140, 248, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWarping, mousePosRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-10"
      aria-hidden="true"
    />
  );
}
