import type { Program } from "../types";

export const processingFoundationFellowship: Program = {
  slug: "processing-foundation-fellowship",
  name: "Processing Foundation Fellowship",
  tagline:
    "Fellowships that support individuals or small teams building creative coding projects with Processing or p5.js.",
  shortDescription:
    "Fellowships that support individuals or small teams building creative coding projects with Processing or p5.js.",
  websiteUrl: "https://processingfoundation.org/fellowships",
  tags: ["open source", "art", "creative coding", "paid", "remote"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "4-5 months",
  stipendSummary: "10,000 USD per fellowship",
  timelineSummary: "Summer, June-October",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
The Processing Foundation Fellowship supports artists, designers, activists, educators, engineers, researchers, coders, and collectives who want to work on creative coding projects. The program focuses on Processing, p5.js, and related software.

**Duration:** 4-5 months  
**Stipend:** 10,000 USD per fellowship  
**Extra notes:** Focus on art, education, and social justice in creative tech.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are an artist, educator, developer, or activist  
- You are interested in creative coding  
- You have a project proposal aligned with the foundation's themes  

Keep in mind:

- Focus on art, education, and social justice in creative tech.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The fellowship typically runs during the **Summer (June-October)**. Calls for proposals usually happen early in the year.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for the **Processing Foundation Fellowship**:

1. Develop a strong project proposal that aligns with the yearly themes.  
2. Review past fellows' work to understand the scope and impact.  
3. Clearly articulate how your project benefits the community.  
4. Prepare a detailed timeline and budget if required.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Submitting a detailed fellowship application with a project proposal  
- Foundation review and selection  
- Fellows building their project and publishing outcomes  
- Often running workshops or community events  

Check the official website for the specific themes and deadlines for the current year.
      `.trim(),
    },
  ],
  seo: {
    title: "Processing Foundation Fellowship - Creative Coding",
    description:
      "The Processing Foundation Fellowship supports creative coding projects involving art, code, and education.",
  },
};
