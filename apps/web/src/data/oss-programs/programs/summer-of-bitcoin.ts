import type { Program } from "../types";

export const summerOfBitcoin: Program = {
  slug: "summer-of-bitcoin",
  name: "Summer of Bitcoin",
  tagline:
    "Global online program that introduces university students to Bitcoin open source development and design.",
  shortDescription:
    "Global online program that introduces university students to Bitcoin open source development and design.",
  websiteUrl: "https://www.summerofbitcoin.org/",
  tags: ["open source", "bitcoin", "crypto", "paid", "remote", "student"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "12 weeks",
  stipendSummary: "Stipend paid in bitcoin; roughly similar to GSoC levels",
  timelineSummary: "Student applications around Jan to Feb; program runs May to Aug",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Summer of Bitcoin is a global online program focused on introducing university students to open source development and design within the Bitcoin ecosystem.

**Duration:** 12 weeks  
**Stipend:** Stipend paid in bitcoin; roughly similar to GSoC levels  
**Extra notes:** Fully remote; focused strictly on Bitcoin and related open source projects.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are an undergraduate or similar level student  
- You have an interest in Bitcoin technology  
- You have good skills in C++, systems programming, or design  

Keep in mind:

- Fully remote; focused strictly on Bitcoin and related open source projects.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program typically follows this schedule:

- **Applications:** January to February  
- **Program Run:** May to August  

Typical duration is **12 weeks**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Summer of Bitcoin**:

1. Learn the basics of Bitcoin and how it works.  
2. Study C++ or other relevant languages used in Bitcoin Core and related projects.  
3. Look at previous projects to understand the scope.  
4. Engage with the community and mentors early on.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Reviewing projects listed by mentors  
- Submitting a proposal for a project  
- Interviews with mentors  
- Selected students working under mentors on Bitcoin projects  

Check the official website for the exact timeline and project list.
      `.trim(),
    },
  ],
  seo: {
    title: "Summer of Bitcoin - Bitcoin Open Source Development",
    description:
      "Summer of Bitcoin introduces university students to open source development and design in the Bitcoin ecosystem.",
  },
};
