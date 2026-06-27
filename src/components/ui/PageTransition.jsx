// src/components/ui/PageTransition.jsx
import React from "react";
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

/**
 * PageTransition — wraps each route's page content so navigating between
 * pages feels like a single continuous app rather than a hard reload.
 * Paired with <AnimatePresence mode="wait"> in App.jsx.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
