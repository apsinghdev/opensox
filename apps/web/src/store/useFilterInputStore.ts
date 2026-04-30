import { create } from "zustand";

interface FilterInputState {
  filters: Record<string, string[]>;
  toggleFilter: (filterName: string, value: string) => void;
  resetFilters: () => void;
}

export const useFilterInputStore = create<FilterInputState>((set) => ({
  filters: {},
  toggleFilter: (filterName, value) =>
    set((state) => {
      const currentValues = state.filters[filterName] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return {
        filters: { ...state.filters, [filterName]: newValues },
      };
    }),
  resetFilters: () => set({ filters: {} }),
}));
