import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

interface OutletContextType {
  toggleMobileSidebar: () => void;
  setHeaderActions: (actions: React.ReactNode) => void;
}

const routeTitles: { [key: string]: string } = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/orders': 'Manajemen Order',
  '/products': 'Produk',
  '/discount-codes': 'Kelola Kode Diskon',
  '/local-payments': 'Pembayaran Lokal',
  '/domains': 'Kelola Domain',
  '/team': 'Kelola Tim',
  '/integrations': 'Kelola Integrasi',
};

const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [headerActions, setHeaderActions] = useState<React.ReactNode>(null);
  const [headerTitle, setHeaderTitle] = useState('Dashboard');

  const location = useLocation();

  useEffect(() => {
    setHeaderTitle(routeTitles[location.pathname] || 'Dashboard');
  }, [location.pathname]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const outletContext: OutletContextType = {
    toggleMobileSidebar,
    setHeaderActions,
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header title={headerTitle} onMenuButtonClick={toggleMobileSidebar}>
          {headerActions}
        </Header>
        <Outlet context={outletContext} />
      </main>
    </div>
  );
};

export default App;

