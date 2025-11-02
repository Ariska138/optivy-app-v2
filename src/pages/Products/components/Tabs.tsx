import React from 'react';
import { ProductCategory } from '../../../types';

interface TabsProps {
  activeTab: ProductCategory;
  setActiveTab: (tab: ProductCategory) => void;
}

const TABS: { id: ProductCategory; label: string }[] = [
  { id: ProductCategory.Fisik, label: 'Fisik' },
  { id: ProductCategory.Digital, label: 'Digital' },
  { id: ProductCategory.LMS, label: 'LMS' },
  { id: ProductCategory.Lead, label: 'Lead' },
];

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="grid grid-cols-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`py-3 text-center border-b-2 transition-colors duration-200 ${
              activeTab === tab.id
                ? 'tab-active'
                : 'border-transparent text-gray-500 hover:bg-violet-50 hover:text-violet-600'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

