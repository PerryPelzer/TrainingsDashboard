import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import EingabeBereich from "@/components/EingabeBereich";
import ErgebnisListe from "@/components/ErgebnisListe";
import Auswertungen from "@/components/Auswertungen";
import MobileMenu from "@/components/MobileMenu";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = () => {
    // TODO: Replit Auth einbauen
    console.log('Login-Funktion wird später implementiert');
    setLoggedIn(true);
    setUsername("Trainer Schmidt");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        loggedIn={loggedIn} 
        username={username} 
        onLogin={handleLogin} 
      />
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Mobile Header Navigation */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <div className="font-medium">Dashboard</div>
            <div className="w-6"></div> {/* Spacer to balance the layout */}
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        
        {/* Content Container */}
        <div className="w-full p-4 md:p-6 overflow-auto bg-gray-50">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Übersicht und Verwaltung von Trainingsdaten</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Eingabe-Bereich (Entry Form) */}
            <div className="md:col-span-2">
              <EingabeBereich />
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800">Teamstatistik</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm font-medium text-gray-500 mb-1">Trainingseinheiten</div>
                    <div className="text-2xl font-semibold text-gray-800">0</div>
                    <div className="text-xs text-gray-500">Letzte 30 Tage</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm font-medium text-gray-500 mb-1">Durchschnittliche Bewertung</div>
                    <div className="text-2xl font-semibold text-gray-800">0 / 5</div>
                    <div className="text-xs text-gray-600 flex items-center">
                      <span>Keine Daten vorhanden</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm font-medium text-gray-500 mb-1">Gesamte Trainingszeit</div>
                    <div className="text-2xl font-semibold text-gray-800">0 Std</div>
                    <div className="text-xs text-gray-500">Letzte 30 Tage</div>
                  </div>
                  
                  <div className="mt-4">
                    <a href="#" className="text-sm text-primary font-medium hover:underline">Vollständige Statistik anzeigen</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ergebnis-Liste (Results List) */}
          <ErgebnisListe />
          
          {/* Auswertungen (Analytics Section) */}
          <Auswertungen />
        </div>
      </div>

      <Footer />
    </div>
  );
}
