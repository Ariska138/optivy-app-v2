import React from 'react';

// FIX: Updated component to correctly merge passed className with default styles, preventing style overrides.
export const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        className={`w-full p-1.5 border border-border-color rounded bg-input-bg text-sm focus:outline-none focus:ring-2 focus:ring-accent ${className || ''}`}
        rows={3}
        {...props}
    />
);
