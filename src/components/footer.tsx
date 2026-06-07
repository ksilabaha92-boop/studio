import { Instagram, Phone, Truck } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { TigraLogo } from './tigra-logo';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="relative bg-black text-white py-20 mt-32 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
        <h2 className="font-headline text-[20rem] select-none whitespace-nowrap">TIGRAFINO</h2>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <TigraLogo size="small" className="mx-auto mb-8" />

        <p className="font-headline text-xl max-w-md mx-auto text-white/60 mb-8 italic">
          Power, precision, and the spirit of the wild in every handcrafted piece.
        </p>

        <div className="flex justify-center items-center gap-6 mb-12">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/20 rounded-full h-12 w-12 transition-colors">
            <Link href="https://instagram.com/tigrafino" target="_blank">
              <Instagram className="h-6 w-6 text-primary" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/20 rounded-full h-12 w-12 transition-colors">
            <Link href="tel:+21648140022">
              <Phone className="h-6 w-6 text-primary" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12 text-sm text-primary font-medium tracking-widest uppercase">
          <Truck className="h-5 w-5" />
          <span>Express Delivery - Kelibia</span>
        </div>

        <div className="space-y-4">
          <p className="font-body text-xs text-white/40 tracking-tighter uppercase">
            © {new Date().getFullYear()} TigraFINO Luxury.
          </p>
          <p className="font-headline text-5xl text-primary/50 italic opacity-80">By Aziz</p>
        </div>
      </div>
    </footer>
  );
}