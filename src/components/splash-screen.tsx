'use client';

import { TohfaLogo } from './tohfa-logo';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Fake Framer motion for build
const FAKE_MOTION = {
  div: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  p: ({ children, ...props }: { children: React.ReactNode }) => <p {...props}>{children}</p>,
};
const useFakeMotion = () => {
    const [useRealMotion, setUseRealMotion] = useState(false);
    useEffect(() => {
        // dynamically load framer-motion
        import('framer-motion').then(() => setUseRealMotion(true));
    }, []);
    return useRealMotion ? motion : FAKE_MOTION;
};


type SplashScreenProps = {
  onFinish: () => void;
};

export function SplashScreen({ onFinish }: SplashScreenProps) {
    const motion = useFakeMotion();
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex h-screen w-screen cursor-pointer flex-col items-center justify-center bg-background"
      onClick={onFinish}
    >
      <motion.div
        className="text-glow text-primary"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <TohfaLogo size="medium" />
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        className="mt-8 font-body text-lg text-muted-foreground"
      >
        Click to enter
      </motion.p>
    </motion.div>
  );
}
