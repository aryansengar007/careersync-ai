// src/pages/InterviewPrep/InterviewPrep.jsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Building2, Code2, Users } from "lucide-react";
import { technicalCategories, hrQuestions, companies } from "../../data/interviewQuestions";
import AccordionQuestion from "../../components/interview/AccordionQuestion";
import FlipCard from "../../components/interview/FlipCard";

const TABS = [
  { id: "technical", label: "Technical", icon: Code2 },
  { id: "hr", label: "HR", icon: Users },
  { id: "company", label: "Company-wise", icon: Building2 },
];

export default function InterviewPrep() {
  const [tab, setTab] = useState("technical");
  const [query, setQuery] = useState("");
  const [activeCompany, setActiveCompany] = useState(companies[0].id);

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return technicalCategories;
    const q = query.toLowerCase();
    return technicalCategories
      .map((cat) => ({
        ...cat,
        questions: cat.questions.filter((item) => item.q.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.questions.length > 0);
  }, [query]);

  const filteredHr = useMemo(() => {
    if (!query.trim()) return hrQuestions;
    const q = query.toLowerCase();
    return hrQuestions.filter((item) => item.q.toLowerCase().includes(q));
  }, [query]);

  const company = companies.find((c) => c.id === activeCompany);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-sync-ink">Interview Preparation</h1>
        <p className="text-sync-ink/55 text-sm mt-1">Technical depth, HR polish, and what specific companies actually ask.</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full glass-panel shadow-glass">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === t.id ? "bg-sync-gradient text-white shadow-glow-indigo" : "text-sync-ink/55 hover:bg-white/70"
              }`}
            >
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        {tab !== "company" && (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full glass shadow-soft max-w-xs flex-1 sm:flex-none">
            <Search size={15} className="text-sync-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="flex-1 bg-transparent outline-none text-sm text-sync-ink placeholder:text-sync-ink/35"
            />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "technical" && (
            <div className="space-y-8">
              {filteredCategories.length === 0 && (
                <p className="text-sm text-sync-ink/40 text-center py-10">No questions match your search.</p>
              )}
              {filteredCategories.map((cat) => (
                <div key={cat.id}>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-sync-indigo mb-3">{cat.label}</h3>
                  <div className="space-y-2.5">
                    {cat.questions.map((item, i) => (
                      <AccordionQuestion key={i} q={item.q} a={item.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "hr" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredHr.map((item, i) => (
                <FlipCard key={i} q={item.q} tip={item.tip} />
              ))}
              {filteredHr.length === 0 && (
                <p className="text-sm text-sync-ink/40 text-center py-10 col-span-full">No questions match your search.</p>
              )}
            </div>
          )}

          {tab === "company" && (
            <div className="grid lg:grid-cols-[240px_1fr] gap-6">
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                {companies.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCompany(c.id)}
                    className={`whitespace-nowrap text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeCompany === c.id
                        ? "bg-sync-gradient text-white shadow-glow-indigo"
                        : "bg-white/60 text-sync-ink/60 hover:bg-white/90"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {company && (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-3xl glass-panel shadow-glass p-7"
                >
                  <h3 className="font-display text-2xl font-semibold text-sync-ink mb-2">{company.name}</h3>
                  <p className="text-sm text-sync-ink/60 mb-6">{company.focus}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {company.rounds.map((r, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-sync-indigo/10 text-sync-indigo">
                        <span className="w-4 h-4 rounded-full bg-sync-indigo/20 flex items-center justify-center text-[10px]">{i + 1}</span>
                        {r}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-sync-ink/40 mb-3">Sample Questions</p>
                  <div className="space-y-2.5">
                    {company.sampleQuestions.map((q, i) => (
                      <div key={i} className="px-4 py-3 rounded-xl bg-white/70 border border-sync-line text-sm text-sync-ink/75">
                        {q}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
