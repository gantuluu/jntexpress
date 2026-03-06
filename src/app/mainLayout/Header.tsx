import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  Package, 
  Truck, 
  MapPin, 
  User, 
  Home, 
  Settings,
  HelpCircle,
  X
} from 'lucide-react';

const LOGO_URL = "https://uploads.onecompiler.io/43y3uz32c/44aggzewf/J&T_Express_logo.svg.png";

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <button 
        onClick={toggleSidebar}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
      
      <div className="flex items-center h-8">
        <img 
          src={LOGO_URL} 
          alt="J&T Express Logo" 
          className="h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/120x40?text=J%26T+Express";
          }}
        />
      </div>

      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
        <Bell className="w-6 h-6 text-gray-700" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-[#E31D1A] rounded-full border-2 border-white"></span>
      </button>
    </header>
  );
};

export const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Package, label: 'Kiriman Saya' },
    { icon: Truck, label: 'Tarif & Waktu' },
    { icon: MapPin, label: 'Drop Point' },
    { icon: User, label: 'Profil' },
    { icon: Settings, label: 'Pengaturan' },
    { icon: HelpCircle, label: 'Pusat Bantuan' },
  ];

  return (
    <>
      {/* Overlay/Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
          onClick={onClose}
        />
      )}
      
      {/* Menu Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-[60] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 flex justify-between items-center border-b">
          <div className="h-6">
            <img src={LOGO_URL} alt="J&T Logo" className="h-full object-contain" />
          </div>
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className="w-full flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-[#E31D1A] transition-colors"
            >
              <item.icon className="w-5 h-5 mr-4" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};


