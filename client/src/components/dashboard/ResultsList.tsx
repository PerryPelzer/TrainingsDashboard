import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ResultsList = () => {
  return (
    <Card id="ergebnis-liste" className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <CardHeader className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Letzte Trainingseinheiten</h2>
        <div className="flex items-center space-x-2">
          <Select>
            <SelectTrigger className="text-sm border border-gray-300 rounded-md h-8 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-36">
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
          <Button variant="outline" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 h-8 px-2 py-1 rounded-md transition-colors">
            Filtern
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spieler
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trainingsart
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leistung
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Einsatz
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fitness
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  15.05.2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                      <AvatarFallback className="text-xs font-medium">MM</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Max Müller</div>
                      <div className="text-xs text-gray-500">Mittelfeld</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Techniktraining
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    4/5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    5/5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    4/5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button variant="link" className="text-primary hover:text-primary-dark mr-2 p-0 h-auto">Details</Button>
                  <Button variant="link" className="text-gray-600 hover:text-gray-900 p-0 h-auto">Bearbeiten</Button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  14.05.2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                      <AvatarFallback className="text-xs font-medium">TS</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Thomas Schmidt</div>
                      <div className="text-xs text-gray-500">Verteidigung</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Taktiktraining
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    3/5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    4/5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    4/5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button variant="link" className="text-primary hover:text-primary-dark mr-2 p-0 h-auto">Details</Button>
                  <Button variant="link" className="text-gray-600 hover:text-gray-900 p-0 h-auto">Bearbeiten</Button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  12.05.2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                      <AvatarFallback className="text-xs font-medium">LW</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Lukas Weber</div>
                      <div className="text-xs text-gray-500">Sturm</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Konditionstraining
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    2/5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    3/5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    3/5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button variant="link" className="text-primary hover:text-primary-dark mr-2 p-0 h-auto">Details</Button>
                  <Button variant="link" className="text-gray-600 hover:text-gray-900 p-0 h-auto">Bearbeiten</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between w-full">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Zeige <span className="font-medium">1</span> bis <span className="font-medium">3</span> von <span className="font-medium">12</span> Einträgen
            </p>
          </div>
          <Pagination className="mx-auto sm:mx-0 sm:ml-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResultsList;
