import React from 'react';
import Nav from '@/components/Nav';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Nav />
      <main className="flex-1 bg-gray-100 px-6 pb-6 pt-20 md:pt-8 text-black font-poppins">
        {children}
      </main>
    </div>
  );
};

export default LayoutDashboard;
