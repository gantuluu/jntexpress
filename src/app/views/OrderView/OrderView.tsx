import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input, Button, Card } from '../../../components/Common';
import { createOrder } from '../../../services/airtableService';
import { motion, AnimatePresence } from 'motion/react';

export const OrderView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'pickup';
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    // Structure for Airtable
    const orderData = {
      pengirim: JSON.stringify({
        nama: data.sender_name,
        telepon: data.sender_phone,
        alamat: data.sender_address,
      }),
      penerima: JSON.stringify({
        nama: data.receiver_name,
        telepon: data.receiver_phone,
        alamat: data.receiver_address,
      }),
      package_info: JSON.stringify({
        weight: data.package_weight,
        type: data.package_type,
      }),
      tagihan: JSON.stringify([
        { item: "Biaya Pengiriman", biaya: 15000, fee: 0, status: "Unpaid" }
      ]),
    };

    const result = await createOrder(orderData);
    if (result) {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center flex-1">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-black italic mb-2">BERHASIL!</h2>
        <p className="text-gray-500 mb-6">Pesanan Anda telah dibuat. Kurir akan segera menghubungi Anda.</p>
        <Button onClick={() => setSuccess(false)}>Buat Pesanan Baru</Button>
      </div>
    );
  }

  return (
    <div className="p-4 flex-1">
      <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
        <button
          onClick={() => setSearchParams({ tab: 'pickup' })}
          className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'pickup' ? 'bg-white shadow-sm text-jnt-red' : 'text-gray-500'}`}
        >
          Pick Up
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'dropoff' })}
          className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'dropoff' ? 'bg-white shadow-sm text-jnt-red' : 'text-gray-500'}`}
        >
          Drop Off
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-4">
          <h3 className="font-black italic text-gray-800 border-l-4 border-jnt-red pl-2">DATA PENGIRIM</h3>
          <Card className="space-y-4">
            <Input name="sender_name" label="Nama Pengirim" placeholder="Contoh: Budi" required />
            <Input name="sender_phone" label="No. Telepon" placeholder="0812..." required />
            <Input name="sender_address" label="Alamat Lengkap" placeholder="Jl. Merdeka No. 1..." required />
          </Card>
        </section>

        <section className="space-y-4">
          <h3 className="font-black italic text-gray-800 border-l-4 border-jnt-red pl-2">DATA PENERIMA</h3>
          <Card className="space-y-4">
            <Input name="receiver_name" label="Nama Penerima" placeholder="Contoh: Ani" required />
            <Input name="receiver_phone" label="No. Telepon" placeholder="0852..." required />
            <Input name="receiver_address" label="Alamat Lengkap" placeholder="Jl. Melati No. 10..." required />
          </Card>
        </section>

        <section className="space-y-4">
          <h3 className="font-black italic text-gray-800 border-l-4 border-jnt-red pl-2">DETAIL PAKET</h3>
          <Card className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="package_weight" label="Berat (kg)" type="number" defaultValue="1" required />
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Jenis Paket</label>
                <select name="package_type" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-jnt-red/20">
                  <option>Dokumen</option>
                  <option>Elektronik</option>
                  <option>Pakaian</option>
                  <option>Makanan</option>
                  <option>Lainnya</option>
                </select>
              </div>
            </div>
          </Card>
        </section>

        <Button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : activeTab === 'pickup' ? 'Pesan Pick Up' : 'Buat Drop Off'}
        </Button>
      </form>
    </div>
  );
};
