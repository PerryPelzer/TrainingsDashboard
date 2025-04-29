import React, { useState, useEffect } from 'react';
import { getTrainingseinheiten, getSpieler } from '../lib/api';
import { formatDate, getRatingColorClass } from '../lib/utils';
import { Trainingseinheit, Spieler } from '@shared/schema';

export default function ErgebnisListe() {
  const [selectedSpieler, setSelectedSpieler] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [trainingseinheiten, setTrainingseinheiten] = useState<Trainingseinheit[]>([]);
  const [spieler, setSpieler] = useState<Spieler[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lade Trainingseinheiten beim Mounten der Komponente
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Trainingseinheiten laden
        const trainingsData = await getTrainingseinheiten();
        
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
      }
    }
    
    loadData();
  }, []);

  // Filtere Trainingseinheiten nach ausgewähltem Spieler
  const filteredTrainingseinheiten = selectedSpieler && selectedSpieler !== 'all'
    ? trainingseinheiten.filter(t => t.spielerId.toString() === selectedSpieler)
    : trainingseinheiten;

  const handleSpielerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpieler(e.target.value);
  };

  const handleFilterClick = () => {
    console.log('Filter angewandt:', selectedSpieler);
  };
  
  // Hilfsfunktion zur Ermittlung des Spielernamens anhand der ID
  const getSpielerName = (id: number): string => {
    const spielerObj = spieler.find(s => s.id === id);
    return spielerObj ? spielerObj.name : 'Unbekannt';
  };
  
  // Hilfsfunktion zur Übersetzung der Trainingsart
  const getTrainingsartLabel = (art: string): string => {
    const trainingsarten: Record<string, string> = {
      'technical': 'Techniktraining',
      'tactical': 'Taktiktraining',
      'fitness': 'Konditionstraining',
      'match': 'Spieltraining'
    };
    
    return trainingsarten[art] || art;
  };

  return (
    <div id="ergebnis-liste" className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Letzte Trainingseinheiten</h2>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedSpieler}
            onChange={handleSpielerChange}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            disabled={isLoading}
          >
            <option value="all">Alle Spieler</option>
            {spieler.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
          <button 
            onClick={handleFilterClick}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-md transition-colors"
          >
            Filtern
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Datum
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spieler
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trainingsart
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leistung
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Einsatz
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fitness
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Lade-Indikator
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-3"></div>
                    <p className="text-md font-medium">Trainingseinheiten werden geladen...</p>
                  </div>
                </td>
              </tr>
            ) : error ? (
              // Fehleranzeige
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-red-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-md font-medium">Fehler beim Laden der Daten</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </td>
              </tr>
            ) : filteredTrainingseinheiten.length === 0 ? (
              // Keine Daten vorhanden
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-md font-medium">Keine Trainingseinheiten vorhanden</p>
                    <p className="text-sm mt-1">Erfasse neue Trainingseinheiten im Formular oben</p>
                  </div>
                </td>
              </tr>
            ) : (
              // Daten anzeigen
              filteredTrainingseinheiten.map((training) => (
                <tr key={training.id}>
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
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      onClick={() => alert(`Details für Training ${training.id} anzeigen (noch nicht implementiert)`)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-not-allowed opacity-50">
              Zurück
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-not-allowed opacity-50">
              Weiter
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                {!isLoading && (
                  <>
                    Zeige <span className="font-medium">{filteredTrainingseinheiten.length}</span> von <span className="font-medium">{trainingseinheiten.length}</span> Einträgen
                  </>
                )}
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-not-allowed opacity-50">
                  <span className="sr-only">Zurück</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button aria-current="page" className="z-10 bg-primary-light bg-opacity-20 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-not-allowed opacity-50">
                  <span className="sr-only">Weiter</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
