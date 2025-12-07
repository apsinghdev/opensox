import type { Program } from "../types";

export const openSourcePromotionPlan: Program = {
  slug: "open-source-promotion-plan",
  name: "Open Source Promotion Plan",
  shortName: "OSPP",
  tagline: "Program by Chinese Academy of Sciences for college students.",
  shortDescription:
    "Program by Chinese Academy of Sciences for college students.",
  websiteUrl: "https://mentorship.kde.org/blog/2025-03-29-ospp/",
  tags: ["open source", "china", "paid", "student", "remote"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "~3 months",
  stipendSummary: "CNY 8000-12000 approx 1100-1700 USD varies by difficulty",
  timelineSummary: "Summer June-September",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The Open Source Promotion Plan (OSPP) is a program organized by the Chinese Academy of Sciences. It encourages college students to actively participate in the development and maintenance of open source software.

**Duration:** ~3 months  
**Stipend:** CNY 8000-12000 (approx 1100-1700 USD); varies by difficulty  
**Extra notes:** Organized in China but open globally; many Chinese OSS projects.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a college or university student (worldwide)  
- You are interested in Chinese open source projects  
- You want to gain experience in a structured mentorship program  

Keep in mind:

- Organized in China but open globally; many Chinese OSS projects.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program typically runs during the **Summer (June-September)**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **OSPP**:

1. Check the official portal for project listings.  
2. Communicate with mentors to understand the requirements.  
3. Prepare a project proposal.  
4. Familiarize yourself with the specific technologies used in the projects.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Registering on the portal  
- Browsing projects  
- Contacting mentors  
- Submitting a proposal  
- Coding period upon selection  

Check the official website for the exact steps.
      `.trim(),
    },
  ],
  seo: {
    title: "Open Source Promotion Plan - Student Program",
    description:
      "Open Source Promotion Plan (OSPP) is a summer program for students to contribute to open source projects, organized by CAS.",
  },
};
