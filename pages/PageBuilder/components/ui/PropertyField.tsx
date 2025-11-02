import React from 'react';

export const PropertyField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-text-secondary mb-1">{label}</label>
    {children}
  </div>
);
