// src/components/ui/FormField.jsx
import React from "react";

export function TextField({ label, value, onChange, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="text-xs font-medium text-sync-ink/60 mb-1.5 block">{label}</span>}
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-sync-line focus:border-sync-indigo outline-none text-sm text-sync-ink placeholder:text-sync-ink/35 transition-colors"
      />
    </label>
  );
}

export function TextAreaField({ label, value, onChange, className = "", rows = 3, ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="text-xs font-medium text-sync-ink/60 mb-1.5 block">{label}</span>}
      <textarea
        {...props}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-sync-line focus:border-sync-indigo outline-none text-sm text-sync-ink placeholder:text-sync-ink/35 transition-colors resize-none"
      />
    </label>
  );
}

export function SelectField({ label, value, onChange, options, className = "" }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="text-xs font-medium text-sync-ink/60 mb-1.5 block">{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-sync-line focus:border-sync-indigo outline-none text-sm text-sync-ink transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
