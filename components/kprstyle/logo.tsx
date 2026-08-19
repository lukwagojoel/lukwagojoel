"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface TypewriterLogoProps {
  text?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const TypewriterLogo: React.FC<TypewriterLogoProps> = ({
  text = "LUKWAGO JOEL",
  typingSpeed = 120,
  deletingSpeed = 60,
  pauseDuration = 2000,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < text.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === text.length) {
      // Pause at full text before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting backward
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      // Reset back to typing mode
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1 font-mono text-xs sm:text-sm font-bold tracking-widest text-white hover:text-fuchsia-400 transition-colors select-none"
    >
      <span>{displayedText}</span>
      <span className="w-2 h-4 bg-fuchsia-400 inline-block animate-pulse" />
    </Link>
  );
};