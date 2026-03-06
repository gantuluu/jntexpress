import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashscreenViewProps {
  onOpen: () => void;
}

export const SplashscreenView: React.FC<SplashscreenViewProps> = ({ onOpen }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 40; // update every 40ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleOpen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      onOpen();
    } catch (err) {
      console.error("Error attempting to enable full-screen mode:", err);
      // Even if fullscreen fails (e.g. in some iframe environments), we should still open the app
      onOpen();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full max-w-[300px]"
      >
        <img 
          src="https://uploads.onecompiler.io/43y3uz32c/44aggzewf/J&T_Express_logo.svg.png" 
          alt="J&T Express Logo" 
          className="h-16 object-contain mb-12"
          referrerPolicy="no-referrer"
        />

        <div className="w-full space-y-6">
          <AnimatePresence mode="wait">
            {!isReady ? (
              <motion.div
                key="loading"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-jnt-red"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading...</span>
                  <span className="text-[10px] font-black text-jnt-red tabular-nums">{Math.round(progress)}%</span>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleOpen}
                className="w-full py-4 bg-jnt-red text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-red-500/20 active:scale-95 transition-all"
              >
                Buka JNT Mobile
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-12 text-center">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">Express Your Online Business</p>
        </div>
      </motion.div>
    </div>
  );
};
