import React from 'react';

export const Select = ({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
      className={`w-full p-1.5 border border-gray-300 rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${className || ''}`}
      {...props}
    />
);
