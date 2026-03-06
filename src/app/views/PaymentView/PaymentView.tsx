import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Copy, CheckCircle2, Clock, Info, ShieldCheck, ChevronDown, ChevronUp, Undo2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../../../components/Common';
import { formatCurrency } from '../../../utils/formatCurrency';
import { parseJSONField } from '../../../utils/parseJSONField';

export const PaymentView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { va, amount, resi, tagihan, refund, jumlah_refund } = location.state || {};
  
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [copied, setCopied] = useState(false);
  const [activeInstruction, setActiveInstruction] = useState<string | null>('atm');

  useEffect(() => {
    if (!va || !amount) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [va, amount, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(va.va_number.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const instructions = [
    {
      id: 'atm',
      title: 'ATM',
      steps: [
        'Masukkan kartu ATM & PIN Anda.',
        'Pilih menu "Transfer" > "Virtual Account".',
        `Masukkan nomor VA: ${va?.va_number}.`,
        'Konfirmasi detail pembayaran dan pilih "Ya".',
        'Simpan struk sebagai bukti pembayaran.'
      ]
    },
    {
      id: 'mbanking',
      title: 'm-Banking',
      steps: [
        'Buka aplikasi mobile banking Anda.',
        'Pilih menu "Transfer" > "Virtual Account".',
        `Masukkan nomor VA: ${va?.va_number}.`,
        'Periksa nominal pembayaran dan klik "Bayar".',
        'Masukkan PIN m-Banking Anda.'
      ]
    },
    {
      id: 'internet',
      title: 'Internet Banking',
      steps: [
        'Login ke portal internet banking Anda.',
        'Pilih menu "Pembayaran" > "Virtual Account".',
        `Masukkan nomor VA: ${va?.va_number}.`,
        'Konfirmasi transaksi menggunakan token/SMS OTP.',
        'Transaksi selesai.'
      ]
    },
    {
      id: 'sms',
      title: 'SMS Banking',
      steps: [
        'Buka aplikasi pesan singkat Anda.',
        `Ketik format SMS sesuai instruksi bank untuk VA: ${va?.va_number}.`,
        'Kirim ke nomor SMS banking bank Anda.',
        'Balas dengan kode konfirmasi yang diminta.',
        'Tunggu SMS notifikasi keberhasilan.'
      ]
    }
  ];

  if (!va || !amount) return null;

  return (
    <div className="h-full bg-gray-50 flex justify-center">
      <div className="app-container flex flex-col bg-white">
        {/* Header */}
        <div className="bg-jnt-red text-white sticky top-0 z-20 shadow-md">
          <div className="px-4 py-4 flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Pembayaran</h1>
              <p className="text-[10px] opacity-80 font-medium uppercase tracking-widest">Virtual Account Settlement</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Countdown Timer */}
          <Card className="bg-orange-50 border-orange-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-[10px] font-black text-orange-800 uppercase tracking-wider">Batas Waktu Pembayaran</div>
                <div className="text-lg font-black text-orange-600 tabular-nums">{formatTime(timeLeft)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-orange-400 uppercase">Status</div>
              <div className="text-xs font-black text-orange-600 italic uppercase">Pending</div>
            </div>
          </Card>

          {/* Amount Card */}
          <Card className="p-5 border-0 shadow-md bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-jnt-red/10 blur-3xl -mr-16 -mt-16 rounded-full" />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Total Tagihan</div>
                  <div className="text-2xl font-black italic tracking-tighter">{formatCurrency(amount)}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[9px] font-black text-white uppercase tracking-wider">Resi: {resi}</span>
                </div>
              </div>

              {/* Individual Items */}
              {tagihan && tagihan.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  {tagihan.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-[10px]">
                      <div className="flex items-center gap-2">
                        <span className="text-white/60">{item.item}</span>
                        <span className={`px-1.5 py-0.5 rounded-md border font-black uppercase text-[7px] ${
                          item.status?.toLowerCase() === 'sukses' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/20' 
                            : 'bg-orange-500/20 text-orange-400 border-orange-500/20'
                        }`}>
                          {item.status || 'Pending'}
                        </span>
                      </div>
                      <span className="font-bold">{formatCurrency(item.biaya)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-jnt-red" />
                <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Transaksi Terenkripsi & Aman</span>
              </div>
            </div>
          </Card>

          {/* VA Details */}
          <Card className="p-0 overflow-hidden border-0 shadow-md">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={va.img} alt={va.va_name} className="h-6 object-contain" referrerPolicy="no-referrer" />
                <span className="text-sm font-black text-gray-800 uppercase tracking-tight">{va.va_name}</span>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nomor Virtual Account</div>
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 group">
                  <div className="text-xl font-black text-gray-900 tracking-widest font-mono">{va.va_number}</div>
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${copied ? 'bg-green-500 text-white' : 'bg-jnt-red text-white hover:bg-red-600'}`}
                  >
                    {copied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Tersalin' : 'Salin'}
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Refund Info */}
          {(refund || jumlah_refund > 0) && (
            <Card className="p-0 overflow-hidden border-0 shadow-md bg-white">
              <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-jnt-red/20 rounded-lg flex items-center justify-center">
                  <Undo2 className="w-4 h-4 text-jnt-red" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-none mb-1">Informasi Refund</h3>
                  <div className="text-sm font-black italic text-jnt-red leading-none">Refund Center</div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {refund && (
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Rekening Tujuan</div>
                      <div className="text-xs font-bold text-gray-800">{parseJSONField(refund)?.bank} - {parseJSONField(refund)?.nomor_rekening}</div>
                      <div className="text-[10px] text-gray-500">{parseJSONField(refund)?.nama_rekening}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Nilai Refund</div>
                      <div className="text-lg font-black text-gray-900 italic">{formatCurrency(jumlah_refund)}</div>
                    </div>
                  </div>
                )}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3">
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-700 leading-normal italic font-medium">
                    <span className="font-black underline">{formatCurrency(jumlah_refund)}</span> akan di proses ke refund oleh sistem secara otomatis maksimal 30 menit setelah tagihan di verifikasi oleh sistem.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Instructions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Info className="w-4 h-4 text-jnt-red" />
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest">Instruksi Pembayaran</h3>
            </div>
            
            <div className="space-y-2">
              {instructions.map((method) => (
                <div key={method.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setActiveInstruction(activeInstruction === method.id ? null : method.id)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xs font-bold text-gray-700">{method.title}</span>
                    {activeInstruction === method.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {activeInstruction === method.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50/50 px-4 py-4 border-t border-gray-50"
                      >
                        <ul className="space-y-3">
                          {method.steps.map((step, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[10px] font-black text-jnt-red shrink-0 shadow-sm">
                                {i + 1}
                              </span>
                              <p className="text-[11px] text-gray-600 leading-relaxed">{step}</p>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={() => navigate(`/tracking/${resi}`)}
            className="w-full py-4 bg-jnt-red text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-500/20 active:scale-95 transition-transform mt-6"
          >
            Cek Status Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};
