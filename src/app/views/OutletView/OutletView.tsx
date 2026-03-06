import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Card, Input } from '../../../components/Common';

export const OutletView = () => {
  const outlets = [
    {
      name: "J&T Makassar 01",
      kode_outlet: "MKS01",
      kota: "Makassar",
      alamat: "Jl. Pettarani No. 123",
      phone: "0411-123456",
      hours: "08:00 - 21:00"
    },
    {
      name: "J&T Makassar 02",
      kode_outlet: "MKS02",
      kota: "Makassar",
      alamat: "Jl. Hertasning No. 45",
      phone: "0411-654321",
      hours: "08:00 - 20:00"
    },
    {
      name: "J&T Gowa 01",
      kode_outlet: "GWA01",
      kota: "Gowa",
      alamat: "Jl. Sultan Hasanuddin No. 88",
      phone: "0411-999888",
      hours: "09:00 - 18:00"
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black italic">CARI OUTLET</h2>
        <Input placeholder="Cari kota atau nama outlet..." />
      </div>

      <div className="space-y-4">
        {outlets.map((outlet, index) => (
          <Card key={index} className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{outlet.name}</h3>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">{outlet.kode_outlet}</span>
              </div>
              <span className="text-xs font-bold text-jnt-red">{outlet.kota}</span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <span>{outlet.alamat}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{outlet.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{outlet.hours}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button className="flex-1 py-2 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg border border-gray-200 active:bg-gray-100">
                Petunjuk Arah
              </button>
              <button className="flex-1 py-2 bg-jnt-red/5 text-jnt-red text-xs font-bold rounded-lg border border-jnt-red/10 active:bg-jnt-red/10">
                Hubungi
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
