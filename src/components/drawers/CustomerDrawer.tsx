
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

interface CustomerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerType: "add" | "import" | "email" | "export" | "print" | "archive";
}

const drawerTitles = {
  add: "Add New Customer",
  import: "Import Customers",
  email: "Email Customer Information",
  export: "Export Customer Data",
  print: "Print Customer Information",
  archive: "Archive Customer"
};

const CustomerDrawer: React.FC<CustomerDrawerProps> = ({ isOpen, onClose, drawerType }) => {
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
            {drawerType === "add" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerType">Customer Type</Label>
                    <Input id="customerType" placeholder="e.g. Individual" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="e.g. John Smith" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="email@example.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="e.g. (555) 123-4567" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input id="mobile" placeholder="e.g. (555) 987-6543" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="e.g. New York" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Street address" />
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
            
            {drawerType === "email" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Input id="recipients" placeholder="Select customers to email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Email subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Input id="message" placeholder="Email content" />
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
                </div>
              </div>
            )}
            
            {drawerType === "print" && (
              <div className="space-y-4">
                <p>Print options:</p>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
                    Print Customer List
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
                    Print Detailed Report
                  </Button>
                </div>
              </div>
            )}
            
            {drawerType === "archive" && (
              <div className="space-y-4">
                <p>Are you sure you want to archive the selected customers?</p>
                <p className="text-sm text-muted-foreground">
                  Archived customers can be restored later from the archive section.
                </p>
              </div>
            )}
          </div>
          
          <DrawerFooter>
            <Button type="submit" onClick={handleSubmit} variant="blue">
              {drawerType === "add" ? "Create Customer" : 
               drawerType === "import" ? "Import Data" : 
               drawerType === "email" ? "Send Email" : 
               drawerType === "export" ? "Export Data" :
               drawerType === "print" ? "Print" : 
               "Archive"}
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

export default CustomerDrawer;
