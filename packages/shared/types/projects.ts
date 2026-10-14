export type OptionsTypesProps = {
  sort?: "stars";
  order?: "desc";
  per_page?: number;
  page?: number;
};

export type RepositoryProps = {
  id: string;
  name: string;
  description: string;
  url: string;
  owner: {
    avatarUrl: string;
  };
  issues: {
    totalCount: number;
  };
  primaryLanguage: {
    name: string;
  };
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
  createdAt: string;
};

export type GraphQLResponseProps = {
  search: {
    nodes: RepositoryProps[];
    repositoryCount: number;
  };
};
