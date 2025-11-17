import { create } from "zustand";

interface FilterInputState {
  filters: object;
  updateFilters: (newFilter: Record<string, string>) => void;
  updateMultipleFilters: (filterName: string, values: string[]) => void;
  resetFilters: () => void;
}

export const useFilterInputStore = create<FilterInputState>((set) => ({
  filters: {},
  updateFilters: (newFilter) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilter },
    })),
  updateMultipleFilters: (filterName, values) =>
    set((state) => ({
      filters: { ...state.filters, [filterName]: values },
    })),
  resetFilters: () => set({ filters: {} }),
}));
