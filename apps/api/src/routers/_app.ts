import { router, publicProcedure } from "../trpc.js";
import { queryRouter } from "./queries.js";
import { userRouter } from "./user.js";
import { projectRouter } from "./projects.js";
import { authRouter } from "./auth.js";
import { paymentRouter } from "./payment.js";
import { sessionsRouter } from "./sessions.js";
import { testimonialRouter } from "./testimonial.js";
import { modulesRouter } from "./modules.js";
import { refsRouter } from "./refs.js";
import { proProjectsRouter } from "./proProjects.js";
import { adminRouter } from "./admin.js";
import { z } from "zod";

const testRouter = router({
  test: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { message: `Hhhhello, ${input.name ?? "world"}!` };
    }),
});

export const appRouter = router({
  hello: testRouter,
  query: queryRouter,
  user: userRouter,
  project: projectRouter,
  auth: authRouter,
  payment: paymentRouter,
  sessions: sessionsRouter,
  testimonial: testimonialRouter,
  modules: modulesRouter,
  refs: refsRouter,
  proProjects: proProjectsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
