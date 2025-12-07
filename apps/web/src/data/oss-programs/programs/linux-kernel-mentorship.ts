import type { Program } from "../types";

export const linuxKernelMentorship: Program = {
  slug: "linux-kernel-mentorship",
  name: "Linux Kernel Mentorship",
  shortName: "LKMP",
  tagline: "Linux kernel developer mentorship.",
  shortDescription: "Linux kernel developer mentorship.",
  websiteUrl: "https://wiki.linuxfoundation.org/lkmp",
  tags: ["open source", "linux kernel", "c", "paid", "remote"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "12-24 weeks",
  stipendSummary: "3000-6600 USD LFX",
  timelineSummary: "Multiple terms LFX schedule",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The Linux Kernel Mentorship Program (LKMP) offers a structured mentorship opportunity for developers to contribute to the Linux Kernel. It is designed to help aspiring kernel developers gain the skills and experience needed to become effective contributors.

**Duration:** 12-24 weeks  
**Stipend:** 3000-6600 USD (via LFX)  
**Extra notes:** LFX; Strong C skills required; kernel focus.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You have a strong interest in kernel development  
- You are proficient in C programming  
- You want to contribute to the core of the Linux operating system  

Keep in mind:

- LFX; Strong C skills required; kernel focus.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program follows the **LFX Mentorship schedule** with multiple terms (Spring, Summer, Fall).
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for the **Linux Kernel Mentorship**:

1. Complete the Linux Kernel Mentorship courses if available.  
2. Learn how to build and boot a custom kernel.  
3. Familiarize yourself with the kernel coding style and submission process.  
4. Fix small warnings or bugs in the kernel staging tree.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Completing prerequisite courses (often required)  
- Applying via the LFX portal  
- Working with developers on assigned tasks  

Check the official wiki and LFX portal for details.
      `.trim(),
    },
  ],
  seo: {
    title: "Linux Kernel Mentorship - Kernel Development",
    description:
      "Become a Linux Kernel contributor through the Linux Kernel Mentorship Program.",
  },
};
