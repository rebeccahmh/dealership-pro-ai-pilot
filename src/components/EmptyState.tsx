
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type EmptyStateProps = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  icon?: React.ReactNode;
};

const EmptyState = ({ 
  message, 
  actionLabel, 
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  icon
}: EmptyStateProps) => {
  const { toast } = useToast();
  
  const handlePrimaryAction = () => {
    if (onAction) {
      onAction();
    } else if (actionLabel) {
      toast({
        title: "Action triggered",
        description: `${actionLabel} action was clicked`,
      });
    }
  };
  
  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else if (secondaryActionLabel) {
      toast({
        title: "Secondary action triggered",
        description: `${secondaryActionLabel} action was clicked`,
      });
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-8 shadow-sm">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <p className="text-gray-500 mb-4 text-center">{message}</p>
      
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex gap-4 mt-2">
          {actionLabel && (
            <Button onClick={handlePrimaryAction} className="bg-autoretech-blue hover:bg-autoretech-blue/90">
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && (
            <Button variant="outline" onClick={handleSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
