import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SavedRepo } from "@opensox/shared";

interface SavedProjectsState {
    savedProjects: SavedRepo[];
    addProject: (project: SavedRepo) => void;
    removeProject: (id: string) => void;
    toggleProject: (project: SavedRepo) => void;
    clearAllSaved: () => void;
    setAll: (projects: SavedRepo[]) => void;
    importAndValidate: (data: unknown) => { success: boolean; error?: string };
    isSaved: (id: string) => boolean;
}

export const useSavedProjectsStore = create<SavedProjectsState>()(
    persist(
        (set, get) => ({
            savedProjects: [],

            addProject: (project: SavedRepo) =>
                set((state) => {
                    // Check if project already exists
                    const exists = state.savedProjects.some((p) => p.id === project.id);
                    if (exists) return state;

                    return {
                        savedProjects: [...state.savedProjects, project],
                    };
                }),

            removeProject: (id: string) =>
                set((state) => ({
                    savedProjects: state.savedProjects.filter((p) => p.id !== id),
                })),

            toggleProject: (project: SavedRepo) =>
                set((state) => {
                    const exists = state.savedProjects.some((p) => p.id === project.id);
                    if (exists) {
                        return {
                            savedProjects: state.savedProjects.filter(
                                (p) => p.id !== project.id
                            ),
                        };
                    } else {
                        return {
                            savedProjects: [...state.savedProjects, project],
                        };
                    }
                }),

            clearAllSaved: () => set({ savedProjects: [] }),

            setAll: (projects: SavedRepo[]) => set({ savedProjects: projects }),

            importAndValidate: (data: unknown) => {
                // Validate that data is an array
                if (!Array.isArray(data)) {
                    return {
                        success: false,
                        error: "Invalid file format. Expected an array of saved projects.",
                    };
                }

                // Helper to validate if an item matches SavedRepo shape
                const isValidSavedRepo = (item: unknown): item is SavedRepo => {
                    if (typeof item !== "object" || item === null) {
                        return false;
                    }

                    const obj = item as Record<string, unknown>;
                    return (
                        typeof obj.id === "string" &&
                        typeof obj.name === "string" &&
                        typeof obj.url === "string" &&
                        typeof obj.savedAt === "string"
                    );
                };

                // Filter and validate items
                const validProjects = data.filter(isValidSavedRepo);

                if (validProjects.length === 0) {
                    return {
                        success: false,
                        error: "No valid projects found in the file.",
                    };
                }

                // Deduplicate by id (keep first occurrence)
                const seen = new Set<string>();
                const deduped = validProjects.filter((project) => {
                    if (seen.has(project.id)) {
                        return false;
                    }
                    seen.add(project.id);
                    return true;
                });

                // Limit to 100 items
                const limited = deduped.slice(0, 100);

                // Update store
                set({ savedProjects: limited });

                return {
                    success: true,
                    error:
                        limited.length < validProjects.length
                            ? `Imported ${limited.length} projects (limited to 100, ${validProjects.length - limited.length} duplicates removed)`
                            : undefined,
                };
            },

            isSaved: (id: string) => {
                return get().savedProjects.some((p) => p.id === id);
            },
        }),
        {
            name: "oss_saved_repos_v1",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ savedProjects: state.savedProjects }),
        }
    )
);
