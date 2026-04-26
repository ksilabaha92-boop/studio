'use client';

import { useState, useEffect } from 'react';
import { TohfaLogo } from './tohfa-logo';
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
    
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 ease-in-out",
        isScrolled ? "py-4 bg-background/80 backdrop-blur-lg shadow-sm element-glow" : "py-8"
      )}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-1/3"></div> {/* Spacer */}
          <div className="w-1/3 flex justify-center">
            <button
              onClick={() => setLoginOpen(true)}
              aria-label="Open Admin Login"
              className={cn("transition-transform duration-300 hover:scale-105 text-primary")}
            >
              <TohfaLogo size="small" />
            </button>
          </div>
          <div className="w-1/3 flex justify-end">
            <CartSheet />
          </div>
        </div>
      </header>
      <LoginDialog open={isLoginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
