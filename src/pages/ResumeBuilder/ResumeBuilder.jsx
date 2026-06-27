// src/pages/ResumeBuilder/ResumeBuilder.jsx
import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Sparkles,
  Briefcase,
  FolderGit2,
  Eye,
  Plus,
  Download,
  Save,
  Trash2,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import { emptyResume, calculateAtsScore } from "../../utils/resumeModel";
import { exportNodeToPdf } from "../../utils/pdfExport";

import PersonalForm from "../../components/resume/PersonalForm";
import EducationForm from "../../components/resume/EducationForm";
import SkillsForm from "../../components/resume/SkillsForm";
import ExperienceForm from "../../components/resume/ExperienceForm";
import ProjectsForm from "../../components/resume/ProjectsForm";
import ResumePreview from "../../components/resume/ResumePreview";
import AtsScoreMeter from "../../components/resume/AtsScoreMeter";
import { TextField } from "../../components/ui/FormField";

const STEPS = [
  { id: "personal", label: "Personal", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "preview", label: "Preview & Export", icon: Eye },
];

export default function ResumeBuilder() {
  const { resumes, saveResume, deleteResume } = useData();
  const location = useLocation();
  const [activeId, setActiveId] = useState(location.state?.resumeId || resumes[0]?.id || null);
  const [resume, setResume] = useState(resumes[0] || emptyResume());
  const [step, setStep] = useState("personal");
  const [exporting, setExporting] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    if (activeId) {
      const found = resumes.find((r) => r.id === activeId);
      if (found) setResume(found);
    }
  }, [activeId]);

  const handleNew = () => {
    const fresh = emptyResume(`Resume ${resumes.length + 1}`);
    setResume(fresh);
    setActiveId(fresh.id);
    setStep("personal");
  };

  const handleSave = () => {
    saveResume(resume);
    setActiveId(resume.id);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  };

  const handleDelete = (id) => {
    deleteResume(id);
    if (activeId === id) {
      setActiveId(null);
      setResume(emptyResume());
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportNodeToPdf(previewRef.current, `${resume.title || "resume"}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const score = calculateAtsScore(resume);
  const stepIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-sync-ink">Resume Builder</h1>
          <p className="text-sync-ink/55 text-sm mt-1">Build once, tailor for every role, export instantly.</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass shadow-soft text-sm font-medium text-sync-ink"
        >
          <Plus size={16} /> New resume
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        {/* Main editor column */}
        <div>
          <TextField
            value={resume.title}
            onChange={(v) => setResume((r) => ({ ...r, title: v }))}
            placeholder="Resume title (e.g. SDE Internship Resume)"
            className="mb-6 max-w-md"
          />

          {/* Stepper */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-6 -mx-1 px-1">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  step === s.id
                    ? "bg-sync-gradient text-white shadow-glow-indigo"
                    : i < stepIndex
                    ? "bg-sync-indigo/10 text-sync-indigo"
                    : "text-sync-ink/50 hover:bg-white/70"
                }`}
              >
                <s.icon size={15} /> {s.label}
              </button>
            ))}
          </div>

          <div className="rounded-3xl glass-panel shadow-glass p-6 sm:p-8 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.25 }}
              >
                {step === "personal" && (
                  <PersonalForm data={resume.personal} onChange={(personal) => setResume((r) => ({ ...r, personal }))} />
                )}
                {step === "education" && (
                  <EducationForm data={resume.education} onChange={(education) => setResume((r) => ({ ...r, education }))} />
                )}
                {step === "skills" && (
                  <SkillsForm data={resume.skills} onChange={(skills) => setResume((r) => ({ ...r, skills }))} />
                )}
                {step === "experience" && (
                  <ExperienceForm data={resume.experience} onChange={(experience) => setResume((r) => ({ ...r, experience }))} />
                )}
                {step === "projects" && (
                  <ProjectsForm data={resume.projects} onChange={(projects) => setResume((r) => ({ ...r, projects }))} />
                )}
                {step === "preview" && (
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <p className="text-sm text-sync-ink/55">This is exactly how your PDF will look.</p>
                      <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-sync-ink text-white text-sm font-medium disabled:opacity-60"
                      >
                        {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        Export as PDF
                      </button>
                    </div>
                    <div className="bg-sync-mist rounded-2xl p-4 sm:p-8 overflow-x-auto">
                      <ResumePreview resume={resume} ref={previewRef} />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              disabled={stepIndex === 0}
              onClick={() => setStep(STEPS[stepIndex - 1].id)}
              className="text-sm font-medium text-sync-ink/50 disabled:opacity-30 hover:text-sync-indigo transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {savedFlash && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium"
                  >
                    <CheckCircle2 size={15} /> Saved
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass shadow-soft text-sm font-medium text-sync-ink"
              >
                <Save size={15} /> Save
              </button>
              {stepIndex < STEPS.length - 1 && (
                <button
                  onClick={() => setStep(STEPS[stepIndex + 1].id)}
                  className="px-5 py-2.5 rounded-full bg-sync-gradient text-white text-sm font-medium shadow-glow-indigo"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AtsScoreMeter score={score} />

          <div className="rounded-3xl glass-panel shadow-glass p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-sync-ink/40 mb-3">Saved Resumes</p>
            {resumes.length === 0 && <p className="text-sm text-sync-ink/40">No saved resumes yet.</p>}
            <div className="space-y-2">
              {resumes.map((r) => (
                <div
                  key={r.id}
                  className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    r.id === activeId ? "bg-sync-indigo/10" : "hover:bg-white/70"
                  }`}
                  onClick={() => setActiveId(r.id)}
                >
                  <span className="text-sm font-medium text-sync-ink truncate">{r.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(r.id);
                    }}
                    className="text-sync-ink/30 hover:text-red-500"
                    aria-label="Delete resume"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
