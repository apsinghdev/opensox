"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useFilterInputStore } from "@/store/useFilterInputStore";

export default function Filter({
  filterName,
  filters,
}: {
  filterName: string;
  filters: string[];
}) {
  const { updateFilters } = useFilterInputStore();
  const inputData: { [key: string]: string } = {};
  const recordFilterInput = (filter: string) => {
    inputData[filterName] = filter;
    updateFilters(inputData);
  };

  return (
    <AccordionItem value={filterName} className="px-5 border-none">
      <AccordionTrigger className="py-2.5 text-sm font-medium">
        <span className="text-sm font-medium text-white">{filterName}</span>
      </AccordionTrigger>
      <AccordionContent className="pt-0 pb-2">
        <RadioGroup className="space-y-2 p-1">
          {filters.map((filter, index) => {
            const optionId = `${filterName}-${filter}-${index}`
              .replace(/[^a-zA-Z0-9]+/g, "-")
              .toLowerCase();
            return (
              <div key={optionId} className="flex items-center space-x-2.5 py-0.5">
                <RadioGroupItem
                  value={filter}
                  id={optionId}
                  onClick={() => recordFilterInput(filter)}
                  className="shrink-0 border-[#28282c] bg-[#141418] text-ox-purple transition data-[state=checked]:border-ox-purple data-[state=checked]:bg-ox-purple/20 data-[state=checked]:ring-2 data-[state=checked]:ring-ox-purple/50"
                />
                <Label
                  htmlFor={optionId}
                  onClick={() => recordFilterInput(filter)}
                  className="text-sm text-zinc-300 cursor-pointer transition-colors"
                >
                  {filter}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
}
