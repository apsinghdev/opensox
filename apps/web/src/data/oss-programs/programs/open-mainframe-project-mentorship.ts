import type { Program } from "../types";

export const openMainframeProjectMentorship: Program = {
  slug: "open-mainframe-project-mentorship",
  name: "Open Mainframe Project Mentorship",
  tagline:
    "Mentorship for mainframe and COBOL projects under Linux Foundation.",
  shortDescription:
    "Mentorship for mainframe and COBOL projects under Linux Foundation.",
  websiteUrl: "https://openmainframeproject.org/projects/mentorship/",
  tags: ["open source", "mainframe", "cobol", "paid", "remote"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "12-24 weeks",
  stipendSummary: "3000-6600 USD via LFX location-based",
  timelineSummary: "Part of LFX Mentorship schedule multiple batches",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The Open Mainframe Project Mentorship program connects mentees with mentors to work on mainframe technologies, including COBOL, Zowe, and z/OS. It is part of the Linux Foundation Mentorship (LFX) platform.

**Duration:** 12-24 weeks  
**Stipend:** 3000-6600 USD via LFX; location-based  
**Extra notes:** Great for learning mainframe tech, COBOL, z/OS, Zowe; in high demand.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are 18 or older  
- You have an interest in mainframe technologies  
- You want to learn skills that are in high demand in the enterprise world  

Keep in mind:

- Great for learning mainframe tech, COBOL, z/OS, Zowe; in high demand.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program follows the **LFX Mentorship schedule** with multiple batches throughout the year (Spring, Summer, Fall).
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for the **Open Mainframe Project Mentorship**:

1. Create an LFX profile.  
2. Learn the basics of mainframe concepts (IBM Z, COBOL).  
3. Explore the Open Mainframe Project landscape.  
4. Look for introductory resources or courses provided by the foundation.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Applying via the LFX portal  
- Project selection  
- Working on mainframe/COBOL/Zowe projects  

Check the LFX Mentorship portal for open applications.
      `.trim(),
    },
  ],
  seo: {
    title: "Open Mainframe Project Mentorship - Mainframe & COBOL",
    description:
      "Learn mainframe technologies like COBOL and Zowe through the Open Mainframe Project Mentorship.",
  },
};
