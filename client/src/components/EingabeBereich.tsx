import React, { useState, FormEvent, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Spieler } from '@shared/schema';
import { getSpieler, createTrainingseinheit } from '@/lib/api';

export default function EingabeBereich() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [players, setPlayers] = useState<Spieler[]>([]);
  
  const [formData, setFormData] = useState({
    datum: '',
    trainingsart: '',
    spielerId: '',
    leistungsbewertung: '',
    einsatz: '',
    fitness: '',
    anmerkungen: ''
  });

  // Spieler laden
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const fetchedPlayers = await getSpieler();
        setPlayers(fetchedPlayers);
      } catch (err) {
        console.error('Fehler beim Laden der Spieler:', err);
        setError('Spieler konnten nicht geladen werden.');
      }
    };
    
    loadPlayers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Bei Änderungen Fehlermeldung zurücksetzen
    if (error) {
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    // Pflichtfelder prüfen
    if (!formData.datum) {
      setError('Bitte geben Sie ein Datum an.');
      return false;
    }
    if (!formData.trainingsart) {
      setError('Bitte wählen Sie eine Trainingsart aus.');
      return false;
    }
    if (!formData.spielerId) {
      setError('Bitte wählen Sie einen Spieler aus.');
      return false;
    }
    if (!formData.leistungsbewertung || !formData.einsatz || !formData.fitness) {
      setError('Bitte füllen Sie alle Bewertungsfelder aus.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Form validieren
    if (!validateForm()) {
      return;
    }
    
    // Anzeigen, dass die Anfrage verarbeitet wird
    setIsLoading(true);
    setError(null);
    
    try {
      // Bereite die Daten für das API-Format vor
      const apiData = {
        datum: formData.datum,
        trainingsart: formData.trainingsart,
        spielerId: parseInt(formData.spielerId),
        leistungsbewertung: parseInt(formData.leistungsbewertung),
        einsatz: parseInt(formData.einsatz),
        fitness: parseInt(formData.fitness),
        anmerkungen: formData.anmerkungen,
        erfasstVon: 1 // Standardmäßig der erste Trainer
      };

      console.log('Formular wird verarbeitet...', apiData);
      
      // API-Anfrage senden
      await createTrainingseinheit(apiData);
      
      // Erfolgreiche Rückmeldung anzeigen
      toast({
        title: 'Erfolg!',
        description: 'Trainingseinheit erfolgreich erfasst',
      });
      
      // Formular zurücksetzen
      setFormData({
        datum: '',
        trainingsart: '',
        spielerId: '',
        leistungsbewertung: '',
        einsatz: '',
        fitness: '',
        anmerkungen: ''
      });
    } catch (err: any) {
      console.error('Fehler beim Speichern der Trainingseinheit:', err);
      
      // Fehlermeldung anzeigen
      setError(err.message || 'Ein unbekannter Fehler ist aufgetreten.');
      
      toast({
        title: 'Fehler',
        description: 'Die Trainingseinheit konnte nicht gespeichert werden.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="eingabe-bereich" className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Trainingseinheit erfassen</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="datum" className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
              <input 
                type="date" 
                id="datum" 
                value={formData.datum}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="trainingsart" className="block text-sm font-medium text-gray-700 mb-1">Trainingsart</label>
              <select 
                id="trainingsart" 
                value={formData.trainingsart}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="">Bitte auswählen</option>
                <option value="technical">Techniktraining</option>
                <option value="tactical">Taktiktraining</option>
                <option value="fitness">Konditionstraining</option>
                <option value="match">Spieltraining</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="spielerId" className="block text-sm font-medium text-gray-700 mb-1">Spieler</label>
            <select 
              id="spielerId" 
              value={formData.spielerId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              disabled={isLoading}
            >
              <option value="">Spieler auswählen</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name} ({player.position})
                </option>
              ))}
            </select>
            {players.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">Spieler werden geladen...</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="leistungsbewertung" className="block text-sm font-medium text-gray-700 mb-1">Leistungsbewertung</label>
              <select 
                id="leistungsbewertung" 
                value={formData.leistungsbewertung}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="">Auswählen</option>
                <option value="5">Hervorragend (5)</option>
                <option value="4">Gut (4)</option>
                <option value="3">Durchschnittlich (3)</option>
                <option value="2">Verbesserungswürdig (2)</option>
                <option value="1">Ungenügend (1)</option>
              </select>
            </div>
            <div>
              <label htmlFor="einsatz" className="block text-sm font-medium text-gray-700 mb-1">Einsatz</label>
              <select 
                id="einsatz" 
                value={formData.einsatz}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="">Auswählen</option>
                <option value="5">Sehr hoch (5)</option>
                <option value="4">Hoch (4)</option>
                <option value="3">Mittel (3)</option>
                <option value="2">Niedrig (2)</option>
                <option value="1">Sehr niedrig (1)</option>
              </select>
            </div>
            <div>
              <label htmlFor="fitness" className="block text-sm font-medium text-gray-700 mb-1">Fitness</label>
              <select 
                id="fitness" 
                value={formData.fitness}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="">Auswählen</option>
                <option value="5">Sehr gut (5)</option>
                <option value="4">Gut (4)</option>
                <option value="3">Normal (3)</option>
                <option value="2">Unterdurchschnittlich (2)</option>
                <option value="1">Schlecht (1)</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 mb-1">Anmerkungen</label>
            <textarea 
              id="anmerkungen" 
              rows={3} 
              value={formData.anmerkungen}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
              placeholder="Beobachtungen, Verbesserungsvorschläge, etc."
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
            >
              Erfassen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
