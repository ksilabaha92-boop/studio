import { Instagram, Phone, Truck } from 'lucide-react';
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
          Tohfa
        </h2>
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <TohfaLogo size="small" className="mx-auto mb-8 text-background" />

        <p className="font-cursive text-2xl max-w-md mx-auto text-background/80 mb-8">
          From our hands to your home, each piece tells a story of earth, fire, and passion.
        </p>

        <div className="flex justify-center items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild className="hover:bg-background/10 rounded-full h-12 w-12">
            <Link href="https://instagram.com/tohfafino" target="_blank" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-background/80" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-background/10 rounded-full h-12 w-12">
            <Link href="tel:+21600000000" aria-label="Phone">
              <Phone className="h-6 w-6 text-background/80" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8 text-sm text-background/80">
          <Truck className="h-5 w-5" />
          <span>Free delivery within Kelibia</span>
        </div>

        <p className="font-body text-sm text-background/60">© {new Date().getFullYear()} Tohfafino. All rights reserved.</p>
        <p className="font-cursive text-4xl text-background/60 mt-4">By Aziz</p>
      </div>
    </footer>
  );
}
