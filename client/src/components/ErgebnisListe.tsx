import React, { useState } from 'react';

export default function ErgebnisListe() {
  const [selectedSpieler, setSelectedSpieler] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSpielerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpieler(e.target.value);
  };

  const handleFilterClick = () => {
    console.log('Filter anwenden:', selectedSpieler);
    // TODO: API Endpunkt zum Filtern der Ergebnisse implementieren
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
          >
            <option value="all">Alle Spieler</option>
            <option value="player1">Max Müller</option>
            <option value="player2">Thomas Schmidt</option>
            <option value="player3">Lukas Weber</option>
            <option value="player4">Felix Becker</option>
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
                Zeige <span className="font-medium">0</span> von <span className="font-medium">0</span> Einträgen
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
