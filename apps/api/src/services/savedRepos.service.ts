import type { PrismaClient } from "@prisma/client";
import type { ExtendedPrismaClient } from "../prisma.js";
import type { SavedRepo } from "@opensox/shared";

export const savedReposService = {
    /**
     * Get user's saved repos
     */
    async getSavedRepos(
        prisma: ExtendedPrismaClient | PrismaClient,
        userId: string
    ): Promise<SavedRepo[]> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { saved_repos: true },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const savedRepos = user.saved_repos as SavedRepo[] | null;
        return savedRepos || [];
    },

    /**
     * Merge local and server saved repos
     * Resolves conflicts by keeping the newer version (based on savedAt timestamp)
     */
    mergeSavedRepos(local: SavedRepo[], server: SavedRepo[]): SavedRepo[] {
        const merged = new Map<string, SavedRepo>();

        // Add all server repos
        for (const repo of server) {
            merged.set(repo.id, repo);
        }

        // Add or update with local repos (newer wins)
        for (const repo of local) {
            const existing = merged.get(repo.id);
            if (!existing || new Date(repo.savedAt) > new Date(existing.savedAt)) {
                merged.set(repo.id, repo);
            }
        }

        return Array.from(merged.values()).sort(
            (a, b) =>
                new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
        );
    },

    /**
     * Update user's saved repos
     */
    async updateSavedRepos(
        prisma: ExtendedPrismaClient | PrismaClient,
        userId: string,
        action: "add" | "remove" | "replace",
        repos: SavedRepo[]
    ): Promise<SavedRepo[]> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { saved_repos: true },
        });

        if (!user) {
            throw new Error("User not found");
        }

        let currentRepos = (user.saved_repos as SavedRepo[]) || [];
        let updatedRepos: SavedRepo[];

        switch (action) {
            case "add": {
                // Add new repos, skip duplicates
                const existingIds = new Set(currentRepos.map((r) => r.id));
                const newRepos = repos.filter((r) => !existingIds.has(r.id));
                updatedRepos = [...currentRepos, ...newRepos];
                break;
            }

            case "remove": {
                // Remove repos by ID
                const removeIds = new Set(repos.map((r) => r.id));
                updatedRepos = currentRepos.filter((r) => !removeIds.has(r.id));
                break;
            }

            case "replace": {
                // Replace entire list (for sync)
                updatedRepos = repos;
                break;
            }

            default:
                throw new Error(`Invalid action: ${action}`);
        }

        // Enforce maximum 100 saved repos
        if (updatedRepos.length > 100) {
            throw new Error("Maximum 100 saved repos allowed");
        }

        // Update database
        const updated = await prisma.user.update({
            where: { id: userId },
            data: {
                saved_repos: updatedRepos as any, // Cast to satisfy Prisma's Json type
            },
            select: { saved_repos: true },
        });

        return (updated.saved_repos as SavedRepo[]) || [];
    },
};
