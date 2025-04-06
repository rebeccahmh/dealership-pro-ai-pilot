
import React from 'react';
import { Button } from '@/components/ui/button';

type EmptyStateProps = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

const EmptyState = ({ 
  message, 
  actionLabel, 
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-8">
      <p className="text-gray-500 mb-4">{message}</p>
      
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex gap-4 mt-2">
          {actionLabel && onAction && (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
