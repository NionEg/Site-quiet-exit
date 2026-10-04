import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { eq } from "drizzle-orm";
import { getDb } from "./queries/connection";
import { sessions, users } from "../db/schema";

export const SESSION_COOKIE = "tq_session";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
};

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user: SessionUser | null;
};

function readCookie(req: Request, name: string): string | null {
  const header = req.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  let user: SessionUser | null = null;
  const token = readCookie(opts.req, SESSION_COOKIE);
  if (token) {
    try {
      const db = getDb();
      const rows = await db
        .select({ id: users.id, name: users.name, email: users.email })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(eq(sessions.token, token))
        .limit(1);
      user = rows[0] ?? null;
    } catch {
      user = null;
    }
  }
  return { req: opts.req, resHeaders: opts.resHeaders, user };
}
