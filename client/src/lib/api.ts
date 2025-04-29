/**
 * Einfache API-Hilfsfunktionen für das Trainingsbarometer
 */

/**
 * Eine einfache Funktion zum Senden einer API-Anfrage
 * @param url - Die API-URL
 * @param method - Die HTTP-Methode (GET, POST, etc.)
 * @param data - Optional: Daten für POST/PUT-Anfragen
 * @returns Gibt die geparste JSON-Antwort zurück
 */
export async function fetchApi<T = any>(
  url: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Für Session-Cookies
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  // Fehlerbehandlung
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Ein unbekannter Fehler ist aufgetreten');
  }

  // Leere Antwort bei 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

/**
 * Lädt alle Spieler über die API
 * @returns Ein Array von Spielern
 */
export async function getSpieler() {
  return fetchApi('/api/spieler');
}

/**
 * Erstellt eine neue Trainingseinheit
 * @param data Die Daten der Trainingseinheit
 * @returns Die erstellte Trainingseinheit
 */
export async function createTrainingseinheit(data: {
  datum: string;
  trainingsart: string;
  spielerId: number;
  leistungsbewertung: number;
  einsatz: number;
  fitness: number;
  anmerkungen?: string;
  erfasstVon?: number;
}) {
  return fetchApi('/api/trainingseinheiten', 'POST', data);
}

/**
 * Lädt alle Trainingseinheiten über die API
 * @returns Ein Array von Trainingseinheiten
 */
export async function getTrainingseinheiten() {
  return fetchApi('/api/trainingseinheiten');
}