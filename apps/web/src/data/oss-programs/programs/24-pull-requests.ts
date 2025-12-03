import type { Program } from "../types";

export const twentyFourPullRequests: Program = {
  slug: "24-pull-requests",
  name: "24 Pull Requests",
  tagline: "December PR event.",
  shortDescription: "December PR event.",
  websiteUrl: "https://24pullrequests.com/",
  tags: ["open source", "beginner", "holiday", "unpaid", "global"],
  region: "global",
  status: "active",
  isPaid: false,
  duration: "24 days",
  stipendSummary: "Swag, recognition",
  timelineSummary: "December 24 days",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
24 Pull Requests is a yearly initiative to encourage developers to give back to open source during the holiday season. The goal is to submit 24 pull requests between December 1st and December 24th.

**Duration:** 24 days  
**Stipend:** Swag, recognition  
**Extra notes:** Holiday beginner friendly.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You want to contribute to open source during the holidays  
- You are looking for a challenge similar to an advent calendar  
- You are of any skill level  

Keep in mind:

- Holiday beginner friendly.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The event runs from **December 1st to December 24th**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **24 Pull Requests**:

1. Sign up on the website with your GitHub account.  
2. Find projects that need help.  
3. Plan to make one contribution each day.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The process involves:

- Logging in with GitHub  
- Submitting PRs to open source projects  
- Tracking your progress on the site  

Check the official website to join.
      `.trim(),
    },
  ],
  seo: {
    title: "24 Pull Requests - Holiday Open Source Challenge",
    description:
      "24 Pull Requests encourages developers to give back to open source during December.",
  },
};
