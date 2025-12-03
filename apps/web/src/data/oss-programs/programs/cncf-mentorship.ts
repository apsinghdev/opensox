import type { Program } from "../types";

export const cncfMentorship: Program = {
  slug: "cncf-mentorship",
  name: "CNCF Mentorship",
  tagline: "Cloud Native Foundation.",
  shortDescription: "Cloud Native Foundation.",
  websiteUrl: "https://github.com/cncf/mentoring",
  tags: ["open source", "cloud native", "kubernetes", "paid", "remote"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "12-24 weeks",
  stipendSummary: "3000-6600 USD",
  timelineSummary: "Spring Summer Fall",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The Cloud Native Computing Foundation (CNCF) Mentorship program offers structured mentorship for contributors to work on cloud-native projects like Kubernetes, Prometheus, and Envoy.

**Duration:** 12-24 weeks  
**Stipend:** 3000-6600 USD  
**Extra notes:** Kubernetes, 100+ projects.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are 18 or older  
- You have an interest in cloud-native technologies  
- You want to work on high-impact infrastructure projects  

Keep in mind:

- Kubernetes, 100+ projects.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program runs in **Spring, Summer, and Fall** terms, often aligned with the LFX Mentorship schedule.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **CNCF Mentorship**:

1. Learn the basics of containers and Kubernetes.  
2. Explore CNCF projects and find one that interests you.  
3. Start contributing to the project before applying.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Applying via the LFX portal  
- Selecting projects (Kubernetes, Prometheus, etc.)  
- Working with mentors  

Check the official repository for details.
      `.trim(),
    },
  ],
  seo: {
    title: "CNCF Mentorship - Cloud Native Open Source",
    description:
      "CNCF Mentorship provides paid opportunities to work on cloud-native projects like Kubernetes.",
  },
};
