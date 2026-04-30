"use client";

import { useProjectsData } from "@/store/useProjectsDataStore";
import ProjectsContainer from "./ProjectsContainer";
import { useRenderProjects } from "@/store/useRenderProjectsStore";
import { useLoading } from "@/store/useLoadingStore";
import { useProjectsNotFoundStore } from "@/store/useProjectsFoundStore";
import { ErrMsg } from "../ui/ErrMsg";
import SpinnerElm from "../ui/SpinnerElm";
import { usePathname } from "next/navigation";
import ProjectsSearchController from "./ProjectSearchController";

export default function DashboardContainer() {
  const { renderProjects } = useRenderProjects();
  const { data } = useProjectsData();
  
  const { loading } = useLoading();
  const { projectsNotFound } = useProjectsNotFoundStore();
  const pathname = usePathname();

  const isProjectsPage = pathname === "/dashboard/projects";

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="w-full h-full">
        {isProjectsPage && (
          <div className="px-8 pt-6">
            <ProjectsSearchController />
          </div>
        )}

        {renderProjects && !loading && (
          <div className={isProjectsPage ? "px-8 pt-4" : ""}>
            <ProjectsContainer projects={data}></ProjectsContainer>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <SpinnerElm text={"loading cool projects for you..."}></SpinnerElm>
          </div>
        )}

        {projectsNotFound && !loading && (
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <ErrMsg
              text={
                "No projects were found matching the selected filters. Please adjust the filters and try again."
              }
            ></ErrMsg>
          </div>
        )}
      </div>
    </div>
  );
}
