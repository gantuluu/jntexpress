import React from 'react';
import { ChevronRight } from 'lucide-react';

export const EventList = () => {
  const events = [
    {
      title: "Promo J&T Super",
      image: "https://picsum.photos/seed/jnt1/400/200",
      description: "Dapatkan diskon hingga 50% untuk pengiriman antar kota."
    },
    {
      title: "J&T Express Anniversary",
      image: "https://picsum.photos/seed/jnt2/400/200",
      description: "Rayakan bersama kami dan menangkan hadiah menarik."
    }
  ];

  return (
    <div className="py-4">
      <div className="px-4 flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-gray-800 italic">PROMO & EVENT</h2>
        <button className="text-jnt-red text-xs font-bold flex items-center">
          Lihat Semua <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
        {events.map((event, index) => (
          <div key={index} className="min-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <img src={event.image} alt={event.title} className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{event.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NewsList = () => {
  const news = [
    {
      title: "Layanan Baru: J&T Cargo Kini Hadir",
      image: "https://picsum.photos/seed/news1/100/100",
      date: "2024-03-01"
    },
    {
      title: "Tips Packing Aman untuk Barang Pecah Belah",
      image: "https://picsum.photos/seed/news2/100/100",
      date: "2024-02-28"
    }
  ];

  return (
    <div className="py-4">
      <div className="px-4 flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-gray-800 italic">BERITA TERBARU</h2>
      </div>
      
      <div className="px-4 space-y-4">
        {news.map((item, index) => (
          <div key={index} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-sm text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
              <span className="text-[10px] text-gray-400 font-medium">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
