'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alex_Brush } from 'next/font/google';

const alexBrush = Alex_Brush({ weight: '400', subsets: ['latin'] });

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Cek apakah user sudah melihat splash screen di sesi ini
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    // Jika belum, set timer untuk menyembunyikannya setelah animasi selesai
    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('hasSeenSplash', 'true');
    }, 3500); // 3.5 detik total tayang

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="w-full max-w-4xl px-4 flex justify-center items-center h-64">
            <svg className="w-full h-full" viewBox="0 0 800 300">
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className={alexBrush.className}
                style={{ 
                  fontSize: '8rem', 
                  stroke: 'currentColor', 
                  strokeWidth: 2,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                }}
                initial={{ 
                  strokeDasharray: 1000, 
                  strokeDashoffset: 1000,
                  fill: 'transparent'
                }}
                animate={{ 
                  strokeDashoffset: 0,
                  fill: 'currentColor'
                }}
                transition={{ 
                  strokeDashoffset: { duration: 2.5, ease: 'easeInOut' },
                  fill: { duration: 0.8, ease: 'easeIn', delay: 2.2 }
                }}
              >
                Kaffolio
              </motion.text>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
