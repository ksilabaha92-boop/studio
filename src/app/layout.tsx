import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AnimatedBackground } from '@/components/animated-background';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Tohfafino',
  description: 'Handcrafted pottery with a touch of soul.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background')}>
        <FirebaseClientProvider>
          <AnimatedBackground />
          <div className="relative z-10">
            {children}
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
