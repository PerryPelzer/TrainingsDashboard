import { prisma } from './prisma';
import { TrainingseinheitInput, TrainingseinheitOutput } from './types';

/**
 * PrismaStorage-Klasse für die Verwaltung von Trainingseinheiten mit Prisma ORM
 * Diese Klasse bietet Methoden zum Speichern und Abrufen von Trainingseinheiten
 * in einer PostgreSQL-Datenbank
 */
export class PrismaStorage {
  /**
   * Speichert eine neue Trainingseinheit in der Datenbank
   * @param data Die Daten der Trainingseinheit
   * @returns Die erstellte Trainingseinheit mit ID und Zeitstempeln
   */
  async saveTrainingseinheit(data: TrainingseinheitInput): Promise<TrainingseinheitOutput> {
    // Prisma konvertiert automatisch string zu Date, wenn nötig
    const savedTraining = await prisma.trainingseinheit.create({
      data: {
        titel: data.titel,
        beschreibung: data.beschreibung,
        dauer: data.dauer,
        datum: new Date(data.datum), // Konvertieren zu Date-Objekt
      }
    });

    return savedTraining as TrainingseinheitOutput;
  }

  /**
   * Ruft alle Trainingseinheiten aus der Datenbank ab, sortiert nach Datum (absteigend)
   * @returns Eine Liste aller Trainingseinheiten
   */
  async getAllTrainingseinheiten(): Promise<TrainingseinheitOutput[]> {
    const trainings = await prisma.trainingseinheit.findMany({
      orderBy: {
        datum: 'desc' // Sortierung nach Datum absteigend (neueste zuerst)
      }
    });

    return trainings as TrainingseinheitOutput[];
  }

  /**
   * Ruft eine bestimmte Trainingseinheit anhand ihrer ID ab
   * @param id Die ID der abzurufenden Trainingseinheit
   * @returns Die Trainingseinheit oder undefined, wenn keine mit der ID gefunden wurde
   */
  async getTrainingseinheitById(id: number): Promise<TrainingseinheitOutput | null> {
    const training = await prisma.trainingseinheit.findUnique({
      where: { id }
    });

    return training as TrainingseinheitOutput | null;
  }
}

// Erstellen und exportieren einer Singleton-Instanz
export const prismaStorage = new PrismaStorage();