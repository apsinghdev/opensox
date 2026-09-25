import { UserInputFilterProps, DashboardProjectsProps } from "@/types";
import { FilterProps, RepositoryProps } from "@opensox/shared/types";

const getDateFromPast = (days: number): string => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const year = pastDate.getFullYear();
  const month = String(pastDate.getMonth() + 1).padStart(2, "0");
  const day = String(pastDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const categorize = (
  value: number,
  ranges: { [key: string]: { min?: string; max?: string } },
): string => {
  for (const [label, range] of Object.entries(ranges)) {
    const min = range.min ? parseInt(range.min) : 0;
    const max = range.max ? parseInt(range.max) : Infinity;
    if (value >= min && value <= max) return label;
  }
  return "Very low";
};

const computePopularity = (stars: number): string => {
  const ranges: { [key: string]: { min?: string; max?: string } } = {
    "Very low": { min: "10", max: "500" },
    Low: { min: "501", max: "1000" },
    Moderate: { min: "1001", max: "2000" },
    High: { min: "2001", max: "5000" },
    "Very high": { min: "5001" },
  };
  return categorize(stars, ranges);
};

const computeCompetition = (forks: number): string => {
  const ranges: { [key: string]: { min?: string; max?: string } } = {
    "Very low": { min: "0", max: "200" },
    Low: { min: "201", max: "500" },
    Moderate: { min: "501", max: "1000" },
    High: { min: "1001", max: "2000" },
    "Very high": { min: "2001" },
  };
  return categorize(forks, ranges);
};

const computeStage = (createdAt: string): string => {
  const created = new Date(createdAt);
  const now = new Date();
  const daysSinceCreation = Math.floor(
    (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (daysSinceCreation <= 180) return "Very early";
  if (daysSinceCreation <= 365) return "Early";
  if (daysSinceCreation <= 913) return "Emerging";
  return "Established";
};

const computeActivity = (pushedAt: string): string => {
  const pushed = new Date(pushedAt);
  const now = new Date();
  const daysSincePush = Math.floor(
    (now.getTime() - pushed.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (daysSincePush <= 0) return "Highest";
  if (daysSincePush <= 7) return "High";
  if (daysSincePush <= 30) return "Normal";
  return "Low";
};

// // USER INPUT EXAMPLE

// const userInput = {
//   "Tech stack": "Python",
//   Popularity: "Low",
//   Competition: "High",
//   Stage: "Very early",
//   Activity: "Normal",
// };

// API INPUT EXAMPLE

// const apiInput = {
//   language: "python",
//   stars: { min: "100", max: "2000" },
//   forks: { min: "50", max: "1000" },
//   pushed: ">=2024-12-08",
//   created: ">=2024-12-12",
// };

interface Range {
  min?: string;
  max?: string;
}

interface PopularityProps {
  "Very low": Range;
  Low: Range;
  Moderate: Range;
  High: Range;
  "Very high": Range;
}

interface CompetitionProps {
  "Very low": Range;
  Low: Range;
  Moderate: Range;
  High: Range;
  "Very high": Range;
}

interface StageProps {
  "Very early": string;
  Early: string;
  Emerging: string;
  Established: string;
}

interface ActivityProps {
  Highest: string;
  High: string;
  Normal: string;
  Low: string;
}

interface UserFilterObjProps {
  Popularity: PopularityProps;
  Competition: CompetitionProps;
  Stage: StageProps;
  Activity: ActivityProps;
}

const userInputValues: UserFilterObjProps = {
  Popularity: {
    "Very low": { min: "10", max: "500" },
    Low: { min: "501", max: "1000" },
    Moderate: { min: "1001", max: "2000" },
    High: { min: "2001", max: "5000" },
    "Very high": { min: "5001" },
  },
  Competition: {
    "Very low": { min: "0", max: "200" },
    Low: { min: "201", max: "500" },
    Moderate: { min: "501", max: "1000" },
    High: { min: "1001", max: "2000" },
    "Very high": { min: "2001" },
  },
  Stage: {
    "Very early": `>=${getDateFromPast(180)}`,
    Early: `>=${getDateFromPast(365)}`,
    Emerging: `>=${getDateFromPast(913)}`,
    Established: `>=${getDateFromPast(1825)}`,
  },
  Activity: {
    Highest: `>=${getDateFromPast(0)}`,
    High: `>=${getDateFromPast(7)}`,
    Normal: `>=${getDateFromPast(30)}`,
    Low: `>=${getDateFromPast(365)}`,
  },
};

export const convertUserInputToApiInput = (
  filter: UserInputFilterProps,
): FilterProps => {
  const data: Partial<FilterProps> = {};

  if (filter["Tech stack"]) {
    data.language = filter["Tech stack"];
  }

  if (filter.Popularity) {
    data.stars =
      userInputValues.Popularity[filter.Popularity as keyof PopularityProps];
  }

  if (filter.Competition) {
    data.forks =
      userInputValues.Competition[filter.Competition as keyof CompetitionProps];
  }

  if (filter.Activity) {
    data.pushed =
      userInputValues.Activity[filter.Activity as keyof ActivityProps];
  }

  if (filter.Stage) {
    data.created = userInputValues.Stage[filter.Stage as keyof StageProps];
  }

  return data as FilterProps;
};

export const convertApiOutputToUserOutput = (
  response: RepositoryProps[],
): DashboardProjectsProps[] => {
  const data = response.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    url: item.url,
    avatarUrl: item.owner.avatarUrl,
    totalIssueCount: item.issues.totalCount,
    primaryLanguage: item.primaryLanguage?.name || "Other",
    popularity: computePopularity(item.stargazerCount),
    stage: computeStage(item.createdAt),
    competition: computeCompetition(item.forkCount),
    activity: computeActivity(item.pushedAt),
  }));
  return data;
};
