import type { Program } from "../types";

export const githubCampusExperts: Program = {
  slug: "github-campus-experts",
  name: "GitHub Campus Experts",
  tagline: "Helps students build and grow technical communities on campus",
  shortDescription: "A leadership program for university students who want to establish and expand tech communities on their campuses. Participants gain public speaking skills, leadership training, and access to GitHub resources while fostering innovation and collaboration among their peers.",
  websiteUrl:
    "https://docs.github.com/en/education/about-github-education/use-github-at-your-educational-institution/applying-to-be-a-github-campus-expert",
  tags: ["community", "leadership", "student", "swag", "learning"],
  region: "global",
  status: "active",
  isPaid: false,
  duration: "Ongoing",
  stipendSummary: "Swag, resources",
  timelineSummary: "Year-round",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The GitHub Campus Experts program helps students learn the skills they need to build and grow technical communities on their campus.

**Duration:** Ongoing  
**Stipend:** Swag, resources  
**Extra notes:** Leadership focus, not just coding.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a university student  
- You want to build a tech community on campus  
- You want to improve your public speaking and leadership skills  

Keep in mind:

- Leadership focus, not just coding.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
Applications are open **year-round** (or periodically).
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **GitHub Campus Experts**:

1. Be active in your campus tech community.  
2. Understand the challenges your community faces.  
3. Complete the training modules provided by GitHub.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The process involves:

- Applying online  
- Submitting a video explaining your community vision  
- Completing training  

Check the official documentation for details.
      `.trim(),
    },
  ],
  seo: {
    title: "GitHub Campus Experts - Community Leadership",
    description:
      "GitHub Campus Experts program empowers students to build technical communities on their campuses.",
  },
};
