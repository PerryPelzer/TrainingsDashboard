import { pgTable, text, serial, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("trainer"),
});

export const spieler = pgTable("spieler", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  initialen: text("initialen").notNull(),
});

export const trainingseinheiten = pgTable("trainingseinheiten", {
  id: serial("id").primaryKey(),
  datum: date("datum").notNull(),
  trainingsart: text("trainingsart").notNull(),
  spielerId: integer("spieler_id").notNull(),
  leistungsbewertung: integer("leistungsbewertung").notNull(),
  einsatz: integer("einsatz").notNull(),
  fitness: integer("fitness").notNull(),
  anmerkungen: text("anmerkungen"),
  erfasstVon: integer("erfasst_von").notNull(),
  erfasstAm: timestamp("erfasst_am").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  role: true,
});

export const insertSpielerSchema = createInsertSchema(spieler).pick({
  name: true,
  position: true,
  initialen: true,
});

export const insertTrainingseinheitSchema = createInsertSchema(trainingseinheiten).pick({
  datum: true,
  trainingsart: true,
  spielerId: true,
  leistungsbewertung: true,
  einsatz: true,
  fitness: true,
  anmerkungen: true,
  erfasstVon: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSpieler = z.infer<typeof insertSpielerSchema>;
export type Spieler = typeof spieler.$inferSelect;

export type InsertTrainingseinheit = z.infer<typeof insertTrainingseinheitSchema>;
export type Trainingseinheit = typeof trainingseinheiten.$inferSelect;
