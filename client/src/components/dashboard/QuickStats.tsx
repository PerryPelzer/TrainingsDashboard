import { ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const QuickStats = () => {
  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <CardHeader className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Teamstatistik</h2>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm font-medium text-gray-500 mb-1">Trainingseinheiten</div>
            <div className="text-2xl font-semibold text-gray-800">24</div>
            <div className="text-xs text-gray-500">Letzte 30 Tage</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm font-medium text-gray-500 mb-1">Durchschnittliche Bewertung</div>
            <div className="text-2xl font-semibold text-gray-800">3.8 / 5</div>
            <div className="text-xs text-green-600 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +0.2 im Vergleich zum Vormonat
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm font-medium text-gray-500 mb-1">Gesamte Trainingszeit</div>
            <div className="text-2xl font-semibold text-gray-800">42 Std</div>
            <div className="text-xs text-gray-500">Letzte 30 Tage</div>
          </div>
          
          <div className="mt-4">
            <a href="#" className="text-sm text-primary font-medium hover:underline">Vollständige Statistik anzeigen</a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
