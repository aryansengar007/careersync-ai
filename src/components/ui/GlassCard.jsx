// src/components/ui/GlassCard.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * GlassCard — the base surface used across dashboards and widgets.
 * Deliberately not a plain bordered box: a soft glass fill, a hairline
 * top accent that tints by `accent`, and a lift + glow on hover so the
 * surface itself feels responsive rather than static.
 */
export default function GlassCard({
  children,
  accent = "indigo", // indigo | blue | purple | amber
  className = "",
  hover = true,
  as: Component = "div",
  ...props
}) {
  const accentMap = {
    indigo: "from-sync-indigo to-sync-blue",
    blue: "from-sync-blue to-sync-purple",
    purple: "from-sync-purple to-sync-indigo",
    amber: "from-sync-amber to-sync-indigo",
  };

  return (
    <Component
      className={`relative rounded-3xl glass-panel shadow-glass overflow-hidden ${className}`}
      {...props}
    >
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accentMap[accent]}`} />
      {hover ? (
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="h-full"
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </Component>
  );
}
