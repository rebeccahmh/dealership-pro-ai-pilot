
import React from 'react';
import { BarChartBig } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';

const Marketing = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageHeader title="Marketing" breadcrumb="Marketing" />
            
            <div className="space-y-4">
              <ActionBar 
                title="Marketing" 
                icon={<BarChartBig className="h-5 w-5" />}
                customActions={
                  <Button variant="ghost" className="mr-2 bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3" size="sm">
                    Publish now
                  </Button>
                }
              />
              
              <EmptyState message="There are no marketing records to display" />
              
              {/* Gray button on top of EmptyState */}
              <div className="relative">
                <Button 
                  variant="secondary" 
                  className="absolute top-[-60px] right-4 bg-gray-400 hover:bg-gray-500 text-white"
                  size="sm"
                >
                  Publish now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
