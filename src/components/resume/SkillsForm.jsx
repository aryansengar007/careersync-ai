// src/components/resume/SkillsForm.jsx
import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { SKILL_CATEGORIES, emptySkill } from "../../utils/resumeModel";
import { SelectField } from "../ui/FormField";

export default function SkillsForm({ data, onChange }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(SKILL_CATEGORIES[0]);

  const add = () => {
    if (!name.trim()) return;
    onChange([...data, { ...emptySkill(), name: name.trim(), category }]);
    setName("");
  };

  const remove = (id) => onChange(data.filter((s) => s.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[180px]">
          <span className="text-xs font-medium text-sync-ink/60 mb-1.5 block">Skill</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
            placeholder="e.g. React, TensorFlow, Public Speaking"
            className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-sync-line focus:border-sync-indigo outline-none text-sm"
          />
        </div>
        <SelectField label="Category" value={category} onChange={setCategory} options={SKILL_CATEGORIES} className="w-44" />
        <button
          onClick={add}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sync-gradient text-white text-sm font-medium shadow-glow-indigo h-[42px]"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {SKILL_CATEGORIES.map((cat) => {
        const items = data.filter((s) => s.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <p className="text-xs font-semibold uppercase tracking-wide text-sync-ink/40 mb-2.5">{cat}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sync-indigo/10 text-sync-indigo text-sm font-medium"
                >
                  {s.name}
                  <button onClick={() => remove(s.id)} aria-label={`Remove ${s.name}`}>
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {data.length === 0 && <p className="text-sm text-sync-ink/40 text-center py-6">No skills added yet — start typing above.</p>}
    </div>
  );
}
