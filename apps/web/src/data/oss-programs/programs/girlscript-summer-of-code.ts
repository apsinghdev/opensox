import type { Program } from "../types";

export const girlscriptSummerOfCode: Program = {
  slug: "girlscript-summer-of-code",
  name: "GirlScript Summer of Code",
  shortName: "GSSoC",
  tagline:
    "Three month open source program by GirlScript Foundation for beginners to contribute to many projects.",
  shortDescription:
    "Three month open source program by GirlScript Foundation for beginners to contribute to many projects.",
  websiteUrl: "https://gssoc.girlscript.tech/",
  tags: ["open source", "beginner", "unpaid", "remote", "community"],
  region: "global",
  status: "active",
  isPaid: false,
  duration: "3 months",
  stipendSummary: "Unpaid; goodies; certificates; and sometimes internship offers",
  timelineSummary: "Typically Mar to May each year",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
GirlScript Summer of Code is a three-month open source program conducted by the GirlScript Foundation. It is designed to help beginners get started with open source development by contributing to various projects under the guidance of mentors.

**Duration:** 3 months  
**Stipend:** Unpaid; goodies; certificates; and sometimes internship offers  
**Extra notes:** Community driven; very beginner friendly.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a student or beginner  
- You have no prior open source experience (it's very beginner friendly)  
- You want to learn how to use Git and GitHub  

Keep in mind:

- Community driven; very beginner friendly.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program typically runs from **March to May** each year.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **GirlScript Summer of Code**:

1. Learn the basics of Git and GitHub.  
2. Join the official communication channels (Discord/Telegram).  
3. Look at the projects from previous years to get an idea of the tech stacks.  
4. Be ready to claim issues and submit pull requests once the program starts.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Registering for the program  
- Joining the communication channels  
- Picking projects to contribute to  
- Sending pull requests with mentor help  
- Top contributors are recognized with prizes  

Check the official website for registration dates.
      `.trim(),
    },
  ],
  seo: {
    title: "GirlScript Summer of Code - Beginner Open Source Program",
    description:
      "GirlScript Summer of Code is a beginner-friendly open source program helping students contribute to real-world projects.",
  },
};
