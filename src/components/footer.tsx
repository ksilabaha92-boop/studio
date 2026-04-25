import { Instagram, Phone } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-muted py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://instagram.com/tohfafino" target="_blank" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-primary" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="tel:+21600000000" aria-label="Phone">
              <Phone className="h-6 w-6 text-primary" />
            </Link>
          </Button>
        </div>
        <p className="font-headline text-lg text-primary">Tohfafino</p>
        <p className="font-headline text-sm text-muted-foreground mt-1">By Azizos</p>
      </div>
    </footer>
  );
}
