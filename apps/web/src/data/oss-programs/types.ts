// apps/web/src/data/oss-programs/types.ts

export type ProgramSlug =
  | "google-summer-of-code"
  | "outreachy"
  | "mlh-fellowship"
  | "linux-foundation-mentorship"
  | "summer-of-bitcoin"
  | "european-summer-of-code"
  | "girlscript-summer-of-code"
  | "girlscript-winter-of-code"
  | "season-of-kde"
  | "processing-foundation-fellowship"
  | "igalia-coding-experience-program"
  | "fossee-summer-fellowship"
  | "google-summer-of-earth-engine"
  | "summer-of-nix"
  | "redox-summer-of-code"
  | "advent-of-code"
  | "open-source-promotion-plan"
  | "jgec-winter-of-code"
  | "open-mainframe-project-mentorship"
  | "linux-kernel-mentorship"
  | "apertre"
  | "code-for-govtech"
  | "hacktoberfest"
  | "cncf-mentorship"
  | "iiit-kalyani-winter-of-code"
  | "build-for-bharat-fellowship"
  | "github-campus-experts"
  | "24-pull-requests"
  | "fossasia-codeheat";

export type ProgramSectionId =
  | "what"
  | "is-it-for-you"
  | "when"
  | "how-to-prepare"
  | "application-process";

export type ProgramStatus = "active" | "historical" | "unknown";

export interface ProgramSection {
  id: ProgramSectionId;
  slug: string;
  title: string;
  bodyMarkdown: string;
}

export interface Program {
  slug: ProgramSlug;
  name: string;
  shortName?: string;
  logoUrl?: string;

  tagline: string;
  shortDescription: string;

  websiteUrl: string;

  tags: string[];
  region: "global" | "india" | "europe" | "other";
  status: ProgramStatus;
  isPaid: boolean;

  duration?: string;
  stipendSummary?: string;
  timelineSummary: string;

  sections: ProgramSection[];

  seo: {
    title: string;
    description: string;
  };
}
