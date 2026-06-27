// src/components/jobtracker/ApplicationModal.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { TextField, TextAreaField, SelectField } from "../ui/FormField";

const STATUSES = ["Applied", "Interviewing", "Offer", "Rejected"];

const blank = {
  company: "",
  role: "",
  location: "",
  link: "",
  appliedDate: new Date().toISOString().slice(0, 10),
  status: "Applied",
  notes: "",
};

export default function ApplicationModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(blank);

  useEffect(() => {
    setForm(initial || blank);
  }, [initial, open]);

  if (!open) return null;
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sync-ink/40 backdrop-blur-sm">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-glass-lg p-7 relative max-h-[90vh] overflow-y-auto"
      >
        <button type="button" onClick={onClose} className="absolute top-5 right-5 text-sync-ink/40 hover:text-sync-ink">
          <X size={20} />
        </button>
        <h3 className="font-display text-xl font-semibold text-sync-ink mb-5">
          {initial ? "Edit Application" : "Add Application"}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Company" value={form.company} onChange={set("company")} placeholder="Editkaro.in" required />
            <TextField label="Role" value={form.role} onChange={set("role")} placeholder="Frontend Intern" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Location" value={form.location} onChange={set("location")} placeholder="Remote" />
            <TextField label="Applied date" type="date" value={form.appliedDate} onChange={set("appliedDate")} />
          </div>
          <TextField label="Job link" value={form.link} onChange={set("link")} placeholder="https://…" />
          <SelectField label="Status" value={form.status} onChange={set("status")} options={STATUSES} />
          <TextAreaField label="Notes" rows={3} value={form.notes} onChange={set("notes")} placeholder="Referral from...; next round on Friday" />
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3.5 rounded-full bg-sync-gradient text-white font-medium shadow-glow-indigo"
        >
          {initial ? "Save Changes" : "Add Application"}
        </button>
      </motion.form>
    </div>
  );
}
