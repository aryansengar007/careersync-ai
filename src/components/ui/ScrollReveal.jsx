// src/components/ui/ScrollReveal.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * ScrollReveal — fades + lifts children into place once they enter the
 * viewport. Thin wrapper around framer-motion's whileInView so reveal
 * timing stays consistent across the whole app.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.6,
  className = "",
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
