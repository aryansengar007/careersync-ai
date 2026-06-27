// src/components/ui/FloatingBlobs.jsx
import React from "react";

/**
 * FloatingBlobs — soft ambient gradient shapes used behind page content.
 * Purely decorative; aria-hidden. Respects prefers-reduced-motion via the
 * `animate-float*` utilities defined in tailwind.config.js (which are
 * disabled globally for users who request reduced motion, see index.css).
 */
export default function FloatingBlobs({ variant = "default" }) {
  if (variant === "compact") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sync-indigo/15 blur-3xl animate-float" />
        <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-sync-purple/15 blur-3xl animate-float-delay" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      <div className="absolute top-[-10%] left-[10%] w-[28rem] h-[28rem] rounded-full bg-sync-indigo/20 blur-[100px] animate-float-slow" />
      <div className="absolute top-[20%] right-[5%] w-[24rem] h-[24rem] rounded-full bg-sync-blue/20 blur-[100px] animate-float" />
      <div className="absolute bottom-[-10%] left-[30%] w-[26rem] h-[26rem] rounded-full bg-sync-purple/20 blur-[110px] animate-float-delay" />
      <div className="absolute inset-0 bg-noise opacity-[0.4]" />
    </div>
  );
}
