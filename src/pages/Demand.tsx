
import React, { useState } from 'react';
import { Car, Plus, Upload } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/layout/MainLayout';

const Demand = () => {
  const [activeTab, setActiveTab] = useState('management');
  const { vehicles } = useAppContext();
  const { toast } = useToast();
  
  const handleAddDemand = () => {
    toast({
      title: "Add Demand Entry",
      description: "The add demand entry functionality will be implemented here",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Demand Data",
      description: "The import demand data functionality will be implemented here",
    });
  };

  const handleByClients = () => {
    toast({
      title: "By Clients",
      description: "Showing demand data organized by clients",
    });
  };
  
  return (
    <MainLayout>
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
            pageName="demand"
            customActions={
              <div className="flex space-x-2 mr-2">
                <Button 
                  variant="blue"
                  className="flex items-center gap-1" 
                  size="sm"
                  onClick={handleAddDemand}
                >
                  <Plus className="h-4 w-4" />
                  Add Entry
                </Button>
                <Button 
                  variant="blue"
                  className="flex items-center gap-1" 
                  size="sm"
                  onClick={handleImport}
                >
                  <Upload className="h-4 w-4" />
                  Import
                </Button>
                <Button 
                  variant="blue"
                  size="sm"
                  onClick={handleByClients}
                >
                  By Clients
                </Button>
              </div>
            }
          />
          
          <EmptyState 
            message="No Entries to Display" 
            actionLabel="Add Entry"
            onAction={handleAddDemand}
            secondaryActionLabel="Import Data"
            onSecondaryAction={handleImport}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Demand;
