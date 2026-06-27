// src/utils/resumeModel.js

const uid = () => Math.random().toString(36).slice(2, 9);

export function emptyResume(title = "Untitled Resume") {
  return {
    id: uid(),
    title,
    personal: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      summary: "",
    },
    education: [],
    skills: [],
    experience: [],
    projects: [],
  };
}

export function emptyEducation() {
  return { id: uid(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" };
}

export function emptyExperience() {
  return {
    id: uid(),
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    bullets: [""],
  };
}

export function emptyProject() {
  return { id: uid(), name: "", link: "", tech: "", bullets: [""] };
}

export function emptySkill() {
  return { id: uid(), name: "", category: "Technical" };
}

export const SKILL_CATEGORIES = ["Technical", "Tools & Platforms", "Soft Skills"];

/**
 * Lightweight heuristic ATS-readiness score, purely client-side and
 * deterministic — not a real ATS, but useful directional feedback.
 */
export function calculateAtsScore(resume) {
  let score = 0;
  const max = 100;

  if (resume.personal.fullName) score += 8;
  if (resume.personal.email) score += 6;
  if (resume.personal.phone) score += 6;
  if (resume.personal.summary && resume.personal.summary.length > 60) score += 12;
  if (resume.education.length > 0) score += 12;
  if (resume.skills.length >= 5) score += 14;
  else score += resume.skills.length * 2;
  if (resume.experience.length > 0) score += 14;
  const bulletCount = resume.experience.reduce((sum, e) => sum + e.bullets.filter(Boolean).length, 0);
  if (bulletCount >= 3) score += 10;
  if (resume.projects.length > 0) score += 12;
  const projectBullets = resume.projects.reduce((sum, p) => sum + p.bullets.filter(Boolean).length, 0);
  if (projectBullets >= 2) score += 6;

  return Math.min(Math.round(score), max);
}
