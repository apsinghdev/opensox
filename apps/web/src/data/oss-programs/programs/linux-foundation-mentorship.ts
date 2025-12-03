import type { Program } from "../types";

export const linuxFoundationMentorship: Program = {
  slug: "linux-foundation-mentorship",
  name: "Linux Foundation Mentorship Program",
  shortName: "LFX Mentorship",
  tagline:
    "Mentorship program that matches contributors with maintainers on Linux Foundation projects.",
  shortDescription:
    "Mentorship program that matches contributors with maintainers on Linux Foundation projects.",
  websiteUrl: "https://www.linuxfoundation.org/about/mentorship-programs/",
  tags: ["open source", "mentorship", "linux", "paid", "remote"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "12 weeks",
  stipendSummary: "Stipend tiers based on region; usually in the low thousands of USD",
  timelineSummary:
    "Several cohorts each year; typical terms are Mar to May; Jun to Aug; Sep to Nov",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The Linux Foundation Mentorship Program connects aspiring contributors with experienced maintainers working on Linux Foundation projects. It covers a wide range of technologies including the Linux kernel, cloud-native applications, and networking.

**Duration:** 12 weeks  
**Stipend:** Stipend tiers based on region; usually in the low thousands of USD  
**Extra notes:** Covers kernel, cloud native, networking, and many other LF projects.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a student or early-career engineer  
- You have an interest in specific Linux Foundation projects  
- You want to learn from experienced open source maintainers  

Keep in mind:

- Covers kernel, cloud native, networking, and many other LF projects.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
There are several cohorts each year. Typical terms are:

- **March to May**  
- **June to August**  
- **September to November**  

Typical duration is **12 weeks**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for the **Linux Foundation Mentorship Program**:

1. Create a profile on the LFX Mentorship platform.  
2. Explore the projects that are participating in the upcoming cohort.  
3. Familiarize yourself with the project's codebase and contribution guidelines.  
4. Try to fix small bugs or improve documentation before applying.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Browsing projects on the LFX platform  
- Submitting up to three applications  
- Mentors reviewing applications and interviewing candidates  
- Selected mentees working under a mentor with regular evaluations  

Check the LFX platform for the latest project listings and deadlines.
      `.trim(),
    },
  ],
  seo: {
    title: "Linux Foundation Mentorship - Open Source Mentoring",
    description:
      "Join the Linux Foundation Mentorship Program to work on major open source projects like Linux Kernel and Kubernetes with expert guidance.",
  },
};
