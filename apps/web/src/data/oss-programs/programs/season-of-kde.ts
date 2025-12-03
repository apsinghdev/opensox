import type { Program } from "../types";

export const seasonOfKde: Program = {
  slug: "season-of-kde",
  name: "Season of KDE",
  shortName: "SoK",
  tagline:
    "Mentorship program by KDE community for code and non code projects similar in style to GSoC.",
  shortDescription:
    "Mentorship program by KDE community for code and non code projects similar in style to GSoC.",
  websiteUrl: "https://mentorship.kde.org/sok/",
  tags: ["open source", "kde", "mentorship", "unpaid", "remote"],
  region: "global",
  status: "active",
  isPaid: false,
  duration: "About 3 months",
  stipendSummary: "Unpaid; certificates and KDE swag only",
  timelineSummary: "Most editions run roughly Jan to Apr",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Season of KDE is a mentorship program offered by the KDE community. It is similar in style to Google Summer of Code but includes both code and non-code projects, such as design, documentation, websites, and translation.

**Duration:** About 3 months  
**Stipend:** Unpaid; certificates and KDE swag only  
**Extra notes:** Allows work on design, documentation, websites, translation, and more.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are interested in the KDE ecosystem  
- You are a student or non-student (everyone is welcome)  
- You want to contribute to code or non-code areas like design or translation  

Keep in mind:

- Allows work on design, documentation, websites, translation, and more.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
Most editions run roughly from **January to April**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Season of KDE**:

1. Explore the KDE community and its projects.  
2. Join the KDE mailing lists and chat channels.  
3. Identify a project idea or pick one from the suggestions.  
4. Find a mentor who is willing to guide you.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Proposing a project idea or picking one  
- Getting a mentor to sign on  
- Accepted mentees working with the mentor  
- Receiving a certificate after successful completion  

Check the official website for the latest timeline.
      `.trim(),
    },
  ],
  seo: {
    title: "Season of KDE - KDE Mentorship Program",
    description:
      "Season of KDE offers mentorship for code and non-code contributions to the KDE community.",
  },
};
