import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-500">
          &copy; {currentYear} Trainingsbarometer | Entwickelt für Trainerteams
        </div>
      </div>
    </footer>
  );
}
