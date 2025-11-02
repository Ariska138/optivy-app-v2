import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';

import DashboardPage from './pages/Dashboard/Dashboard.page';
import EditProfilePage from './pages/EditProfile/EditProfile.page';
// import OrderManagementPage from './pages/OrderManagement/OrderManagement.page';
// import ProductsPage from './pages/Products/Products.page';
// import DomainsPage from './pages/Domains/Domains.page';
// import TeamPage from './pages/Team/Team.page';
// import IntegrationsPage from './pages/Integrations/Integrations.page';
// import ProductCreationPage from './pages/ProductCreation/ProductCreation.page';

import type { PageType } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage setCurrentPage={setCurrentPage} />;
      case 'edit-profile':
        return <EditProfilePage setCurrentPage={setCurrentPage} />;
      // case 'orders':
      //     return <OrderManagementPage />;
      // case 'products':
      //     return <ProductsPage setCurrentPage={setCurrentPage} />;
      // case 'domains':
      //     return <DomainsPage />;
      // case 'team':
      //     return <TeamPage />;
      //   case 'integrations':
      //     return <IntegrationsPage />;
      //   case 'product-creation':
      //     return <ProductCreationPage setCurrentPage={setCurrentPage} />;
      default:
        return <DashboardPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-violet-50">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      <main className="flex-1 flex flex-col overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;

