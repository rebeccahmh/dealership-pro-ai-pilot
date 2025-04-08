
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
      variant="blue" 
      className="flex items-center gap-1" 
      size="sm"
      onClick={handleNewVehicle}
    >
      <Plus className="h-4 w-4" />
      New Vehicle
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
      onClick={handleInPrep}
    >
      In Prep
    </Button>
    <Button 
      variant="blue" 
      size="sm"
      onClick={handleArchive}
    >
      Archive
    </Button>
    <Button 
      variant="blue" 
      size="sm"
      onClick={handleAvailable}
    >
      Available
    </Button>
  </div>
);

export default CustomVehicleActionButtons;
