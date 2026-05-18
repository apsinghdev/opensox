"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterInputStore } from "@/store/useFilterInputStore";
import clsx from "clsx";

export default function Filter({
  filterName,
  filters,
  onClick,
  allowMultiple = false,
}: {
  filterName: string;
  filters: string[];
  onClick?: () => void;
  allowMultiple?: boolean;
}) {
  const { updateFilters, updateMultipleFilters, filters: currentFilters } = useFilterInputStore();

  const recordFilterInput = (filter: string) => {
    if (allowMultiple) {
      // Handle multiple selection for Tech stack
      const currentSelected = (currentFilters[filterName] as string[]) || [];
      const isSelected = currentSelected.includes(filter);

      let newSelected: string[];
      if (isSelected) {
        // Remove from selection
        newSelected = currentSelected.filter((item) => item !== filter);
      } else {
        // Add to selection
        newSelected = [...currentSelected, filter];
      }

      updateMultipleFilters(filterName, newSelected);
    } else {
      // Handle single selection (original behavior)
      const inputData: { [key: string]: string } = {};
      inputData[filterName] = filter;
      updateFilters(inputData);
    }
  };

  const isChecked = (filter: string): boolean => {
    if (allowMultiple) {
      const currentSelected = (currentFilters[filterName] as string[]) || [];
      return currentSelected.includes(filter);
    }
    return false;
  };

  const triggerClasses = clsx("text-sm font-medium", {
    "text-slate-300": ["Hire contributors", "Funding", "Trending"].includes(
      filterName
    ),
  });

  return (
    <div onClick={onClick}>
      <AccordionItem value={filterName} className="px-6 border-none">
        <AccordionTrigger className={triggerClasses}>
          <span className="text-sm font-medium text-white">{filterName}</span>
        </AccordionTrigger>
        <AccordionContent className="pt-1 pb-3">
          {allowMultiple ? (
            <div className="space-y-3">
              {filters.map((filter) => (
                <div key={filter} className="flex items-center space-x-3">
                  <Checkbox
                    id={filter}
                    checked={isChecked(filter)}
                    onCheckedChange={() => recordFilterInput(filter)}
                    className="border-[#28282c] bg-[#141418] text-ox-purple transition data-[state=checked]:border-ox-purple data-[state=checked]:bg-ox-purple/20 data-[state=checked]:ring-2 data-[state=checked]:ring-ox-purple/50"
                  />
                  <Label
                    htmlFor={filter}
                    onClick={() => recordFilterInput(filter)}
                    className="text-sm text-zinc-300 cursor-pointer transition-colors"
                  >
                    {filter}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <RadioGroup className="space-y-3">
              {filters.map((filter) => (
                <div key={filter} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={filter}
                    id={filter}
                    onClick={() => recordFilterInput(filter)}
                    className="border-[#28282c] bg-[#141418] text-ox-purple transition data-[state=checked]:border-ox-purple data-[state=checked]:bg-ox-purple/20 data-[state=checked]:ring-2 data-[state=checked]:ring-ox-purple/50"
                  />
                  <Label
                    htmlFor={filter}
                    onClick={() => recordFilterInput(filter)}
                    className="text-sm text-zinc-300 cursor-pointer transition-colors"
                  >
                    {filter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
