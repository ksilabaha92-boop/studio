import { Instagram, Phone, Truck } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { TigraLogo } from './tigra-logo';

/**
 * Premium Footer with visible Watermark and Aziz Ksila Signature.
 */
export function Footer() {
  return (
    <footer className="relative py-32 mt-40 border-t border-primary/10 overflow-hidden bg-black">
      {/* Background Watermark: Visible yet elegant (0.15 opacity) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none select-none">
        <h2 className="font-headline text-[8rem] md:text-[16rem] whitespace-nowrap tracking-tighter text-primary uppercase select-none">
          TIGRAFINO
        </h2>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* Shrunk logo in footer to contrast with Header logo */}
        <TigraLogo size="small" className="mx-auto mb-12 text-primary opacity-80" />

        <p className="font-headline text-xl max-w-md mx-auto text-primary/80 mb-12 italic">
          "Power, precision, and the spirit of the wild in every handcrafted piece."
        </p>

        <div className="flex justify-center items-center gap-10 mb-16">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 rounded-full h-14 w-14 transition-all duration-500">
            <Link href="https://instagram.com/tigrafino" target="_blank">
              <Instagram className="h-8 w-8 text-primary" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 rounded-full h-14 w-14 transition-all duration-500">
            <Link href="tel:+21648140022">
              <Phone className="h-8 w-8 text-primary" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-20 text-xs text-primary font-bold tracking-[0.5em] uppercase">
          <Truck className="h-6 w-6" />
          <span>Free delivery within Kelibia</span>
        </div>

        <div className="space-y-8">
          <p className="font-body text-[10px] text-primary/30 tracking-[0.6em] uppercase">
            © {new Date().getFullYear()} TigraFINO Luxury Collective.
          </p>
          <div className="pt-6 border-t border-primary/5 max-w-[200px] mx-auto">
            <p className="font-headline text-3xl text-primary italic font-bold tracking-tight text-glow">
              By Aziz Ksila
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
