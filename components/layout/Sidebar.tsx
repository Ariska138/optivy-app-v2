import React from 'react';
import type { PageType } from '../../types';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
  isCollapsed,
}) => (
  <button
    onClick={onClick}
    title={isCollapsed ? label : ''}
    className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
      isActive
        ? 'bg-violet-600 text-white font-semibold shadow-md'
        : 'text-gray-600 hover:bg-violet-50 hover:text-violet-700'
    } ${isCollapsed ? 'justify-center' : ''}`}
  >
    {icon}
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </button>
);

const NavHeader: React.FC<{ label: string; isCollapsed: boolean }> = ({
  label,
  isCollapsed,
}) => {
  if (isCollapsed) {
    return (
      <div className="h-8 flex items-center justify-center">
        <div className="w-1/2 border-t border-gray-200"></div>
      </div>
    );
  }
  return (
    <div className="pt-4 pb-1 px-4 text-xs text-gray-400 uppercase font-semibold tracking-wider">
      {label}
    </div>
  );
};

const DashboardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 10v11h6v-7h6v7h6V10L12 3z"
    ></path>
  </svg>
);
const OrdersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    ></path>
  </svg>
);
const ProductsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    ></path>
  </svg>
);
const DiscountIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 0l-2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);
const PaymentIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    ></path>
  </svg>
);
const DomainsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9m-9 9a9 9 0 009 9m-9-9h18"
    />
  </svg>
);
const TeamIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a3.001 3.001 0 015.288 0M12 14a4 4 0 100-8 4 4 0 000 8z"
    />
  </svg>
);
const IntegrationsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    ></path>
  </svg>
);
const LogoutIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

interface SidebarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (isCollapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setCurrentPage,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
}) => {
  return (
    <aside
      className={`bg-white text-gray-800 flex flex-col hidden sm:flex border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div
        className={`p-6 text-2xl font-bold text-center border-b border-gray-200`}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">
          {isSidebarCollapsed ? 'D' : 'Dashyat'}
        </span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <NavItem
          label="Dashboard"
          icon={<DashboardIcon />}
          isActive={currentPage === 'dashboard'}
          onClick={() => setCurrentPage('dashboard')}
          isCollapsed={isSidebarCollapsed}
        />

        <NavHeader label="Sales" isCollapsed={isSidebarCollapsed} />
        <NavItem
          label="Manajemen Order"
          icon={<OrdersIcon />}
          isActive={currentPage === 'orders'}
          onClick={() => setCurrentPage('orders')}
          isCollapsed={isSidebarCollapsed}
        />
        <NavItem
          label="Produk"
          icon={<ProductsIcon />}
          isActive={
            currentPage === 'products' || currentPage === 'product-creation'
          }
          onClick={() => setCurrentPage('products')}
          isCollapsed={isSidebarCollapsed}
        />

        <NavHeader label="Marketing" isCollapsed={isSidebarCollapsed} />
        <NavItem
          label="Kelola Kode Diskon"
          icon={<DiscountIcon />}
          isActive={currentPage === 'discount-codes'}
          onClick={() => setCurrentPage('discount-codes')}
          isCollapsed={isSidebarCollapsed}
        />

        <NavHeader label="Settings" isCollapsed={isSidebarCollapsed} />
        <NavItem
          label="Pembayaran Lokal"
          icon={<PaymentIcon />}
          isActive={currentPage === 'local-payments'}
          onClick={() => setCurrentPage('local-payments')}
          isCollapsed={isSidebarCollapsed}
        />
        <NavItem
          label="Kelola Domain"
          icon={<DomainsIcon />}
          isActive={currentPage === 'domains'}
          onClick={() => setCurrentPage('domains')}
          isCollapsed={isSidebarCollapsed}
        />
        <NavItem
          label="Kelola Tim"
          icon={<TeamIcon />}
          isActive={currentPage === 'team'}
          onClick={() => setCurrentPage('team')}
          isCollapsed={isSidebarCollapsed}
        />
        <NavItem
          label="Kelola Integrasi"
          icon={<IntegrationsIcon />}
          isActive={currentPage === 'integrations'}
          onClick={() => setCurrentPage('integrations')}
          isCollapsed={isSidebarCollapsed}
        />
      </nav>
      <div className="mt-auto">
        <div className="p-4">
          <button
            onClick={() => alert('Logout clicked!')}
            title={isSidebarCollapsed ? 'Logout' : ''}
            className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 text-red-500 hover:bg-red-50 font-semibold ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogoutIcon />
            {!isSidebarCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center py-2.5 rounded-lg text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition-colors duration-200"
            title={
              isSidebarCollapsed ? 'Perluas Sidebar' : 'Minimalkan Sidebar'
            }
          >
            <i
              className={`fa-solid ${
                isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'
              }`}
            ></i>
          </button>
        </div>
      </div>
    </aside>
  );
};
