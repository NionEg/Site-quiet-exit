import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  json,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sessions = mysqlTable("sessions", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 128 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const lessonProgress = mysqlTable(
  "lesson_progress",
  {
    id: serial("id").primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: varchar("lesson_id", { length: 16 }).notNull(),
    completedAt: timestamp("completed_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("uq_progress_user_lesson").on(t.userId, t.lessonId)],
);

// Ответ на вопрос урока + заполненный рабочий лист (json: { key: value })
export const lessonEntries = mysqlTable(
  "lesson_entries",
  {
    id: serial("id").primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: varchar("lesson_id", { length: 16 }).notNull(),
    answer: text("answer"),
    worksheet: json("worksheet").$type<Record<string, string>>(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("uq_entry_user_lesson").on(t.userId, t.lessonId)],
);

// Анонимные ответы на вопрос нулевого урока («какой у тебя главный триггер»)
export const triggers = mysqlTable("triggers", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
