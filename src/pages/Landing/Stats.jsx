// src/pages/Landing/Stats.jsx
import React from "react";
import AnimatedCounter from "../../components/ui/AnimatedCounter";
import ScrollReveal from "../../components/ui/ScrollReveal";

const STATS = [
  { value: 12000, suffix: "+", label: "Students & freshers onboarded" },
  { value: 38000, suffix: "+", label: "Resumes built and exported" },
  { value: 92, suffix: "%", label: "Average ATS compatibility score" },
  { value: 4.8, suffix: "/5", label: "Average rating from placement cells", decimals: 1 },
];

export default function Stats() {
  return (
    <section id="stats" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="rounded-3xl bg-sync-ink relative overflow-hidden px-8 sm:px-14 py-14">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sync-indigo/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-sync-purple/20 blur-3xl" />

            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl sm:text-4xl font-semibold text-white">
                    <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                  </div>
                  <p className="text-sm text-white/55 mt-2 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
