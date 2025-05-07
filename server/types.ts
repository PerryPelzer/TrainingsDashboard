// Gemeinsame Typendefinitionen für die Anwendung

// Input-Typ für Trainingseinheiten (für das Hinzufügen neuer Trainingseinheiten)
export interface TrainingseinheitInput {
  titel: string;
  beschreibung: string;
  dauer: number; // in Minuten
  datum: Date | string;
}

// Output-Typ für Trainingseinheiten (mit zusätzlichen Feldern, die vom System generiert werden)
export interface TrainingseinheitOutput {
  id: number;
  titel: string;
  beschreibung: string;
  dauer: number;
  datum: Date;
  erstelltAm: Date;
  aktualisiertAm: Date;
}