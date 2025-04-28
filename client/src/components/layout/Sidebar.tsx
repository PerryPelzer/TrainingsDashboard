import { Home, ClipboardList, Users, BarChart3, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="md:w-64 md:min-h-screen bg-white border-r border-gray-200 md:flex flex-col hidden">
      <nav className="p-4 flex-grow">
        <div className="mb-6">
          <h2 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-3">Hauptmenü</h2>
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
          </ul>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700">
          <Settings className="h-5 w-5 mr-2" />
          Einstellungen
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
