// these type already exists in the shared package, so we can reuse them in the web and backend packages
// and delete these

export type DateRange = {
  start: string;
  end?: string;
};

export type StarRange = {
  min?: string;
  max?: string;
  custom?: string;
};

export type ForkRange = {
  min?: string;
  max?: string;
};

export type FilterProps = {
  language?: string;
  stars?: StarRange;
  forks?: ForkRange;
  pushed?: string;
  created?: string;
};

export type Owner = {
  avatarUrl: string;
};

export type Issues = {
  totalCount: number;
};

export type PrimaryLanguage = {
  name: string;
};

export type ProjectProps = {
  id: string;
  name: string;
  description: string;
  url: string;
  owner: Owner;
  issues: Issues;
  primaryLanguage: PrimaryLanguage;
};

export type UserInputFilterProps = {
  "Tech stack"?: string;
  Popularity?: string;
  Competition?: string;
  Stage?: string;
  Activity?: string;
  repoName?: string; 
};
