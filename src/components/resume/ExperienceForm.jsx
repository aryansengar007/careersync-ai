// src/components/resume/ExperienceForm.jsx
import React from "react";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { TextField } from "../ui/FormField";
import { emptyExperience } from "../../utils/resumeModel";

export default function ExperienceForm({ data, onChange }) {
  const update = (id, key, val) => onChange(data.map((e) => (e.id === id ? { ...e, [key]: val } : e)));
  const add = () => onChange([...data, emptyExperience()]);
  const remove = (id) => onChange(data.filter((e) => e.id !== id));

  const updateBullet = (expId, idx, val) => {
    onChange(
      data.map((e) =>
        e.id === expId ? { ...e, bullets: e.bullets.map((b, i) => (i === idx ? val : b)) } : e
      )
    );
  };
  const addBullet = (expId) =>
    onChange(data.map((e) => (e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e)));
  const removeBullet = (expId, idx) =>
    onChange(
      data.map((e) =>
        e.id === expId ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e
      )
    );

  return (
    <div className="space-y-5">
      {data.length === 0 && (
        <div className="text-center py-10 text-sync-ink/40">
          <Briefcase className="mx-auto mb-3" size={28} />
          <p className="text-sm">No experience added yet — internships count too.</p>
        </div>
      )}
      {data.map((exp) => (
        <div key={exp.id} className="rounded-2xl border border-sync-line bg-white/60 p-5 relative">
          <button
            onClick={() => remove(exp.id)}
            className="absolute top-4 right-4 text-sync-ink/30 hover:text-red-500 transition-colors"
            aria-label="Remove experience entry"
          >
            <Trash2 size={16} />
          </button>
          <div className="grid sm:grid-cols-2 gap-4 pr-8 mb-4">
            <TextField label="Company" placeholder="Editkaro.in" value={exp.company} onChange={(v) => update(exp.id, "company", v)} />
            <TextField label="Role" placeholder="Frontend Development Intern" value={exp.role} onChange={(v) => update(exp.id, "role", v)} />
            <TextField label="Location" placeholder="Remote" value={exp.location} onChange={(v) => update(exp.id, "location", v)} />
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Start" placeholder="May 2025" value={exp.startDate} onChange={(v) => update(exp.id, "startDate", v)} />
              <TextField label="End" placeholder="Jul 2025" value={exp.endDate} onChange={(v) => update(exp.id, "endDate", v)} disabled={exp.current} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-sync-ink/60 mb-4">
            <input type="checkbox" checked={exp.current} onChange={(e) => update(exp.id, "current", e.target.checked)} />
            I currently work here
          </label>

          <span className="text-xs font-medium text-sync-ink/60 mb-2 block">Key contributions</span>
          <div className="space-y-2">
            {exp.bullets.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  value={b}
                  onChange={(e) => updateBullet(exp.id, idx, e.target.value)}
                  placeholder="Rebuilt the custom cursor with raw requestAnimationFrame, eliminating input lag"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/70 border border-sync-line focus:border-sync-indigo outline-none text-sm"
                />
                <button onClick={() => removeBullet(exp.id, idx)} className="text-sync-ink/30 hover:text-red-500" aria-label="Remove line">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button onClick={() => addBullet(exp.id)} className="text-xs font-medium text-sync-indigo flex items-center gap-1.5 mt-1">
              <Plus size={13} /> Add line
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-2 text-sm font-medium text-sync-indigo px-4 py-2.5 rounded-xl border border-dashed border-sync-indigo/40 hover:bg-sync-indigo/5 transition-colors"
      >
        <Plus size={16} /> Add experience
      </button>
    </div>
  );
}
