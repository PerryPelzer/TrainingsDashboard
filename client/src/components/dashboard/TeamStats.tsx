import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

const TeamStats: FC = () => {
  return (
    <Card>
      <CardHeader className="border-b border-gray-200 p-4">
        <CardTitle className="text-base font-semibold text-gray-800">Teamstatistik</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm font-medium text-gray-500 mb-1">Trainingseinheiten</div>
            <div className="text-2xl font-semibold text-gray-800">0</div>
            <div className="text-xs text-gray-500">Letzte 30 Tage</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm font-medium text-gray-500 mb-1">Durchschnittliche Bewertung</div>
            <div className="text-2xl font-semibold text-gray-800">0 / 5</div>
            <div className="text-xs text-green-600 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>Noch keine Daten vorhanden</span>
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
      </CardContent>
    </Card>
  );
};

export default TeamStats;
