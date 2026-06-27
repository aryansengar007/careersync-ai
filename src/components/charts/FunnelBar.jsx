// src/components/charts/FunnelBar.jsx
import React from "react";
import { motion } from "framer-motion";

const COLORS = {
  Applied: "#3B82F6",
  Interviewing: "#F59E0B",
  Offer: "#16A34A",
  Rejected: "#94A3B8",
};

/**
 * FunnelBar — horizontal stage bars sized relative to the largest stage,
 * used to visualize the application pipeline at a glance.
 */
export default function FunnelBar({ counts }) {
  const max = Math.max(...Object.values(counts), 1);

  return (
    <div className="space-y-4">
      {Object.entries(counts).map(([stage, value]) => (
        <div key={stage}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-sync-ink/70">{stage}</span>
            <span className="font-semibold text-sync-ink">{value}</span>
          </div>
          <div className="h-2.5 rounded-full bg-sync-mist overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(value / max) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: COLORS[stage] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
