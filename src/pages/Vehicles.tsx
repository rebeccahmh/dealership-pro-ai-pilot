
import React, { useState } from 'react';
import { Car, Plus, Upload } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/context/AppContext';
import VehicleTable from '@/components/dashboard/VehicleTable';
import { useToast } from '@/hooks/use-toast';

const Vehicles = () => {
  const [activeTab, setActiveTab] = useState('warranty');
  const { vehicles } = useAppContext();
  const { toast } = useToast();
  
  // Filter vehicles by warranty (assuming warranty means "In Stock" or "Reserved")
  const warrantyVehicles = vehicles.filter(v => 
    v.status === "In Stock" || v.status === "Reserved"
  );
  
  const handleAddVehicle = () => {
    toast({
      title: "Add Vehicle",
      description: "The add vehicle functionality will be implemented here",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Vehicles",
      description: "The import vehicle data functionality will be implemented here",
    });
  };

  const handleInPrep = () => {
    toast({
      title: "In Prep Filter",
      description: "Filtering vehicles in preparation",
    });
  };

  const handleArchive = () => {
    toast({
      title: "Archive Filter",
      description: "Showing archived vehicles",
    });
  };

  const handleAvailable = () => {
    toast({
      title: "Available Filter",
      description: "Showing available vehicles",
    });
  };

  const handleEmail = () => {
    toast({
      title: "Email Vehicles",
      description: "Sending vehicles data via email",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Vehicles",
      description: "Exporting vehicles data",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print Vehicles",
      description: "Printing vehicles list",
    });
  };
  
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
                count={warrantyVehicles.length}
                icon={<Car className="h-5 w-5" />}
                customActions={
                  <div className="flex space-x-2 mr-2">
                    <Button 
                      variant="ghost" 
                      className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3 flex items-center gap-1" 
                      size="sm"
                      onClick={handleAddVehicle}
                    >
                      <Plus className="h-4 w-4" />
                      New Vehicle
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
                      onClick={handleInPrep}
                    >
                      In Prep
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3" 
                      size="sm"
                      onClick={handleArchive}
                    >
                      Archive
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3" 
                      size="sm"
                      onClick={handleAvailable}
                    >
                      Available
                    </Button>
                  </div>
                }
                onEmail={handleEmail}
                onExport={handleExport}
                onPrint={handlePrint}
              />
              
              {activeTab === 'warranty' ? (
                warrantyVehicles.length > 0 ? (
                  <VehicleTable 
                    title="Vehicles under Warranty"
                    vehicles={warrantyVehicles}
                  />
                ) : (
                  <EmptyState 
                    message="There are no vehicle records to display" 
                    actionLabel="Add Vehicle"
                    onAction={handleAddVehicle}
                    secondaryActionLabel="Import Vehicles"
                    onSecondaryAction={handleImport}
                  />
                )
              ) : (
                vehicles.length > 0 ? (
                  <VehicleTable 
                    title="All Vehicles"
                    vehicles={vehicles}
                  />
                ) : (
                  <EmptyState 
                    message="There are no vehicle records to display" 
                    actionLabel="Add Vehicle"
                    onAction={handleAddVehicle}
                    secondaryActionLabel="Import Vehicles"
                    onSecondaryAction={handleImport}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
