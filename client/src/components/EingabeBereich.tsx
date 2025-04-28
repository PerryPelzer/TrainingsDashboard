import React, { useState, FormEvent } from 'react';

export default function EingabeBereich() {
  const [formData, setFormData] = useState({
    datum: '',
    trainingsart: '',
    spieler: '',
    leistungsbewertung: '',
    einsatz: '',
    fitness: '',
    anmerkungen: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: API Endpunkte für die Speicherung der Trainingsdaten implementieren
    console.log('Formular wird verarbeitet...', formData);
    alert('Trainingseinheit erfolgreich erfasst!');
    
    // Formular zurücksetzen
    setFormData({
      datum: '',
      trainingsart: '',
      spieler: '',
      leistungsbewertung: '',
      einsatz: '',
      fitness: '',
      anmerkungen: ''
    });
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
            <label htmlFor="spieler" className="block text-sm font-medium text-gray-700 mb-1">Spieler</label>
            <select 
              id="spieler" 
              value={formData.spieler}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="">Spieler auswählen</option>
              <option value="player1">Max Müller</option>
              <option value="player2">Thomas Schmidt</option>
              <option value="player3">Lukas Weber</option>
              <option value="player4">Felix Becker</option>
            </select>
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
