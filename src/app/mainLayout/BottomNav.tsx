import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, Scan, MapPin, User } from 'lucide-react';
import { cn } from '../../utils/cn';

export const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Package, label: 'Order', path: '/order' },
    { icon: Scan, label: 'Scan', path: '/scan' },
    { icon: MapPin, label: 'Outlet', path: '/outlet' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto glass-nav px-2 py-3 flex justify-around items-center z-50 rounded-t-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center p-2 rounded-2xl transition-all duration-300 active:scale-90",
              isActive ? "text-jnt-red" : "text-gray-400"
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon className={cn("w-6 h-6 transition-transform", isActive && "scale-110")} />
              <span className="text-[10px] mt-1 font-bold tracking-tight">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
