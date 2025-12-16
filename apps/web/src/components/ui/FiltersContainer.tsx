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
      const response = await getProjects( {filters: modifiedFilters});
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
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => toggleShowFilters()}
      />

      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] flex flex-col bg-[#0c0c0d] shadow-2xl transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1d]">
          <h1 className="text-lg font-medium text-white">Filters</h1>
          <IconWrapper className="hover:bg-[#1a1a1d] rounded-md transition-colors">
            <XMarkIcon
              className="size-5 text-zinc-400"
              onClick={() => toggleShowFilters()}
            />
          </IconWrapper>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto py-4">
          <Accordion type="multiple" className="space-y-2">
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

        {/* Footer */}
        <div className="p-6 border-t border-[#1a1a1d]">
          <Button
            className="w-full py-6 font-medium text-white bg-ox-purple hover:bg-ox-purple/90 transition-colors"
            onClick={handleSearchProjects}
          >
            Search Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
