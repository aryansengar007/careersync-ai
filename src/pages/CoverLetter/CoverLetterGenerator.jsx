// src/pages/CoverLetter/CoverLetterGenerator.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Copy, Download, Save, CheckCircle2, Loader2, Trash2, MessageSquareText } from "lucide-react";
import { useData } from "../../context/DataContext";
import { TextField, TextAreaField, SelectField } from "../../components/ui/FormField";
import { generateCoverLetter } from "../../utils/coverLetterGenerator";
import { exportNodeToPdf } from "../../utils/pdfExport";

const TONES = ["Formal", "Enthusiastic", "Concise"];

export default function CoverLetterGenerator() {
  const { resumes, coverLetters, saveCoverLetter, deleteCoverLetter } = useData();
  const [form, setForm] = useState({
    company: "",
    role: "",
    hiringManager: "",
    jobHighlights: "",
    tone: "Formal",
    resumeId: resumes[0]?.id || "",
  });
  const [letter, setLetter] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const letterRef = useRef(null);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleGenerate = () => {
    setGenerating(true);
    const resume = resumes.find((r) => r.id === form.resumeId);
    // Tiny artificial delay so the "generation" moment feels deliberate
    // rather than instantaneous — this is where a real API call would go.
    setTimeout(() => {
      const result = generateCoverLetter({ ...form, resume });
      setLetter(result);
      setGenerating(false);
    }, 700);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportNodeToPdf(letterRef.current, `${form.company || "cover-letter"}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  const handleSave = () => {
    if (!letter) return;
    saveCoverLetter({ company: form.company, role: form.role, content: letter });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-sync-ink">Cover Letter Generator</h1>
        <p className="text-sync-ink/55 text-sm mt-1">
          Pulls real details from a saved resume so the letter doesn't read like a template.
        </p>
      </div>

      <div className="grid lg:grid-cols-[420px_1fr] gap-8">
        {/* Form */}
        <div className="rounded-3xl glass-panel shadow-glass p-6 space-y-4 self-start">
          <TextField label="Company" placeholder="Editkaro.in" value={form.company} onChange={set("company")} />
          <TextField label="Role" placeholder="Frontend Development Intern" value={form.role} onChange={set("role")} />
          <TextField label="Hiring manager (optional)" placeholder="e.g. Priya Sharma" value={form.hiringManager} onChange={set("hiringManager")} />
          <TextAreaField
            label="What specifically draws you to this role?"
            rows={3}
            placeholder="e.g. the chance to work on real client-facing products instead of internal tools"
            value={form.jobHighlights}
            onChange={set("jobHighlights")}
          />
          <SelectField label="Tone" value={form.tone} onChange={set("tone")} options={TONES} />
          <label className="block">
            <span className="text-xs font-medium text-sync-ink/60 mb-1.5 block">Pull details from resume</span>
            <select
              value={form.resumeId}
              onChange={(e) => set("resumeId")(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-sync-line focus:border-sync-indigo outline-none text-sm text-sync-ink transition-colors"
            >
              {resumes.length === 0 && <option value="">No saved resumes yet</option>}
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-sync-gradient text-white font-medium shadow-glow-indigo disabled:opacity-70 mt-2"
          >
            {generating ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
            {generating ? "Generating…" : "Generate Cover Letter"}
          </button>
        </div>

        {/* Output */}
        <div>
          {letter ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
                <ActionButton onClick={handleCopy} icon={copied ? CheckCircle2 : Copy} label={copied ? "Copied" : "Copy"} />
                <ActionButton onClick={handleExport} icon={Download} label={exporting ? "Exporting…" : "Export PDF"} disabled={exporting} />
                <ActionButton onClick={handleSave} icon={Save} label="Save" primary />
              </div>
              <div ref={letterRef} className="bg-white rounded-2xl shadow-glass-lg p-10">
                <textarea
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  rows={18}
                  className="w-full outline-none text-[14px] leading-relaxed text-[#222] resize-none"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[420px] rounded-3xl border border-dashed border-sync-line flex flex-col items-center justify-center text-center text-sync-ink/40 px-8">
              <MessageSquareText size={32} className="mb-3" />
              <p className="text-sm max-w-xs">
                Fill in the company and role on the left, then generate — your draft will appear here, fully editable.
              </p>
            </div>
          )}

          {coverLetters.length > 0 && (
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-sync-ink/40 mb-3">Saved Letters</p>
              <div className="space-y-2">
                {coverLetters.map((c) => (
                  <div key={c.id} className="flex items-center justify-between px-4 py-3 rounded-xl glass-panel">
                    <div>
                      <p className="text-sm font-medium text-sync-ink">{c.role || "Untitled role"} · {c.company || "Unknown company"}</p>
                      <p className="text-xs text-sync-ink/40">{new Date(c.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setLetter(c.content)} className="text-xs font-medium text-sync-indigo">Load</button>
                      <button onClick={() => deleteCoverLetter(c.id)} className="text-sync-ink/30 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, primary, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-colors disabled:opacity-60 ${
        primary ? "bg-sync-ink text-white" : "glass shadow-soft text-sync-ink"
      }`}
    >
      <Icon size={13} /> {label}
    </button>
  );
}
