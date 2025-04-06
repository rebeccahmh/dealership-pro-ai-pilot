
import React from 'react';
import { BarChartBig, Plus, Upload } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';

const Marketing = () => {
  const handleAddCampaign = () => {
    alert('Add marketing campaign functionality will be implemented here');
  };

  const handleImport = () => {
    alert('Import marketing data functionality will be implemented here');
  };

  const handlePublish = () => {
    alert('Publish marketing campaign functionality will be implemented here');
  };
  
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
                  <div className="flex space-x-2 mr-2">
                    <Button 
                      variant="ghost" 
                      className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3 flex items-center gap-1" 
                      size="sm"
                      onClick={handleAddCampaign}
                    >
                      <Plus className="h-4 w-4" />
                      New Campaign
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
                      onClick={handlePublish}
                    >
                      Publish now
                    </Button>
                  </div>
                }
              />
              
              <EmptyState 
                message="There are no marketing records to display" 
                actionLabel="Create Campaign"
                onAction={handleAddCampaign}
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

export default Marketing;
