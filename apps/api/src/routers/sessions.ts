import { router, protectedProcedure } from "../trpc.js";
import { sessionService } from "../services/session.service.js";

export const sessionsRouter = router({
  // get all sessions for authenticated paid users
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return await sessionService.getSessions(ctx.db.prisma, userId);
  }),
});

