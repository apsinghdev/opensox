import type { Program } from "../types";

export const adventOfCode: Program = {
  slug: "advent-of-code",
  name: "Advent of Code",
  tagline: "Annual December programming puzzle event.",
  shortDescription: "Annual December programming puzzle event.",
  websiteUrl: "https://adventofcode.com/",
  tags: ["coding challenge", "puzzles", "learning", "unpaid", "global"],
  region: "global",
  status: "active",
  isPaid: false,
  duration: "25 days",
  stipendSummary: "No prizes, learning-focused",
  timelineSummary: "December 1-25, annual",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Advent of Code is an annual event where a new programming puzzle is released each day from December 1st to December 25th. It is designed for skill-building, practice, and fun.

**Duration:** 25 days  
**Stipend:** No prizes, learning-focused  
**Extra notes:** Daily programming challenges, great for skill building and practice.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You enjoy solving algorithmic puzzles  
- You want to improve your coding skills  
- You are looking for a fun daily challenge  

Keep in mind:

- Daily programming challenges, great for skill building and practice.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The event takes place annually from **December 1st to December 25th**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Advent of Code**:

1. Brush up on algorithms and data structures.  
2. Choose a programming language you want to practice (or learn a new one).  
3. Sign up on the website before December 1st.  
4. Join a leaderboard with friends or colleagues for extra motivation.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
There is no formal application process. Simply:

- Go to the website  
- Log in  
- Solve the daily puzzles  

You can track your progress and compete on leaderboards.
      `.trim(),
    },
  ],
  seo: {
    title: "Advent of Code - Daily Programming Puzzles",
    description:
      "Advent of Code is an annual event with daily programming puzzles for skill building and fun.",
  },
};
