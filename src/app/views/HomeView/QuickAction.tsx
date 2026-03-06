import React from 'react';
import { Truck, Package, Scan, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickAction = () => {
  const navigate = useNavigate();
  
  const actions = [
    { icon: Truck, label: 'Pick Up', path: '/order?tab=pickup', color: 'bg-red-50 text-red-600' },
    { icon: Package, label: 'Drop Off', path: '/order?tab=dropoff', color: 'bg-blue-50 text-blue-600' },
    { icon: Scan, label: 'Scan', path: '/scan', color: 'bg-orange-50 text-orange-600' },
    { icon: MapPin, label: 'Outlet', path: '/outlet', color: 'bg-green-50 text-green-600' },
  ];

  return (
    <div className="px-4 py-6 grid grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => navigate(action.path)}
          className="flex flex-col items-center gap-3 group"
        >
          <div className={`w-16 h-16 ${action.color} rounded-[24px] flex items-center justify-center group-active:scale-90 transition-all shadow-sm border border-black/5`}>
            <action.icon className="w-8 h-8 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-tight">{action.label}</span>
        </button>
      ))}
    </div>
  );
};
