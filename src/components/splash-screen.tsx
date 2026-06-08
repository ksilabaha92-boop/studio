'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type SplashScreenProps = {
  onFinish: () => void;
};

/**
 * Cinematic Splash Screen for TORA Luxury.
 * Purely automatic transition with a "Spirit of the Wild" theme.
 */
export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black overflow-hidden">
      {/* Tiger Streaks Background for Splash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="tiger-stripe opacity-40" style={{ animationDuration: '3s' }}></div>
        <div className="tiger-stripe opacity-20" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <h1 className="font-headline text-4xl md:text-6xl text-primary italic leading-tight tracking-[0.2em] text-glow uppercase">
              Welcome to TORA Luxury
            </h1>
            <p className="font-body text-[10px] md:text-xs tracking-[0.8em] text-primary/60 uppercase animate-pulse">
              Unleash the Spirit of the Wild
            </p>
          </div>
          
          <div className="h-[1px] w-32 bg-primary/20 mx-auto" />
        </motion.div>

        {/* Minimal Cinematic Loader Bar */}
        <div className="mt-32 w-48 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(255,102,0,1)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
