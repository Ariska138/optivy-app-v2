import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';

const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-violet-50">
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      <main className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default App;

