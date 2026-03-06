import React, { useState } from 'react';
import { User, Settings, LogOut, ChevronRight, History, CreditCard, ShieldCheck } from 'lucide-react';
import { Card, Button, Input } from '../../../components/Common';

export const ProfileView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');

  if (!isLoggedIn) {
    return (
      <div className="p-6 min-h-[80vh] flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-jnt-red text-white rounded-3xl flex items-center justify-center mx-auto mb-4 rotate-12 shadow-xl">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black italic">SELAMAT DATANG</h2>
          <p className="text-gray-500 text-sm">Masuk untuk menikmati fitur lengkap J&T</p>
        </div>

        <Card className="space-y-4 mb-6">
          {view === 'login' ? (
            <>
              <Input label="No. Telepon" placeholder="0812..." />
              <Input label="Kata Sandi" type="password" placeholder="••••••••" />
              <Button onClick={() => setIsLoggedIn(true)}>Masuk</Button>
            </>
          ) : (
            <>
              <Input label="Nama Lengkap" placeholder="Contoh: Budi" />
              <Input label="Email" type="email" placeholder="budi@example.com" />
              <Input label="No. Telepon" placeholder="0812..." />
              <Input label="Kata Sandi" type="password" placeholder="••••••••" />
              <Button onClick={() => setIsLoggedIn(true)}>Daftar</Button>
            </>
          )}
        </Card>

        <button 
          onClick={() => setView(view === 'login' ? 'register' : 'login')}
          className="text-sm font-bold text-gray-500 hover:text-jnt-red transition-colors"
        >
          {view === 'login' ? 'Belum punya akun? Daftar sekarang' : 'Sudah punya akun? Masuk'}
        </button>
      </div>
    );
  }

  const menuItems = [
    { icon: History, label: 'Riwayat Pengiriman', count: 5 },
    { icon: CreditCard, label: 'Metode Pembayaran' },
    { icon: ShieldCheck, label: 'Keamanan Akun' },
    { icon: Settings, label: 'Pengaturan' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-jnt-red pt-12 pb-20 px-6 rounded-b-[40px] relative">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-jnt-red" />
          </div>
          <div className="text-white">
            <h2 className="text-xl font-black italic">BUDI SANTOSO</h2>
            <p className="text-white/70 text-sm">0812-3456-7890</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-10 space-y-4">
        <Card className="grid grid-cols-3 gap-4 text-center py-6">
          <div>
            <div className="text-lg font-black text-jnt-red italic">12</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Dikirim</div>
          </div>
          <div className="border-x border-gray-100">
            <div className="text-lg font-black text-jnt-red italic">3</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Proses</div>
          </div>
          <div>
            <div className="text-lg font-black text-jnt-red italic">45</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Selesai</div>
          </div>
        </Card>

        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button key={index} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-700 text-sm">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && <span className="bg-jnt-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.count}</span>}
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          ))}
        </div>

        <button 
          onClick={() => setIsLoggedIn(false)}
          className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold text-sm"
        >
          <LogOut className="w-4 h-4" />
          Keluar Akun
        </button>
      </div>
    </div>
  );
};
