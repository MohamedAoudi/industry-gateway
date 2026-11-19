import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from './components/UserHeader';
import UserFooter from './components/UserFooter';
import ChatbotWidget from './components/ChatbotWidget';
import { SearchPopupProvider } from './components/SearchPopup';

const UserLayout = () => {
  return (
    <SearchPopupProvider>
    <div className="min-h-screen flex flex-col bg-white">
      <UserHeader />
      <main className="min-h-screen flex flex-col pt-20">
        <Outlet /> 
      </main>
      <UserFooter />
      <ChatbotWidget />
    </div>
    </SearchPopupProvider>
  );
};

export default UserLayout;
