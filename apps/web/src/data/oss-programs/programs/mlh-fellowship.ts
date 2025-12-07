import type { Program } from "../types";

export const mlhFellowship: Program = {
  slug: "mlh-fellowship",
  name: "MLH Fellowship",
  tagline:
    "Remote fellowship where students and early career developers work on real world open source or production code.",
  shortDescription:
    "Remote fellowship where students and early career developers work on real world open source or production code.",
  websiteUrl: "https://fellowship.mlh.io/",
  tags: ["open source", "fellowship", "paid", "remote", "learning"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "12 weeks",
  stipendSummary: "Paid; up to about 5000 USD depending on location and track",
  timelineSummary:
    "Three batches each year; spring; summer; fall; applications usually 2 to 4 months before start",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The MLH Fellowship is a remote program where students and early-career developers collaborate on real-world open source projects or production code. Fellows work in small groups (pods) under the guidance of a mentor.

**Duration:** 12 weeks  
**Stipend:** Paid; up to about 5000 USD depending on location and track  
**Extra notes:** Multiple tracks such as Open Source, Explorer, and Production Engineering.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a student or recent graduate  
- You are fluent in English  
- You have basic software development skills  
- You want to gain practical experience in a team setting  

Keep in mind:

- Multiple tracks such as Open Source, Explorer, Production Engineering.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
There are three batches each year:

- **Spring**  
- **Summer**  
- **Fall**  

Applications usually open **2 to 4 months** before the start of each batch.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for the **MLH Fellowship**:

1. Polish your resume and GitHub profile.  
2. Practice coding problems and explaining your thought process.  
3. Have a code sample ready that you can walk through during an interview.  
4. Show enthusiasm for learning and collaborating with others.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process typically includes:

- Online application form  
- Coding tasks or technical interview  
- Behavioral interview  
- Acceptance and placement into a pod  
- Regular mentor sessions and demos during the program  

Check the official website for specific track requirements and deadlines.
      `.trim(),
    },
  ],
  seo: {
    title: "MLH Fellowship - Remote Open Source Fellowship",
    description:
      "Discover the MLH Fellowship, a remote program for students and early career developers to work on real-world open source projects.",
  },
};
