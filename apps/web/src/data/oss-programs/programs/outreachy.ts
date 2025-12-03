import type { Program } from "../types";

export const outreachy: Program = {
  slug: "outreachy",
  name: "Outreachy",
  tagline:
    "Diversity focused program offering paid remote internships in open source and open science.",
  shortDescription:
    "Diversity focused program offering paid remote internships in open source and open science.",
  websiteUrl: "https://www.outreachy.org/",
  tags: ["open source", "diversity", "paid", "remote", "internship"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "3 months",
  stipendSummary: "7000 USD internship stipend plus travel support for some interns",
  timelineSummary: "Two rounds each year; May to Aug and Dec to Mar",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Outreachy is a diversity-focused program that provides paid remote internships in open source and open science. The goal is to support people from groups underrepresented in the technology industry.

**Duration:** 3 months  
**Stipend:** 7000 USD internship stipend plus travel support for some interns  
**Extra notes:** Strong focus on diversity and inclusion; remote only.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You identify with an underrepresented group in tech  
- You are 18 or older  
- You can commit full-time (40 hours per week) during the internship  
- You are available worldwide  

Keep in mind:

- Strong focus on diversity and inclusion; remote only.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program has two rounds each year:

- **May to August** cohort  
- **December to March** cohort  

Typical duration is **3 months**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Outreachy**:

1. Check the eligibility criteria on the official website to ensure you qualify.  
2. Watch for the initial application opening dates.  
3. Once the contribution period starts, browse the available projects.  
4. Communicate publicly with mentors and ask questions.  
5. Start making small contributions (fixes, documentation) to demonstrate your skills and interest.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Initial eligibility check and application  
- Browsing projects  
- Making small contributions during the application period  
- Submitting application essays  
- Mentors reviewing and selecting interns  

Always check the official website for the most accurate dates and requirements.
      `.trim(),
    },
  ],
  seo: {
    title: "Outreachy - Diversity in Open Source Internships",
    description:
      "Learn about Outreachy, a paid remote internship program for underrepresented groups in open source and open science.",
  },
};
