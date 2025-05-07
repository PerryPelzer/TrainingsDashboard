import { Express, Request, Response, NextFunction } from 'express';
import { createServer, Server } from 'http';
import { z } from 'zod';
import { storage } from './storage';
import { prismaStorage } from './prisma-storage';
import { TrainingseinheitInput } from './types';

// Zod-Schema für die Validierung der Trainingseinheit-Eingabe
const trainingseinheitSchema = z.object({
  titel: z.string().min(3, "Titel muss mindestens 3 Zeichen haben"),
  beschreibung: z.string(),
  dauer: z.number().int().positive("Dauer muss eine positive Zahl sein"),
  datum: z.string().or(z.date()) // Akzeptiert sowohl String als auch Date
});

/**
 * Registriert alle API-Endpunkte für das Trainingsbarometer
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Spieler-Endpunkte (nutzen weiterhin die MemStorage)
  app.get('/api/spieler', async (req, res) => {
    try {
      const players = await storage.getAllPlayers();
      res.json(players);
    } catch (error) {
      console.error('Fehler beim Abrufen der Spieler:', error);
      res.status(500).json({ error: "Fehler beim Abrufen der Spieler" });
    }
  });

  // Trainingsarten-Endpunkte
  app.get('/api/trainingsarten', async (req, res) => {
    try {
      // Wir stellen fest definierte Trainingsarten bereit
      const trainingTypes = [
        { id: 1, name: "Techniktraining", description: "Training der technischen Fähigkeiten" },
        { id: 2, name: "Taktiktraining", description: "Training taktischer Spielzüge und Verständnis" },
        { id: 3, name: "Konditionstraining", description: "Training zur Verbesserung der Ausdauer und Kraft" },
        { id: 4, name: "Spieltraining", description: "Spielsituationen und Anwendung von Techniken im Spiel" }
      ];
      res.json(trainingTypes);
    } catch (error) {
      console.error('Fehler beim Abrufen der Trainingsarten:', error);
      res.status(500).json({ error: "Fehler beim Abrufen der Trainingsarten" });
    }
  });

  // Trainingseinheiten-Endpunkte (nutzen die neue PrismaStorage)
  app.get('/api/trainingseinheiten', async (req, res) => {
    try {
      const trainingSessions = await prismaStorage.getAllTrainingseinheiten();
      res.json(trainingSessions);
    } catch (error) {
      console.error('Fehler beim Abrufen der Trainingseinheiten:', error);
      res.status(500).json({ error: "Fehler beim Abrufen der Trainingseinheiten" });
    }
  });
  
  app.post('/api/trainingseinheiten', async (req, res) => {
    try {
      // Validieren der Eingabe mit Zod-Schema
      const validatedData = trainingseinheitSchema.parse(req.body);
      
      // Speichern der Trainingseinheit mit Prisma
      const session = await prismaStorage.saveTrainingseinheit(validatedData as TrainingseinheitInput);
      
      // Erfolgreiche Antwort
      res.status(201).json({ 
        message: "Trainingseinheit erfolgreich gespeichert", 
        session 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Bei Validierungsfehlern genaue Fehlerinformationen zurückgeben
        res.status(400).json({ 
          error: "Ungültige Daten", 
          details: error.errors 
        });
      } else {
        // Bei sonstigen Fehlern
        console.error('Fehler beim Speichern der Trainingseinheit:', error);
        res.status(500).json({ error: "Fehler beim Speichern der Trainingseinheit" });
      }
    }
  });

  // Globale Fehlerbehandlung
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unbehandelte Ausnahme:', err);
    res.status(500).json({ error: "Interner Serverfehler" });
  });

  const httpServer = createServer(app);
  return httpServer;
}