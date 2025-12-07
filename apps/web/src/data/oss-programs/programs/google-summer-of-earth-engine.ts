import type { Program } from "../types";

export const googleSummerOfEarthEngine: Program = {
  slug: "google-summer-of-earth-engine",
  name: "Google Summer of Earth Engine",
  tagline:
    "Pilot program for Indian students to work on Earth Engine based environmental and geospatial projects.",
  shortDescription:
    "Pilot program for Indian students to work on Earth Engine based environmental and geospatial projects.",
  websiteUrl: "https://sites.google.com/view/summerofearthengine/home",
  tags: ["open source", "earth engine", "india", "paid", "research"],
  region: "india",
  status: "historical",
  isPaid: true,
  duration: "About 3 months",
  stipendSummary: "Paid stipend plus certificate and swag",
  timelineSummary:
    "Held in 2019; applications early year; work roughly Jun to Aug",
  sections: [
    {
      id: "what",
      slug: "what-this-program-is-about",
      title: "What this program is about",
      bodyMarkdown: `
Google Summer of Earth Engine was a pilot program that enabled Indian students to work on environmental and geospatial projects using Google Earth Engine. It connected students with research organizations.

**Duration:** About 3 months  
**Stipend:** Paid stipend plus certificate and swag  
**Extra notes:** One time pilot; useful historical example of an open source related program.
      `.trim(),
    },
    {
      id: "is-it-for-you",
      slug: "is-it-for-you",
      title: "Is it for you",
      bodyMarkdown: `
This program was a good match if:

- You were a student or researcher in India  
- You had a background in environmental science or GIS  
- You were interested in using Earth Engine for research  

Keep in mind:

- One time pilot; useful historical example of an open source related program.
      `.trim(),
    },
    {
      id: "when",
      slug: "when-it-happens",
      title: "When it happens",
      bodyMarkdown: `
The program was held in **2019**, running from **June to August**. It is currently considered historical.
      `.trim(),
    },
    {
      id: "how-to-prepare",
      slug: "how-to-prepare",
      title: "How to prepare",
      bodyMarkdown: `
Since this program is historical, you can prepare for similar opportunities by:

1. Learning Google Earth Engine and geospatial analysis.  
2. Exploring environmental data science projects.  
3. Looking for other research-based internships.
      `.trim(),
    },
    {
      id: "application-process",
      slug: "application-process",
      title: "Application process",
      bodyMarkdown: `
The process involved:

- Research organizations proposing projects  
- Students applying to projects  
- Selection and work with host organizations  

This program is not currently active.
      `.trim(),
    },
  ],
  seo: {
    title: "Google Summer of Earth Engine - Historical Program",
    description:
      "Information about the Google Summer of Earth Engine, a historical pilot program for geospatial projects in India.",
  },
};
