
import React, { useState } from 'react';
import { Car } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Demand = () => {
  const [activeTab, setActiveTab] = useState('management');
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageHeader title="Demand Management" breadcrumb="Demand Management" />
            
            <div className="space-y-4">
              <Tabs defaultValue="management" className="w-full">
                <div className="flex justify-end">
                  <TabsList className="bg-transparent border-b w-auto">
                    <TabsTrigger 
                      value="management" 
                      className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'management' ? 'border-autoretech-blue text-autoretech-blue' : 'border-transparent'}`}
                      onClick={() => setActiveTab('management')}
                    >
                      Demand Management
                    </TabsTrigger>
                    <TabsTrigger 
                      value="requests" 
                      className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'requests' ? 'border-autoretech-blue text-autoretech-blue' : 'border-transparent'}`}
                      onClick={() => setActiveTab('requests')}
                    >
                      Requests
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
              
              <ActionBar 
                title="Vehicles to clients" 
                icon={<Car className="h-5 w-5" />}
                customActions={
                  <Button variant="ghost" className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3" size="sm">
                    By Clients
                  </Button>
                }
              />
              
              <EmptyState message="No Entries to Display" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demand;
