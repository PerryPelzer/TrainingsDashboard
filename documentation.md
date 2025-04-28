
# Trainingsbarometer - Technische Dokumentation

## 1. App-Zweck und Zielgruppe

### Zweck
- Digitale Erfassung und Auswertung von Fußballtrainings-Daten
- Unterstützung für Trainer bei der Leistungsdokumentation
- Langfristige Entwicklungsbeobachtung von Spielern

### Zielgruppe
- Hauptnutzer: Trainer und Co-Trainer
- Sekundär: Spieler (für Einsicht in eigene Entwicklung)

## 2. Verwendete Technologien

### Frontend
- React (TypeScript)
- Tailwind CSS für Styling
- Vite als Build-Tool
- Radix UI für Basis-Komponenten
- React Query für API-Kommunikation

### Backend
- Node.js mit Express
- TypeScript
- RESTful API-Architektur

### Datenbank
- PostgreSQL (via Neon.tech)
- Drizzle ORM für Datenbankzugriffe

### Authentifizierung
- Replit Auth (in Vorbereitung)

## 3. Projektstruktur

```
├── client/               # Frontend-Code
│   ├── src/
│   │   ├── components/  # React-Komponenten
│   │   ├── pages/      # Haupt-Seitenkomponenten
│   │   ├── hooks/      # Custom React Hooks
│   │   └── lib/        # Hilfsfunktionen
├── server/              # Backend-Code
│   ├── routes.ts       # API-Endpunkte
│   └── storage.ts      # Datenbankzugriffe
└── shared/             # Gemeinsam genutzte Definitionen
    └── schema.ts       # Datenmodell-Definitionen
```

## 4. Hauptfunktionen & Logik

### Eingabebereich (EingabeBereich.tsx)
- Erfassung neuer Trainingseinheiten
- Bewertung von: Leistung, Einsatz, Fitness
- Zusätzliche Anmerkungen möglich

### Ergebnisliste (ErgebnisListe.tsx)
- Anzeige aller erfassten Trainingseinheiten
- Filtermöglichkeiten nach Spieler/Datum
- Sortierung und Gruppierung

### Auswertungen (Auswertungen.tsx)
- Statistische Übersichten
- Entwicklungsgraphen
- Team- und Spielervergleiche

## 5. Datenmodell

### Spieler (Player)
```typescript
{
  id: number
  name: string
  position: string
  initialen: string
}
```

### Trainingseinheit (Training)
```typescript
{
  id: number
  datum: Date
  trainingsart: string
  spielerId: number
  leistungsbewertung: number
  einsatz: number
  fitness: number
  anmerkungen: string
  erfasstVon: number
  erfasstAm: Date
}
```

## 6. API-Endpunkte

### Training
- GET `/api/trainingseinheiten` - Liste aller Einheiten
- POST `/api/trainingseinheiten` - Neue Einheit erstellen

### Spieler
- GET `/api/spieler` - Liste aller Spieler
- POST `/api/spieler` - Neuen Spieler anlegen

### Statistik
- GET `/api/statistik` - Teamstatistiken abrufen

## 7. Besonderheiten & Erweiterungsmöglichkeiten

### Aktuelle Features
- Responsive Design (Mobile & Desktop)
- Offline-Fähigkeit in Planung
- Echtzeit-Aktualisierungen

### Mögliche Erweiterungen
- Export-Funktion für Daten
- Spieler-Zugänge mit eingeschränkten Rechten
- KI-basierte Entwicklungsprognosen
- Foto/Video-Upload für Trainingsmomente

## 8. Entwicklungshinweise

### Installation & Start
```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### Wichtige Befehle
- `npm run dev` - Startet Entwicklungsumgebung
- `npm run build` - Erstellt Production-Build
- `npm run db:push` - Aktualisiert Datenbankschema

### Entwicklungsumgebung
- Läuft auf Port 5000
- Hot-Reload aktiviert
- TypeScript Checking im Watch-Mode

## 9. Hilfreiche Links & Ressourcen

- [Replit Docs](https://docs.replit.com) - Replit-spezifische Dokumentation
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling-Referenz
- [Drizzle ORM](https://orm.drizzle.team/docs/overview) - Datenbank-ORM Docs

---

*Diese Dokumentation wird kontinuierlich erweitert und aktualisiert.*
