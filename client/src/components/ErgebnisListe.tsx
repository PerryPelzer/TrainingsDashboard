import React, { useState, useEffect, useCallback } from 'react';
import { getTrainingseinheiten, getSpieler } from '../lib/api';
import { formatDate, getRatingColorClass, trainingTypes } from '../lib/utils';
import { Trainingseinheit, Spieler } from '@shared/schema';

/**
 * ErgebnisListe Komponente
 * Zeigt eine Tabelle mit allen erfassten Trainingseinheiten an und erlaubt Filterung
 */
export default function ErgebnisListe() {
  // State-Variablen
  const [selectedSpieler, setSelectedSpieler] = useState('');
  const [trainingseinheiten, setTrainingseinheiten] = useState<Trainingseinheit[]>([]);
  const [spieler, setSpieler] = useState<Spieler[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false); // Neue State-Variable für Aktualisierungen
  const [error, setError] = useState<string | null>(null);

  /**
   * Funktion zum Laden der Daten von der API
   * Wird beim Komponenten-Mount und manuellen Aktualisierungen verwendet
   */
  const loadData = useCallback(async (showRefreshIndicator = false) => {
    try {
      // Zeige den richtigen Ladeindikator, je nachdem ob es ein erster oder refreshed Load ist
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      // Trainingseinheiten laden
      const trainingsData = await getTrainingseinheiten();
      console.log('Geladene Trainingseinheiten:', trainingsData);

      // Nach Datum sortieren (neueste zuerst)
      const sortedData = trainingsData.sort((a: Trainingseinheit, b: Trainingseinheit) => {
        return new Date(b.datum).getTime() - new Date(a.datum).getTime();
      });

      setTrainingseinheiten(sortedData);

      // Spieler laden für die Anzeige der Namen
      const spielerData = await getSpieler();
      setSpieler(spielerData);
    } catch (err: any) {
      console.error('Fehler beim Laden der Daten:', err);
      setError(err.message || 'Die Daten konnten nicht geladen werden.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []); // Keine Abhängigkeiten, bleibt stabil

  // Initialer Datenabruf beim Komponenten-Mount
  useEffect(() => {
    loadData();
  }, [loadData]); // Nur einmal ausführen

  /**
   * Handler für den Aktualisieren-Button
   * Löst einen neuen API-Call aus, um aktualisierte Daten zu erhalten
   */
  const handleRefresh = () => {
    loadData(true);
  };

  /**
   * Handler für Änderungen der Spieler-Auswahl
   */
  const handleSpielerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpieler(e.target.value);
  };

  /**
   * Filtert die Trainingseinheiten nach dem ausgewählten Spieler
   */
  const filteredTrainingseinheiten = selectedSpieler
    ? trainingseinheiten.filter(t => t.spielerId.toString() === selectedSpieler)
    : trainingseinheiten;

  /**
   * Ermittelt den Namen eines Spielers anhand seiner ID
   */
  const getSpielerName = (spielerId: number): string => {
    const spielerObj = spieler.find(s => s.id === spielerId);
    return spielerObj ? spielerObj.name : 'Unbekannt';
  };

  /**
   * Konvertiert den Trainingsart-Code in einen lesbaren Namen
   */
  const getTrainingsartLabel = (code: string): string => {
    return trainingTypes[code as keyof typeof trainingTypes] || code;
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Letzte Trainingseinheiten</h2>
        <div className="flex items-center space-x-2">
          {/* Spieler-Filter */}
          <select 
            value={selectedSpieler}
            onChange={handleSpielerChange}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            disabled={isLoading || isRefreshing}
          >
            <option value="">Alle Spieler</option>
            {spieler.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          
          {/* Aktualisieren-Button */}
          <button
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
            className="flex items-center justify-center px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRefreshing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Aktualisiere...
              </>
            ) : (
              <>
                <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Aktualisieren
              </>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Datum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spieler</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trainingsart</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leistung</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Einsatz</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fitness</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Anmerkungen</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Vollständiger Ladeindikator für initiales Laden
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-3"></div>
                    <p className="text-md font-medium">Trainingseinheiten werden geladen...</p>
                  </div>
                </td>
              </tr>
            ) : error ? (
              // Fehleranzeige mit Icon und Fehlermeldung
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-red-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="h-10 w-10 text-red-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-md font-medium">Fehler beim Laden der Daten</p>
                    <p className="text-sm mt-1">{error}</p>
                    <button 
                      onClick={handleRefresh}
                      className="mt-3 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Erneut versuchen
                    </button>
                  </div>
                </td>
              </tr>
            ) : filteredTrainingseinheiten.length === 0 ? (
              // Keine Daten vorhanden
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="h-10 w-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-md font-medium">Keine Trainingseinheiten vorhanden</p>
                    <p className="text-sm mt-1">
                      {selectedSpieler 
                        ? 'Bitte wählen Sie einen anderen Spieler oder erfassen Sie neue Trainingseinheiten' 
                        : 'Erfassen Sie neue Trainingseinheiten im Formular oben'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              // Daten anzeigen
              filteredTrainingseinheiten.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(training.datum)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getSpielerName(training.spielerId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getTrainingsartLabel(training.trainingsart)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingColorClass(training.leistungsbewertung)}`}>
                      {training.leistungsbewertung}/5
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingColorClass(training.einsatz)}`}>
                      {training.einsatz}/5
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingColorClass(training.fitness)}`}>
                      {training.fitness}/5
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {training.anmerkungen || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination und Statistiken */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              {!isLoading && (
                <>
                  {filteredTrainingseinheiten.length === 0 
                    ? 'Keine Einträge gefunden' 
                    : `Zeige ${filteredTrainingseinheiten.length} von ${trainingseinheiten.length} Trainingseinheiten`
                  }
                  {selectedSpieler && spieler.find(s => s.id.toString() === selectedSpieler) && 
                    ` für ${spieler.find(s => s.id.toString() === selectedSpieler)?.name}`}
                </>
              )}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">
              {/* Hinweis zum Memory-Storage und automatischem Reset bei Neustart */}
              <span className="italic">Hinweis: In-Memory-Speicher wird bei Server-Neustart zurückgesetzt</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}