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

// Usage:
// console.log(getDateFromPast(7));  // get the date of 7 days ago from today

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
    "Very early": `>=${getDateFromPast(180)}`, // within 6 months
    Early: `>=${getDateFromPast(365)}`, // within this year
    Emerging: `>=${getDateFromPast(913)}`, // within this 2.5 years
    Established: `>=${getDateFromPast(1825)}`, // within last 5 years
  },
  Activity: {
    Highest: `>=${getDateFromPast(0)}`, // within today
    High: `>=${getDateFromPast(7)}`, // within this week
    Normal: `>=${getDateFromPast(30)}`, // within this month
    Low: `>=${getDateFromPast(365)}`, // withing this year
  },
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

export const convertUserInputToApiInput = (
  filter: UserInputFilterProps
): FilterProps => {
  const data: Partial<FilterProps> = {};

  // Handle multiple tech stacks - join with comma for API
  if (filter["Tech stack"] && filter["Tech stack"].length > 0) {
    data.language = filter["Tech stack"].join(",");
  }

  // Handle multiple popularity values - merge ranges (min of mins, max of maxes)
  if (filter.Popularity && filter.Popularity.length > 0) {
    const ranges = filter.Popularity.map(
      (p) => userInputValues.Popularity[p as keyof PopularityProps]
    ).filter(Boolean);
    if (ranges.length > 0) {
      const mins = ranges.map((r) => parseInt(r.min || "0", 10));
      const maxes = ranges.map((r) => (r.max ? parseInt(r.max, 10) : Infinity));
      data.stars = {
        min: String(Math.min(...mins)),
        ...(Math.max(...maxes) !== Infinity && { max: String(Math.max(...maxes)) }),
      };
    }
  }

  // Handle multiple competition values - merge ranges
  if (filter.Competition && filter.Competition.length > 0) {
    const ranges = filter.Competition.map(
      (c) => userInputValues.Competition[c as keyof CompetitionProps]
    ).filter(Boolean);
    if (ranges.length > 0) {
      const mins = ranges.map((r) => parseInt(r.min || "0", 10));
      const maxes = ranges.map((r) => (r.max ? parseInt(r.max, 10) : Infinity));
      data.forks = {
        min: String(Math.min(...mins)),
        ...(Math.max(...maxes) !== Infinity && { max: String(Math.max(...maxes)) }),
      };
    }
  }

  // Handle multiple activity values - use the most recent date (broadest range)
  if (filter.Activity && filter.Activity.length > 0) {
    const dates = filter.Activity.map(
      (a) => userInputValues.Activity[a as keyof ActivityProps]
    ).filter(Boolean);
    if (dates.length > 0) {
      // Find the oldest date (most inclusive)
      const oldestDate = dates.sort()[0];
      data.pushed = oldestDate;
    }
  }

  // Handle multiple stage values - use the oldest date (most inclusive)
  if (filter.Stage && filter.Stage.length > 0) {
    const dates = filter.Stage.map(
      (s) => userInputValues.Stage[s as keyof StageProps]
    ).filter(Boolean);
    if (dates.length > 0) {
      const oldestDate = dates.sort()[0];
      data.created = oldestDate;
    }
  }

  return data as FilterProps;
};

export const convertApiOutputToUserOutput = (
  response: RepositoryProps[],
  filters: UserInputFilterProps
): DashboardProjectsProps[] => {
  const data = response.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    url: item.url,
    avatarUrl: item.owner.avatarUrl,
    totalIssueCount: item.issues.totalCount,
    primaryLanguage: item.primaryLanguage?.name || "Other",
    popularity: filters.Popularity?.join(", ") || "-",
    stage: filters.Stage?.join(", ") || "-",
    competition: filters.Competition?.join(", ") || "-",
    activity: filters.Activity?.join(", ") || "-",
  }));
  return data;
};
