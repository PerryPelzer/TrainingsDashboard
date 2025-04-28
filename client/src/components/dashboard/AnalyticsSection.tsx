import { 
  Card, 
  CardContent, 
  CardHeader 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { BarChart3, Check, AlertTriangle, ClipboardList } from "lucide-react";

const AnalyticsSection = () => {
  return (
    <Card id="auswertungen" className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <CardHeader className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Leistungsanalyse</h2>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Leistungsverlauf (letzten 30 Tage)</h3>
            <Select>
              <SelectTrigger className="text-xs border border-gray-300 rounded-md h-7 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-36">
                <SelectValue placeholder="Alle Spieler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Spieler</SelectItem>
                <SelectItem value="player1">Max Müller</SelectItem>
                <SelectItem value="player2">Thomas Schmidt</SelectItem>
                <SelectItem value="player3">Lukas Weber</SelectItem>
                <SelectItem value="player4">Felix Becker</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-gray-50 p-4 rounded-md h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Leistungsdaten-Visualisierung</p>
              <p className="text-xs text-gray-400">(Wird mit echten Daten geladen)</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Stärken</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center text-gray-700">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Techniktraining (4.2/5)
              </li>
              <li className="flex items-center text-gray-700">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Einsatzbereitschaft (4.5/5)
              </li>
              <li className="flex items-center text-gray-700">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Teamwork (4.0/5)
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Verbesserungspotential</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center text-gray-700">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                Konditionstraining (2.8/5)
              </li>
              <li className="flex items-center text-gray-700">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                Taktisches Verständnis (3.1/5)
              </li>
              <li className="flex items-center text-gray-700">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                Defensives Positionsspiel (2.9/5)
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Trainingsempfehlungen</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center text-gray-700">
                <ClipboardList className="h-4 w-4 text-primary mr-2" />
                Mehr Konditionstraining
              </li>
              <li className="flex items-center text-gray-700">
                <ClipboardList className="h-4 w-4 text-primary mr-2" />
                Taktikschulung in Kleingruppen
              </li>
              <li className="flex items-center text-gray-700">
                <ClipboardList className="h-4 w-4 text-primary mr-2" />
                Spezifisches Defensivtraining
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <a href="#" className="text-sm text-primary font-medium hover:underline">Detaillierte Analyse anzeigen</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSection;
