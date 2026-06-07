'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type SplashScreenProps = {
  onFinish: () => void;
};

type Burst = {
  id: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
  startX: string;
  startY: string;
};

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    // Generate bursts data only on client side to avoid hydration mismatch
    const newBursts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      width: Math.random() * 400 + 200,
      height: Math.random() * 400 + 200,
      duration: Math.random() * 1.5 + 1,
      delay: Math.random() * 0.5,
      startX: `${Math.random() * 100}%`,
      startY: `${Math.random() * 100}%`,
    }));
    setBursts(newBursts);

    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black overflow-hidden">
      {/* Cinematic Burst Background */}
      <div className="absolute inset-0 pointer-events-none">
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            className="absolute rounded-full bg-primary/20 blur-[100px]"
            initial={{ scale: 0, opacity: 0, x: burst.startX, y: burst.startY }}
            animate={{ 
              scale: [0.5, 2, 1, 4], 
              opacity: [0, 0.7, 0.3, 0],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{ 
              duration: burst.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: burst.delay
            }}
            style={{
              width: burst.width,
              height: burst.height,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="font-headline text-4xl md:text-7xl text-primary italic leading-tight tracking-tight">
              Welcome to TigraFINO Luxury
            </h1>
            <div className="h-[1px] w-24 bg-primary/40 mx-auto" />
          </div>
          
          <p className="font-body text-xs md:text-sm tracking-[0.5em] text-primary/70 uppercase max-w-lg mx-auto leading-loose">
            Power, Precision, and the Spirit of the Wild in every handcrafted piece.
          </p>
        </motion.div>

        {/* Minimal Progress Bar - Cinema Style */}
        <div className="mt-24 w-48 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_10px_rgba(255,102,0,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
