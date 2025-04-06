
import React from 'react';
import { CreditCard, Plus, Upload } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const Transactions = () => {
  const { transactions } = useAppContext();
  
  const handleAddTransaction = () => {
    alert('Add transaction functionality will be implemented here');
  };

  const handleImport = () => {
    alert('Import transactions functionality will be implemented here');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageHeader title="Transactions" breadcrumb="Transactions" />
            
            <div className="space-y-4">
              <ActionBar 
                title="Sales Transactions" 
                count={transactions.length}
                icon={<CreditCard className="h-5 w-5" />}
                customActions={
                  <div className="flex space-x-2 mr-2">
                    <Button 
                      variant="ghost" 
                      className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3 flex items-center gap-1" 
                      size="sm"
                      onClick={handleAddTransaction}
                    >
                      <Plus className="h-4 w-4" />
                      Add Transaction
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
                }
              />
              
              {transactions.length > 0 ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell>{transaction.vehicle}</TableCell>
                          <TableCell className="text-right">${transaction.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <EmptyState 
                  message="There are no transaction records to display" 
                  actionLabel="Add Transaction"
                  onAction={handleAddTransaction}
                  secondaryActionLabel="Import Transactions"
                  onSecondaryAction={handleImport}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
