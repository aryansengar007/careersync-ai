// src/pages/Dashboard/Dashboard.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FileText, Briefcase, MessageSquareText, Gauge, ArrowUpRight, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { calculateAtsScore } from "../../utils/resumeModel";
import GlassCard from "../../components/ui/GlassCard";
import ScrollReveal from "../../components/ui/ScrollReveal";
import ActivityChart from "../../components/charts/ActivityChart";
import FunnelBar from "../../components/charts/FunnelBar";

export default function Dashboard() {
  const { user } = useAuth();
  const { resumes, applications, coverLetters } = useData();

  const avgScore = useMemo(() => {
    if (resumes.length === 0) return 0;
    const total = resumes.reduce((sum, r) => sum + calculateAtsScore(r), 0);
    return Math.round(total / resumes.length);
  }, [resumes]);

  const funnelCounts = useMemo(() => {
    const c = { Applied: 0, Interviewing: 0, Offer: 0, Rejected: 0 };
    applications.forEach((a) => {
      if (c[a.status] !== undefined) c[a.status] += 1;
    });
    return c;
  }, [applications]);

  const weeklyActivity = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3);
      const dayStart = new Date(d.setHours(0, 0, 0, 0)).getTime();
      const dayEnd = dayStart + 86400000;
      const count = applications.filter((a) => a.createdAt >= dayStart && a.createdAt < dayEnd).length;
      days.push({ label, value: count });
    }
    return days;
  }, [applications]);

  const STAT_CARDS = [
    { icon: FileText, label: "Resumes", value: resumes.length, accent: "indigo", to: "/resume-builder" },
    { icon: Briefcase, label: "Applications Tracked", value: applications.length, accent: "blue", to: "/job-tracker" },
    { icon: MessageSquareText, label: "Cover Letters", value: coverLetters.length, accent: "purple", to: "/cover-letter" },
    { icon: Gauge, label: "Avg. ATS Score", value: `${avgScore}/100`, accent: "amber", to: "/resume-builder" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-sync-ink">
          Welcome back, {user?.name?.split(" ")[0] || "there"} 👋
        </h1>
        <p className="text-sync-ink/55 text-sm mt-1">Here's where your career-forging stands today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {STAT_CARDS.map((s) => (
          <ScrollReveal key={s.label}>
            <Link to={s.to}>
              <GlassCard accent={s.accent} className="p-5 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-sync-indigo/10 flex items-center justify-center">
                    <s.icon size={18} className="text-sync-indigo" />
                  </span>
                  <ArrowUpRight size={15} className="text-sync-ink/25" />
                </div>
                <p className="font-display text-2xl font-semibold text-sync-ink">{s.value}</p>
                <p className="text-xs text-sync-ink/50 mt-1">{s.label}</p>
              </GlassCard>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mb-8">
        <ScrollReveal>
          <GlassCard accent="indigo" hover={false} className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-lg font-semibold text-sync-ink">Application Activity</h3>
              <span className="text-xs text-sync-ink/40">Last 7 days</span>
            </div>
            <ActivityChart data={weeklyActivity} />
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <GlassCard accent="blue" hover={false} className="p-6 h-full">
            <h3 className="font-display text-lg font-semibold text-sync-ink mb-5">Pipeline Breakdown</h3>
            <FunnelBar counts={funnelCounts} />
          </GlassCard>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-sync-ink">Saved Resumes</h3>
          <Link to="/resume-builder" className="text-sm font-medium text-sync-indigo flex items-center gap-1">
            <Sparkles size={14} /> Build a new one
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-sync-line p-10 text-center text-sync-ink/40">
            <FileText className="mx-auto mb-3" size={26} />
            <p className="text-sm">No resumes yet — your first one is two minutes away.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((r) => {
              const score = calculateAtsScore(r);
              return (
                <Link key={r.id} to="/resume-builder" state={{ resumeId: r.id }}>
                  <GlassCard accent="purple" className="p-5 h-full">
                    <div className="flex items-start justify-between mb-3">
                      <span className="w-10 h-10 rounded-xl bg-sync-purple/10 flex items-center justify-center">
                        <FileText size={16} className="text-sync-purple" />
                      </span>
                      <span className="text-xs font-semibold text-sync-ink/50">{score}/100</span>
                    </div>
                    <p className="font-medium text-sync-ink text-sm truncate">{r.title}</p>
                    <p className="text-xs text-sync-ink/40 mt-1">
                      Updated {new Date(r.updatedAt).toLocaleDateString()}
                    </p>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        )}
      </ScrollReveal>
    </div>
  );
}
