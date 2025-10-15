"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterInputStore } from "@/store/useFilterInputStore";
import clsx from "clsx";
import { useState } from "react";

export default function Filter({
  filterName,
  filters,
  onClick,
}: {
  filterName: string;
  filters: string[];
  onClick?: () => void;
}) {
  const { updateFilters } = useFilterInputStore();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const recordFilterInput = (filter: string) => {
    let updated: string[];

    // Toggle filter selection
    if (selectedFilters.includes(filter)) {
      updated = selectedFilters.filter((f) => f !== filter);
    } else {
      updated = [...selectedFilters, filter];
    }

    setSelectedFilters(updated);
    updateFilters({
      [filterName]: updated,
    });
  };

  const triggerClasses = clsx("text-sm font-medium", {
    "text-slate-500": ["Hire contributors", "Funding", "Trending"].includes(
      filterName
    ),
  });

  return (
    <div onClick={onClick}>
      <AccordionItem value={filterName} className="px-3">
        <AccordionTrigger className={triggerClasses}>
          {filterName}
        </AccordionTrigger>
        <AccordionContent
          className={
            filterName === "Hire contributors" ||
            filterName === "Funding" ||
            filterName === "Trending"
              ? "text-white-100"
              : ""
          }
        >
          <div className="flex flex-col space-y-2">
            {filters.map((filter) => (
              <div key={filter} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filterName}-${filter}`}
                  checked={selectedFilters.includes(filter)}
                  onCheckedChange={() => recordFilterInput(filter)}
                />
                <Label
                  htmlFor={`${filterName}-${filter}`}
                  className="cursor-pointer"
                >
                  {filter}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
