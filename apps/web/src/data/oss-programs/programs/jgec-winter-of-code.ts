import type { Program } from "../types";

export const jgecWinterOfCode: Program = {
  slug: "jgec-winter-of-code",
  name: "JGEC Winter of Code",
  shortName: "JWoC",
  tagline:
    "Winter open source program by Jalpaiguri Government Engineering College.",
  shortDescription:
    "Winter open source program by Jalpaiguri Government Engineering College.",
  websiteUrl: "https://www.jwoc.in/",
  tags: ["open source", "beginner", "unpaid", "student", "india"],
  region: "india",
  status: "active",
  isPaid: false,
  duration: "~1-2 months",
  stipendSummary: "No stipend certificates provided",
  timelineSummary: "December-January",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
JGEC Winter of Code (JWoC) is an open source program organized by Jalpaiguri Government Engineering College. It aims to introduce students to the world of open source development.

**Duration:** ~1-2 months  
**Stipend:** No stipend; certificates provided  
**Extra notes:** College-level program from West Bengal, India; beginner-friendly; small scale.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a student or beginner  
- You want to get started with open source  
- You are looking for a beginner-friendly environment  

Keep in mind:

- College-level program from West Bengal, India; beginner-friendly; small scale.
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
To prepare for **JWoC**:

1. Learn the basics of Git and GitHub.  
2. Join the program's Discord or communication channels.  
3. Look for projects that match your skill level.  
4. Be ready to ask questions and learn.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Registration  
- Project browsing  
- Making contributions  
- Submitting Pull Requests (PRs)  
- Certificates awarded upon completion  

Check the official website for registration details.
      `.trim(),
    },
  ],
  seo: {
    title: "JGEC Winter of Code - Student Open Source Program",
    description:
      "JGEC Winter of Code is a beginner-friendly open source program for students.",
  },
};
