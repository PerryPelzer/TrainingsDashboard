import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatierungsfunktionen
export function formatDate(date: string | Date): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("de-DE");
}

// Rating Badge Farben basierend auf Bewertung
export function getRatingColorClass(rating: number): string {
  if (rating >= 4) return "bg-green-100 text-green-800";
  if (rating >= 3) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

// Trainingstyp-Übersetzung
export const trainingTypes = {
  technical: "Techniktraining",
  tactical: "Taktiktraining",
  fitness: "Konditionstraining",
  match: "Spieltraining"
};

// Hilfstypen für strenge Typisierung
export type TrainingType = keyof typeof trainingTypes;
export type Rating = 1 | 2 | 3 | 4 | 5;
