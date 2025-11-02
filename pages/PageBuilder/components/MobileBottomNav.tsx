import React from 'react';
import { Plus, Settings } from 'lucide-react';

/**
 * A specialized bottom navigation component for mobile view.
 * @param onAddComponentClick - Function to open the components panel.
 * @param onPropertiesClick - Function to open the properties panel.
 * @param propertiesEnabled - Boolean to enable the properties button.
 * @param activePanel - The currently active mobile panel.
 */
export const MobileBottomNav: React.FC<{
    onAddComponentClick: () => void;
    onPropertiesClick: () => void;
    propertiesEnabled: boolean;
    activePanel: 'components' | 'properties' | 'none';
}> = ({ onAddComponentClick, onPropertiesClick, propertiesEnabled, activePanel }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex justify-around items-center z-40">
            <button
                onClick={onAddComponentClick}
                className={`flex flex-col items-center gap-1 text-xs font-medium ${activePanel === 'components' ? 'text-violet-600' : 'text-gray-500'}`}
                aria-label="Add component"
            >
                <Plus size={24} />
                <span>Add</span>
            </button>
            <button
                onClick={onPropertiesClick}
                disabled={!propertiesEnabled}
                className={`flex flex-col items-center gap-1 text-xs font-medium disabled:text-gray-300 ${activePanel === 'properties' ? 'text-violet-600' : 'text-gray-500'}`}
                aria-label="View properties"
            >
                <Settings size={24} />
                <span>Properties</span>
            </button>
        </div>
    );
};
