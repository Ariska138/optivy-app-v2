import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  DashboardIcon,
  DiscountIcon,
  DomainsIcon,
  FormsIcon,
  IntegrationsIcon,
  LogoutIcon,
  OrdersIcon,
  PaymentIcon,
  ProductsIcon,
  SubscriptionIcon,
  TeamIcon,
} from '../icons/sidebar-icon';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isCollapsed: boolean;
  end?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  to,
  isCollapsed,
  end = false,
}) => (
  <NavLink
    to={to}
    end={end}
    title={isCollapsed ? label : ''}
    className={({ isActive }) =>
      `w-full flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
        isActive
          ? 'bg-violet-600 text-white font-semibold shadow-md'
          : 'text-gray-600 hover:bg-violet-100 hover:text-violet-700'
      } ${isCollapsed ? 'justify-center' : ''}`
    }
  >
    {icon}
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </NavLink>
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

interface SidebarProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (isCollapsed: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}) => {
  const { logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <aside
        className={`bg-white text-gray-800 flex flex-col border-r border-gray-200 transition-transform duration-300 ease-in-out fixed sm:relative inset-y-0 left-0 z-50 w-64 
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        sm:translate-x-0 sm:flex 
        ${isSidebarCollapsed ? 'sm:w-20' : 'sm:w-64'}`}
      >
        <div
          className={`p-6 text-2xl font-bold text-center border-b border-gray-200`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">
            {isSidebarCollapsed ? 'O' : 'Optivy'}
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem
            label="Dashboard"
            icon={<DashboardIcon />}
            to="/dashboard"
            isCollapsed={isSidebarCollapsed}
            end
          />
          <NavHeader label="Sales" isCollapsed={isSidebarCollapsed} />
          <NavItem
            label="Manajemen Order"
            icon={<OrdersIcon />}
            to="/orders"
            isCollapsed={isSidebarCollapsed}
          />
          <NavItem
            label="Produk"
            icon={<ProductsIcon />}
            to="/products"
            isCollapsed={isSidebarCollapsed}
          />

          <NavItem
            label="Forms & Notif"
            icon={<FormsIcon />}
            to="/forms-notifications"
            isCollapsed={isSidebarCollapsed}
          />
          <NavHeader label="Marketing" isCollapsed={isSidebarCollapsed} />
          <NavItem
            label="Kelola Kode Diskon"
            icon={<DiscountIcon />}
            to="/discount-codes"
            isCollapsed={isSidebarCollapsed}
          />
          <NavHeader label="Settings" isCollapsed={isSidebarCollapsed} />
          <NavItem
            label="Pembayaran Lokal"
            icon={<PaymentIcon />}
            to="/local-payments"
            isCollapsed={isSidebarCollapsed}
          />
          <NavItem
            label="Kelola Domain"
            icon={<DomainsIcon />}
            to="/domains"
            isCollapsed={isSidebarCollapsed}
          />
          <NavItem
            label="Langganan"
            icon={<SubscriptionIcon />}
            to="/subscription"
            isCollapsed={isSidebarCollapsed}
          />
          <NavItem
            label="Kelola Tim"
            icon={<TeamIcon />}
            to="/team"
            isCollapsed={isSidebarCollapsed}
          />
          <NavItem
            label="Kelola Integrasi"
            icon={<IntegrationsIcon />}
            to="/integrations"
            isCollapsed={isSidebarCollapsed}
          />
        </nav>
        <div className="mt-auto">
          <div className="p-4">
            <button
              onClick={logout}
              title={isSidebarCollapsed ? 'Logout' : ''}
              className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 text-red-500 hover:bg-red-50 font-semibold ${
                isSidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <LogoutIcon />
              {!isSidebarCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
          <div className="p-4 border-t border-gray-200 hidden sm:block">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full flex items-center justify-center py-2.5 rounded-lg text-gray-600 hover:bg-violet-100 hover:text-violet-700 transition-colors duration-200"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
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
    </>
  );
};

