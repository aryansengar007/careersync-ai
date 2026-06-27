// src/components/jobtracker/StatusDonut.jsx
import React from "react";
import { motion } from "framer-motion";

const COLORS = {
  Applied: "#3B82F6",
  Interviewing: "#F59E0B",
  Offer: "#16A34A",
  Rejected: "#94A3B8",
};

/**
 * StatusDonut — a hand-built SVG donut (not a charting-library default)
 * showing the proportion of applications in each status, with a live
 * total in the center and a color-coded legend.
 */
export default function StatusDonut({ counts, total }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  const segments = Object.entries(counts).filter(([, v]) => v > 0);

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-[120px] h-[120px] flex-shrink-0">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#EFEDFB" strokeWidth="14" />
          {segments.map(([status, value]) => {
            const fraction = total ? value / total : 0;
            const dash = fraction * circumference;
            const offset = circumference - cumulative;
            cumulative += dash;
            return (
              <motion.circle
                key={status}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={COLORS[status]}
                strokeWidth="14"
                strokeDasharray={`${dash} ${circumference - dash}`}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeOut" }}
                transform="rotate(-90 60 60)"
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-semibold text-sync-ink">{total}</span>
          <span className="text-[10px] text-sync-ink/40 uppercase tracking-wide">Total</span>
        </div>
      </div>
      <div className="space-y-2">
        {Object.entries(counts).map(([status, value]) => (
          <div key={status} className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[status] }} />
            <span className="text-sync-ink/70">{status}</span>
            <span className="font-semibold text-sync-ink">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
