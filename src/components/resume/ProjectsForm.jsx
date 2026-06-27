// src/components/resume/ProjectsForm.jsx
import React from "react";
import { Plus, Trash2, FolderGit2 } from "lucide-react";
import { TextField } from "../ui/FormField";
import { emptyProject } from "../../utils/resumeModel";

export default function ProjectsForm({ data, onChange }) {
  const update = (id, key, val) => onChange(data.map((p) => (p.id === id ? { ...p, [key]: val } : p)));
  const add = () => onChange([...data, emptyProject()]);
  const remove = (id) => onChange(data.filter((p) => p.id !== id));

  const updateBullet = (pid, idx, val) =>
    onChange(data.map((p) => (p.id === pid ? { ...p, bullets: p.bullets.map((b, i) => (i === idx ? val : b)) } : p)));
  const addBullet = (pid) => onChange(data.map((p) => (p.id === pid ? { ...p, bullets: [...p.bullets, ""] } : p)));
  const removeBullet = (pid, idx) =>
    onChange(data.map((p) => (p.id === pid ? { ...p, bullets: p.bullets.filter((_, i) => i !== idx) } : p)));

  return (
    <div className="space-y-5">
      {data.length === 0 && (
        <div className="text-center py-10 text-sync-ink/40">
          <FolderGit2 className="mx-auto mb-3" size={28} />
          <p className="text-sm">No projects added yet — academic and personal projects both count.</p>
        </div>
      )}
      {data.map((proj) => (
        <div key={proj.id} className="rounded-2xl border border-sync-line bg-white/60 p-5 relative">
          <button
            onClick={() => remove(proj.id)}
            className="absolute top-4 right-4 text-sync-ink/30 hover:text-red-500 transition-colors"
            aria-label="Remove project entry"
          >
            <Trash2 size={16} />
          </button>
          <div className="grid sm:grid-cols-2 gap-4 pr-8 mb-4">
            <TextField label="Project name" placeholder="CareerSync AI" value={proj.name} onChange={(v) => update(proj.id, "name", v)} />
            <TextField label="Link" placeholder="github.com/you/careersync-ai" value={proj.link} onChange={(v) => update(proj.id, "link", v)} />
            <TextField label="Tech stack" placeholder="React, Vite, Tailwind, Firebase" value={proj.tech} onChange={(v) => update(proj.id, "tech", v)} className="sm:col-span-2" />
          </div>

          <span className="text-xs font-medium text-sync-ink/60 mb-2 block">What it does / what you built</span>
          <div className="space-y-2">
            {proj.bullets.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  value={b}
                  onChange={(e) => updateBullet(proj.id, idx, e.target.value)}
                  placeholder="Built a full-stack career platform with AI-assisted resume scoring and PDF export"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/70 border border-sync-line focus:border-sync-indigo outline-none text-sm"
                />
                <button onClick={() => removeBullet(proj.id, idx)} className="text-sync-ink/30 hover:text-red-500" aria-label="Remove line">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button onClick={() => addBullet(proj.id)} className="text-xs font-medium text-sync-indigo flex items-center gap-1.5 mt-1">
              <Plus size={13} /> Add line
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-2 text-sm font-medium text-sync-indigo px-4 py-2.5 rounded-xl border border-dashed border-sync-indigo/40 hover:bg-sync-indigo/5 transition-colors"
      >
        <Plus size={16} /> Add project
      </button>
    </div>
  );
}
