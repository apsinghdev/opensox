"use client";

import React, { Suspense, useEffect } from "react";
import { useProjectTitleStore } from "@/store/useProjectTitleStore";
import { useProjectsData } from "@/store/useProjectsDataStore";
import { useRenderProjects } from "@/store/useRenderProjectsStore";
import { projectsOfTheWeek } from "@/utils/config";

import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = React.lazy(() => import("../page"));

const Home = () => {
  const { setRenderProjects } = useRenderProjects();
  const { setData } = useProjectsData();
  const { setProjectTitle } = useProjectTitleStore();

  useEffect(() => {
    const initializeState = () => {
      setData(projectsOfTheWeek);
      setRenderProjects(true);
      setProjectTitle("Featured projects");
    };

    initializeState();
  }, [setData, setRenderProjects, setProjectTitle]);

  return (
    <Suspense
          fallback={
            <div className="py-20 text-center text-lg text-neutral-400">
              <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
          }
        >
      <Dashboard />
    </Suspense>
  );
};

export default Home;
