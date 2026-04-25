import { Instagram, Phone } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { TohfaLogo } from './tohfa-logo';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className={cn(
      "relative overflow-hidden",
      "bg-background/70 backdrop-blur-sm border-t",
      "py-20 mt-32"
    )}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <h2 className="font-headline text-[10rem] md:text-[15rem] text-foreground/5 opacity-50 select-none -translate-y-2">
          Tohfafino
        </h2>
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <TohfaLogo size="small" className="mx-auto mb-6" />
        <p className="max-w-md mx-auto text-muted-foreground mb-8">
          From our hands to your home, each piece tells a story of earth, fire, and passion.
        </p>
        <div className="flex justify-center items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://instagram.com/tohfafino" target="_blank" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-primary" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="tel:+21600000000" aria-label="Phone">
              <Phone className="h-5 w-5 text-primary" />
            </Link>
          </Button>
        </div>
        <p className="font-body text-sm text-muted-foreground">© {new Date().getFullYear()} Tohfafino. All rights reserved.</p>
        <p className="font-body text-xs text-muted-foreground/50 mt-1">By Azizos</p>
      </div>
    </footer>
  );
}
