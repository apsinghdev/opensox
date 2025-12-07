import type { Program } from "../types";

export const summerOfNix: Program = {
  slug: "summer-of-nix",
  name: "Summer of Nix",
  tagline:
    "NixOS Foundation program where participants work in remote teams to improve Nix ecosystem and package free and open source software.",
  shortDescription:
    "NixOS Foundation program where participants work in remote teams to improve Nix ecosystem and package free and open source software.",
  websiteUrl: "https://github.com/ngi-nix/summer-of-nix",
  tags: ["open source", "nix", "paid", "remote", "devops"],
  region: "global",
  status: "active",
  isPaid: true,
  duration: "Around 13 weeks",
  stipendSummary:
    "Base stipend about 3000 EUR for EU residents; adjusted by purchasing power parity for other countries",
  timelineSummary:
    "Application period typically Apr to Jun; project work about Jul to Oct",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Summer of Nix is a program organized by the NixOS Foundation. Participants work in remote teams to improve the Nix ecosystem, package free software, and contribute to the Next Generation Internet (NGI) initiative.

**Duration:** Around 13 weeks  
**Stipend:** Base stipend about 3000 EUR for EU residents; adjusted by purchasing power parity for other countries  
**Extra notes:** Remote only; modeled after GSoC but independent; funded via NixOS Foundation and NLnet.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program is a good match if:

- You are interested in Nix and FOSS  
- You have some programming or DevOps experience  
- You enjoy working in a team (mob programming style)  

Keep in mind:

- Remote only; modeled after GSoC but independent.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program typically follows this schedule:

- **Applications:** April to June  
- **Project Work:** July to October  

Typical duration is **13 weeks**.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
To prepare for **Summer of Nix**:

1. Learn the basics of Nix and NixOS.  
2. Try packaging some software using Nix.  
3. Join the Nix community channels.  
4. Demonstrate your ability to work collaboratively.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The application process involves:

- Applying for the program  
- Joining a remote team  
- Working in mob programming style on assigned Nix projects  
- Publishing blog posts and updates  

Check the official repository or website for the latest announcements.
      `.trim(),
    },
  ],
  seo: {
    title: "Summer of Nix - NixOS Foundation Program",
    description:
      "Summer of Nix is a remote program for improving the Nix ecosystem and packaging free software.",
  },
};
