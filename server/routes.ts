import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTrainingseinheitSchema, insertSpielerSchema } from "@shared/schema";
import { z } from "zod";

/**
 * Registriert alle API-Endpunkte für das Trainingsbarometer
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Spieler-Endpunkte
  app.get('/api/spieler', async (req, res) => {
    try {
      const allPlayers = await storage.getAllPlayers();
      res.json(allPlayers);
    } catch (error) {
      console.error('Fehler beim Abrufen der Spieler:', error);
      res.status(500).json({ error: "Fehler beim Abrufen der Spieler" });
    }
  });
  
  app.post('/api/spieler', async (req, res) => {
    try {
      const data = insertSpielerSchema.parse(req.body);
      const player = await storage.createPlayer(data);
      res.status(201).json({ message: "Spieler erfolgreich gespeichert", player });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Ungültige Daten", details: error.errors });
      } else {
        console.error('Fehler beim Speichern des Spielers:', error);
        res.status(500).json({ error: "Fehler beim Speichern des Spielers" });
      }
    }
  });

  // Trainingseinheiten-Endpunkte
  app.get('/api/trainingseinheiten', async (req, res) => {
    try {
      const trainingSessions = await storage.getAllTrainingSessions();
      res.json(trainingSessions);
    } catch (error) {
      console.error('Fehler beim Abrufen der Trainingseinheiten:', error);
      res.status(500).json({ error: "Fehler beim Abrufen der Trainingseinheiten" });
    }
  });
  
  app.post('/api/trainingseinheiten', async (req, res) => {
    try {
      // Validieren der Eingabe mit Zod-Schema
      const validatedData = insertTrainingseinheitSchema.parse(req.body);
      
      // Überprüfen, ob erfasstVon Feld vorhanden ist - falls nicht, setzen wir default auf 1 (erster Trainer)
      if (!validatedData.erfasstVon) {
        validatedData.erfasstVon = 1;
      }
      
      // Speichern der Trainingseinheit
      const session = await storage.createTrainingSession(validatedData);
      
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

  // Trainingsarten-Endpunkte
  app.get('/api/trainingsarten', async (req, res) => {
    try {
      const trainingTypes = await storage.getAllTrainingTypes();
      res.json(trainingTypes);
    } catch (error) {
      console.error('Fehler beim Abrufen der Trainingsarten:', error);
      res.status(500).json({ error: "Fehler beim Abrufen der Trainingsarten" });
    }
  });

  // Statistik-Endpunkte
  app.get('/api/statistik', async (req, res) => {
    try {
      // Sammeln aller Trainingseinheiten
      const trainingSessions = await storage.getAllTrainingSessions();
      
      // Berechnung der Statistiken
      const anzahlTrainingseinheiten = trainingSessions.length;
      
      // Durchschnittliche Bewertung (Leistung) berechnen
      let summeBewertungen = 0;
      if (anzahlTrainingseinheiten > 0) {
        summeBewertungen = trainingSessions.reduce((sum, session) => sum + session.leistungsbewertung, 0);
      }
      const durchschnittlicheBewertung = anzahlTrainingseinheiten > 0 
        ? Math.round((summeBewertungen / anzahlTrainingseinheiten) * 10) / 10
        : 0;
      
      // Antwort senden
      res.json({
        trainingseinheiten: anzahlTrainingseinheiten,
        durchschnittlicheBewertung,
        trainingszeit: anzahlTrainingseinheiten * 90 // Annahme: 90 Minuten pro Training
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Statistiken:', error);
      res.status(500).json({ error: "Fehler beim Abrufen der Statistiken" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
