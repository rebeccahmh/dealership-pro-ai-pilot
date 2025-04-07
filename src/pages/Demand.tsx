
import React, { useState } from 'react';
import { Car, Plus, Upload } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

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
                  <div className="flex space-x-2 mr-2">
                    <Button 
                      variant="ghost" 
                      className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3 flex items-center gap-1" 
                      size="sm"
                      onClick={handleAddDemand}
                    >
                      <Plus className="h-4 w-4" />
                      Add Entry
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
                    <Button 
                      variant="ghost" 
                      className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3" 
                      size="sm"
                      onClick={handleByClients}
                    >
                      By Clients
                    </Button>
                  </div>
                }
                onEmail={() => toast({
                  title: "Email Demand Data",
                  description: "Sending demand data via email",
                })}
                onExport={() => toast({
                  title: "Export Demand Data",
                  description: "Exporting demand data",
                })}
                onPrint={() => toast({
                  title: "Print Demand Data",
                  description: "Printing demand data",
                })}
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
        </div>
      </div>
    </div>
  );
};

export default Demand;
