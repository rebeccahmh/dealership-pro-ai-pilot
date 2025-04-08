
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
import { X, CalendarIcon, User, Car, DollarSign, CreditCard, Upload } from 'lucide-react';
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

type TransactionDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  drawerType: 'add' | 'import' | 'email' | 'export' | 'print';
};

const TransactionDrawer = ({ isOpen, onClose, drawerType }: TransactionDrawerProps) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      date: new Date(),
      customer: '',
      vehicle: '',
      amount: '',
      paymentMethod: 'cash',
      status: 'Pending',
    },
  });

  const handleSubmit = (data: any) => {
    toast({
      title: 'Transaction Submitted',
      description: `Transaction for ${data.vehicle} has been created.`,
    });
    onClose();
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Importing Transactions',
      description: 'Your transactions are being imported. This may take a moment.',
    });
    onClose();
  };

  const handleExport = () => {
    toast({
      title: 'Exporting Transactions',
      description: 'Your transactions are being exported.',
    });
    onClose();
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Email Sent',
      description: 'Transaction report has been sent to the specified email addresses.',
    });
    onClose();
  };

  const handlePrint = () => {
    toast({
      title: 'Printing Transactions',
      description: 'Your transactions are being sent to the printer.',
    });
    onClose();
  };

  const renderDrawerContent = () => {
    switch (drawerType) {
      case 'add':
        return (
          <>
            <DrawerHeader>
              <DrawerTitle className="text-xl">Add New Transaction</DrawerTitle>
              <DrawerDescription>Enter transaction details below</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Transaction Date</FormLabel>
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
                    name="customer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input className="pl-8" placeholder="Customer name" {...field} />
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
                        <FormControl>
                          <div className="relative">
                            <Car className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input className="pl-8" placeholder="Vehicle details" {...field} />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input 
                              className="pl-8" 
                              placeholder="0.00" 
                              type="number" 
                              step="0.01" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <div className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a payment method" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="credit">Credit Card</SelectItem>
                            <SelectItem value="debit">Debit Card</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                          </SelectContent>
                        </Select>
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
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <DrawerFooter>
                    <Button type="submit" className="bg-autoretech-blue hover:bg-autoretech-blue/90">
                      Save Transaction
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
              <DrawerTitle className="text-xl">Import Transactions</DrawerTitle>
              <DrawerDescription>Upload transaction data from a CSV or Excel file</DrawerDescription>
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
        
      case 'email':
        return (
          <>
            <DrawerHeader>
              <DrawerTitle className="text-xl">Email Transaction Report</DrawerTitle>
              <DrawerDescription>Send the transaction data via email</DrawerDescription>
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
                    defaultValue="Transaction Report" 
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
              <DrawerTitle className="text-xl">Export Transactions</DrawerTitle>
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
                  Export Transactions
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
              <DrawerTitle className="text-xl">Print Transactions</DrawerTitle>
              <DrawerDescription>Configure your print options</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">Print Options</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="printAll" className="mr-2" defaultChecked />
                    <Label htmlFor="printAll">Print all transactions</Label>
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

export default TransactionDrawer;
