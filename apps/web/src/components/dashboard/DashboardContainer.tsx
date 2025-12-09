"use client";

import { useProjectsData } from "@/store/useProjectsDataStore";
import ProjectsContainer from "./ProjectsContainer";
import { useRenderProjects } from "@/store/useRenderProjectsStore";
import { useLoading } from "@/store/useLoadingStore";
import { useProjectsNotFoundStore } from "@/store/useProjectsFoundStore";
import { ErrMsg } from "../ui/ErrMsg";
import SpinnerElm from "../ui/SpinnerElm";
import { usePathname } from "next/navigation";

import DashboardSponsorList from "./DashboardSponsorList";

export default function DashboardContainer() {
  const { renderProjects } = useRenderProjects();
  const { data } = useProjectsData();
  const { loading } = useLoading();
  const { projectsNotFound } = useProjectsNotFoundStore();
  const pathname = usePathname();

  const isProjectsPage = pathname === "/dashboard/projects";

  return (
    <div
      className={`min-h-[calc(100vh-64px)] ${isProjectsPage ? "flex items-center justify-center" : ""}`}
    >
      <div className={`w-full ${!loading ? "h-full" : ""}`}>
        {renderProjects && !loading && (
          <>
            {!isProjectsPage && (
              <div className="px-4 md:px-8 mt-6">
                <DashboardSponsorList />
              </div>
            )}
            <ProjectsContainer projects={data}></ProjectsContainer>
          </>
        )}
        {loading && (
          <div className="flex items-center justify-center h-full">
            <SpinnerElm text={"loading cool projects for you..."}></SpinnerElm>
          </div>
        )}
        {projectsNotFound && !loading && (
          <div className="flex items-center justify-center h-full">
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
