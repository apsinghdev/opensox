import type { Program } from "../types";

export const iiitKalyaniWinterOfCode: Program = {
  slug: "iiit-kalyani-winter-of-code",
  name: "IIIT Kalyani Winter of Code",
  tagline: "GDSC IIIT Kalyani.",
  shortDescription: "GDSC IIIT Kalyani.",
  websiteUrl: "https://winter-of-code.tech/",
  tags: ["open source", "student", "beginner", "india", "certificates"],
  region: "india",
  status: "active",
  isPaid: false,
  duration: "1-2 months",
  stipendSummary: "Certificates",
  timelineSummary: "Dec-Jan",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
IIIT Kalyani Winter of Code is an open source initiative organized by GDSC IIIT Kalyani. It aims to help students get started with open source development.

**Duration:** 1-2 months  
**Stipend:** Certificates  
**Extra notes:** GDSC West Bengal.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a student  
- You want to learn about open source  
- You are looking for a winter project  

Keep in mind:

- GDSC West Bengal.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program typically runs from **December to January**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **IIIT Kalyani Winter of Code**:

1. Learn basic Git commands.  
2. Join the community channels.  
3. Look for projects to contribute to.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The process involves:

- Registering  
- Contributing via Pull Requests (PRs)  

Check the official website for details.
      `.trim(),
    },
  ],
  seo: {
    title: "IIIT Kalyani Winter of Code - Student Program",
    description:
      "IIIT Kalyani Winter of Code is a student-run open source program in India.",
  },
};
