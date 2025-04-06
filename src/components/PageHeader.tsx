
import React from 'react';

type PageHeaderProps = {
  title: string;
  breadcrumb?: string;
};

const PageHeader = ({ title, breadcrumb = title }: PageHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-500">{breadcrumb}</div>
      <h1 className="text-2xl font-medium text-gray-800">{title}</h1>
    </div>
  );
};

export default PageHeader;
