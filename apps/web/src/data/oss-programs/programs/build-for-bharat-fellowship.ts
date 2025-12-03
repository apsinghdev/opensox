import type { Program } from "../types";

export const buildForBharatFellowship: Program = {
  slug: "build-for-bharat-fellowship",
  name: "Build for Bharat Fellowship",
  tagline: "Bharat Digital govt.",
  shortDescription: "Bharat Digital govt.",
  websiteUrl: "https://www.bharatdigital.io/fellowship",
  tags: ["open source", "govtech", "india", "paid", "fellowship"],
  region: "india",
  status: "active",
  isPaid: true,
  duration: "6 months",
  stipendSummary: "40K INR/month",
  timelineSummary: "Jan-June 2026",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The Build for Bharat Fellowship is a program focused on building digital public infrastructure for India. It involves design, data, and GIS projects.

**Duration:** 6 months  
**Stipend:** 40K INR/month  
**Extra notes:** Govt high-impact.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a recent graduate (2024-2026 grads)  
- You have skills in design, data, or GIS  
- You want to work on government projects  

Keep in mind:

- Govt high-impact.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The fellowship is scheduled for **January to June 2026**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Build for Bharat Fellowship**:

1. Build a portfolio in design, data, or GIS.  
2. Understand the digital public infrastructure landscape in India.  
3. Apply when applications open.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The process involves:

- Application  
- Selection  
- Fellowship work  

Check the official website for details.
      `.trim(),
    },
  ],
  seo: {
    title: "Build for Bharat Fellowship - GovTech India",
    description:
      "Build for Bharat Fellowship offers opportunities to work on high-impact government tech projects in India.",
  },
};
