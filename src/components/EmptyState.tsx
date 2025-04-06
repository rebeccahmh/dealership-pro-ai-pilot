
import React from 'react';

type EmptyStateProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center h-64 bg-white rounded-lg">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
