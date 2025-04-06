
import React from 'react';
import { ListOrdered } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const Transactions = () => {
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
                count={0}
                icon={<ListOrdered className="h-5 w-5" />}
                actions={['archive', 'email', 'export', 'print', 'close']}
              />
              
              <EmptyState message="There are no transaction records to display" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
