import type { Program } from "../types";

export const redoxSummerOfCode: Program = {
  slug: "redox-summer-of-code",
  name: "Redox Summer of Code",
  shortName: "RSoC",
  tagline:
    "Redox OS program that uses project donations to fund students or contributors to work on Redox OS and ecosystem projects.",
  shortDescription:
    "Redox OS program that uses project donations to fund students or contributors to work on Redox OS and ecosystem projects.",
  websiteUrl: "https://www.redox-os.org/rsoc-project-suggestions/",
  tags: ["open source", "os dev", "rust", "paid", "remote"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "Varies by project; often similar to a summer term",
  stipendSummary: "Amount varies; paid from donations and negotiated per project",
  timelineSummary:
    "Runs during northern hemisphere summer; exact dates and schedule agreed individually with mentors",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Redox Summer of Code is a program organized by the Redox OS project. It uses donations to fund contributors who want to work on Redox OS and its ecosystem. It offers more flexibility than traditional programs like GSoC.

**Duration:** Varies by project; often similar to a summer term  
**Stipend:** Amount varies; paid from donations and negotiated per project  
**Extra notes:** Offers more flexibility than GSoC; schedule and payment are highly customizable.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You have shown interest and ability in Redox OS  
- You are comfortable with Rust and systems programming  
- You are self-motivated (as it's highly customizable)  

Keep in mind:

- Offers more flexibility than GSoC; schedule and payment are highly customizable.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program typically runs during the **Northern Hemisphere summer**. However, exact dates and schedules are agreed upon individually with mentors.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Redox Summer of Code**:

1. Learn Rust and operating system concepts.  
2. Join the Redox OS chat and introduce yourself.  
3. Start contributing to the project to demonstrate your skills.  
4. Discuss project ideas with the maintainers.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Joining the Redox chat  
- Contributing to the project  
- Discussing a project idea and proposing a plan  
- If selected, working on Redox OS under mentor guidance  

Check the official website for project suggestions.
      `.trim(),
    },
  ],
  seo: {
    title: "Redox Summer of Code - Rust OS Development",
    description:
      "Redox Summer of Code funds contributors to work on the Rust-based Redox Operating System.",
  },
};
