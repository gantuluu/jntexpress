import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './app/mainLayout/MainLayout';
import { HomeView } from './app/views/HomeView/HomeView';
import { OrderView } from './app/views/OrderView/OrderView';
import { ScanView } from './app/views/ScanView/ScanView';
import { OutletView } from './app/views/OutletView/OutletView';
import { ProfileView } from './app/views/ProfileView/ProfileView';
import { TrackingPage } from './app/views/TrackingPage/TrackingPage';
import { PaymentView } from './app/views/PaymentView/PaymentView';
import { SplashscreenView } from './app/views/SplashscreenView/SplashscreenView';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowSplash(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleEnterApp = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashscreenView onEnter={handleEnterApp} />}
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomeView />} />
            <Route path="/order" element={<OrderView />} />
            <Route path="/scan" element={<ScanView />} />
            <Route path="/outlet" element={<OutletView />} />
            <Route path="/profile" element={<ProfileView />} />
          </Route>
          <Route path="/tracking/:resi" element={<TrackingPage />} />
          <Route path="/payment" element={<PaymentView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
