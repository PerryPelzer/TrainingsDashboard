import React, { useState } from 'react';

export default function Auswertungen() {
  const [selectedSpieler, setSelectedSpieler] = useState('');

  const handleSpielerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpieler(e.target.value);
    // TODO: API Endpunkt für die Datenanalyse implementieren
  };

  return (
    <div id="auswertungen" className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Leistungsanalyse</h2>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Leistungsverlauf (letzten 30 Tage)</h3>
            <select 
              value={selectedSpieler}
              onChange={handleSpielerChange}
              className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="all">Alle Spieler</option>
              <option value="player1">Max Müller</option>
              <option value="player2">Thomas Schmidt</option>
              <option value="player3">Lukas Weber</option>
              <option value="player4">Felix Becker</option>
            </select>
          </div>
          <div className="bg-gray-50 p-4 rounded-md h-64 flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm text-gray-500">Leistungsdaten-Visualisierung</p>
              <p className="text-xs text-gray-400">(Wird mit echten Daten geladen)</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Stärken</h3>
            <div className="flex items-center justify-center h-24 text-sm text-gray-500">
              Keine Daten verfügbar
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Verbesserungspotential</h3>
            <div className="flex items-center justify-center h-24 text-sm text-gray-500">
              Keine Daten verfügbar
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Trainingsempfehlungen</h3>
            <div className="flex items-center justify-center h-24 text-sm text-gray-500">
              Keine Daten verfügbar
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <a href="#" className="text-sm text-primary font-medium hover:underline">Detaillierte Analyse anzeigen</a>
        </div>
      </div>
    </div>
  );
}
