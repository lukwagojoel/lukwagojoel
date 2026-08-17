"use client";

import React from "react";

interface ClippedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ClippedButton = ({ children, onClick, className = "" }: ClippedButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        clipPath: "polygon(0 0, 82% 0, 100% 35%, 100% 100%, 18% 100%, 0 65%)",
      }}
      className={`bg-white text-black font-bold px-8 py-3 text-sm tracking-wider uppercase transition-transform hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};