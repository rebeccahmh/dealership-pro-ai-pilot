
import React, { useState } from 'react';
import { Car } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Vehicles = () => {
  const [activeTab, setActiveTab] = useState('warranty');
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageHeader title="Vehicles Management" breadcrumb="Vehicles Management" />
            
            <div className="space-y-4">
              <Tabs defaultValue="warranty" className="w-full">
                <TabsList className="bg-transparent p-0 h-auto space-x-2 mb-4">
                  <TabsTrigger 
                    value="warranty" 
                    className={`px-3 py-2 h-auto ${activeTab === 'warranty' ? 'bg-white' : 'bg-transparent'}`}
                    onClick={() => setActiveTab('warranty')}
                  >
                    Vehicles under Warranty
                  </TabsTrigger>
                  <TabsTrigger 
                    value="all" 
                    className={`px-3 py-2 h-auto ${activeTab === 'all' ? 'bg-white' : 'bg-transparent'}`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Vehicles
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <ActionBar 
                title="Vehicles under Warranty" 
                count={0}
                icon={<Car className="h-5 w-5" />}
                customActions={
                  <div className="flex space-x-1 mr-2">
                    <Button variant="ghost" className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3" size="sm">
                      New Vehicles
                    </Button>
                    <Button variant="ghost" className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3" size="sm">
                      In Prep
                    </Button>
                    <Button variant="ghost" className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3" size="sm">
                      Archive
                    </Button>
                    <Button variant="ghost" className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3" size="sm">
                      Available
                    </Button>
                  </div>
                }
              />
              
              <EmptyState message="There are no vehicle records to display" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
