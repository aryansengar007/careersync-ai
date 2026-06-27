// src/utils/coverLetterGenerator.js

/**
 * generateCoverLetter — a deterministic, template-driven "AI-style" writer.
 *
 * This ships without a live LLM key wired in, so it runs entirely
 * client-side: it pulls real specifics out of the selected resume
 * (skills, most recent project/experience) and slots them into a
 * structured letter instead of producing generic filler text.
 *
 * To upgrade this to a true generative model, replace the body of this
 * function with a call to your backend (e.g. a Firebase Cloud Function
 * that calls the Anthropic or OpenAI API with these same inputs) — the
 * function signature and return shape can stay identical so nothing else
 * in the app needs to change.
 */
export function generateCoverLetter({ company, role, hiringManager, jobHighlights, tone, resume }) {
  const name = resume?.personal?.fullName || "Your Name";
  const topSkills = (resume?.skills || []).slice(0, 5).map((s) => s.name).filter(Boolean);
  const latestProject = (resume?.projects || [])[0];
  const latestExperience = (resume?.experience || [])[0];

  const greeting = hiringManager ? `Dear ${hiringManager},` : "Dear Hiring Manager,";

  const openers = {
    Formal: `I am writing to express my interest in the ${role || "open"} position at ${company || "your company"}. Having followed ${company || "your team's"} work closely, I believe my background aligns well with what this role requires.`,
    Enthusiastic: `I was genuinely excited to come across the ${role || "open"} opening at ${company || "your company"} — it's exactly the kind of role I've been working toward.`,
    Concise: `I'm applying for the ${role || "open"} role at ${company || "your company"}. Here's why I think it's a strong fit.`,
  };

  const skillsLine = topSkills.length
    ? `My recent work has centered on ${topSkills.slice(0, -1).join(", ")}${topSkills.length > 1 ? " and " + topSkills.slice(-1) : topSkills[0] || ""}, which map directly to what this role needs.`
    : "";

  const projectLine = latestProject?.name
    ? `Most recently, I built ${latestProject.name}${latestProject.tech ? ` using ${latestProject.tech}` : ""}${
        latestProject.bullets?.[0] ? ` — ${latestProject.bullets[0].toLowerCase()}` : ""
      }.`
    : "";

  const experienceLine = latestExperience?.company
    ? `During my time as ${latestExperience.role || "a contributor"} at ${latestExperience.company}, ${
        latestExperience.bullets?.[0] ? latestExperience.bullets[0].charAt(0).toLowerCase() + latestExperience.bullets[0].slice(1) : "I took on real ownership beyond what was assigned to me."
      }`
    : "";

  const highlightsLine = jobHighlights
    ? `What stood out to me about this specific role is ${jobHighlights.trim().replace(/\.$/, "")}, which is the kind of problem I want to keep solving.`
    : "";

  const closers = {
    Formal: `I would welcome the opportunity to discuss how my background can contribute to your team. Thank you for your time and consideration.`,
    Enthusiastic: `I'd love the chance to talk through how I can contribute from day one — thank you for considering my application.`,
    Concise: `Happy to share more detail in an interview. Thanks for your time.`,
  };

  const bodyParagraphs = [
    openers[tone] || openers.Formal,
    [skillsLine, projectLine].filter(Boolean).join(" "),
    [experienceLine, highlightsLine].filter(Boolean).join(" "),
    closers[tone] || closers.Formal,
  ].filter((p) => p && p.trim().length > 0);

  const letter = [
    greeting,
    "",
    ...bodyParagraphs.flatMap((p) => [p, ""]),
    "Sincerely,",
    name,
  ].join("\n");

  return letter.trim();
}
