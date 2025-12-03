// src/data/oss-programs/index.ts
import type { Program } from "./types";
import { googleSummerOfCode } from "./programs/google-summer-of-code";
import { outreachy } from "./programs/outreachy";
import { mlhFellowship } from "./programs/mlh-fellowship";
import { linuxFoundationMentorship } from "./programs/linux-foundation-mentorship";
import { summerOfBitcoin } from "./programs/summer-of-bitcoin";
import { europeanSummerOfCode } from "./programs/european-summer-of-code";
import { girlscriptSummerOfCode } from "./programs/girlscript-summer-of-code";
import { girlscriptWinterOfCode } from "./programs/girlscript-winter-of-code";
import { seasonOfKde } from "./programs/season-of-kde";
import { processingFoundationFellowship } from "./programs/processing-foundation-fellowship";
import { igaliaCodingExperienceProgram } from "./programs/igalia-coding-experience-program";
import { fosseeSummerFellowship } from "./programs/fossee-summer-fellowship";
import { googleSummerOfEarthEngine } from "./programs/google-summer-of-earth-engine";
import { summerOfNix } from "./programs/summer-of-nix";
import { redoxSummerOfCode } from "./programs/redox-summer-of-code";
import { adventOfCode } from "./programs/advent-of-code";
import { openSourcePromotionPlan } from "./programs/open-source-promotion-plan";
import { jgecWinterOfCode } from "./programs/jgec-winter-of-code";
import { openMainframeProjectMentorship } from "./programs/open-mainframe-project-mentorship";
import { linuxKernelMentorship } from "./programs/linux-kernel-mentorship";
import { apertre } from "./programs/apertre";
import { codeForGovtech } from "./programs/code-for-govtech";
import { hacktoberfest } from "./programs/hacktoberfest";
import { cncfMentorship } from "./programs/cncf-mentorship";
import { iiitKalyaniWinterOfCode } from "./programs/iiit-kalyani-winter-of-code";
import { buildForBharatFellowship } from "./programs/build-for-bharat-fellowship";
import { githubCampusExperts } from "./programs/github-campus-experts";
import { twentyFourPullRequests } from "./programs/24-pull-requests";
import { fossasiaCodeheat } from "./programs/fossasia-codeheat";

export const programs: Program[] = [
  googleSummerOfCode,
  outreachy,
  mlhFellowship,
  linuxFoundationMentorship,
  summerOfBitcoin,
  europeanSummerOfCode,
  girlscriptSummerOfCode,
  girlscriptWinterOfCode,
  seasonOfKde,
  processingFoundationFellowship,
  igaliaCodingExperienceProgram,
  fosseeSummerFellowship,
  googleSummerOfEarthEngine,
  summerOfNix,
  redoxSummerOfCode,
  adventOfCode,
  openSourcePromotionPlan,
  jgecWinterOfCode,
  openMainframeProjectMentorship,
  linuxKernelMentorship,
  apertre,
  codeForGovtech,
  hacktoberfest,
  cncfMentorship,
  iiitKalyaniWinterOfCode,
  buildForBharatFellowship,
  githubCampusExperts,
  twentyFourPullRequests,
  fossasiaCodeheat,
];

export function getAllPrograms(): Program[] {
  return programs;
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of programs) {
    for (const tag of p.tags) set.add(tag);
  }
  return Array.from(set).sort();
}
