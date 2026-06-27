// src/pages/Landing/Hero.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import MagneticButton from "../../components/ui/MagneticButton";
import SyncOrb from "../../components/ui/SyncOrb";
import FloatingBlobs from "../../components/ui/FloatingBlobs";

const HEADLINE_LINE_1 = ["Your", "career,"];
const HEADLINE_LINE_2 = ["synced", "with", "AI."];

export default function Hero() {
  const wordRefs = useRef([]);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(badgeRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(
        wordRefs.current,
        { opacity: 0, y: 40, rotateX: 40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.06 },
        "-=0.1"
      )
      .fromTo(subRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.25")
      .fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
      .fromTo(
        orbRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.5)" },
        "-=0.6"
      );
    return () => tl.kill();
  }, []);

  let wordIndex = 0;

  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 px-6 overflow-hidden">
      <FloatingBlobs />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass shadow-soft text-xs font-medium text-sync-indigo mb-6"
          >
            <Sparkles size={13} /> AI-powered career toolkit for students & freshers
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.2rem] leading-[1.05] font-semibold text-sync-ink" style={{ perspective: 600 }}>
            <span className="block overflow-visible">
              {HEADLINE_LINE_1.map((w) => (
                <span
                  key={wordIndex}
                  ref={(el) => (wordRefs.current[wordIndex++] = el)}
                  className="inline-block mr-3"
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="block text-gradient">
              {HEADLINE_LINE_2.map((w) => (
                <span
                  key={wordIndex}
                  ref={(el) => (wordRefs.current[wordIndex++] = el)}
                  className="inline-block mr-3"
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p ref={subRef} className="mt-6 text-lg text-sync-ink/65 max-w-lg">
            Build a resume that actually gets opened, write cover letters in minutes, track every
            application in one place, and walk into interviews already knowing what's coming.
          </p>

          <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              as={Link}
              to="/signup"
              data-cursor="sync"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sync-gradient text-white font-medium shadow-glow-indigo"
            >
              Start Building Free <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#features"
              data-cursor="link"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass shadow-soft text-sync-ink font-medium"
            >
              <PlayCircle size={18} className="text-sync-indigo" /> See how it works
            </MagneticButton>
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-sync-ink/50">
            <div className="flex -space-x-2.5">
              {["AR", "RM", "SI", "DG"].map((i) => (
                <span
                  key={i}
                  className="w-9 h-9 rounded-full bg-sync-gradient text-white text-[11px] font-semibold flex items-center justify-center border-2 border-white"
                >
                  {i}
                </span>
              ))}
            </div>
            Trusted by 12,000+ students syncing their first careers
          </div>
        </div>

        <div ref={orbRef}>
          <SyncOrb />
        </div>
      </div>
    </section>
  );
}
