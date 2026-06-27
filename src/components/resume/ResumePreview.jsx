// src/components/resume/ResumePreview.jsx
import React, { forwardRef } from "react";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

/**
 * ResumePreview — the actual printable resume layout. Deliberately plain,
 * high-contrast, single-column and ATS-safe (no tables, no icons-as-text,
 * no multi-column layouts that confuse parsers). This is the node that
 * gets captured by html2canvas for PDF export.
 */
const ResumePreview = forwardRef(({ resume }, ref) => {
  const { personal, education, skills, experience, projects } = resume;
  const skillGroups = groupBy(skills, "category");

  return (
    <div
      ref={ref}
      id="resume-print-area"
      className="bg-white text-[#111] w-full max-w-[680px] mx-auto p-10 shadow-glass-lg rounded-2xl"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <h1 className="text-2xl font-bold tracking-tight">{personal.fullName || "Your Name"}</h1>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-[#555]">
        {personal.email && <span className="flex items-center gap-1"><Mail size={11} /> {personal.email}</span>}
        {personal.phone && <span className="flex items-center gap-1"><Phone size={11} /> {personal.phone}</span>}
        {personal.location && <span className="flex items-center gap-1"><MapPin size={11} /> {personal.location}</span>}
        {personal.linkedin && <span className="flex items-center gap-1"><Linkedin size={11} /> {personal.linkedin}</span>}
        {personal.github && <span className="flex items-center gap-1"><Github size={11} /> {personal.github}</span>}
      </div>

      {personal.summary && (
        <Section title="Summary">
          <p className="text-[12.5px] leading-relaxed text-[#333]">{personal.summary}</p>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.id} className="mb-2.5">
              <div className="flex justify-between text-[13px] font-semibold">
                <span>{edu.school || "School"}</span>
                <span className="text-[#666] font-normal">{[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</span>
              </div>
              <p className="text-[12px] text-[#444]">
                {[edu.degree, edu.field].filter(Boolean).join(", ")} {edu.gpa && `· ${edu.gpa}`}
              </p>
            </div>
          ))}
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3.5">
              <div className="flex justify-between text-[13px] font-semibold">
                <span>{exp.role || "Role"} {exp.company && `· ${exp.company}`}</span>
                <span className="text-[#666] font-normal whitespace-nowrap">
                  {[exp.startDate, exp.current ? "Present" : exp.endDate].filter(Boolean).join(" – ")}
                </span>
              </div>
              {exp.location && <p className="text-[11px] text-[#777]">{exp.location}</p>}
              <ul className="list-disc ml-4 mt-1 space-y-0.5">
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} className="text-[12px] text-[#333] leading-relaxed">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3.5">
              <div className="flex justify-between text-[13px] font-semibold">
                <span>{proj.name || "Project"}</span>
                {proj.link && <span className="text-[#666] font-normal text-[11px]">{proj.link}</span>}
              </div>
              {proj.tech && <p className="text-[11px] text-[#777] italic">{proj.tech}</p>}
              <ul className="list-disc ml-4 mt-1 space-y-0.5">
                {proj.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} className="text-[12px] text-[#333] leading-relaxed">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {Object.keys(skillGroups).length > 0 && (
        <Section title="Skills">
          <div className="space-y-1">
            {Object.entries(skillGroups).map(([cat, items]) => (
              <p key={cat} className="text-[12px] text-[#333]">
                <span className="font-semibold">{cat}: </span>
                {items.map((s) => s.name).join(", ")}
              </p>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;

function Section({ title, children }) {
  return (
    <div className="mt-5">
      <h2 className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#6C63FF] border-b border-[#eee] pb-1 mb-2.5">
        {title}
      </h2>
      {children}
    </div>
  );
}

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});
}
