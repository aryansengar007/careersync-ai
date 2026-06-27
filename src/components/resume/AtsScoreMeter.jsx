// src/components/resume/AtsScoreMeter.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * AtsScoreMeter — an arc gauge (not a generic linear progress bar) that
 * visualizes the heuristic ATS-readiness score, with a short tip on what
 * would move the number up. The arc is a real SVG stroke-dashoffset
 * animation, not an image.
 */
export default function AtsScoreMeter({ score }) {
  const radius = 54;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (score / 100) * circumference;

  const tone =
    score >= 80 ? { color: "#16A34A", label: "Strong — ready to send" }
    : score >= 55 ? { color: "#F59E0B", label: "Decent — a few gaps remain" }
    : { color: "#EF4444", label: "Needs more detail" };

  return (
    <div className="rounded-3xl glass-panel shadow-glass p-6 flex flex-col items-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-sync-ink/40 self-start mb-2">
        ATS Readiness
      </p>
      <div className="relative w-[140px] h-[80px]">
        <svg width="140" height="80" viewBox="0 0 140 80">
          <path
            d="M 13 73 A 54 54 0 0 1 127 73"
            fill="none"
            stroke="#E4E1F5"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <motion.path
            d="M 13 73 A 54 54 0 0 1 127 73"
            fill="none"
            stroke={tone.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <span className="font-display text-2xl font-semibold text-sync-ink">{score}</span>
          <span className="text-sm text-sync-ink/40">/100</span>
        </div>
      </div>
      <p className="text-xs mt-3 font-medium" style={{ color: tone.color }}>
        {tone.label}
      </p>
    </div>
  );
}
