import type { Program } from "../types";

export const codeForGovtech: Program = {
  slug: "code-for-govtech",
  name: "DMP by C4GT Code for GovTech",
  tagline: "India govt tech projects.",
  shortDescription: "India govt tech projects.",
  websiteUrl: "https://codeforgovtech.in/dedicated_mentoring_program/",
  tags: ["open source", "govtech", "india", "paid", "student"],
  region: "india",
  status: "active",
  isPaid: true,
  duration: "2-3 months",
  stipendSummary: "1,00,000 INR (~1200 USD)",
  timelineSummary: "June-August",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The Dedicated Mentoring Program (DMP) by Code for GovTech (C4GT) focuses on building open source digital public goods for government applications in India.

**Duration:** 2-3 months  
**Stipend:** 1,00,000 INR (~1200 USD)  
**Extra notes:** Government digital services focus.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a student (Indian preferred)  
- You are interested in GovTech and digital public infrastructure  
- You want to work on high-impact projects  

Keep in mind:

- Government digital services focus.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program typically runs from **June to August**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **C4GT DMP**:

1. Explore the C4GT community and projects.  
2. Understand the basics of Digital Public Goods (DPGs).  
3. Participate in community challenges if available.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Applying for the program  
- Selection process  
- Mentorship phase  

Check the official website for details.
      `.trim(),
    },
  ],
  seo: {
    title: "Code for GovTech DMP - GovTech Open Source",
    description:
      "Code for GovTech (C4GT) Dedicated Mentoring Program offers students the chance to work on Indian government tech projects.",
  },
};
