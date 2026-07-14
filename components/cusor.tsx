"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "framer-motion";

// Small dial/reticle cursor with tick marks, evoking a precision gauge
// (engineer) and a weight plate seen edge-on (bodybuilder).
function DialRing({ rotation, filled }: { rotation: number; filled: boolean }) {
  const ticks = Array.from({ length: 12 });
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="overflow-visible">
      <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "28px 28px" }}>
        {ticks.map((_, i) => {
          const angle = (i / ticks.length) * 360;
          const long = i % 3 === 0;
          return (
            <line
              key={i}
              x1="28"
              y1={long ? "2" : "5"}
              x2="28"
              y2="8"
              stroke={filled ? "#0D0D0F" : "#C9CCD1"}
              strokeWidth="1.4"
              style={{ transform: `rotate(${angle}deg)`, transformOrigin: "28px 28px" }}
            />
          );
        })}
      </g>
      <circle
        cx="28"
        cy="28"
        r="24"
        fill={filled ? "#FF3D2E" : "transparent"}
        stroke={filled ? "#FF3D2E" : "#C9CCD1"}
        strokeWidth="1.4"
        opacity={filled ? 0.95 : 0.7}
      />
    </svg>
  );
}

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const rotation = useRef(0);
  const [rotationState, setRotationState] = useState(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // dot: near-instant, tight spring
  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 60, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 60, mass: 0.2 });

  // ring: looser spring, trails behind — the "lag" is the point
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 20, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 20, mass: 0.6 });

  useAnimationFrame((_, delta) => {
    // constant slow rotation, speeds up while hovering something interactive
    const speed = hovered ? 0.12 : 0.045;
    rotation.current += delta * speed;
    setRotationState(rotation.current % 360);
  });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor], input, textarea, select"
      ) as HTMLElement | null;
      if (target) {
        setHovered(true);
        const custom = target.getAttribute("data-cursor-text");
        if (custom) setLabel(custom);
        else if (target.tagName === "A") setLabel("OPEN");
        else if (target.tagName === "BUTTON") setLabel("");
        else setLabel("");
      } else {
        setHovered(false);
        setLabel("");
      }
    };

    const leaveWindow = () => setVisible(false);
    const enterWindow = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leaveWindow);
    document.addEventListener("mouseenter", enterWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leaveWindow);
      document.removeEventListener("mouseenter", enterWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="hidden [.custom-cursor-active_&]:block fixed inset-0 pointer-events-none z-[100]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
      aria-hidden="true"
    >
      {/* core dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-ember"
        />
      </motion.div>

      {/* trailing dial ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
      >
        <motion.div
          animate={{ scale: hovered ? 1.25 : 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <DialRing rotation={rotationState} filled={hovered} />
        </motion.div>

        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="absolute font-mono text-[9px] uppercase tracking-widest2 text-carbon"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}