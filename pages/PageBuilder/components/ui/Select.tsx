import React from 'react';

// FIX: Replaced invalid file content with a functional Select component. This resolves all compilation errors. It also correctly merges className props to prevent style overrides.
export const Select = ({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
      className={`w-full p-1.5 border border-border-color rounded bg-input-bg text-sm focus:outline-none focus:ring-2 focus:ring-accent ${className || ''}`}
      {...props}
    />
);
