import { Instagram, Phone, Truck } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { TigraLogo } from './tigra-logo';

export function Footer() {
  return (
    <footer className="relative py-20 mt-32 border-t border-primary/10 overflow-hidden bg-black">
      {/* Background text: Transparent Orange Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
        <h2 className="font-headline text-[6rem] md:text-[10rem] select-none whitespace-nowrap tracking-tighter text-primary uppercase">TIGRAFINO</h2>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* Shrunk logo in footer */}
        <TigraLogo size="small" className="mx-auto mb-8 text-primary" />

        <p className="font-headline text-lg max-w-md mx-auto text-primary/60 mb-8 italic">
          Power, precision, and the spirit of the wild in every handcrafted piece.
        </p>

        <div className="flex justify-center items-center gap-6 mb-12">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 rounded-full h-12 w-12 transition-colors">
            <Link href="https://instagram.com/tigrafino" target="_blank">
              <Instagram className="h-6 w-6 text-primary" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 rounded-full h-12 w-12 transition-colors">
            <Link href="tel:+21648140022">
              <Phone className="h-6 w-6 text-primary" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12 text-sm text-primary font-medium tracking-widest uppercase">
          <Truck className="h-5 w-5" />
          <span>Free delivery within Kelibia</span>
        </div>

        <div className="space-y-4">
          <p className="font-body text-[10px] text-primary/40 tracking-widest uppercase">
            © {new Date().getFullYear()} TigraFINO Luxury.
          </p>
          <p className="font-headline text-xl text-primary/60 italic font-bold">By Aziz Ksila</p>
        </div>
      </div>
    </footer>
  );
}
