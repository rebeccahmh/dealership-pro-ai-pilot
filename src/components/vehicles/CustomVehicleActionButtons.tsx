
import React from 'react';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomVehicleActionButtonsProps {
  handleNewVehicle?: () => void;
  handleImport?: () => void;
  handleInPrep?: () => void;
  handleArchive?: () => void;
  handleAvailable?: () => void;
}

const CustomVehicleActionButtons: React.FC<CustomVehicleActionButtonsProps> = ({ 
  handleNewVehicle, 
  handleImport, 
  handleInPrep, 
  handleArchive, 
  handleAvailable 
}) => (
  <div className="flex space-x-2 mr-2">
    <Button 
      variant="ghost" 
      className="bg-autoretech-blue text-white hover:bg-autoretech-blue/90 px-3 flex items-center gap-1" 
      size="sm"
      onClick={handleNewVehicle}
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
);

export default CustomVehicleActionButtons;
