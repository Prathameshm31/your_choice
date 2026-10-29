import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnnouncementBar from '../components/layout/AnnouncementBar';

const StoreLayout = () => {
  return (
    <div>
      <AnnouncementBar />
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 400px)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default StoreLayout;
