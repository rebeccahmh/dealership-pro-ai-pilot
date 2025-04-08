
import React from 'react';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { 
  X, 
  CalendarIcon, 
  Car, 
  User, 
  Upload, 
  Clock, 
  MapPin 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

type DemandDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  drawerType: 'add' | 'import' | 'email' | 'export' | 'print' | 'clients';
};

const DemandDrawer = ({ isOpen, onClose, drawerType }: DemandDrawerProps) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      client: '',
      vehicle: '',
      pickupLocation: '',
      returnLocation: '',
      notes: '',
      status: 'pending'
    },
  });

  const handleSubmit = (data: any) => {
    toast({
      title: 'Demand Entry Added',
      description: `New demand entry for ${data.client} has been created.`,
    });
    onClose();
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Importing Demand Data',
      description: 'Your demand data is being imported. This may take a moment.',
    });
    onClose();
  };

  const handleExport = () => {
    toast({
      title: 'Exporting Demand Data',
      description: 'Your demand data is being exported.',
    });
    onClose();
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Email Sent',
      description: 'Demand report has been sent to the specified email addresses.',
    });
    onClose();
  };

  const handlePrint = () => {
    toast({
      title: 'Printing Demand Data',
      description: 'Your demand data is being sent to the printer.',
    });
    onClose();
  };

  const handleClientsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Client Filter Applied',
      description: 'Demand data has been filtered by the selected clients.',
    });
    onClose();
  };

  const renderDrawerContent = () => {
    switch (drawerType) {
      case 'add':
        return (
          <>
            <DrawerHeader>
              <DrawerTitle className="text-xl">Add New Demand Entry</DrawerTitle>
              <DrawerDescription>Enter demand details below</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input className="pl-8" placeholder="Client name" {...field} />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <div className="flex items-center">
                                <Car className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a vehicle" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tesla_model_3">Tesla Model 3</SelectItem>
                            <SelectItem value="ford_mustang">Ford Mustang</SelectItem>
                            <SelectItem value="honda_civic">Honda Civic</SelectItem>
                            <SelectItem value="toyota_camry">Toyota Camry</SelectItem>
                            <SelectItem value="bmw_x5">BMW X5</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pickupLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Location</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                              <Input className="pl-8" placeholder="Pickup location" {...field} />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="returnLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Return Location</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                              <Input className="pl-8" placeholder="Return location" {...field} />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Additional notes about this demand entry"
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <DrawerFooter>
                    <Button type="submit" className="bg-autoretech-blue hover:bg-autoretech-blue/90">
                      Save Demand Entry
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </form>
              </Form>
            </div>
          </>
        );
        
      case 'import':
        return (
          <>
            <DrawerHeader>
              <DrawerTitle className="text-xl">Import Demand Data</DrawerTitle>
              <DrawerDescription>Upload demand data from a CSV or Excel file</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <form onSubmit={handleImport} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:text-blue-600">
                      Choose a file
                    </Label>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      accept=".csv,.xlsx,.xls" 
                      className="hidden" 
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      or drag and drop
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    CSV, Excel files up to 10MB
                  </p>
                </div>
                
                <DrawerFooter>
                  <Button type="submit" className="bg-autoretech-blue hover:bg-autoretech-blue/90">
                    Import Data
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </div>
          </>
        );
        
      case 'clients':
        return (
          <>
            <DrawerHeader>
              <DrawerTitle className="text-xl">Demand By Clients</DrawerTitle>
              <DrawerDescription>Filter and view demand data by clients</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <form onSubmit={handleClientsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientSearch">Search Clients</Label>
                  <Input 
                    id="clientSearch" 
                    type="text" 
                    placeholder="Search by client name"
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Clients</Label>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {['ABC Corporation', 'XYZ Ltd', 'Acme Inc', 'Tech Solutions', 'Global Enterprises', 
                      'Local Business', 'City Motors', 'Regional Transport', 'Express Deliveries', 'VIP Services'].map((client, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`client-${index}`} 
                          className="mr-2" 
                        />
                        <Label htmlFor={`client-${index}`}>{client}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromDate" className="text-xs">From</Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input 
                          id="fromDate" 
                          type="date" 
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="toDate" className="text-xs">To</Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input 
                          id="toDate" 
                          type="date"
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <DrawerFooter>
                  <Button type="submit" className="bg-autoretech-blue hover:bg-autoretech-blue/90">
                    Apply Filters
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </div>
          </>
        );
        
      case 'email':
        return (
          <>
            <DrawerHeader>
              <DrawerTitle className="text-xl">Email Demand Report</DrawerTitle>
              <DrawerDescription>Send the demand data via email</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <form onSubmit={handleEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Recipients</Label>
                  <Input 
                    id="email" 
                    type="text" 
                    placeholder="Enter email addresses (comma separated)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    type="text" 
                    defaultValue="Demand Report" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message" 
                    className="w-full min-h-[100px] rounded-md border border-gray-300 p-2"
                    placeholder="Additional message to include with the report"
                  ></textarea>
                </div>
                
                <DrawerFooter>
                  <Button type="submit" className="bg-autoretech-blue hover:bg-autoretech-blue/90">
                    Send Email
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </div>
          </>
        );
        
      case 'export':
        return (
          <>
            <DrawerHeader>
              <DrawerTitle className="text-xl">Export Demand Data</DrawerTitle>
              <DrawerDescription>Choose your export options</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">File Format</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline"
                    className="justify-start h-auto py-4 px-4 border border-gray-200"
                    onClick={() => {}}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">CSV</span>
                      <span className="text-xs text-gray-500">Best for spreadsheets</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline"
                    className="justify-start h-auto py-4 px-4 border border-gray-200"
                    onClick={() => {}}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Excel</span>
                      <span className="text-xs text-gray-500">XLSX format</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline"
                    className="justify-start h-auto py-4 px-4 border border-gray-200"
                    onClick={() => {}}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">PDF</span>
                      <span className="text-xs text-gray-500">Formatted report</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline"
                    className="justify-start h-auto py-4 px-4 border border-gray-200"
                    onClick={() => {}}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">JSON</span>
                      <span className="text-xs text-gray-500">Data format</span>
                    </div>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Time Period</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DrawerFooter>
                <Button onClick={handleExport} className="bg-autoretech-blue hover:bg-autoretech-blue/90">
                  Export Data
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </>
        );
        
      case 'print':
        return (
          <>
            <DrawerHeader>
              <DrawerTitle className="text-xl">Print Demand Data</DrawerTitle>
              <DrawerDescription>Configure your print options</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">Print Options</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="printAll" className="mr-2" defaultChecked />
                    <Label htmlFor="printAll">Print all demand entries</Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="printHeader" className="mr-2" defaultChecked />
                    <Label htmlFor="printHeader">Include header information</Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="printFooter" className="mr-2" defaultChecked />
                    <Label htmlFor="printFooter">Include footer/summary</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Page Size</Label>
                <Select defaultValue="a4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select page size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Orientation</Label>
                <Select defaultValue="portrait">
                  <SelectTrigger>
                    <SelectValue placeholder="Select orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DrawerFooter>
                <Button onClick={handlePrint} className="bg-autoretech-blue hover:bg-autoretech-blue/90">
                  Print
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </>
        );
        
      default:
        return <div>Unknown drawer type</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[85vh] max-h-[85vh] overflow-y-auto">
        <div className="absolute right-4 top-4">
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </div>
        {renderDrawerContent()}
      </DrawerContent>
    </Drawer>
  );
};

export default DemandDrawer;
