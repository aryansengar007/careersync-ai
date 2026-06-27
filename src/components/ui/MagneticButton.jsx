// src/components/ui/MagneticButton.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton — pulls itself toward the cursor within a small radius,
 * then springs back on leave. Wrap any button/link content.
 *
 * Props:
 *  - as: "button" | "a" | "Link" component (default "button")
 *  - strength: how far it travels toward the pointer (default 0.35)
 *  - cursorVariant: value to set on data-cursor for CustomCursor (default "link")
 */
export default function MagneticButton({
  children,
  as: Component = "button",
  strength = 0.35,
  cursorVariant = "link",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16 });
  const springY = useSpring(y, { stiffness: 200, damping: 16 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component
        data-cursor={cursorVariant}
        className={className}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}
