// src/components/resume/PersonalForm.jsx
import React from "react";
import { TextField, TextAreaField } from "../ui/FormField";

export default function PersonalForm({ data, onChange }) {
  const set = (key) => (val) => onChange({ ...data, [key]: val });

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Full name" placeholder="Aryan Sengar" value={data.fullName} onChange={set("fullName")} />
        <TextField label="Email" type="email" placeholder="you@email.com" value={data.email} onChange={set("email")} />
        <TextField label="Phone" placeholder="+91 98765 43210" value={data.phone} onChange={set("phone")} />
        <TextField label="Location" placeholder="Gurugram, India" value={data.location} onChange={set("location")} />
        <TextField label="LinkedIn" placeholder="linkedin.com/in/username" value={data.linkedin} onChange={set("linkedin")} />
        <TextField label="GitHub / Portfolio" placeholder="github.com/username" value={data.github} onChange={set("github")} />
      </div>
      <TextAreaField
        label="Professional summary"
        rows={4}
        placeholder="A 2-3 sentence pitch: who you are, your specialization, and what you're looking for."
        value={data.summary}
        onChange={set("summary")}
      />
    </div>
  );
}
