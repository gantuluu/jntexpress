import React, { useRef, useEffect, useState } from 'react';
import { Card } from '../../../components/Common';
import { Scan as ScanIcon, X } from 'lucide-react';

export const ScanView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    // Cek apakah browser mendukung kamera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
          setHasCamera(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Tidak bisa mengakses kamera:", err);
          setHasCamera(false);
        });
    } else {
      console.error("Browser tidak mendukung kamera");
      setHasCamera(false);
    }
  }, []);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/png');
        console.log("Foto berhasil diambil:", imageDataUrl);
        // Bisa dikirim ke server / simpan di state
      }
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-jnt-red/10 text-jnt-red rounded-full flex items-center justify-center mx-auto mb-4">
          <ScanIcon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black italic">SCAN RESI</h2>
        <p className="text-gray-500 text-sm">Arahkan kamera ke barcode atau QR code pada paket</p>
      </div>

      <Card className="w-full max-w-sm overflow-hidden p-0 border-0 shadow-xl bg-black relative">
        {hasCamera ? (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute inset-0 border-2 border-jnt-red/50 m-12 rounded-lg pointer-events-none"></div>
          </div>
        ) : (
          <div className="p-12 text-center text-white">
            <X className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Kamera tidak tersedia</p>
          </div>
        )}
      </Card>

      {hasCamera && (
        <button 
          onClick={handleCapture} 
          className="mt-8 bg-jnt-red text-white font-bold py-3 px-8 rounded-full shadow-lg active:scale-95 transition-transform"
        >
          Ambil Foto
        </button>
      )}
    </div>
  );
};