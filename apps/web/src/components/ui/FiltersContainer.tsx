"use client";

import { Button } from "./button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconWrapper } from "./IconWrapper";
import { Accordion } from "./accordion";
import Filter from "./Filter";
import { useFilterStore } from "@/store/useFilterStore";
import { useFilterInputStore } from "@/store/useFilterInputStore";
import { useGetProjects } from "@/hooks/useGetProjects";
import {
  convertUserInputToApiInput,
  convertApiOutputToUserOutput,
} from "@/utils/converter";
import { useRouter } from "next/navigation";
import { useRenderProjects } from "@/store/useRenderProjectsStore";
import { useProjectsData } from "@/store/useProjectsDataStore";
import { useLoading } from "@/store/useLoadingStore";
import { useProjectsNotFoundStore } from "@/store/useProjectsFoundStore";

export default function FiltersContainer() {
  const handleClickWipFilters = () => {
    window.alert("🏗️ Coming very soon! :)");
  };

  const { toggleShowFilters } = useFilterStore();
  const { setRenderProjects } = useRenderProjects();
  const { filters, resetFilters } = useFilterInputStore();
  const { setData, eraseData } = useProjectsData();
  const { setProjectsNotFound } = useProjectsNotFoundStore();
  const getProjects = useGetProjects();
  const { setLoading } = useLoading();
  const router = useRouter();

  const handleSearchProjects = async () => {
    try {
      toggleShowFilters();
      setRenderProjects(false);
      eraseData();
      setLoading(true);
      router.push("/dashboard/projects");
      const modifiedFilters = convertUserInputToApiInput(filters);
      const response = await getProjects(modifiedFilters);
      const projects = response;
      if (!projects) {
        setProjectsNotFound(true);
        return;
      }
      const modifiedProjects = convertApiOutputToUserOutput(projects, filters);
      setData(modifiedProjects);
      setRenderProjects(true);
      resetFilters();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-8 md:top-14 right-4 md:right-2 inset-0 z-50 flex justify-center items-start p-4 lg:p-0">
      <div
        className="fixed inset-0 bg-black/20"
        onClick={() => toggleShowFilters()}
      />
      <div className="w-full max-w-[90%] md:max-w-[400px] lg:w-80 h-[60vh] lg:h-96 flex flex-col rounded-lg border border-ox-gray bg-ox-black-1 relative lg:absolute lg:right-20">
        <div className="flex h-8 lg:h-[10%] border-b border-ox-gray justify-between items-center px-4">
          <h1 className="text-sm text-ox-purple font-semibold">Filters</h1>
          <IconWrapper>
            <XMarkIcon
              className="size-5 lg:size-4 text-ox-purple"
              onClick={() => toggleShowFilters()}
            />
          </IconWrapper>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Accordion type="multiple" className="w-full">
            <Filter
              filterName="Tech stack"
              filters={[
                "Javascript",
                "Typescript",
                "Python",
                "Go",
                "Rust",
                "Java",
                "C#",
                "C++",
                "C",
                "Php",
                "Swift",
                "Kotlin",
                "Ruby",
                "Scala",
                "Html",
                "Elixir",
              ]}
            />
            <Filter
              filterName="Popularity"
              filters={["Very low", "Low", "Moderate", "High", "Very high"]}
            />
            <Filter
              filterName="Competition"
              filters={["Very low", "Low", "Moderate", "High", "Very high"]}
            />
            <Filter
              filterName="Stage"
              filters={["Very early", "Early", "Emerging", "Established"]}
            />
            <Filter
              filterName="Activity"
              filters={["Highest", "High", "Normal", "Low"]}
            />
            <Filter
              filterName="Hire contributors"
              filters={[]}
              onClick={handleClickWipFilters}
            />
            <Filter
              filterName="Funding"
              filters={[]}
              onClick={handleClickWipFilters}
            />
            <Filter
              filterName="Trending"
              filters={[]}
              onClick={handleClickWipFilters}
            />
          </Accordion>
        </div>

        <div className="h-8 lg:h-[10%] border-t border-ox-gray flex items-center px-4 justify-end">
          <Button
            className="font-semibold text-white bg-ox-purple text-[14px] h-6 hover:bg-white hover:text-ox-purple"
            onClick={handleSearchProjects}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
