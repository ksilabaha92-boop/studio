'use client';

import { TigraLogo } from './tigra-logo';
import { motion } from 'framer-motion';
import { AnimatedBackground } from './animated-background';

type SplashScreenProps = {
  onFinish: () => void;
};

export function SplashScreen({ onFinish }: SplashScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex h-screen w-screen cursor-pointer flex-col items-center justify-center bg-black"
      onClick={onFinish}
    >
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <TigraLogo size="large" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 font-body text-xs tracking-[0.5em] text-white uppercase"
        >
          Click to enter the wild
        </motion.p>
      </div>
    </motion.div>
  );
}