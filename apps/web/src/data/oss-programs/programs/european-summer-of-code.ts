import type { Program } from "../types";

export const europeanSummerOfCode: Program = {
  slug: "european-summer-of-code",
  name: "European Summer of Code",
  shortName: "ESoC",
  tagline:
    "Program that funds interns to work on applied AI and open source research projects with European hubs.",
  shortDescription:
    "Program that funds interns to work on applied AI and open source research projects with European hubs.",
  websiteUrl: "https://www.esoc.dev/",
  tags: ["open source", "ai", "research", "paid", "europe"],
  region: "europe",
  status: "active",
  isPaid: true,
  duration: "About 3 months per project",
  stipendSummary: "Stipend provided by host organization; amount varies by project",
  timelineSummary:
    "Projects released in batches around Mar to Apr; each project then runs for roughly three months",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
European Summer of Code funds interns to work on applied AI and open source research projects. It focuses on connecting contributors with European organizations and research hubs.

**Duration:** About 3 months per project  
**Stipend:** Stipend provided by host organization; amount varies by project  
**Extra notes:** Strong focus on applied AI and research outcomes.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are an early-career developer or student  
- You are interested in AI and research  
- You want to work with European organizations (though participation is often worldwide)  

Keep in mind:

- Strong focus on applied AI and research outcomes.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
Projects are typically released in batches around **March to April**. Each project then runs for roughly **3 months**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **European Summer of Code**:

1. Brush up on your AI and machine learning knowledge.  
2. Review the list of participating organizations and their research areas.  
3. Prepare a portfolio or resume highlighting relevant projects.  
4. Be ready to discuss your technical skills and research interests.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Creating a profile  
- Applying to specific projects  
- Interviewing with host organizations  
- Accepted interns working with a mentor on defined goals  

Check the official website for current project listings and deadlines.
      `.trim(),
    },
  ],
  seo: {
    title: "European Summer of Code - AI and Open Source Research",
    description:
      "European Summer of Code connects interns with European organizations for applied AI and open source research projects.",
  },
};
