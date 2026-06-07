import { Instagram, Phone, Truck } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { TigraLogo } from './tigra-logo';

export function Footer() {
  return (
    <footer className="relative py-24 mt-32 border-t border-primary/10 overflow-hidden bg-black">
      {/* Background Watermark: Increased visibility for clear brand presence */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.2] pointer-events-none select-none">
        <h2 className="font-headline text-[7rem] md:text-[14rem] whitespace-nowrap tracking-tighter text-primary uppercase">
          TIGRAFINO
        </h2>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* Shrunk logo in footer */}
        <TigraLogo size="small" className="mx-auto mb-10 text-primary" />

        <p className="font-headline text-lg max-w-md mx-auto text-primary/70 mb-10 italic">
          "Power, precision, and the spirit of the wild in every handcrafted piece."
        </p>

        <div className="flex justify-center items-center gap-8 mb-16">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 rounded-full h-14 w-14 transition-all duration-300">
            <Link href="https://instagram.com/tigrafino" target="_blank">
              <Instagram className="h-7 w-7 text-primary" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 rounded-full h-14 w-14 transition-all duration-300">
            <Link href="tel:+21648140022">
              <Phone className="h-7 w-7 text-primary" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3 mb-16 text-xs text-primary font-bold tracking-[0.4em] uppercase">
          <Truck className="h-6 w-6" />
          <span>Free delivery within Kelibia</span>
        </div>

        <div className="space-y-6">
          <p className="font-body text-[10px] text-primary/40 tracking-[0.5em] uppercase">
            © {new Date().getFullYear()} TigraFINO Luxury Collective.
          </p>
          <div className="pt-4">
            <p className="font-headline text-2xl text-primary/80 italic font-bold tracking-tight">
              By Aziz Ksila
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
