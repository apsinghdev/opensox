import type { Program } from "../types";

export const hacktoberfest: Program = {
  slug: "hacktoberfest",
  name: "Hacktoberfest",
  tagline: "Month-long celebration of open source with contribution rewards",
  shortDescription: "A global event run by DigitalOcean that encourages developers of all levels to contribute to open source projects during October. Participants earn digital badges, tree plantings, and swag by completing pull requests and making meaningful contributions to the community.",
  websiteUrl: "https://hacktoberfest.com/",
  tags: ["open source", "beginner", "swag", "remote", "global"],
  region: "global",
  status: "active",
  isPaid: false,
  duration: "1 month",
  stipendSummary: "Badge, tree, swag",
  timelineSummary: "October month",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Hacktoberfest is a month-long celebration of open source software run by DigitalOcean. It encourages people to contribute to open source projects during the month of October.

**Duration:** 1 month  
**Stipend:** Badge, tree, swag  
**Extra notes:** Most popular beginner event.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a beginner or experienced developer  
- You want to get involved in open source  
- You enjoy collecting digital badges or swag (often a t-shirt or tree planted)  

Keep in mind:

- Most popular beginner event.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The event takes place every year in **October**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Hacktoberfest**:

1. Create a GitHub or GitLab account.  
2. Look for repositories with the "hacktoberfest" topic.  
3. Read the contribution guidelines of the projects you want to contribute to.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The process involves:

- Registering on the Hacktoberfest website  
- Submitting 4 or more valid Pull Requests (PRs) during October  
- Waiting for validation  

Check the official website for registration.
      `.trim(),
    },
  ],
  seo: {
    title: "Hacktoberfest - October Open Source Event",
    description:
      "Hacktoberfest is a global open source event held in October, encouraging contributions to open source projects.",
  },
};
