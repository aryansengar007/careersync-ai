// src/components/ui/CustomCursor.jsx
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor — a two-part cursor: a small sharp dot that tracks the pointer
 * exactly, and a soft trailing ring (spring-damped) that lags behind it.
 * The ring scales up and tints amber ("spark") whenever it crosses an
 * element marked with [data-cursor="link"] or [data-cursor="sync"],
 * tying the interaction language back to the CareerSync "spark" motif.
 */
export default function CustomCursor() {
  const [variant, setVariant] = useState("default");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.5 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(isCoarse);
    if (isCoarse) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target.closest("[data-cursor]");
      setVariant(target ? target.getAttribute("data-cursor") : "default");
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
    };
  }, [visible, x, y]);

  if (isTouch) return null;

  const ringSize = variant === "link" ? 56 : variant === "sync" ? 70 : 34;
  const ringColor =
    variant === "sync"
      ? "rgba(245, 158, 11, 0.55)"
      : variant === "link"
      ? "rgba(108, 99, 255, 0.45)"
      : "rgba(108, 99, 255, 0.30)";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
      aria-hidden="true"
    >
      {/* Trailing ring */}
      <motion.div
        style={{
          translateX: ringX,
          translateY: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderColor: ringColor,
        }}
        className="absolute rounded-full border transition-[width,height,border-color] duration-200"
      />
      {/* Sharp dot */}
      <motion.div
        style={{
          translateX: x,
          translateY: y,
          marginLeft: -3,
          marginTop: -3,
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-sync-indigo"
      />
    </div>
  );
}
