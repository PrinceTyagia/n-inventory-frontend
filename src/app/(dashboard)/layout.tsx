

import React, { ReactNode } from 'react';
import { Menu, Home, Settings, LogOut } from 'lucide-react';
import Sidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white w-full">
    {/* Sidebar */}
    <Sidebar />
  
    {/* Main Content Wrapper */}
    <div className="flex-1 flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Top Navbar */}
      <Header />
  
      {/* Page Content (scrollable) */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  </div>
  );
};

export default DashboardLayout;
