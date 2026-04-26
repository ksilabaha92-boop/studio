'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useDoc, useFirebase, useMemoFirebase } from '@/firebase';
import { useCart } from '@/context/cart-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCart, BadgePercent, Truck, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { type Product } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const { firestore } = useFirebase();
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const productRef = useMemoFirebase(
    () => (firestore && id ? doc(firestore, 'products', id) : null),
    [firestore, id]
  );

  const { data: product, isLoading: isProductLoading } = useDoc<Product>(productRef);

  const handleAddToCart = () => {
    if (!product || !selectedColor) return;

    const priceToUse = product.onSale && product.discountPrice ? product.discountPrice : product.price;

    addToCart({
      productId: product.id,
      name: product.name,
      unitPrice: priceToUse,
      mainImageUrl: product.mainImageUrl,
      imageHint: product.imageHint,
      selectedColor: selectedColor,
    }, quantity);
  };
  
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  }

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
          <div className="space-y-8">
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

            <div>
                <h3 className="font-body font-medium text-foreground mb-3">Quantity</h3>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input 
                        type="number" 
                        className="w-16 text-center" 
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            
            <Button size="lg" className="w-full text-lg py-6 bg-primary text-primary-foreground hover:bg-primary/90 btn-clay" disabled={!selectedColor} onClick={handleAddToCart}>
              <ShoppingCart className="mr-3 h-5 w-5" />
              {selectedColor ? 'Add to Cart' : 'Select a color first'}
            </Button>

            <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground">
              <Truck className="h-5 w-5" />
              <span>Free delivery within Kelibia</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
