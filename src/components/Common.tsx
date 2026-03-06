import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 text-jnt-red animate-spin" />
  </div>
);

export const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`w-full bg-jnt-red text-white py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-jnt-red/20 disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const Card = ({ children, className, ...props }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100 p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const Input = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>}
    <input
      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-jnt-red/5 focus:border-jnt-red transition-all placeholder:text-gray-300"
      {...props}
    />
  </div>
);
