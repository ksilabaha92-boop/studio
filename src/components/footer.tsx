import { Instagram, Phone } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { TohfaLogo } from './tohfa-logo';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className={cn(
      "relative overflow-hidden",
      "bg-foreground text-background", // Dark background, light text
      "py-20 mt-32"
    )}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <h2 className="font-headline text-[10rem] md:text-[15rem] text-background/10 opacity-50 select-none -translate-y-2">
          Tohfafino
        </h2>
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <TohfaLogo size="small" className="mx-auto mb-8 text-background" />

        <p className="font-cursive text-3xl max-w-md mx-auto text-background/80 mb-8">
          From our hands to your home, each piece tells a story of earth, fire, and passion.
        </p>

        <div className="flex justify-center items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" asChild className="hover:bg-background/10">
            <Link href="https://instagram.com/tohfafino" target="_blank" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-background/80" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-background/10">
            <Link href="tel:+21600000000" aria-label="Phone">
              <Phone className="h-5 w-5 text-background/80" />
            </Link>
          </Button>
        </div>

        <p className="font-body text-sm text-background/60">© {new Date().getFullYear()} Tohfafino. All rights reserved.</p>
        <p className="font-body text-xs text-background/40 mt-1">By Azizos</p>
      </div>
    </footer>
  );
}
