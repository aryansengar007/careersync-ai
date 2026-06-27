// src/pages/Landing/CTA.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MagneticButton from "../../components/ui/MagneticButton";
import ScrollReveal from "../../components/ui/ScrollReveal";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      <ScrollReveal className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-sync-ink leading-tight">
          Your first offer letter starts with
          <span className="text-gradient"> one resume.</span>
        </h2>
        <p className="mt-5 text-sync-ink/60 max-w-md mx-auto">
          Free to start. No credit card, no recruiter spam — just the tools to get you from
          "applying" to "hired."
        </p>
        <div className="mt-9 flex justify-center">
          <MagneticButton
            as={Link}
            to="/signup"
            data-cursor="sync"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sync-gradient text-white font-semibold shadow-glow-indigo text-base"
          >
            Build My Resume Now <ArrowRight size={18} />
          </MagneticButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
