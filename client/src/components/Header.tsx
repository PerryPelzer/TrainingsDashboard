import React from 'react';

interface HeaderProps {
  loggedIn: boolean;
  username: string | null;
  onLogin: () => void;
}

export default function Header({ loggedIn, username, onLogin }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">Trainingsbarometer</h1>
        </div>
        
        {/* User Info / Login Placeholder */}
        <div id="user-info" className="flex items-center">
          {!loggedIn ? (
            <button 
              id="login-button" 
              onClick={onLogin}
              className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm transition-colors"
            >
              Anmelden
            </button>
          ) : (
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">{username}</span>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {username ? username.split(" ").map(part => part[0]).join("") : ""}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
