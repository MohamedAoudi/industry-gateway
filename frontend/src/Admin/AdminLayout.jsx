import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
// import Footer from './Footer';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 custom-scrollbar">
          <Outlet /> {/* Les pages Admin s'afficheront ici */}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default AdminLayout;