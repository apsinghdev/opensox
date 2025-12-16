import { graphql } from "@octokit/graphql";
import dotenv from "dotenv";
import type {
  FilterProps,
  RepositoryProps,
  GraphQLResponseProps,
  OptionsTypesProps,
} from "@opensox/shared";

dotenv.config();

const GH_PAT = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${GH_PAT}`,
  },
});

export const projectService = {
  /**
   * Fetch GitHub repositories based on filters and options
   */
  async fetchGithubProjects(
    filters: Partial<FilterProps> = {},
    options: Partial<OptionsTypesProps> = {},
    search?: string
  ): Promise<RepositoryProps[]> {
    const queryParts: string[] = [];

    if (search) {
      queryParts.push(`${search} in:name,description`);
    }

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
    // console.log(searchQueryString);

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
    // console.log(response.search.nodes);
    return response.search.nodes;
  },
};
