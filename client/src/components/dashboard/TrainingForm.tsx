import { FC, useState, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const TrainingForm: FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: "",
    type: "",
    player: "",
    performanceRating: "",
    effortRating: "",
    fitnessRating: "",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // TODO: Hier später echte API-Integration
    console.log("Formular wird verarbeitet...", formData);
    
    toast({
      title: "Erfolg!",
      description: "Trainingseinheit erfolgreich erfasst.",
    });
    
    // Reset form
    setFormData({
      date: "",
      type: "",
      player: "",
      performanceRating: "",
      effortRating: "",
      fitnessRating: "",
      notes: ""
    });
  };

  return (
    <Card id="eingabe-bereich">
      <CardHeader className="border-b border-gray-200 p-4">
        <CardTitle className="text-base font-semibold text-gray-800">Trainingseinheit erfassen</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">Datum</Label>
              <Input 
                type="date" 
                id="date" 
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1">Trainingsart</Label>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
                value={formData.type}
              >
                <SelectTrigger id="type" className="w-full border border-gray-300 rounded-md">
                  <SelectValue placeholder="Bitte auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Techniktraining</SelectItem>
                  <SelectItem value="tactical">Taktiktraining</SelectItem>
                  <SelectItem value="fitness">Konditionstraining</SelectItem>
                  <SelectItem value="match">Spieltraining</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="player" className="text-sm font-medium text-gray-700 mb-1">Spieler</Label>
            <Select
              onValueChange={(value) => handleSelectChange("player", value)}
              value={formData.player}
            >
              <SelectTrigger id="player" className="w-full border border-gray-300 rounded-md">
                <SelectValue placeholder="Spieler auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="player1">Max Müller</SelectItem>
                <SelectItem value="player2">Thomas Schmidt</SelectItem>
                <SelectItem value="player3">Lukas Weber</SelectItem>
                <SelectItem value="player4">Felix Becker</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="performanceRating" className="text-sm font-medium text-gray-700 mb-1">Leistungsbewertung</Label>
              <Select
                onValueChange={(value) => handleSelectChange("performanceRating", value)}
                value={formData.performanceRating}
              >
                <SelectTrigger id="performanceRating" className="w-full border border-gray-300 rounded-md">
                  <SelectValue placeholder="Auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Hervorragend (5)</SelectItem>
                  <SelectItem value="4">Gut (4)</SelectItem>
                  <SelectItem value="3">Durchschnittlich (3)</SelectItem>
                  <SelectItem value="2">Verbesserungswürdig (2)</SelectItem>
                  <SelectItem value="1">Ungenügend (1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="effortRating" className="text-sm font-medium text-gray-700 mb-1">Einsatz</Label>
              <Select
                onValueChange={(value) => handleSelectChange("effortRating", value)}
                value={formData.effortRating}
              >
                <SelectTrigger id="effortRating" className="w-full border border-gray-300 rounded-md">
                  <SelectValue placeholder="Auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Sehr hoch (5)</SelectItem>
                  <SelectItem value="4">Hoch (4)</SelectItem>
                  <SelectItem value="3">Mittel (3)</SelectItem>
                  <SelectItem value="2">Niedrig (2)</SelectItem>
                  <SelectItem value="1">Sehr niedrig (1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fitnessRating" className="text-sm font-medium text-gray-700 mb-1">Fitness</Label>
              <Select
                onValueChange={(value) => handleSelectChange("fitnessRating", value)}
                value={formData.fitnessRating}
              >
                <SelectTrigger id="fitnessRating" className="w-full border border-gray-300 rounded-md">
                  <SelectValue placeholder="Auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Sehr gut (5)</SelectItem>
                  <SelectItem value="4">Gut (4)</SelectItem>
                  <SelectItem value="3">Normal (3)</SelectItem>
                  <SelectItem value="2">Unterdurchschnittlich (2)</SelectItem>
                  <SelectItem value="1">Schlecht (1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-1">Anmerkungen</Label>
            <Textarea 
              id="notes" 
              rows={3} 
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Beobachtungen, Verbesserungsvorschläge, etc."
              className="w-full border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white transition-colors"
            >
              Erfassen
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TrainingForm;
