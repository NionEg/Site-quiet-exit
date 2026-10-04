import { randomBytes } from "node:crypto";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "../queries/connection";
import { sessions, users } from "../../db/schema";
import { SESSION_COOKIE } from "../context";
import { createRouter, protectedProcedure, publicProcedure } from "../procedures";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 дней

function sessionCookie(token: string): string {
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${COOKIE_MAX_AGE}`,
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

function clearCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export const authRouter = createRouter({
  me: publicProcedure.query(({ ctx }) => ({ user: ctx.user })),

  /** Вход по имени и email: если пользователь есть — входим, если нет — создаём. */
  login: publicProcedure
    .input(
      z.object({
        name: z.string().trim().min(1, "Напишите имя").max(120),
        email: z.string().trim().toLowerCase().email("Похоже, в email опечатка"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      let user: { id: number; name: string; email: string };

      const existing = await db
        .select({ id: users.id, name: users.name, email: users.email })
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (existing[0]) {
        user = existing[0];
        // Обновляем имя, если человек представился иначе
        if (user.name !== input.name) {
          await db.update(users).set({ name: input.name }).where(eq(users.id, user.id));
          user = { ...user, name: input.name };
        }
      } else {
        const result = await db
          .insert(users)
          .values({ name: input.name, email: input.email });
        user = {
          id: Number(result[0].insertId),
          name: input.name,
          email: input.email,
        };
      }

      const token = randomBytes(32).toString("hex");
      await db.insert(sessions).values({ userId: user.id, token });
      ctx.resHeaders.append("Set-Cookie", sessionCookie(token));

      return { user };
    }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const db = getDb();
    const header = ctx.req.headers.get("cookie") ?? "";
    const match = header
      .split(";")
      .map((p) => p.trim())
      .find((p) => p.startsWith(`${SESSION_COOKIE}=`));
    if (match) {
      const token = decodeURIComponent(match.slice(SESSION_COOKIE.length + 1));
      await db.delete(sessions).where(eq(sessions.token, token));
    }
    ctx.resHeaders.append("Set-Cookie", clearCookie());
    return { ok: true };
  }),
});
