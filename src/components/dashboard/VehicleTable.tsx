
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: "In Stock" | "Sold" | "Reserved" | "In Transit";
  daysInInventory: number;
}

interface VehicleTableProps {
  title: string;
  vehicles: Vehicle[];
}

const VehicleTable = ({ title, vehicles }: VehicleTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Sold":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "Reserved":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "In Transit":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>VIN</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Days in Inventory</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-mono">{vehicle.vin}</TableCell>
                <TableCell>
                  <div className="font-medium">{vehicle.make}</div>
                  <div className="text-muted-foreground text-sm">{vehicle.model}</div>
                </TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell className="text-right">${vehicle.price.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className={getStatusColor(vehicle.status)}>
                    {vehicle.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{vehicle.daysInInventory}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VehicleTable;
