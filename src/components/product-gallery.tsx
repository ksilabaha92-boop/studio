'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductCard } from './product-card';
import { Skeleton } from './ui/skeleton';

export function ProductGallery() {
  const { products, isInitialized } = useProducts();

  if (!isInitialized) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[4/5] w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="font-headline text-3xl text-primary text-glow">Our Atelier is Quiet</h2>
        <p className="text-muted-foreground mt-4">New creations are coming soon. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
