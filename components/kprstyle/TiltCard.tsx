"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  hoverScale?: number;
  stiffness?: number;
  damping?: number;
}

/**
 * Updated TiltCard - Inside-Out depth effect.
 *
 * The outer container (ref) remains static.
 * The inner container (motion.div) applies 3D tilt and scale.
 * 'overflow-hidden' on the outer container guarantees the movement stays internal.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 10, // Subtle is key for KPR look
  hoverScale = 1.08, // Keep slightly aggressive zoom inside bounds
  stiffness = 180,
  damping = 25,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse position (-0.5 to 0.5 relative to center)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed values settle nicely
  const springX = useSpring(mouseX, { stiffness, damping });
  const springY = useSpring(mouseY, { stiffness, damping });

  // Map spring values to 3D rotation degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate mouse position as a percentage relative to the center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      // CRITICAL CHANGE: The wrapper is static, rounded, clipped, and provides perspective boundary.
      className={`relative overflow-hidden rounded-2xl [perspective:1200px] ${className}`}
    >
      {/* 
         CRITICAL CHANGE: This inner motion.div moves, scales, and tilts.
         We add a padding offset here to give the image room to rotate *into* 
         the boundary without clipping prematurely, creating depth.
      */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          // Need preserve-3d to keep the Z-axis of the scale separate from XY rotation
          transformStyle: "preserve-3d", 
        }}
        animate={{
          // Slightly zoom *everything* inside when hovered
          scale: isHovered ? hoverScale : 1,
        }}
        transition={{ scale: { duration: 0.4, ease: "easeOut" } }}
        className="relative h-full w-full motion-reduce:!transform-none"
      >
        {children}
      </motion.div>

      {/* Aesthetic inner framing border (non-interactive) */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-10" />
    </div>
  );
}