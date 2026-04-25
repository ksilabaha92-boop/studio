'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useDoc, useFirebase, useMemoFirebase } from '@/firebase';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { type Product } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { OrderForm } from '@/components/order-form';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const { firestore } = useFirebase();
  const [isOrderSheetOpen, setOrderSheetOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);


  const productRef = useMemoFirebase(
    () => (firestore && id ? doc(firestore, 'products', id) : null),
    [firestore, id]
  );

  const { data: product, isLoading: isProductLoading } = useDoc<Product>(productRef);

  if (isProductLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-16">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="space-y-8">
              <Skeleton className="h-14 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-headline text-4xl text-primary text-glow mb-4">Product Not Found</h1>
            <p className="text-muted-foreground">Sorry, we couldn't find the product you're looking for.</p>
            <Button asChild className="mt-8" variant="outline">
              <Link href="/">Return to Gallery</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="aspect-square relative rounded-lg overflow-hidden element-glow">
            <Image
              src={product.mainImageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
            />
          </div>
          <div className="space-y-8">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl text-foreground text-glow">{product.name}</h1>
              <p className="font-body font-medium text-3xl text-primary mt-2">{product.price} TND</p>
            </div>
            
            <Separator />
            
            <p className="text-lg text-foreground/70 leading-relaxed">{product.description}</p>
            
            <div>
              <h3 className="font-body font-medium text-foreground mb-4">Color</h3>
              <div className="flex items-center gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorSelect(color)}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition-all duration-200",
                      selectedColor === color ? 'border-primary scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border/50',
                    )}
                    style={{ backgroundColor: color }}
                    title={color}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <Sheet open={isOrderSheetOpen} onOpenChange={setOrderSheetOpen}>
              <SheetTrigger asChild>
                <Button size="lg" className="w-full text-lg py-7 bg-primary text-primary-foreground hover:bg-primary/90" disabled={!selectedColor}>
                  <ShoppingCart className="mr-3 h-6 w-6" />
                  {selectedColor ? 'Place Order' : 'Select a color first'}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-headline text-3xl text-primary">Confirm Your Order</SheetTitle>
                  <SheetDescription>
                    You're ordering: <span className="font-bold text-foreground">{product.name}</span>
                  </SheetDescription>
                </SheetHeader>
                <OrderForm 
                  product={product} 
                  selectedColor={selectedColor!}
                  onOrderPlaced={() => setOrderSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
