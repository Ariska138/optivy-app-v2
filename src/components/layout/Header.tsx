
import React from 'react';

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
    onMenuButtonClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, children, onMenuButtonClick }) => {
    return (
        <header className="bg-white border-b border-gray-200 p-4 sm:p-6 sticky top-0 z-30">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={onMenuButtonClick}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none sm:hidden mr-4"
                        aria-label="Open sidebar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Sunday, 05 August 2021</p>
                    </div>
                </div>
                {children}
            </div>
        </header>
    );
};
