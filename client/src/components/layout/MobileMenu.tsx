import { Home, ClipboardList, Users, BarChart3, Settings, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white h-full w-64 shadow-lg overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="font-semibold text-lg">Menü</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md bg-primary-light bg-opacity-10 text-primary font-medium">
                <Home className="h-5 w-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700">
                <ClipboardList className="h-5 w-5 mr-2" />
                Trainingseinheiten
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700">
                <Users className="h-5 w-5 mr-2" />
                Spieler
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700">
                <BarChart3 className="h-5 w-5 mr-2" />
                Statistiken
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700">
                <Settings className="h-5 w-5 mr-2" />
                Einstellungen
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
