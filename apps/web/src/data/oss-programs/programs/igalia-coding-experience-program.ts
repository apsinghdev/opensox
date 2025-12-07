import type { Program } from "../types";

export const igaliaCodingExperienceProgram: Program = {
  slug: "igalia-coding-experience-program",
  name: "Igalia Coding Experience Program",
  tagline:
    "Summer program by Igalia giving newcomers experience working on open source browsers and graphics projects.",
  shortDescription:
    "Summer program by Igalia giving newcomers experience working on open source browsers and graphics projects.",
  websiteUrl: "https://www.igalia.com/coding-experience/",
  tags: ["open source", "browsers", "graphics", "paid", "remote"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "Around 12 weeks",
  stipendSummary:
    "Paid internship style grant; exact amount varies and is not always public",
  timelineSummary:
    "Usually runs during summer; applications some months before start",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The Igalia Coding Experience Program is a summer program designed to give newcomers experience working on open source web engines, browsers, and graphics projects. Participants work with mentors on upstream projects like Chromium, WebKit, or Mesa.

**Duration:** Around 12 weeks  
**Stipend:** Paid internship style grant; exact amount varies and is not always public  
**Extra notes:** Strong focus on upstream contributions to major open source projects.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a student or early-career developer  
- You have an interest in C++, web engines, or graphics  
- You want to contribute to major browser engines or graphics drivers  

Keep in mind:

- Strong focus on upstream contributions to major open source projects.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program usually runs during the **summer**. Applications typically open a few months before the start date.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for the **Igalia Coding Experience Program**:

1. Strengthen your C++ skills.  
2. Learn about browser architecture or graphics pipelines.  
3. Explore the projects Igalia contributes to (Chromium, WebKit, Mesa).  
4. Demonstrate your interest through small contributions or personal projects.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Igalia announcing available projects  
- Candidates applying for specific projects  
- Selection process involving interviews  
- Selected participants joining remote teams to work with mentors  

Check the official website for announcements.
      `.trim(),
    },
  ],
  seo: {
    title: "Igalia Coding Experience Program - Browser & Graphics",
    description:
      "Join the Igalia Coding Experience Program to work on open source web engines and graphics projects.",
  },
};
