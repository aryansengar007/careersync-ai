// src/components/ui/AnimatedCounter.jsx
import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * AnimatedCounter — counts up from 0 to `value` once it scrolls into view.
 * Used for the landing page Stats section and Dashboard analytics widgets.
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.4,
  className = "",
  decimals = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = React.useState("0");

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(v.toFixed(decimals));
    });
    return unsub;
  }, [spring, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
