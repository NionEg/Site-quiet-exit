import { createRouter, publicQuery } from "./middleware";
import { authRouter } from "./routers/auth";
import { courseRouter } from "./routers/course";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  course: courseRouter,
});

export type AppRouter = typeof appRouter;
