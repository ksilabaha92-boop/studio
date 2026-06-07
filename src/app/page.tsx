'use client';

import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/splash-screen';
import { Header } from '@/components/header';
import { ProductGallery } from '@/components/product-gallery';
import { BrandNarrative } from '@/components/brand-narrative';
import { Footer } from '@/components/footer';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (!isClient) {
    return null;
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-24">
          <p className="font-headline text-primary text-xs tracking-[0.6em] uppercase mb-4">Precision Craftsmanship</p>
          <h1 className="font-headline text-5xl md:text-7xl text-primary italic mb-8">Elegance Meets Power</h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-12"></div>
        </div>
        
        <ProductGallery />
        <BrandNarrative />
      </main>
      <Footer />
    </div>
  );
}