// src/components/interview/FlipCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, MessageCircleQuestion, Lightbulb } from "lucide-react";

/**
 * FlipCard — tap to flip between the HR question and a structured tip on
 * how to answer it. Uses a real 3D flip (rotateY) rather than a fade/swap.
 */
export default function FlipCard({ q, tip }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative h-56 [perspective:1200px]" onClick={() => setFlipped((f) => !f)}>
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl glass-panel shadow-glass p-6 flex flex-col [backface-visibility:hidden]"
        >
          <MessageCircleQuestion className="text-sync-indigo mb-4" size={22} />
          <p className="font-display text-base font-semibold text-sync-ink leading-snug flex-1">{q}</p>
          <span className="flex items-center gap-1.5 text-xs text-sync-ink/40 self-end">
            <RotateCw size={12} /> Tap for tip
          </span>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-sync-ink p-6 flex flex-col [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <Lightbulb className="text-sync-amber mb-4" size={22} />
          <p className="text-sm text-white/80 leading-relaxed flex-1">{tip}</p>
          <span className="flex items-center gap-1.5 text-xs text-white/40 self-end">
            <RotateCw size={12} /> Tap to flip back
          </span>
        </div>
      </motion.div>
    </div>
  );
}
