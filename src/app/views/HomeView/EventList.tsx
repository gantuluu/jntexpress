import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { getEvents, getNews } from '../../../services/airtableService';

export const EventList = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-4 px-4">
        <div className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
      </div>
    );
  }

  if (events.length === 0) return null;

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
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews();
      setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="py-4 px-4 space-y-4">
        <div className="h-24 bg-gray-100 animate-pulse rounded-2xl"></div>
        <div className="h-24 bg-gray-100 animate-pulse rounded-2xl"></div>
      </div>
    );
  }

  if (news.length === 0) return null;

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
