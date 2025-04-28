import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SubmissionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: "",
    trainingType: "",
    player: "",
    performanceRating: "",
    effortRating: "",
    fitnessLevel: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formular wird verarbeitet...", formData);
    
    // TODO: API-Integration hinzufügen
    
    toast({
      title: "Erfolgreich gespeichert",
      description: "Trainingseinheit wurde erfolgreich erfasst.",
    });
    
    // Formular zurücksetzen
    setFormData({
      date: "",
      trainingType: "",
      player: "",
      performanceRating: "",
      effortRating: "",
      fitnessLevel: "",
      notes: ""
    });
  };

  return (
    <Card id="eingabe-bereich" className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
      <CardHeader className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Trainingseinheit erfassen</h2>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Datum</Label>
              <Input 
                type="date" 
                id="date" 
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="trainingType" className="block text-sm font-medium text-gray-700 mb-1">Trainingsart</Label>
              <Select onValueChange={(value) => handleSelectChange("trainingType", value)}>
                <SelectTrigger id="trainingType" className="w-full">
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
            <Label htmlFor="player" className="block text-sm font-medium text-gray-700 mb-1">Spieler</Label>
            <Select onValueChange={(value) => handleSelectChange("player", value)}>
              <SelectTrigger id="player" className="w-full">
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
              <Label htmlFor="performanceRating" className="block text-sm font-medium text-gray-700 mb-1">Leistungsbewertung</Label>
              <Select onValueChange={(value) => handleSelectChange("performanceRating", value)}>
                <SelectTrigger id="performanceRating" className="w-full">
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
              <Label htmlFor="effortRating" className="block text-sm font-medium text-gray-700 mb-1">Einsatz</Label>
              <Select onValueChange={(value) => handleSelectChange("effortRating", value)}>
                <SelectTrigger id="effortRating" className="w-full">
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
              <Label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-700 mb-1">Fitness</Label>
              <Select onValueChange={(value) => handleSelectChange("fitnessLevel", value)}>
                <SelectTrigger id="fitnessLevel" className="w-full">
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
            <Label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Anmerkungen</Label>
            <Textarea 
              id="notes" 
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
              placeholder="Beobachtungen, Verbesserungsvorschläge, etc."
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
            >
              Erfassen
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmissionForm;
