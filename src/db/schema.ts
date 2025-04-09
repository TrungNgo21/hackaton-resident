import { pgTable, varchar, integer, text, uuid } from "drizzle-orm/pg-core";

export const properties = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  district: varchar("district", { length: 255 }).notNull(),
  place: varchar("place", { length: 255 }).notNull(),
  img: text("img").notNull(),
  electricity: integer("electricity").notNull(),
  wifi: integer("wifi").notNull(),
  waterUnit: varchar("water_unit", { length: 2 }).notNull(),
  waterPricePerUnit: integer("water_price_per_unit").notNull(),
});

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
