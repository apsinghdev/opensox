import { useCallback } from "react";
import { FilterProps, RepositoryProps } from "@opensox/shared/types";
import { trpc } from "@/lib/trpc";

type GetProjectsInput = {
  search?: string;
  filters?: FilterProps;
};

export const useGetProjects = () => {
  const utils = trpc.useUtils();

  const func = useCallback(
    async ({
      search,
      filters = {},
    }: GetProjectsInput): Promise<RepositoryProps[]> => {
      const data = await (utils.client.project.getGithubProjects as any).query({
        search,
        filters: filters as any,
        options: {
          sort: "stars" as const,
          order: "desc" as const,
          per_page: 30,
          page: 1,
        },
      });
      return data;
    },
    [utils]
  );
  return func;
};
