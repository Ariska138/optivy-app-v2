import React from 'react';

export const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        className={`w-full p-1.5 border border-gray-300 rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${className || ''}`}
        rows={3}
        {...props}
    />
);
