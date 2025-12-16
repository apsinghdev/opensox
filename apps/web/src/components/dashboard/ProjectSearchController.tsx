"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { convertApiOutputToUserOutput } from "@/utils/converter";
import { useProjectsData } from "@/store/useProjectsDataStore";
import { useLoading } from "@/store/useLoadingStore";
import { useProjectsNotFoundStore } from "@/store/useProjectsFoundStore";
import { useGetProjects } from "@/hooks/useGetProjects";

export default function ProjectsSearchController() {
  const { setData } = useProjectsData();
  const { setLoading } = useLoading();
  const { setProjectsNotFound } = useProjectsNotFoundStore();
  const getProjects = useGetProjects();

  const [input, setInput] = useState("");

  useEffect(() => {
    if (input.length === 0) {
      // Reset to default state when input is cleared
      setProjectsNotFound(false);

      setData([]);
      return;
    }

    if (input.length < 2) return;

    const t = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await getProjects({ search: input });
        const modified = convertApiOutputToUserOutput(res, {});

        if (!res || res.length === 0) {
          setProjectsNotFound(true);
          setData([]);
        } else {
          setProjectsNotFound(false);
          setData(modified);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setProjectsNotFound(true);
        setData([]);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(t);
  }, [input]);
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search open source projects…"
        className="pl-10"
      />
    </div>
  );
}
