import { z } from "zod";
import { and, count, desc, eq } from "drizzle-orm";
import { getDb } from "../queries/connection";
import { lessonEntries, lessonProgress, triggers } from "../../db/schema";
import { lessonById } from "@contracts/course";
import { createRouter, protectedProcedure, publicProcedure } from "../procedures";

const lessonIdSchema = z.string().refine((v) => lessonById.has(v), "Нет такого урока");

export const courseRouter = createRouter({
  // ---- Прогресс ----

  progress: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb();
    const rows = await db
      .select({ lessonId: lessonProgress.lessonId, completedAt: lessonProgress.completedAt })
      .from(lessonProgress)
      .where(eq(lessonProgress.userId, ctx.user.id));
    return rows;
  }),

  setCompleted: protectedProcedure
    .input(z.object({ lessonId: lessonIdSchema, completed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      if (input.completed) {
        await db
          .insert(lessonProgress)
          .values({ userId: ctx.user.id, lessonId: input.lessonId })
          .onDuplicateKeyUpdate({ set: { completedAt: new Date() } });
      } else {
        await db
          .delete(lessonProgress)
          .where(
            and(
              eq(lessonProgress.userId, ctx.user.id),
              eq(lessonProgress.lessonId, input.lessonId),
            ),
          );
      }
      return { ok: true };
    }),

  // ---- Ответы и рабочие листы ----

  entry: protectedProcedure
    .input(z.object({ lessonId: lessonIdSchema }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const rows = await db
        .select()
        .from(lessonEntries)
        .where(
          and(
            eq(lessonEntries.userId, ctx.user.id),
            eq(lessonEntries.lessonId, input.lessonId),
          ),
        )
        .limit(1);
      return rows[0] ?? null;
    }),

  saveEntry: protectedProcedure
    .input(
      z.object({
        lessonId: lessonIdSchema,
        answer: z.string().max(5000).optional(),
        worksheet: z.record(z.string(), z.string().max(2000)).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .insert(lessonEntries)
        .values({
          userId: ctx.user.id,
          lessonId: input.lessonId,
          answer: input.answer ?? null,
          worksheet: input.worksheet ?? null,
        })
        .onDuplicateKeyUpdate({
          set: {
            answer: input.answer ?? null,
            worksheet: input.worksheet ?? null,
          },
        });
      return { ok: true };
    }),

  // ---- Триггеры (нулевой урок, анонимно) ----

  submitTrigger: publicProcedure
    .input(z.object({ text: z.string().trim().min(2, "Напишите хотя бы пару слов").max(500) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(triggers).values({ text: input.text });
      const [row] = await db.select({ total: count() }).from(triggers);
      return { total: row?.total ?? 0 };
    }),

  triggerStats: publicProcedure.query(async () => {
    const db = getDb();
    const [row] = await db.select({ total: count() }).from(triggers);
    const recent = await db
      .select({ text: triggers.text })
      .from(triggers)
      .orderBy(desc(triggers.id))
      .limit(6);
    return { total: row?.total ?? 0, recent: recent.map((r) => r.text) };
  }),
});
