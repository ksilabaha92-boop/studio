'use client';

import { useState, useEffect } from 'react';
import { TigraLogo } from './tigra-logo';
import { LoginDialog } from './login-dialog';
import { cn } from '@/lib/utils';
import { CartSheet } from './cart-sheet';

export function Header() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed top-0 z-40 w-full transition-all duration-700 ease-in-out",
        isScrolled 
          ? "py-0 bg-black/40 backdrop-blur-2xl border-b border-white/5" 
          : "py-2 bg-transparent"
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center h-14 md:h-16">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => setLoginOpen(true)}
              className="transition-all duration-500 hover:scale-110 active:scale-95 text-primary"
            >
              <TigraLogo size="medium" />
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <CartSheet />
          </div>
        </div>
      </header>
      <LoginDialog open={isLoginOpen} onOpenChange={setLoginOpen} />
      {/* Slim spacer for the slim header */}
      <div className="h-14 md:h-16"></div>
    </>
  );
}
