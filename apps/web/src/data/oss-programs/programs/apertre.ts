import type { Program } from "../types";

export const apertre: Program = {
  slug: "apertre",
  name: "Apertre 2.0",
  tagline: "30-day OSS event by Resourcio Community.",
  shortDescription: "30-day OSS event Resourcio Community.",
  websiteUrl: "https://s2apertre.resourcio.in/",
  tags: ["open source", "beginner", "india", "prizes", "environment"],
  region: "india",
  status: "active",
  isPaid: false,
  duration: "30 days",
  stipendSummary: "20K INR prizes swags",
  timelineSummary: "March 7-April 5 annual",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Apertre 2.0 is a 30-day open source event organized by the Resourcio Community. It encourages students and developers to contribute to open source projects.

**Duration:** 30 days  
**Stipend:** 20K INR prizes, swags  
**Extra notes:** Beginner friendly; environmental focus (plant a tree for 5 PRs); Indian origin.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a student or developer  
- You want to start contributing to open source  
- You are interested in winning prizes and swags  

Keep in mind:

- Beginner friendly; environmental focus; Indian origin.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The event typically runs annually from **March 7 to April 5**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Apertre**:

1. Join the Resourcio Community.  
2. Learn basic Git and GitHub skills.  
3. Look out for the registration announcement.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The process involves:

- Registering for the event  
- Submitting Pull Requests (PRs)  
- Completing 5 PRs to plant a tree  

Check the official website for registration.
      `.trim(),
    },
  ],
  seo: {
    title: "Apertre 2.0 - Open Source Event",
    description:
      "Apertre 2.0 is a 30-day open source event with prizes and an environmental focus.",
  },
};
