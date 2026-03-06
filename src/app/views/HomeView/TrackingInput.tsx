import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TrackingInput = () => {
  const [resi, setResi] = useState('');
  const navigate = useNavigate();

  const handleTrack = () => {
    if (resi.trim()) {
      navigate(`/tracking/${resi}`);
    }
  };

  return (
    <div className="px-4 py-2">
      <div className="relative group shadow-2xl shadow-black/5 rounded-[24px]">
        <input
          type="text"
          value={resi}
          onChange={(e) => setResi(e.target.value)}
          placeholder="Masukkan nomor resi..."
          className="w-full pl-6 pr-16 py-5 bg-white border-0 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-jnt-red/10 transition-all font-bold placeholder:text-gray-300"
        />
        <button
          onClick={handleTrack}
          className="absolute right-2 top-2 bottom-2 px-5 bg-jnt-red text-white rounded-2xl font-black flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-jnt-red/20"
        >
          <Search className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
