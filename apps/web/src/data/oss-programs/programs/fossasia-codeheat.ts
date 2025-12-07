import type { Program } from "../types";

export const fossasiaCodeheat: Program = {
  slug: "fossasia-codeheat",
  name: "FOSSASIA Codeheat",
  tagline: "Continuous contest.",
  shortDescription: "Continuous contest.",
  websiteUrl: "https://codeheat.org/",
  tags: ["open source", "contest", "fossasia", "prizes", "remote"],
  region: "global",
  status: "active",
  isPaid: false,
  duration: "Continuous",
  stipendSummary: "Prizes periodic",
  timelineSummary: "Year-round 2-month",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
FOSSASIA Codeheat is a coding contest for FOSSASIA projects. Contributors can win prizes and recognition by contributing code to FOSSASIA's open source software.

**Duration:** Continuous / Periodic  
**Stipend:** Prizes periodic  
**Extra notes:** Contest, not internship.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are interested in FOSSASIA projects  
- You like coding contests  
- You want to earn recognition and prizes  

Keep in mind:

- Contest, not internship.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The contest is often **continuous** or runs in **2-month** cycles year-round.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Codeheat**:

1. Explore FOSSASIA repositories on GitHub.  
2. Join the FOSSASIA community chat.  
3. Start fixing bugs or implementing features.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The process involves:

- Contributing code to FOSSASIA projects  
- Submitting your contributions to the contest  
- Evaluation by mentors  

Check the official website for current contest details.
      `.trim(),
    },
  ],
  seo: {
    title: "FOSSASIA Codeheat - Coding Contest",
    description:
      "FOSSASIA Codeheat is a coding contest where you can contribute to open source and win prizes.",
  },
};
