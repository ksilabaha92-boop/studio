'use client';

import { TigraLogo } from './tigra-logo';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

type SplashScreenProps = {
  onFinish: () => void;
};

export function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    // Automatically transition to the main site after 5 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black overflow-hidden">
      {/* Dynamic Burst Background for Splash */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/25 blur-[70px]"
            initial={{ 
              scale: 0, 
              x: '50%', 
              y: '50%', 
              opacity: 0 
            }}
            animate={{ 
              scale: [0, 1.8, 0.7, 2.5], 
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.5, 0.3, 0] 
            }}
            transition={{ 
              duration: Math.random() * 2 + 1.5, // Faster movement
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 1
            }}
            style={{
              width: Math.random() * 400 + 150,
              height: Math.random() * 400 + 150,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <TigraLogo size="large" className="text-primary mb-12" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-4"
        >
          <h2 className="font-headline text-2xl md:text-3xl text-primary italic">Welcome to TigraFINO Luxury</h2>
          <p className="font-body text-sm md:text-base tracking-[0.2em] text-primary/70 uppercase max-w-md">
            We hope you enjoy our powerful handcrafted creations
          </p>
        </motion.div>

        {/* Loading Progress Bar */}
        <div className="mt-16 w-48 h-[2px] bg-primary/10 relative overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
