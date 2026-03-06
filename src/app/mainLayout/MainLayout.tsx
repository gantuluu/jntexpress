import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from './Header';
import { BottomNav } from './BottomNav';

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container flex flex-col">
      <Header toggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
