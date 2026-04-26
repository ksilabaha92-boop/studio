'use client';

import { TohfaLogo } from './tohfa-logo';
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
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex h-screen w-screen cursor-pointer flex-col items-center justify-center"
      onClick={onFinish}
    >
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="text-glow text-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <TohfaLogo size="medium" />
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="mt-8 font-body text-lg text-muted-foreground"
        >
          Click to enter
        </motion.p>
      </div>
    </motion.div>
  );
}
