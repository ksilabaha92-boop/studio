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
        "sticky top-0 z-40 w-full transition-all duration-500 ease-in-out",
        isScrolled 
          ? "py-2 bg-black/60 backdrop-blur-xl border-b border-white/10" 
          : "py-4 bg-black/20 backdrop-blur-sm"
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => setLoginOpen(true)}
              className="transition-transform duration-300 hover:scale-105 active:scale-95"
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
    </>
  );
}
