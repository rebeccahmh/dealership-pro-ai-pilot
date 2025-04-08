
import React from 'react';
import { Users, Plus, Upload } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

const Customers = () => {
  const { customers } = useAppContext();
  const { toast } = useToast();
  
  const CustomActionButtons = ({ handleAddCustomer, handleImport }: any) => (
    <div className="flex space-x-2 mr-2">
      <Button 
        variant="ghost" 
        className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3 flex items-center gap-1" 
        size="sm"
        onClick={handleAddCustomer}
      >
        <Plus className="h-4 w-4" />
        Add Customer
      </Button>
      <Button 
        variant="ghost" 
        className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3 flex items-center gap-1" 
        size="sm"
        onClick={handleImport}
      >
        <Upload className="h-4 w-4" />
        Import
      </Button>
    </div>
  );
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageHeader title="Customers Management" breadcrumb="Customers Management" />
            
            <div className="space-y-4">
              <ActionBar 
                title="Customers" 
                count={customers.length}
                icon={<Users className="h-5 w-5" />}
                customActions={<CustomActionButtons />}
                pageName="customers"
              />
              
              {customers.length > 0 ? (
                <div className="bg-white rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Select</TableHead>
                        <TableHead>Entry Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Phone *</TableHead>
                        <TableHead>Private Email</TableHead>
                        <TableHead>City</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map(customer => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>{customer.entryNumber}</TableCell>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{customer.uid}</TableCell>
                          <TableCell>{customer.type}</TableCell>
                          <TableCell>{customer.mobile}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.city}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <EmptyState 
                  message="There are no customer records to display" 
                  actionLabel="Add Customer"
                  onAction={() => toast({
                    title: "Add Customer",
                    description: "Opening customer form",
                  })}
                  secondaryActionLabel="Import Customers"
                  onSecondaryAction={() => toast({
                    title: "Import Customers",
                    description: "Opening import dialog",
                  })}
                />
              )}
              
              <div className="text-sm text-gray-500">
                * For Private Persons - Home phone, For Incorporated Entities - Office Phone
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
