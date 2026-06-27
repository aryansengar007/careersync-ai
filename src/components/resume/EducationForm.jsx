// src/components/resume/EducationForm.jsx
import React from "react";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { TextField } from "../ui/FormField";
import { emptyEducation } from "../../utils/resumeModel";

export default function EducationForm({ data, onChange }) {
  const update = (id, key, val) => {
    onChange(data.map((e) => (e.id === id ? { ...e, [key]: val } : e)));
  };
  const add = () => onChange([...data, emptyEducation()]);
  const remove = (id) => onChange(data.filter((e) => e.id !== id));

  return (
    <div className="space-y-5">
      {data.length === 0 && <EmptyState />}
      {data.map((edu) => (
        <div key={edu.id} className="rounded-2xl border border-sync-line bg-white/60 p-5 relative">
          <button
            onClick={() => remove(edu.id)}
            className="absolute top-4 right-4 text-sync-ink/30 hover:text-red-500 transition-colors"
            aria-label="Remove education entry"
          >
            <Trash2 size={16} />
          </button>
          <div className="grid sm:grid-cols-2 gap-4 pr-8">
            <TextField label="School / University" placeholder="The NorthCap University" value={edu.school} onChange={(v) => update(edu.id, "school", v)} />
            <TextField label="Degree" placeholder="B.Tech" value={edu.degree} onChange={(v) => update(edu.id, "degree", v)} />
            <TextField label="Field of study" placeholder="Computer Science (AI & ML)" value={edu.field} onChange={(v) => update(edu.id, "field", v)} />
            <TextField label="GPA / Percentage" placeholder="8.7 CGPA" value={edu.gpa} onChange={(v) => update(edu.id, "gpa", v)} />
            <TextField label="Start date" placeholder="Aug 2022" value={edu.startDate} onChange={(v) => update(edu.id, "startDate", v)} />
            <TextField label="End date" placeholder="May 2026" value={edu.endDate} onChange={(v) => update(edu.id, "endDate", v)} />
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-2 text-sm font-medium text-sync-indigo px-4 py-2.5 rounded-xl border border-dashed border-sync-indigo/40 hover:bg-sync-indigo/5 transition-colors"
      >
        <Plus size={16} /> Add education
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-10 text-sync-ink/40">
      <GraduationCap className="mx-auto mb-3" size={28} />
      <p className="text-sm">No education added yet.</p>
    </div>
  );
}
