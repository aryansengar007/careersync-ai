// src/pages/Landing/Testimonials.jsx
import React from "react";
import { Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import ScrollReveal from "../../components/ui/ScrollReveal";

function TestimonialCard({ t }) {
  return (
    <div className="w-[320px] sm:w-[380px] flex-shrink-0 mx-3 rounded-3xl glass-panel shadow-glass p-7">
      <Quote className="text-sync-indigo/40 mb-4" size={26} />
      <p className="text-sm text-sync-ink/75 leading-relaxed mb-6">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-sync-gradient text-white text-xs font-semibold flex items-center justify-center">
          {t.initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-sync-ink">{t.name}</p>
          <p className="text-xs text-sync-ink/50">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      <ScrollReveal className="max-w-xl mx-auto text-center mb-14 px-6">
        <span className="text-xs font-semibold tracking-widest text-sync-indigo uppercase">
          From the placement trenches
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-sync-ink mt-3">
          Built around what actually happened to them.
        </h2>
      </ScrollReveal>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-sync-paper to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-sync-paper to-transparent z-10" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
        <div className="flex mt-5 animate-marquee-reverse hover:[animation-play-state:paused]">
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
