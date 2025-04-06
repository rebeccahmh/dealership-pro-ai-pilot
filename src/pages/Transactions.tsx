
import React, { useState } from 'react';
import { ListOrdered, Plus, Import } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    customer: '',
    amount: '',
    date: '',
    status: 'pending'
  });
  const { toast } = useToast();

  const handleAddTransaction = () => {
    // Simple validation
    if (!newTransaction.customer || !newTransaction.amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Add the transaction
    const transaction = {
      id: Date.now().toString(),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date: newTransaction.date || new Date().toISOString().split('T')[0]
    };
    
    setTransactions([transaction, ...transactions]);
    setNewTransaction({ customer: '', amount: '', date: '', status: 'pending' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Transaction added successfully",
    });
  };

  const handleImportTransactions = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('importFile') as HTMLInputElement;
    
    if (fileInput?.files?.length) {
      // In a real app, you would process the CSV/Excel file here
      // For this example, we'll just simulate adding some imported data
      const newImportedTransactions = [
        {
          id: 'imp-' + Date.now(),
          customer: 'Imported Customer',
          amount: 1250.00,
          date: new Date().toISOString().split('T')[0],
          status: 'pending'
        }
      ];
      
      setTransactions([...newImportedTransactions, ...transactions]);
      setIsImportDialogOpen(false);
      
      toast({
        title: "Import Successful",
        description: `Imported ${newImportedTransactions.length} transaction(s)`,
      });
    } else {
      toast({
        title: "Import Error",
        description: "Please select a file to import",
        variant: "destructive"
      });
    }
  };

  const customActions = (
    <>
      <Button 
        variant="outline" 
        size="sm"
        className="text-autoretech-blue border-autoretech-blue hover:bg-autoretech-blue/10 mr-2"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Transaction
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="text-autoretech-blue border-autoretech-blue hover:bg-autoretech-blue/10 mr-2"
        onClick={() => setIsImportDialogOpen(true)}
      >
        <Import className="h-4 w-4 mr-2" />
        Import
      </Button>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageHeader title="Transactions Management" breadcrumb="Transactions Management" />
            
            <div className="space-y-4">
              <ActionBar 
                title="Transactions in Progress" 
                count={transactions.length}
                icon={<ListOrdered className="h-5 w-5" />}
                actions={['archive', 'email', 'export', 'print', 'close']}
                customActions={customActions}
              />
              
              {transactions.length === 0 ? (
                <EmptyState message="There are no transaction records to display" />
              ) : (
                <div className="bg-white rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.amount.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{transaction.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Customer
              </Label>
              <Input
                id="customer"
                value={newTransaction.customer}
                onChange={(e) => setNewTransaction({...newTransaction, customer: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Transactions Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Import Transactions</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleImportTransactions}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="importFile" className="text-right">
                  File
                </Label>
                <Input
                  id="importFile"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="col-span-3"
                />
              </div>
              <div className="col-span-4 text-sm text-gray-500">
                Supported formats: CSV, Excel (.xlsx, .xls)
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsImportDialogOpen(false)} type="button">Cancel</Button>
              <Button type="submit">Import</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;
