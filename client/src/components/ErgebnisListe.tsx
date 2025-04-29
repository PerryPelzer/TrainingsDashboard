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

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
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
      }
    }

    loadData();
  }, []); // Leere Dependency Array bedeutet: Nur beim ersten Render ausführen

  const handleSpielerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpieler(e.target.value);
  };

  // Filtere Trainingseinheiten nach ausgewähltem Spieler
  const filteredTrainingseinheiten = selectedSpieler
    ? trainingseinheiten.filter(t => t.spielerId.toString() === selectedSpieler)
    : trainingseinheiten;

  const getSpielerName = (spielerId: number): string => {
    const spielerObj = spieler.find(s => s.id === spielerId);
    return spielerObj ? spielerObj.name : 'Unbekannt';
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Letzte Trainingseinheiten</h2>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedSpieler}
            onChange={handleSpielerChange}
            className="text-sm border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="">Alle Spieler</option>
            {spieler.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">Laden...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-red-500">{error}</td>
              </tr>
            ) : filteredTrainingseinheiten.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Keine Trainingseinheiten vorhanden
                </td>
              </tr>
            ) : (
              filteredTrainingseinheiten.map((training) => (
                <tr key={training.id}>
                  <td className="px-6 py-4">{formatDate(training.datum)}</td>
                  <td className="px-6 py-4">{getSpielerName(training.spielerId)}</td>
                  <td className="px-6 py-4">{training.trainingsart}</td>
                  <td className="px-6 py-4">
                    <span className={getRatingColorClass(training.leistungsbewertung)}>
                      {training.leistungsbewertung}/5
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getRatingColorClass(training.einsatz)}>
                      {training.einsatz}/5
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getRatingColorClass(training.fitness)}>
                      {training.fitness}/5
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}