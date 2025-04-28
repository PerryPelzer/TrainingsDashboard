import { useState } from "react";
import { BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header = ({ toggleMobileMenu }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // TODO: Replit Auth einbauen
    console.log("Login-Funktion wird später implementiert");
    setIsLoggedIn(true);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo und App-Name */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white mr-3">
            <BarChart2 className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold">Trainingsbarometer</h1>
        </div>
        
        {/* Benutzerinfo / Login Platzhalter */}
        <div id="user-info" className="flex items-center">
          {!isLoggedIn ? (
            <Button 
              id="login-button" 
              onClick={handleLogin}
              className="bg-primary hover:bg-primary-dark text-white"
            >
              Anmelden
            </Button>
          ) : (
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">Trainer Schmidt</span>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">TS</span>
              </div>
            </div>
          )}
        </div>
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
          <div className="w-6"></div> {/* Spacer */}
        </div>
      </div>
    </header>
  );
};

export default Header;
