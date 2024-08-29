import React from 'react';
import SidebarAdmin from '@/components/SidebarAdmin';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Head>
        <title>DiDesa - Dashboard</title>
        <meta name="description" content="Digitalisasi Desa" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <SidebarAdmin />
      <main className="flex-1 bg-gray-100 px-6 pb-6 pt-20 md:pt-8 text-black font-poppins w-full">
        {children}
      </main>
    </div>
  );
};

export default LayoutDashboard;
