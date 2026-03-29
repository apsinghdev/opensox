// src/data/oss-programs/google-summer-of-code.ts

import type { Program } from "../types";

export const googleSummerOfCode: Program = {
  slug: "google-summer-of-code",
  name: "Google Summer of Code",
  shortName: "GSoC",
  tagline:
    "International program where contributors 18 plus are paid by Google to work on open source projects over the summer.",
  shortDescription:
    "International program where contributors 18 plus are paid by Google to work on open source projects over the summer.",
  websiteUrl: "https://summerofcode.withgoogle.com/",
  tags: ["open source", "code program", "data or ai", "paid", "remote"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "10 to 22 weeks",
  stipendSummary:
    "Amount varies by country and project; typically 1500 to 6600 USD",
  timelineSummary:
    "Org list Jan to Feb; applications Mar to Apr; coding May to Aug",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Google Summer of Code is an international program where contributors who are 18 or older are paid by Google to work on open source projects over the summer.

**Duration:** 10 to 22 weeks  
**Stipend:** Amount varies by country and project; typically 1500 to 6600 USD  
**Extra notes:** Remote only; open to students and non students.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are 18 plus  
- You can participate worldwide  
- You have basic programming skills  
- You can work remotely during the program period  

Keep in mind:

- Remote only; open to students and non students.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program usually follows this kind of schedule:

- **Org list:** January to February  
- **Applications:** March to April  
- **Coding:** May to August  

Typical duration is **10 to 22 weeks**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Google Summer of Code**:

1. Read the official website and any recent announcements carefully.  
2. Check the eligibility and timeline so you know if you fit and when to apply.  
3. Look at past projects and accepted proposals to understand what successful work looks like.  
4. Make sure your GitHub profile and basic open source workflow are in decent shape.  
5. Start early and talk with mentors in the org you are targeting.

If you are new to open source, begin with small fixes or documentation improvements to understand the tools and review process.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process is usually:

- Choose organization and project  
- Talk with mentors  
- Submit proposal  
- Organizations review and select  
- Coding under mentor guidance  
- Final evaluation  

Always double check the official website because exact steps and dates can change each year.
      `.trim(),
    },
  ],
  seo: {
    title: "Google Summer of Code - Open source program guide",
    description:
      "Overview of Google Summer of Code: what it is about, who it is for, when it happens, how to prepare, and how to apply.",
  },
};
