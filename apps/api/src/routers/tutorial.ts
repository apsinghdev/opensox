import { router, publicProcedure } from "../trpc.js";
import { z } from "zod";
import { tutorialService, type GenerateTutorialOptions } from "../services/tutorial.service.js";
import { listRepoFiles } from "../services/github-crawler.service.js";
import prismaModule from "../prisma.js";

const { prisma } = prismaModule;

const generateTutorialInputSchema = z.object({
  repoUrl: z.string().url().refine(
    (url) => url.includes("github.com"),
    { message: "Must be a valid GitHub repository URL" }
  ),
  language: z.string().optional().default("english"),
  maxAbstractions: z.number().min(3).max(15).optional().default(8),
  maxFiles: z.number().min(5).max(100).optional().default(30),
  selectedFiles: z.array(z.string()).optional(), // Optional: specific file paths
});

export const tutorialRouter = router({
  /**
   * List files in a repository for the file browser
   */
  listRepoFiles: publicProcedure
    .input(z.object({
      repoUrl: z.string().url().refine(
        (url) => url.includes("github.com"),
        { message: "Must be a valid GitHub repository URL" }
      ),
    }))
    .query(async ({ input }) => {
      const result = await listRepoFiles(input.repoUrl);
      return result;
    }),

  /**
   * Check if a tutorial already exists for a repo URL (shows all public tutorials)
   */
  checkExisting: publicProcedure
    .input(z.object({ repoUrl: z.string() }))
    .query(async ({ input, ctx }) => {
      // @ts-ignore
      const currentUserId = ctx.user?.id || "anonymous";

      const tutorials = await prisma.tutorial.findMany({
        where: {
          repoUrl: input.repoUrl,
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          projectName: true,
          language: true,
          createdAt: true,
          userId: true, 
        },
      });

      return {
        exists: tutorials.length > 0,
        tutorials: tutorials.map(t => ({
          ...t,
          isOwnTutorial: t.userId === currentUserId,
        })),
      };
    }),

  /**
   * Get a specific tutorial by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const tutorial = await prisma.tutorial.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!tutorial) {
        throw new Error("Tutorial not found");
      }

      return tutorial;
    }),

  /**
   * Get all tutorials for the current user
   */
  getUserTutorials: publicProcedure.query(async ({ ctx }) => {
    // @ts-ignore
    const userId = ctx.user?.id || "anonymous";

    const tutorials = await prisma.tutorial.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        projectName: true,
        repoUrl: true,
        language: true,
        createdAt: true,
      },
    });

    return tutorials;
  }),

  /**
   * Generate a tutorial from a GitHub repository and save to DB
   */
  generate: publicProcedure
    .input(generateTutorialInputSchema)
    .mutation(async ({ input, ctx }) => {
      // @ts-ignore
      const userId = ctx.user?.id || "anonymous";

      console.log(`Generating tutorial for: ${input.repoUrl}`);
      
      const options: GenerateTutorialOptions = {
        repoUrl: input.repoUrl,
        language: input.language,
        maxAbstractions: input.maxAbstractions,
        maxFiles: input.maxFiles,
        selectedFiles: input.selectedFiles,
      };
      
      const result = await tutorialService.generateTutorial(options);

      // Save to database
      const tutorial = await prisma.tutorial.create({
        data: {
          userId,
          repoUrl: input.repoUrl,
          projectName: result.projectName,
          language: input.language || "english",
          indexContent: result.indexContent,
          mermaidDiagram: result.mermaidDiagram,
          chapters: result.chapters,
        },
      });

      return {
        success: true,
        id: tutorial.id,
        projectName: result.projectName,
        indexContent: result.indexContent,
        chapters: result.chapters,
        mermaidDiagram: result.mermaidDiagram,
        createdAt: tutorial.createdAt,
      };
    }),

  /**
   * Delete a tutorial
   */
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // @ts-ignore
      const userId = ctx.user?.id || "anonymous";

      await prisma.tutorial.deleteMany({
        where: {
          id: input.id,
          userId: userId,
        },
      });

      return { success: true };
    }),

  /**
   * Health check for tutorial service
   */
  healthCheck: publicProcedure.query(() => {
    return {
      status: "ok",
      service: "tutorial",
      timestamp: new Date().toISOString(),
    };
  }),
});
