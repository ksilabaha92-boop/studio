'use client';

import { useState } from 'react';
import { TohfaLogo } from './tohfa-logo';
import { LoginDialog } from './login-dialog';
import { cn } from '@/lib/utils';

export function Header() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <header className="py-8">
        <div className="container mx-auto flex justify-center">
          <button
            onClick={() => setLoginOpen(true)}
            aria-label="Open Admin Login"
            className={cn("transition-transform duration-300 hover:scale-105 text-primary")}
          >
            <TohfaLogo size="small" />
          </button>
        </div>
      </header>
      <LoginDialog open={isLoginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
