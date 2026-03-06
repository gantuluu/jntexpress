import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Package, MapPin, CreditCard, Info, CheckCircle2, Clock, Truck, History, Receipt, Undo2, User, Edit2, Save, X, ShieldCheck, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getTrackingData, updateTrackingData, getVAMethods } from '../../../services/airtableService';
import { parseJSONField } from '../../../utils/parseJSONField';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import { Card, Loader } from '../../../components/Common';
import { VAMethod } from '../../../types';

// Fix Leaflet marker icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapBounds = ({ points }: { points: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [points, map]);
  return null;
};

export const TrackingPage = () => {
  const { resi } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(resi || '');
  const [isEditingRefund, setIsEditingRefund] = useState(false);
  const [refundForm, setRefundForm] = useState({ bank: '', nomor_rekening: '', nama_rekening: '', jumlah_refund: 0 });
  const [vaMethods, setVaMethods] = useState<VAMethod[]>([]);
  const [selectedVA, setSelectedVA] = useState<VAMethod | null>(null);

  useEffect(() => {
    getVAMethods().then(setVaMethods);
  }, []);

  useEffect(() => {
    if (resi) {
      setLoading(true);
      if (resi.toUpperCase() === 'DEMO123') {
        // ... existing demo123 code ...
      } else if (resi.toUpperCase() === 'J123') {
        setTimeout(() => {
          setData({
            nomor_resi: "J123",
            pengirim: "{\"nama\":\"Budi Santoso\",\"telepon\":\"081234567890\",\"alamat\":\"Jl. Ahmad Yani No.12, Makassar\"}",
            penerima: "{\"nama\":\"Siti Rahma\",\"telepon\":\"082345678901\",\"alamat\":\"Jl. Perintis Kemerdekaan No.45, Gowa\"}",
            tagihan: "[{\"item\":\"Ongkir\",\"biaya\":15000,\"fee\":0,\"status\":\"sukses\"},{\"item\":\"Asuransi\",\"biaya\":5000,\"fee\":500,\"status\":\"sukses\"},{\"item\":\"Biaya COD\",\"biaya\":20000,\"fee\":1000,\"status\":\"pending\"}]",
            refund: "{\"bank\":\"BNI\",\"nama_rekening\":\"Budi Santoso\",\"nomor_rekening\":\"1234567890\"}",
            history: "[{\"timestamp\":\"2026-03-05T10:59:53.609Z\",\"event\":\"Update Data\",\"detail\":{\"user\":\"Admin\",\"device\":\"Mobile App\"}},{\"timestamp\":\"2026-03-05T11:09:38.470Z\",\"event\":\"Update Data\",\"detail\":{\"action\":\"Record Modified\",\"subtotal\":1560434}},{\"timestamp\":\"2026-03-05T11:12:49.555Z\",\"event\":\"Update Data\",\"detail\":{\"action\":\"Record Modified\",\"subtotal\":1560434}}]",
            subtotal: 1900000,
            kordinat: "{\"titik_asal\":\"-5.147665,119.432732\",\"titik_tujuan\":\"-5.200321,119.501234\"}",
            date: "2026-03-05T02:09:00.000Z",
            jumlah_refund: 3453934,
            status_pengiriman: 'Sedang Dikirim',
            riwayat_perjalanan: "[{\"status\":\"Pickup\",\"deskripsi\":\"Paket telah diambil oleh kurir\",\"lokasi\":\"Makassar\",\"date\":\"2026-03-05T10:15:00Z\"},{\"status\":\"Transit\",\"deskripsi\":\"Paket tiba di gudang transit\",\"lokasi\":\"Makassar Sorting Center\",\"date\":\"2026-03-05T13:40:00Z\"},{\"status\":\"Delivery\",\"deskripsi\":\"Paket sedang diantar kurir\",\"lokasi\":\"Gowa\",\"date\":\"2026-03-06T09:10:00Z\"}]"
          });
          setLoading(false);
        }, 1000);
      } else {
        getTrackingData(resi).then((res) => {
          setData(res);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, [resi]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/tracking/${searchInput.trim()}`);
    }
  };

  const startEditingRefund = () => {
    const currentRefund = parseJSONField(data.refund) || {};
    setRefundForm({
      bank: currentRefund.bank || '',
      nomor_rekening: currentRefund.nomor_rekening || '',
      nama_rekening: currentRefund.nama_rekening || '',
      jumlah_refund: data.jumlah_refund || 0
    });
    setIsEditingRefund(true);
  };

  const handleSaveRefund = async () => {
    if (!data.id) return;
    
    const updatedFields = {
      refund: JSON.stringify({
        bank: refundForm.bank,
        nomor_rekening: refundForm.nomor_rekening,
        nama_rekening: refundForm.nama_rekening
      })
    };

    const result = await updateTrackingData(data.id, updatedFields);
    if (result) {
      setData({ ...data, ...updatedFields });
      setIsEditingRefund(false);
    }
  };

  return (
    <div className="h-full bg-gray-50 flex justify-center">
      <div className="app-container flex flex-col bg-white">
        {/* Header */}
        <div className="bg-jnt-red text-white sticky top-0 z-20 shadow-md">
          <div className="px-4 sm:px-6 py-4 flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Lacak Paket</h1>
              <p className="text-[10px] opacity-80 font-medium uppercase tracking-widest">J&T Express Indonesia</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 bg-jnt-red pb-8 rounded-b-3xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Masukkan nomor resi..."
              className="w-full bg-white text-gray-800 px-4 py-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 font-bold placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-jnt-red text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-sm hover:bg-red-700 transition-colors"
            >
              Cari
            </button>
          </form>
        </div>

        <div className="flex-1 -mt-4 px-4 sm:px-6 pb-10 space-y-4 overflow-y-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <Loader />
              <p className="text-sm font-bold text-gray-400 animate-pulse">Mencari paket Anda...</p>
            </div>
          ) : !data && resi ? (
            <Card className="p-8 text-center space-y-4 mt-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Package className="w-8 h-8 text-gray-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Resi Tidak Ditemukan</h2>
                <p className="text-sm text-gray-500">Mohon periksa kembali nomor resi <span className="font-bold text-jnt-red">{resi}</span></p>
              </div>
              <button 
                onClick={() => setSearchInput('')} 
                className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Coba Lagi
              </button>
            </Card>
          ) : !resi ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-red-50 text-jnt-red rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Lacak Pengiriman Anda</h2>
                <p className="text-sm text-gray-500 px-10">Masukkan nomor resi J&T Express Anda untuk melihat status pengiriman terkini.</p>
              </div>
            </div>
          ) : (
            <>

              {/* Tracking Summary */}
              <Card className="overflow-hidden border-0 shadow-md p-0">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-jnt-red" />
                    <span className="text-xs font-bold text-gray-500">NOMOR RESI</span>
                  </div>
                  <span className="text-sm font-black italic text-jnt-red">{resi}</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Status Saat Ini</div>
                    <div className="text-lg font-black italic text-jnt-red leading-tight">{data.status_pengiriman}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Layanan</div>
                    <div className="text-sm font-bold text-gray-700">EZ (Reguler)</div>
                  </div>
                </div>
                
                {/* Weight & Dimensions */}
                {(data.berat || data.dimensi) && (
                  <div className="px-4 py-3 border-t border-gray-100 grid grid-cols-2 gap-4 bg-gray-50/50">
                    {data.berat && (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center">
                          <Truck className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-0.5">Berat</div>
                          <div className="text-xs font-bold text-gray-700">{data.berat}</div>
                        </div>
                      </div>
                    )}
                    {data.dimensi && (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center">
                          <Package className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-0.5">Dimensi</div>
                          <div className="text-xs font-bold text-gray-700">{data.dimensi}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>

              {/* Sender & Receiver */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 border-0 shadow-sm bg-blue-50/30">
                  <div className="text-[9px] font-bold text-blue-500 uppercase mb-1">Pengirim</div>
                  <div className="font-bold text-xs text-gray-800 truncate">{parseJSONField(data.pengirim)?.nama}</div>
                  <div className="text-[9px] text-gray-400 font-medium">{parseJSONField(data.pengirim)?.telepon}</div>
                  <div className="text-[10px] text-gray-500 truncate mt-1">{parseJSONField(data.pengirim)?.alamat?.split(',')[0]}</div>
                </Card>
                <Card className="p-3 border-0 shadow-sm bg-green-50/30">
                  <div className="text-[9px] font-bold text-green-500 uppercase mb-1">Penerima</div>
                  <div className="font-bold text-xs text-gray-800 truncate">{parseJSONField(data.penerima)?.nama}</div>
                  <div className="text-[9px] text-gray-400 font-medium">{parseJSONField(data.penerima)?.telepon}</div>
                  <div className="text-[10px] text-gray-500 truncate mt-1">{parseJSONField(data.penerima)?.alamat?.split(',')[0]}</div>
                </Card>
              </div>

              {/* Map View */}
              {(() => {
                const coords = parseJSONField(data.kordinat);
                const titikAsal = coords?.titik_asal || data.titik_asal;
                const titikTujuan = coords?.titik_tujuan || data.titik_tujuan;

                if (!titikAsal || !titikTujuan) return null;

                const origin = titikAsal.split(',').map(Number) as [number, number];
                const destination = titikTujuan.split(',').map(Number) as [number, number];

                return (
                  <Card className="overflow-hidden border-0 shadow-md h-[200px] relative z-0 p-0 -mx-4 sm:-mx-6">
                    <MapContainer 
                      center={origin} 
                      zoom={5} 
                      style={{ height: '100%', width: '100%' }}
                      zoomControl={false}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={origin}>
                        <Popup>Asal: {parseJSONField(data.pengirim)?.alamat}</Popup>
                      </Marker>
                      <Marker position={destination}>
                        <Popup>Tujuan: {parseJSONField(data.penerima)?.alamat}</Popup>
                      </Marker>
                      <Polyline 
                        positions={[origin, destination]} 
                        color="#e60012" 
                        weight={3}
                        dashArray="5, 10"
                      />
                      <MapBounds points={[origin, destination]} />
                    </MapContainer>
                    <div className="absolute  right-2 z-[1000] bg-white/90 backdrop-blur px-2 py-1 rounded text-[9px] font-bold text-jnt-red shadow-sm">
                      LIVE TRACKING
                    </div>
                  </Card>
                );
              })()}

              {/* Timeline */}
              <Card className="p-4 border-0 shadow-md space-y-6">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
                  <Clock className="w-4 h-4 text-jnt-red" />
                  <h3 className="font-bold text-sm text-gray-800 uppercase tracking-tight">Riwayat Perjalanan</h3>
                </div>
                
                <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                  {(parseJSONField(data.riwayat_perjalanan) || []).map((item: any, index: number) => (
                    <div key={index} className="relative pl-8">
                      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 ${index === 0 ? 'bg-jnt-red text-white' : 'bg-gray-200 text-gray-400'}`}>
                        {index === 0 ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 bg-current rounded-full" />}
                      </div>
                      <div className="space-y-1">
                        <div className={`text-sm font-bold leading-tight ${index === 0 ? 'text-jnt-red' : 'text-gray-700'}`}>{item.status}</div>
                        <div className="text-xs text-gray-500 leading-relaxed">{item.deskripsi}</div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                          <MapPin className="w-3 h-3" />
                          <span>{item.lokasi}</span>
                          <span className="mx-1">•</span>
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Billing Details */}
              {data.tagihan && (
                <div className="space-y-3">
                  <Card className="p-4 border-0 shadow-md space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
                      <Receipt className="w-4 h-4 text-jnt-red" />
                      <h3 className="font-bold text-sm text-gray-800 uppercase tracking-tight">Rincian Tagihan</h3>
                    </div>
                    <div className="space-y-3">
                      {parseJSONField(data.tagihan).map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div className="space-y-0.5">
                            <div className="font-bold text-gray-700">{item.item}</div>
                            <div className={`text-[9px] font-bold uppercase ${item.status === 'sukses' ? 'text-green-500' : 'text-orange-500'}`}>
                              {item.status}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-800">{formatCurrency(item.biaya)}</div>
                            {item.fee > 0 && <div className="text-[9px] text-gray-400">Fee: {formatCurrency(item.fee)}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Subtotal Card */}
                  <Card className="p-4 border-0 shadow-md flex justify-between items-center bg-gray-50/50">
                    <div className="text-xs font-bold text-gray-500 uppercase">Total Pembayaran</div>
                    <div className="text-lg font-black text-jnt-red italic">{formatCurrency(data.subtotal)}</div>
                  </Card>
                </div>
              )}

              {/* Refund Info */}
              {data.refund && (
                <Card className="overflow-hidden border-0 shadow-lg bg-white p-0">
                  <div className="bg-gray-900 px-5 py-4 flex items-center justify-between relative">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-10 h-10 bg-jnt-red/20 rounded-xl flex items-center justify-center border border-jnt-red/20">
                        <Undo2 className="w-5 h-5 text-jnt-red" />
                      </div>
                      <div>
                        <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-white/50 leading-none mb-1">Refund Center</h3>
                        <p className="text-xs font-black italic text-jnt-red leading-none">Automated Settlement</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <AnimatePresence mode="wait">
                        {!isEditingRefund ? (
                          <motion.button 
                            key="edit"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={startEditingRefund}
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all active:scale-90 text-white/70 border border-white/10"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </motion.button>
                        ) : (
                          <motion.div 
                            key="actions"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex gap-1.5"
                          >
                            <button 
                              onClick={() => setIsEditingRefund(false)}
                              className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all active:scale-90 text-white/70 border border-white/10"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={handleSaveRefund}
                              className="w-8 h-8 bg-jnt-red rounded-lg flex items-center justify-center hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-90 text-white"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="p-5">
                    <AnimatePresence mode="wait">
                      {isEditingRefund ? (
                        <motion.div 
                          key="edit-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Bank</label>
                              <div className="relative">
                                <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                                <input 
                                  type="text" 
                                  value={refundForm.bank}
                                  onChange={(e) => setRefundForm({...refundForm, bank: e.target.value})}
                                  className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border-gray-100 border rounded-xl focus:ring-2 focus:ring-jnt-red/10 focus:border-jnt-red outline-none transition-all font-bold text-gray-700"
                                  placeholder="e.g. BCA"
                                />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">No. Rekening</label>
                              <input 
                                type="text" 
                                value={refundForm.nomor_rekening}
                                onChange={(e) => setRefundForm({...refundForm, nomor_rekening: e.target.value})}
                                className="w-full px-3 py-2 text-xs bg-gray-50 border-gray-100 border rounded-xl focus:ring-2 focus:ring-jnt-red/10 focus:border-jnt-red outline-none transition-all font-bold text-gray-700"
                                placeholder="0000000000"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Pemilik Rekening</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                              <input 
                                type="text" 
                                value={refundForm.nama_rekening}
                                onChange={(e) => setRefundForm({...refundForm, nama_rekening: e.target.value})}
                                className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border-gray-100 border rounded-xl focus:ring-2 focus:ring-jnt-red/10 focus:border-jnt-red outline-none transition-all font-bold text-gray-700"
                                placeholder="Nama Lengkap"
                              />
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="view-details"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="space-y-5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Refund</div>
                              <div className="text-xl font-black text-gray-900 italic tracking-tighter leading-none">
                                {formatCurrency(data.jumlah_refund)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                <span className="text-[8px] text-emerald-700 font-black uppercase tracking-wider">Verified</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Bank Provider</div>
                                <div className="text-xs font-black text-gray-800 leading-none">{parseJSONField(data.refund).bank}</div>
                              </div>
                              <div className="text-right space-y-1">
                                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Account No.</div>
                                <div className="text-xs font-black text-gray-900 font-mono leading-none">{parseJSONField(data.refund).nomor_rekening}</div>
                              </div>
                            </div>
                            <div className="pt-3 border-t border-gray-200/50">
                              <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Beneficiary Name</div>
                              <div className="text-xs font-bold text-gray-600 truncate">{parseJSONField(data.refund).nama_rekening}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 px-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-[9px] text-gray-500 font-bold italic">Estimasi pencairan: 1-3 hari kerja setelah verifikasi</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              )}

              {/* Payment Method Selection */}
              <Card className="p-4 border-0 shadow-md space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
                  <CreditCard className="w-4 h-4 text-jnt-red" />
                  <h3 className="font-bold text-sm text-gray-800 uppercase tracking-tight">Metode Pembayaran</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {vaMethods.map((va) => (
                    <button
                      key={va.id}
                      onClick={() => setSelectedVA(va)}
                      className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                        selectedVA?.id === va.id 
                          ? 'border-jnt-red bg-red-50/50 shadow-inner' 
                          : 'border-gray-100 bg-white hover:border-gray-200'
                      }`}
                    >
                      <img src={va.img} alt={va.va_name} className="h-6 object-contain" referrerPolicy="no-referrer" />
                      <span className="text-[10px] font-bold text-gray-700 uppercase">{va.va_name}</span>
                      {selectedVA?.id === va.id && (
                        <div className="absolute top-1 right-1">
                          <CheckCircle2 className="w-3 h-3 text-jnt-red" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {selectedVA && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate('/payment', { 
                      state: { 
                        va: selectedVA, 
                        amount: data.subtotal,
                        resi: data.nomor_resi,
                        tagihan: parseJSONField(data.tagihan),
                        refund: data.refund,
                        jumlah_refund: data.jumlah_refund
                      } 
                    })}
                    className="w-full py-4 bg-jnt-red text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-500/20 active:scale-95 transition-transform mt-2"
                  >
                    Lanjutkan Pembayaran
                  </motion.button>
                )}
              </Card>


              {/* Info Banner */}
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex gap-3">
                <Info className="w-5 h-5 text-orange-500 shrink-0" />
                <p className="text-[10px] text-orange-700 leading-normal">
                  Informasi status pengiriman dapat mengalami keterlambatan pembaruan sistem. Silakan hubungi Call Center kami di <span className="font-bold">021-8066-1888</span> jika ada kendala.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
