"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt rotation in degrees. kprverse-style default is subtle, ~10-14deg. */
  maxTilt?: number;
  /** How much the inner content "zooms" on hover, e.g. 1.06 = 6% scale */
  hoverScale?: number;
  /** Spring stiffness - higher = snappier, lower = floatier */
  stiffness?: number;
  damping?: number;
}

/**
 * TiltCard - a 3D parallax tilt wrapper (kprverse-style hero hover effect)
 *
 * Wrap any image or card in this. It tracks the cursor's position relative
 * to the element's center and applies a CSS 3D transform, with a slight
 * inner scale to fake depth - the "looking into a window" trick.
 *
 * Usage:
 *   <TiltCard className="w-full max-w-md">
 *     <img src="/hero.jpg" alt="" className="w-full h-full object-cover" />
 *   </TiltCard>
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  hoverScale = 1.06,
  stiffness = 150,
  damping = 20,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // raw mouse position (-0.5 to 0.5 relative to element)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // spring-smoothed values so the tilt settles instead of snapping
  const springX = useSpring(mouseX, { stiffness, damping });
  const springY = useSpring(mouseY, { stiffness, damping });

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

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
      className={`relative overflow-hidden rounded-2xl [perspective:1000px] motion-reduce:!transform-none ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? hoverScale : 1,
        }}
        transition={{ scale: { duration: 0.4, ease: "easeOut" } }}
        className="h-full w-full motion-reduce:!transform-none"
      >
        {children}
      </motion.div>

      {/* subtle sheen that moves opposite the tilt, sells the "glass window" feel */}
      <motion.div
        aria-hidden
        style={{
          opacity: useTransform(springX, [-0.5, 0.5], [0, 0]),
        }}
        animate={{ opacity: isHovered ? 0.08 : 0 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bone/40 to-transparent"
      />
    </div>
  );
}