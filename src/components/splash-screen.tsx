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
      className="fixed inset-0 z-50 flex h-screen w-screen cursor-pointer flex-col items-center justify-center bg-background"
      onClick={onFinish}
    >
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TigraLogo size="medium" className="text-primary" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 font-body text-base tracking-[0.3em] text-primary uppercase"
        >
          اضغط للدخول
        </motion.p>
      </div>
    </motion.div>
  );
}
