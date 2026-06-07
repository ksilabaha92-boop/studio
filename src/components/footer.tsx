import { Instagram, Phone, Truck } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { TigraLogo } from './tigra-logo';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="relative bg-black text-white py-20 mt-32 border-t border-white/5 overflow-hidden">
      {/* نص خلفي كبير بلمسة خفيفة جداً ومتناسقة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <h2 className="font-headline text-[8rem] md:text-[12rem] select-none whitespace-nowrap tracking-tighter">TIGRAFINO</h2>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <TigraLogo size="small" className="mx-auto mb-8" />

        <p className="font-headline text-lg max-w-md mx-auto text-white/50 mb-8 italic">
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

        <div className="flex items-center justify-center gap-2 mb-12 text-sm text-primary/80 font-medium tracking-widest uppercase">
          <Truck className="h-5 w-5" />
          <span>Free delivery within Kelibia</span>
        </div>

        <div className="space-y-4">
          <p className="font-body text-[10px] text-white/30 tracking-widest uppercase">
            © {new Date().getFullYear()} TigraFINO Luxury.
          </p>
          <p className="font-headline text-2xl text-primary/40 italic">By Aziz Ksila</p>
        </div>
      </div>
    </footer>
  );
}
