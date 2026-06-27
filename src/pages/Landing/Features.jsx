// src/pages/Landing/Features.jsx
import React, { useRef } from "react";
import { FileText, MessageSquareText, Briefcase, Target, ArrowUpRight } from "lucide-react";
import useGsapStagger from "../../hooks/useGsapStagger";
import GlassCard from "../../components/ui/GlassCard";
import ScrollReveal from "../../components/ui/ScrollReveal";

const FEATURES = [
  {
    icon: FileText,
    accent: "indigo",
    tag: "Resume Builder",
    title: "A resume editor that thinks in sections, not paragraphs",
    desc: "Drop in your education, skills, experience and projects — CareerSync arranges them into a clean, ATS-friendly layout and scores how well it'll survive a parser before a recruiter ever sees it.",
    stat: "92%",
    statLabel: "average ATS match score",
  },
  {
    icon: MessageSquareText,
    accent: "blue",
    tag: "Cover Letters",
    title: "Cover letters built from what you've actually done",
    desc: "Tell it the role and company, and it pulls real specifics from your resume into a structured letter — no generic 'I am writing to express my interest' filler.",
    stat: "3 min",
    statLabel: "average time to first draft",
  },
  {
    icon: Briefcase,
    accent: "purple",
    tag: "Job Tracker",
    title: "Every application, one board, zero spreadsheets",
    desc: "Drag applications across Applied, Interviewing, Offer and Rejected. Filter by company, role or deadline, and see your funnel at a glance.",
    stat: "40+",
    statLabel: "applications tracked per student on average",
  },
  {
    icon: Target,
    accent: "amber",
    tag: "Interview Prep",
    title: "Practice the questions your target companies actually ask",
    desc: "Technical and HR question banks organized by topic and by company, with model answers and tips — not just a wall of unsorted questions.",
    stat: "500+",
    statLabel: "curated questions across domains",
  },
];

const ICON_BG = {
  indigo: "bg-sync-indigo/10",
  blue: "bg-sync-blue/10",
  purple: "bg-sync-purple/10",
  amber: "bg-sync-amber/10",
};
const ICON_TEXT = {
  indigo: "text-sync-indigo",
  blue: "text-sync-blue",
  purple: "text-sync-purple",
  amber: "text-sync-amber",
};

export default function Features() {
  const containerRef = useRef(null);
  useGsapStagger(containerRef, ":scope > div", { stagger: 0.15, y: 40 });

  return (
    <section id="features" className="relative py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="max-w-xl mb-16">
          <span className="text-xs font-semibold tracking-widest text-sync-indigo uppercase">
            The four pillars
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-sync-ink mt-3">
            Everything between "applying" and "hired."
          </h2>
        </ScrollReveal>

        <div ref={containerRef} className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <GlassCard key={f.tag} accent={f.accent} className="p-8 group">
              <div className="flex items-start justify-between mb-6">
                <span
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${ICON_BG[f.accent]}`}
                >
                  <f.icon className={ICON_TEXT[f.accent]} size={22} />
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-sync-ink/30 group-hover:text-sync-indigo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <span className="text-xs font-semibold tracking-wide text-sync-ink/40 uppercase">{f.tag}</span>
              <h3 className="font-display text-xl font-semibold text-sync-ink mt-2 mb-3 leading-snug">
                {f.title}
              </h3>
              <p className="text-sm text-sync-ink/60 leading-relaxed mb-6">{f.desc}</p>
              <div className="flex items-baseline gap-2 pt-4 border-t border-sync-line/70">
                <span className="font-display text-2xl font-semibold text-sync-ink">{f.stat}</span>
                <span className="text-xs text-sync-ink/50">{f.statLabel}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
