// src/components/charts/ActivityChart.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * ActivityChart — a hand-built SVG line + gradient-area chart (no charting
 * library) so the line draws itself in via stroke-dashoffset and the fill
 * fades in underneath. Takes an array of { label, value }.
 */
export default function ActivityChart({ data, height = 180 }) {
  const width = 640;
  const padding = 24;

  const { points, max } = useMemo(() => {
    const max = Math.max(...data.map((d) => d.value), 1);
    const stepX = (width - padding * 2) / (data.length - 1 || 1);
    const points = data.map((d, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (d.value / max) * (height - padding * 2);
      return { x, y, ...d };
    });
    return { points, max };
  }, [data, height]);

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? 0} ${height - padding} L ${points[0]?.x ?? 0} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Baseline grid */}
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={padding}
          x2={width - padding}
          y1={padding + f * (height - padding * 2)}
          y2={padding + f * (height - padding * 2)}
          stroke="#E4E1F5"
          strokeWidth="1"
        />
      ))}

      <motion.path
        d={areaPath}
        fill="url(#activityFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <motion.path
        d={linePath}
        fill="none"
        stroke="#6C63FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#6C63FF" stroke="white" strokeWidth="2" />
          <text x={p.x} y={height - 4} textAnchor="middle" fontSize="10" fill="#1E1B4B" opacity="0.4">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
