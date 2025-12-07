import type { Program } from "../types";

export const fosseeSummerFellowship: Program = {
  slug: "fossee-summer-fellowship",
  name: "FOSSEE Summer Fellowship",
  tagline:
    "Internship and fellowship program at IIT Bombay where students work on FOSSEE free software projects.",
  shortDescription:
    "Internship and fellowship program at IIT Bombay where students work on FOSSEE free software projects.",
  websiteUrl: "https://fossee.in/fellowship/2025",
  tags: ["open source", "fellowship", "india", "paid", "education"],
  region: "india",
  status: "active",
  isPaid: true,
  duration: "6 to 8 weeks",
  stipendSummary:
    "Honorarium paid on successful completion; amount depends on project and performance",
  timelineSummary:
    "Screening tasks announced around Jan; project work usually May to Jul",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The FOSSEE Summer Fellowship is conducted by IIT Bombay. It provides an opportunity for students to work on Free/Libre and Open Source Software (FOSS) projects used in engineering and science education.

**Duration:** 6 to 8 weeks  
**Stipend:** Honorarium paid on successful completion; amount depends on project and performance  
**Extra notes:** Focuses on free software tools for engineering and science education.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a student from an Indian institute (UG, PG, or PhD)  
- You have good programming skills  
- You are interested in contributing to educational software tools  

Keep in mind:

- Focuses on free software tools for engineering and science education.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The schedule typically involves:

- **Screening Tasks:** January to April  
- **Fellowship:** May to July  

Typical duration is **6 to 8 weeks**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for the **FOSSEE Summer Fellowship**:

1. Learn a programming language like Python, Scilab, or OpenFOAM depending on the project.  
2. Complete the screening tasks diligently as they are the primary selection criteria.  
3. Review the FOSSEE website for project details and tutorials.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Completing screening tasks for specific FOSSEE projects  
- Selection based on performance in screening tasks  
- Working at IIT Bombay or remotely on assigned tasks  

Check the official website for the release of screening tasks.
      `.trim(),
    },
  ],
  seo: {
    title: "FOSSEE Summer Fellowship - IIT Bombay Open Source",
    description:
      "FOSSEE Summer Fellowship offers students the chance to work on free software projects at IIT Bombay.",
  },
};
