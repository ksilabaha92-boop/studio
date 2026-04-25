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
import { ShoppingCart, BadgePercent } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

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
          <div className="max-w-3xl mx-auto">
            <Skeleton className="w-full aspect-[4/3] rounded-lg bg-card mb-8" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4 bg-card" />
              <Skeleton className="h-8 w-1/4 bg-card" />
              <Skeleton className="h-24 w-full bg-card" />
              <Skeleton className="h-12 w-full bg-card" />
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
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-card element-glow mb-12">
            {product.onSale && (
                <Badge variant="destructive" className="absolute top-4 right-4 z-10 text-base py-1 px-3">
                    <BadgePercent className="mr-2 h-5 w-5" />
                    SALE
                </Badge>
            )}
            <Image
              src={product.mainImageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="font-headline text-4xl text-foreground text-glow">{product.name}</h1>
              {product.onSale && product.discountPrice ? (
                <div className="flex items-baseline gap-3 mt-2">
                    <p className="font-body font-medium text-2xl text-primary">{product.discountPrice} TND</p>
                    <p className="font-body font-medium text-lg text-muted-foreground line-through">{product.price} TND</p>
                </div>
              ) : (
                <p className="font-body font-medium text-2xl text-primary mt-2">{product.price} TND</p>
              )}
            </div>
            
            <Separator />
            
            <p className="text-base text-foreground/80 leading-relaxed">{product.description}</p>
            
            <div>
              <h3 className="font-body font-medium text-foreground mb-3">Color</h3>
              <div className="flex flex-wrap items-center gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorSelect(color)}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-all duration-200",
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
                <Button size="lg" className="w-full text-lg py-6 bg-primary text-primary-foreground hover:bg-primary/90 btn-clay" disabled={!selectedColor}>
                  <ShoppingCart className="mr-3 h-5 w-5" />
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
