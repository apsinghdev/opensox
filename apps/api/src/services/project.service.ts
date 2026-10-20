import { graphql } from "@octokit/graphql";
import dotenv from "dotenv";
import type {
  FilterProps,
  RepositoryProps,
  GraphQLResponseProps,
  OptionsTypesProps,
} from "@opensox/shared";

dotenv.config();

const getGithubPersonalAccessToken = () => {
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN?.trim();

  if (!token) {
    throw new Error(
      "GITHUB_PERSONAL_ACCESS_TOKEN is required to fetch GitHub projects. Please configure it in apps/api/.env."
    );
  }

  return token;
};

const createGithubClient = () =>
  graphql.defaults({
    headers: {
      authorization: `token ${getGithubPersonalAccessToken()}`,
    },
  });

export const projectService = {
  /**
   * Fetch GitHub repositories based on filters and options
   */
  async fetchGithubProjects(
    filters: Partial<FilterProps> = {},
    options: Partial<OptionsTypesProps> = {}
  ): Promise<RepositoryProps[]> {
    const queryParts: string[] = [];

    if (filters.language) {
      queryParts.push(`language:${filters.language}`);
    }

    if (filters.stars) {
      queryParts.push(`stars:${filters.stars.min}..${filters.stars.max}`);
    }

    if (filters.forks) {
      queryParts.push(`forks:${filters.forks.min}..${filters.forks.max}`);
    }

    if (filters.pushed) {
      queryParts.push(`pushed:${filters.pushed}`);
    }

    if (filters.created) {
      queryParts.push(`created:${filters.created}`);
    }

    // Default fields to filter contributor friendly repos
    queryParts.push(`is:organization`);
    queryParts.push(`is:public`);
    queryParts.push(`fork:true`);

    const searchQueryString = queryParts.join(" ");
    const graphqlWithAuth = createGithubClient();

    const response: GraphQLResponseProps = await graphqlWithAuth(
      `
        query($searchQuery: String!, $first: Int!) {
            search(
                query: $searchQuery,
                type: REPOSITORY,
                first: $first
            ) {
                nodes {
                    ... on Repository {
                        id
                        name
                        description
                        url
                        owner {
                            avatarUrl
                        }
                        issues(states: OPEN) {
                            totalCount
                        }
                        primaryLanguage {
                            name
                        }
                    }
                }
                repositoryCount
            }
        }
    `,
      {
        searchQuery: searchQueryString,
        first: options.per_page || 100,
      }
    );

    return response.search.nodes;
  },
};
