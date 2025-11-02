import React from 'react';
import { ViewType } from '../../../types';

interface TabsProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const TabButton: React.FC<{
  label: string;
  view: ViewType;
  activeView: ViewType;
  onClick: (view: ViewType) => void;
}> = ({ label, view, activeView, onClick }) => {
  const isActive = activeView === view;
  const activeClasses = 'bg-[#5E35B1] text-white shadow-sm border-transparent';
  const inactiveClasses =
    'bg-white text-gray-600 border-gray-200 hover:bg-gray-50';

  return (
    <button
      onClick={() => onClick(view)}
      className={`py-2 px-5 font-semibold text-sm rounded-lg transition-all duration-200 ease-in-out border ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {label}
    </button>
  );
};

export const OrderDetailTabs: React.FC<TabsProps> = ({
  activeView,
  setActiveView,
}) => {
  return (
    <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 inline-flex flex-wrap gap-2">
      <TabButton
        label="Produk Fisik"
        view={ViewType.Physical}
        activeView={activeView}
        onClick={setActiveView}
      />
      <TabButton
        label="Produk Digital"
        view={ViewType.Digital}
        activeView={activeView}
        onClick={setActiveView}
      />
      <TabButton
        label="LMS"
        view={ViewType.LMS}
        activeView={activeView}
        onClick={setActiveView}
      />
      <TabButton
        label="Lead"
        view={ViewType.Lead}
        activeView={activeView}
        onClick={setActiveView}
      />
    </div>
  );
};

