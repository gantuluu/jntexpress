import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashscreenViewProps {
  onEnter: () => void;
}

export const SplashscreenView: React.FC<SplashscreenViewProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleOpenApp = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <img
          src="https://uploads.onecompiler.io/43y3uz32c/44aggzewf/J&T_Express_logo.svg.png"
          alt="J&T Express"
          className="w-48 h-auto"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {!isLoaded ? (
        <div className="w-full max-w-xs bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-jnt-red"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleOpenApp}
          className="bg-jnt-red text-white font-bold py-4 px-12 rounded-full shadow-lg shadow-jnt-red/30 active:scale-95 transition-transform"
        >
          Buka JNT Mobile
        </motion.button>
      )}

      <div className="absolute bottom-12 text-gray-400 text-xs font-medium tracking-widest uppercase">
        Express Your Online Business
      </div>
    </div>
  );
};
