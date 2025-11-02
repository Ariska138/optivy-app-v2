import React from 'react';

export const Card: React.FC<{ title: string; children: React.ReactNode; showViewAll?: boolean; className?: string }> = ({ title, children, showViewAll = false, className }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-lg ${className}`}>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{title}</h3>
            {showViewAll && <a href="#" className="text-sm text-violet-600 font-semibold">View All</a>}
        </div>
        {children}
    </div>
);
