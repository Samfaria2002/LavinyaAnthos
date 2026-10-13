import { boolean, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const gardenMessages = pgTable("garden_messages", {
  id: serial("id").primaryKey(),
  message: varchar("message", { length: 280 }).notNull(),
  flower: varchar("flower", { length: 40 }).notNull().default("margarida"),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const exhibitionMemories = pgTable("exhibition_memories", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 120 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  eventDate: timestamp("event_date", { withTimezone: true }),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
