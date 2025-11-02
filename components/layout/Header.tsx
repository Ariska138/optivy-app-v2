import React from 'react';

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
    return (
        <header className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    <p className="text-sm text-gray-500 mt-1">Sunday, 05 August 2021</p>
                </div>
                {children}
            </div>
        </header>
    );
};
