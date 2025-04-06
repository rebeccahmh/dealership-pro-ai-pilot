
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { X, Mail, Printer, Download, Archive } from 'lucide-react';

type ActionBarProps = {
  title: string;
  count?: number;
  icon?: ReactNode;
  actions?: Array<'email' | 'export' | 'print' | 'archive' | 'close'>;
  customActions?: ReactNode;
};

const ActionBar = ({ title, count, icon, actions = ['email', 'export', 'print', 'close'], customActions }: ActionBarProps) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg mb-4">
      <div className="flex items-center space-x-2 text-autoretech-blue font-medium">
        {icon}
        <span>{title}{count !== undefined ? ` - ${count}` : ''}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        {customActions}
        
        <div className="bg-autoretech-blue text-white rounded-full flex items-center">
          {actions.includes('archive') && (
            <Button variant="ghost" className="text-white hover:bg-autoretech-blue/90 px-3" size="sm">
              <Archive className="h-4 w-4 mr-1" />
              Archive
            </Button>
          )}
          
          {actions.includes('email') && (
            <Button variant="ghost" className="text-white hover:bg-autoretech-blue/90 px-3" size="sm">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
          )}
          
          {actions.includes('export') && (
            <Button variant="ghost" className="text-white hover:bg-autoretech-blue/90 px-3" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          )}
          
          {actions.includes('print') && (
            <Button variant="ghost" className="text-white hover:bg-autoretech-blue/90 px-3" size="sm">
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          )}
          
          {actions.includes('close') && (
            <Button variant="ghost" className="text-white hover:bg-autoretech-blue/90 rounded-r-full px-3 ml-1" size="sm">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
