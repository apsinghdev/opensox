import { NewsletterItem } from "@/data/newsletter";
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
    popularity: filters.Popularity ? filters.Popularity : "-",
    stage: filters.Stage ? filters.Stage : "-",
    competition: filters.Competition ? filters.Competition : "-",
    activity: filters.Activity ? filters.Activity : "-",
  }));
  return data;
};

export const getMonthYearOptions = (data: NewsletterItem[]):{ month: string[], year: number[] } => {
  const monthset = new Set<string>();
  const yearset = new Set<number>();
  data.forEach(item => {
    const date = new Date(item.date);
    monthset.add(date.toLocaleString('default', { month: 'long' }));
    yearset.add(date.getFullYear());
  });
  return {
    month: Array.from(monthset),
    year: Array.from(yearset)
  }
}