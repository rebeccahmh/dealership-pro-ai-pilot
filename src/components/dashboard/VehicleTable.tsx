
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
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

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
  onSelect?: (selectedIds: string[]) => void;
}

const VehicleTable = ({ title, vehicles, onSelect }: VehicleTableProps) => {
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);

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

  const handleSelect = (id: string) => {
    setSelectedVehicles(prev => {
      const newSelection = prev.includes(id)
        ? prev.filter(vehicleId => vehicleId !== id)
        : [...prev, id];
      
      if (onSelect) {
        onSelect(newSelection);
      }
      
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedVehicles.length === vehicles.length) {
      setSelectedVehicles([]);
      if (onSelect) {
        onSelect([]);
      }
    } else {
      const allIds = vehicles.map(v => v.id);
      setSelectedVehicles(allIds);
      if (onSelect) {
        onSelect(allIds);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedVehicles.length === vehicles.length && vehicles.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
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
                <TableCell>
                  <Checkbox
                    checked={selectedVehicles.includes(vehicle.id)}
                    onCheckedChange={() => handleSelect(vehicle.id)}
                  />
                </TableCell>
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
