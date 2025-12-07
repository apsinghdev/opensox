import type { Program } from "../types";

export const girlscriptWinterOfCode: Program = {
  slug: "girlscript-winter-of-code",
  name: "GirlScript Winter of Code",
  tagline:
    "Open source contribution program during winter focused on building educational content and code.",
  shortDescription:
    "Open source contribution program during winter focused on building educational content and code.",
  websiteUrl: "https://gssoc.girlscript.tech/",
  tags: ["open source", "beginner", "unpaid", "remote", "education"],
  region: "global",
  status: "active",
  isPaid: false,
  duration: "About 3 months",
  stipendSummary: "Unpaid; certificates and goodies for active contributors",
  timelineSummary:
    "Usually around Sep to Nov or Dec to Feb; depends on edition",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
GirlScript Winter of Code is an open source contribution program that takes place during the winter. It emphasizes building educational content, tutorials, and documentation along with code contributions.

**Duration:** About 3 months  
**Stipend:** Unpaid; certificates and goodies for active contributors  
**Extra notes:** Emphasis on tutorials, documentation, and learning content along with code.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are a beginner or student  
- You are interested in creating educational content or documentation  
- You want to contribute to open source in a supportive environment  

Keep in mind:

- Emphasis on tutorials, documentation, and learning content along with code.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The schedule varies by edition but usually runs around **September to November** or **December to February**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **GirlScript Winter of Code**:

1. Familiarize yourself with technical writing and documentation standards.  
2. Learn basic Git and GitHub workflows.  
3. Identify domains or technologies you are interested in teaching or documenting.  
4. Connect with mentors and the community.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Registering as a contributor  
- Choosing domains or projects  
- Completing tasks in repositories under mentor guidance  
- Contributions are tracked and ranked  

Check the official website for specific dates and details.
      `.trim(),
    },
  ],
  seo: {
    title: "GirlScript Winter of Code - Open Source Education",
    description:
      "GirlScript Winter of Code focuses on creating educational content and code contributions in an open source environment.",
  },
};
