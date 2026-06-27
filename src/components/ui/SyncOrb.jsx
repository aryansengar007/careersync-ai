// src/components/ui/SyncOrb.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FileText, Briefcase, MessageSquareText, Target } from "lucide-react";

const ORBIT_ITEMS = [
  { icon: FileText, label: "Resume", delay: "0s" },
  { icon: MessageSquareText, label: "Cover Letter", delay: "-4.5s" },
  { icon: Briefcase, label: "Tracker", delay: "-9s" },
  { icon: Target, label: "Interview Prep", delay: "-13.5s" },
];

/**
 * SyncOrb — CareerSync AI's signature visual. A glowing gradient hub
 * that tilts gently toward the cursor, ringed by the four product
 * pillars orbiting it like data syncing back to a central source. This
 * is the one bold, literal expression of the brand name in the whole
 * UI — everything else stays quiet around it.
 */
export default function SyncOrb() {
  const containerRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 60, damping: 12 });
  const springY = useSpring(ry, { stiffness: 60, damping: 12 });

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 14);
    rx.set(py * -14);
  };

  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="sync"
      className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] mx-auto select-none"
      style={{ perspective: 800 }}
    >
      {/* Orbit ring (decorative) */}
      <div className="absolute inset-0 rounded-full border border-sync-indigo/15" />
      <div className="absolute inset-6 rounded-full border border-dashed border-sync-purple/20" />

      {/* Orbiting feature chips */}
      {ORBIT_ITEMS.map(({ icon: Icon, label, delay }, i) => (
        <div
          key={label}
          className="absolute inset-0 animate-spin-slow"
          style={{ animationDelay: delay }}
        >
          <div
            className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass shadow-glass text-xs font-medium text-sync-ink"
            style={{ animation: "spin-counter 18s linear infinite", animationDelay: delay }}
          >
            <Icon size={14} className="text-sync-indigo" strokeWidth={2.2} />
            <span className="hidden sm:inline">{label}</span>
          </div>
        </div>
      ))}

      {/* Sync hub */}
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
        }}
        className="absolute inset-10 rounded-full bg-sync-gradient shadow-glow-indigo animate-pulse-glow flex items-center justify-center"
      >
        <div className="absolute inset-3 rounded-full bg-white/10 backdrop-blur-sm" />
        <div className="absolute inset-0 rounded-full bg-sync-radial" />
        {/* Pulse pings */}
        <span className="absolute top-6 right-10 w-1.5 h-1.5 rounded-full bg-sync-amber animate-spark" />
        <span className="absolute bottom-10 left-8 w-1 h-1 rounded-full bg-white animate-spark" style={{ animationDelay: "0.6s" }} />
        <span className="absolute top-1/2 right-6 w-1 h-1 rounded-full bg-sync-amber animate-spark" style={{ animationDelay: "1.2s" }} />

        <span className="font-display font-semibold text-white text-lg sm:text-xl tracking-tight drop-shadow-sm">
          Sync
        </span>
      </motion.div>

      <style>{`
        @keyframes spin-counter {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
