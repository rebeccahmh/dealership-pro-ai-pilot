
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface VehicleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerType: "new" | "import" | "prep" | "archive" | "available" | "email" | "export" | "print";
}

const drawerTitles = {
  new: "Add New Vehicle",
  import: "Import Vehicles",
  prep: "Vehicles In Preparation",
  archive: "Archive Vehicle",
  available: "Available Vehicles",
  email: "Email Vehicle Information",
  export: "Export Vehicle Data",
  print: "Print Vehicle Information"
};

const VehicleDrawer: React.FC<VehicleDrawerProps> = ({ isOpen, onClose, drawerType }) => {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Success",
      description: `${drawerTitles[drawerType]} operation completed successfully`,
    });
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>{drawerTitles[drawerType]}</DrawerTitle>
          </DrawerHeader>
          
          <div className="p-4">
            {drawerType === "new" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" placeholder="e.g. Toyota" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="e.g. Corolla" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" placeholder="e.g. 2024" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN</Label>
                    <Input id="vin" placeholder="Vehicle Identification Number" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Vehicle description" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" placeholder="e.g. 25000" type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Input id="status" placeholder="e.g. In Stock" />
                  </div>
                </div>
              </form>
            )}

            {drawerType === "import" && (
              <div className="space-y-4">
                <div className="p-8 border-2 border-dashed rounded-lg text-center">
                  <p className="text-muted-foreground">Drag and drop your CSV or Excel file here</p>
                  <p className="text-sm text-muted-foreground mt-2">or</p>
                  <Button variant="outline" className="mt-2">Browse Files</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supported formats: .csv, .xlsx, .xls (max 10MB)
                </p>
              </div>
            )}
            
            {(drawerType === "prep" || drawerType === "archive" || drawerType === "available") && (
              <div className="space-y-4">
                <p>This feature will display a list of vehicles with filters specific to {drawerType === "prep" ? "vehicles in preparation" : drawerType === "archive" ? "archived vehicles" : "available vehicles"}.</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium">Data loading placeholder</p>
                  <p className="text-sm text-muted-foreground">Vehicle list will appear here.</p>
                </div>
              </div>
            )}
            
            {drawerType === "email" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Email</Label>
                  <Input id="recipient" placeholder="email@example.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Vehicle Information" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Input id="message" placeholder="Additional information to include" />
                </div>
              </form>
            )}
            
            {drawerType === "export" && (
              <div className="space-y-4">
                <p>Choose export format:</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 17h6"/><path d="M9 13h6"/></svg>
                    CSV
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 17h6"/><path d="M9 13h6"/></svg>
                    Excel
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 17h6"/><path d="M9 13h6"/></svg>
                    PDF
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 17h6"/><path d="M9 13h6"/></svg>
                    JSON
                  </Button>
                </div>
              </div>
            )}
            
            {drawerType === "print" && (
              <div className="space-y-4">
                <p>Print options:</p>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
                    Print Current View
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
                    Print Detailed Report
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <DrawerFooter>
            <Button type="submit" onClick={handleSubmit} variant="blue">
              {drawerType === "new" ? "Create Vehicle" : 
               drawerType === "import" ? "Import Data" : 
               drawerType === "email" ? "Send Email" : 
               drawerType === "export" ? "Export Data" : 
               drawerType === "print" ? "Print" : "Apply"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default VehicleDrawer;
