import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from './components/UserHeader';
import UserFooter from './components/UserFooter';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UserHeader />
      <main className="min-h-screen flex flex-col pt-20">
        <Outlet /> 
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
