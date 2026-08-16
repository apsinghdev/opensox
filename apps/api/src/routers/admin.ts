import {
  router,
  protectedProcedure,
  adminProcedure,
  isAdminEmail,
  type ProtectedContext,
} from "../trpc.js";
import { adminService } from "../services/admin.service.js";
import { newsletterService } from "../services/newsletter.service.js";

export const adminRouter = router({
  isAdmin: protectedProcedure.query(({ ctx }) => {
    return isAdminEmail((ctx as ProtectedContext).user.email);
  }),

  stats: adminProcedure.query(async ({ ctx }) => {
    return adminService.getStats(ctx.db.prisma);
  }),

  newsletterList: adminProcedure.query(async ({ ctx }) => {
    return newsletterService.adminList(ctx.db.prisma);
  }),
});
