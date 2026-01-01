// src/data/oss-programs/index.ts
import { cache } from "react";
import type { Program } from "./types";

// Lazy program loaders - reduces initial bundle and parsing time
const programLoaders: Record<string, () => Promise<{ default?: Program } & Record<string, Program>>> = {
  "google-summer-of-code": () => import("./programs/google-summer-of-code"),
  "outreachy": () => import("./programs/outreachy"),
  "mlh-fellowship": () => import("./programs/mlh-fellowship"),
  "linux-foundation-mentorship": () => import("./programs/linux-foundation-mentorship"),
  "summer-of-bitcoin": () => import("./programs/summer-of-bitcoin"),
  "european-summer-of-code": () => import("./programs/european-summer-of-code"),
  "girlscript-summer-of-code": () => import("./programs/girlscript-summer-of-code"),
  "girlscript-winter-of-code": () => import("./programs/girlscript-winter-of-code"),
  "season-of-kde": () => import("./programs/season-of-kde"),
  "processing-foundation-fellowship": () => import("./programs/processing-foundation-fellowship"),
  "igalia-coding-experience-program": () => import("./programs/igalia-coding-experience-program"),
  "fossee-summer-fellowship": () => import("./programs/fossee-summer-fellowship"),
  "google-summer-of-earth-engine": () => import("./programs/google-summer-of-earth-engine"),
  "summer-of-nix": () => import("./programs/summer-of-nix"),
  "redox-summer-of-code": () => import("./programs/redox-summer-of-code"),
  "advent-of-code": () => import("./programs/advent-of-code"),
  "open-source-promotion-plan": () => import("./programs/open-source-promotion-plan"),
  "jgec-winter-of-code": () => import("./programs/jgec-winter-of-code"),
  "open-mainframe-project-mentorship": () => import("./programs/open-mainframe-project-mentorship"),
  "linux-kernel-mentorship": () => import("./programs/linux-kernel-mentorship"),
  "apertre": () => import("./programs/apertre"),
  "code-for-govtech": () => import("./programs/code-for-govtech"),
  "hacktoberfest": () => import("./programs/hacktoberfest"),
  "cncf-mentorship": () => import("./programs/cncf-mentorship"),
  "iiit-kalyani-winter-of-code": () => import("./programs/iiit-kalyani-winter-of-code"),
  "build-for-bharat-fellowship": () => import("./programs/build-for-bharat-fellowship"),
  "github-campus-experts": () => import("./programs/github-campus-experts"),
  "24-pull-requests": () => import("./programs/24-pull-requests"),
  "fossasia-codeheat": () => import("./programs/fossasia-codeheat"),
};

// Cache for loaded programs (module-level cache for build-time)
let programsCache: Program[] | null = null;
let tagsCache: string[] | null = null;

// Internal implementation of loadAllPrograms
async function loadAllProgramsImpl(): Promise<Program[]> {
  if (programsCache) return programsCache;

  try {
    const programPromises = Object.entries(programLoaders).map(async ([slug, loader]) => {
      const programModule = await loader();
      // Handle both default export and named exports
      const program = programModule.default || Object.values(programModule).find((exp): exp is Program =>
        typeof exp === 'object' && exp !== null && 'slug' in exp
      );
      if (!program) {
        throw new Error(`Program module for ${slug} has no valid export`);
      }
      return program;
    });

    const programs = await Promise.all(programPromises);
    programsCache = programs;
    return programs;
  } catch (error) {
    // Clear cache on error to allow retry
    programsCache = null;
    throw error;
  }
}

// Wrap with React cache() for request-scoped memoization
// This prevents duplicate loads when called concurrently in Promise.all
export const loadAllPrograms = cache(loadAllProgramsImpl);

export function getAllPrograms(): Program[] {
  if (!programsCache) {
    throw new Error('Programs not loaded. Use await loadAllPrograms() in server components.');
  }
  return programsCache;
}

export async function getProgramBySlug(slug: string): Promise<Program | undefined> {
  const loader = programLoaders[slug];
  if (!loader) return undefined;

  const programModule = await loader();
  const program = programModule.default || Object.values(programModule).find((exp): exp is Program =>
    typeof exp === 'object' && exp !== null && 'slug' in exp
  );
  return program;
}

// Internal implementation of getAllTags
async function getAllTagsImpl(): Promise<string[]> {
  if (tagsCache) return tagsCache;

  try {
    const programs = await loadAllPrograms();
    const set = new Set<string>();
    for (const p of programs) {
      for (const tag of p.tags) set.add(tag);
    }
    const tags = Array.from(set).sort();
    tagsCache = tags;
    return tags;
  } catch (error) {
    // Clear cache on error to allow retry
    tagsCache = null;
    throw error;
  }
}

// Wrap with React cache() for request-scoped memoization
export const getAllTags = cache(getAllTagsImpl);
