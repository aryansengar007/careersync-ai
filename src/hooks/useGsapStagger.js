// src/hooks/useGsapStagger.js
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useGsapStagger — staggers the direct children of `containerRef` up and
 * into place as the container enters the viewport. Used for sections where
 * a synchronized group reveal (testimonials, feature rows, stat blocks)
 * reads better than each card animating independently via framer-motion.
 */
export default function useGsapStagger(containerRef, selector = ":scope > *", options = {}) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: options.y ?? 32 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.7,
        stagger: options.stagger ?? 0.12,
        ease: options.ease ?? "power3.out",
        scrollTrigger: {
          trigger: el,
          start: options.start ?? "top 80%",
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [containerRef]);
}
