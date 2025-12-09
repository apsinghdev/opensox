import { router, publicProcedure } from "../trpc.js";
import { queryRouter } from "./queries.js";
import { userRouter } from "./user.js";
import { projectRouter } from "./projects.js";
import { authRouter } from "./auth.js";
import { paymentRouter } from "./payment.js";
import { z } from "zod";

const testRouter = router({
  test: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { message: `Hhhhello, ${input.name ?? "world"}!` };
    }),
});

import { sponsorRouter } from "./sponsor.js";

export const appRouter = router({
  hello: testRouter,
  query: queryRouter,
  user: userRouter,
  project: projectRouter,
  auth: authRouter,
  payment: paymentRouter,
  sponsor: sponsorRouter,
});

export type AppRouter = typeof appRouter;
