import React, { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Mail, Printer, Download, Archive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import VehicleDrawer from './drawers/VehicleDrawer';
import CustomerDrawer from './drawers/CustomerDrawer';
import TransactionDrawer from './drawers/TransactionDrawer';
import DemandDrawer from './drawers/DemandDrawer';

type ActionBarProps = {
  title: string;
  count?: number;
  icon?: ReactNode;
  actions?: Array<'email' | 'export' | 'print' | 'archive' | 'close'>;
  customActions?: ReactNode;
  onClose?: () => void;
  pageName?: 'vehicles' | 'customers' | 'transactions' | 'demand' | 'marketing';
};

const ActionBar = ({ 
  title, 
  count, 
  icon, 
  actions = ['email', 'export', 'print', 'close'], 
  customActions,
  onClose,
  pageName = 'vehicles'
}: ActionBarProps) => {
  const { toast } = useToast();
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      toast({
        title: "Close Action",
        description: "Close button clicked",
      });
    }
  };
  
  const handleEmail = () => {
    if (pageName === 'vehicles') {
      setOpenDrawer('email');
    } else if (pageName === 'customers') {
      setOpenDrawer('email');
    } else if (pageName === 'transactions') {
      setOpenDrawer('email');
    } else if (pageName === 'demand') {
      setOpenDrawer('email');
    } else if (pageName === 'marketing') {
      setOpenDrawer('email');
    } else {
      toast({
        title: "Email Action",
        description: "Email button clicked",
      });
    }
  };
  
  const handleExport = () => {
    if (pageName === 'vehicles') {
      setOpenDrawer('export');
    } else if (pageName === 'customers') {
      setOpenDrawer('export');
    } else if (pageName === 'transactions') {
      setOpenDrawer('export');
    } else if (pageName === 'demand') {
      setOpenDrawer('export');
    } else if (pageName === 'marketing') {
      setOpenDrawer('export');
    } else {
      toast({
        title: "Export Action",
        description: "Export button clicked",
      });
    }
  };
  
  const handlePrint = () => {
    if (pageName === 'vehicles') {
      setOpenDrawer('print');
    } else if (pageName === 'customers') {
      setOpenDrawer('print');
    } else if (pageName === 'transactions') {
      setOpenDrawer('print');
    } else if (pageName === 'demand') {
      setOpenDrawer('print');
    } else if (pageName === 'marketing') {
      setOpenDrawer('print');
    } else {
      toast({
        title: "Print Action",
        description: "Print button clicked",
      });
    }
  };
  
  const handleArchive = () => {
    if (pageName === 'vehicles') {
      setOpenDrawer('archive');
    } else if (pageName === 'customers') {
      setOpenDrawer('archive');
    } else if (pageName === 'transactions') {
      setOpenDrawer('archive');
    } else if (pageName === 'demand') {
      setOpenDrawer('archive');
    } else {
      toast({
        title: "Archive Action",
        description: "Archive button clicked",
      });
    }
  };

  const handleNewVehicle = () => {
    setOpenDrawer('new');
  };

  const handleImport = () => {
    if (pageName === 'vehicles') {
      setOpenDrawer('import');
    } else if (pageName === 'customers') {
      setOpenDrawer('import');
    } else {
      toast({
        title: "Import Action",
        description: "Import button clicked",
      });
    }
  };

  const handleInPrep = () => {
    if (pageName === 'vehicles') {
      setOpenDrawer('prep');
    } else {
      toast({
        title: "In Prep Action",
        description: "In Prep button clicked",
      });
    }
  };

  const handleAvailable = () => {
    if (pageName === 'vehicles') {
      setOpenDrawer('available');
    } else {
      toast({
        title: "Available Action",
        description: "Available button clicked",
      });
    }
  };

  const handleAddCustomer = () => {
    setOpenDrawer('add');
  };
  
  const closeDrawer = () => {
    setOpenDrawer(null);
  };
  
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg mb-4 shadow-sm">
      <div className="flex items-center space-x-2 text-autoretech-blue font-medium">
        {icon}
        <span>{title}{count !== undefined ? ` - ${count}` : ''}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        {customActions && React.cloneElement(customActions as React.ReactElement, {
          handleNewVehicle,
          handleImport,
          handleInPrep,
          handleArchive,
          handleAvailable,
          handleAddCustomer
        })}
        
        <div className="bg-autoretech-blue text-white rounded-full flex items-center">
          {actions.includes('archive') && (
            <Button 
              variant="ghost" 
              className="text-white hover:bg-autoretech-blue/90 px-3" 
              size="sm" 
              onClick={handleArchive}
            >
              <Archive className="h-4 w-4 mr-1" />
              Archive
            </Button>
          )}
          
          {actions.includes('email') && (
            <Button 
              variant="ghost" 
              className="text-white hover:bg-autoretech-blue/90 px-3" 
              size="sm" 
              onClick={handleEmail}
            >
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
          )}
          
          {actions.includes('export') && (
            <Button 
              variant="ghost" 
              className="text-white hover:bg-autoretech-blue/90 px-3" 
              size="sm" 
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          )}
          
          {actions.includes('print') && (
            <Button 
              variant="ghost" 
              className="text-white hover:bg-autoretech-blue/90 px-3" 
              size="sm" 
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          )}
          
          {actions.includes('close') && (
            <Button 
              variant="ghost" 
              className="text-white hover:bg-autoretech-blue/90 rounded-r-full px-3 ml-1" 
              size="sm" 
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Vehicle-specific drawers */}
      {pageName === 'vehicles' && (
        <VehicleDrawer 
          isOpen={openDrawer !== null}
          onClose={closeDrawer}
          drawerType={openDrawer as any || 'new'}
        />
      )}

      {/* Customer-specific drawers */}
      {pageName === 'customers' && (
        <CustomerDrawer 
          isOpen={openDrawer !== null}
          onClose={closeDrawer}
          drawerType={openDrawer as any || 'add'}
        />
      )}

      {/* Transaction-specific drawers */}
      {pageName === 'transactions' && (
        <TransactionDrawer 
          isOpen={openDrawer !== null}
          onClose={closeDrawer}
          drawerType={openDrawer as any || 'add'}
        />
      )}

      {/* Demand-specific drawers */}
      {pageName === 'demand' && (
        <DemandDrawer 
          isOpen={openDrawer !== null}
          onClose={closeDrawer}
          drawerType={openDrawer as any || 'add'}
        />
      )}
    </div>
  );
};

export default ActionBar;
