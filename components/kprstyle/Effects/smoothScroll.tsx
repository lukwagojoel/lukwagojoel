"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wraps the app and replaces native scroll with Lenis's eased scroll.
 * This is what gives you the slow, weighted scroll feel - the browser
 * still scrolls the real document (so Framer Motion's useScroll /
 * whileInView keep working normally), Lenis just interpolates how fast
 * it gets there.
 *
 * Mount this ONCE, as high as possible in the tree (root layout), as a
 * true sibling alongside your fixed Header - do not add any wrapper div
 * with a transform/filter around it, that would break position: fixed
 * elsewhere on the page (see the earlier header-disappearing-on-scroll fix).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Higher = slower/heavier scroll. Default is ~1.2, this is
      // deliberately pushed up for that "weighted" kprverse feel.
      duration: 2.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // No wrapping DOM element - a Fragment, so this can't accidentally
  // become a transformed ancestor for anything fixed inside it.
  return <>{children}</>;
}