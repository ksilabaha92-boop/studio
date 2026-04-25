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
    if (sessionStorage.getItem('splashShown')) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  if (!isClient) {
    return null; // Render nothing on the server to avoid flash of content
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <ProductGallery />
        <BrandNarrative />
      </main>
      <Footer />
    </div>
  );
}
