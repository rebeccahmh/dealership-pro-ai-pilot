
import React, { useState } from 'react';
import { Car } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VehicleTable from '@/components/dashboard/VehicleTable';
import { useToast } from '@/hooks/use-toast';
import CustomVehicleActionButtons from './CustomVehicleActionButtons';
import { useAppContext } from '@/context/AppContext';
import VehicleDrawer from '../drawers/VehicleDrawer';

const VehiclePageContent = () => {
  const [activeTab, setActiveTab] = useState('warranty');
  const { vehicles } = useAppContext();
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<"new" | "import" | "prep" | "archive" | "available" | "email" | "export" | "print">("new");
  
  // Filter vehicles by warranty (assuming warranty means "In Stock" or "Reserved")
  const warrantyVehicles = vehicles.filter(v => 
    v.status === "In Stock" || v.status === "Reserved"
  );

  const handleNewVehicle = () => {
    setDrawerType("new");
    setDrawerOpen(true);
  };

  const handleImport = () => {
    setDrawerType("import");
    setDrawerOpen(true);
  };

  const handleInPrep = () => {
    setDrawerType("prep");
    setDrawerOpen(true);
  };

  const handleArchive = () => {
    setDrawerType("archive");
    setDrawerOpen(true);
  };

  const handleAvailable = () => {
    setDrawerType("available");
    setDrawerOpen(true);
  };

  const handleEmail = () => {
    setDrawerType("email");
    setDrawerOpen(true);
  };

  const handleExport = () => {
    setDrawerType("export");
    setDrawerOpen(true);
  };

  const handlePrint = () => {
    setDrawerType("print");
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
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
            <CustomVehicleActionButtons 
              handleNewVehicle={handleNewVehicle}
              handleImport={handleImport}
              handleInPrep={handleInPrep}
              handleArchive={handleArchive}
              handleAvailable={handleAvailable}
            />
          }
          onEmail={handleEmail}
          onExport={handleExport}
          onPrint={handlePrint}
          pageName="vehicles"
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
              onAction={handleNewVehicle}
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
              onAction={handleNewVehicle}
              secondaryActionLabel="Import Vehicles"
              onSecondaryAction={handleImport}
            />
          )
        )}

        <VehicleDrawer 
          isOpen={drawerOpen} 
          onClose={closeDrawer} 
          drawerType={drawerType} 
        />
      </div>
    </div>
  );
};

export default VehiclePageContent;
