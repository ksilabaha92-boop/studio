import Image from 'next/image';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { Badge } from './ui/badge';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block overflow-hidden rounded-lg">
      <div className="aspect-[4/5] relative bg-card rounded-lg overflow-hidden">
        {product.onSale && <Badge variant="destructive" className="absolute top-3 right-3 z-10">SALE</Badge>}
        <Image
          src={product.mainImageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint={product.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a2e1a]/20 via-transparent to-transparent" />
      </div>
      <div className="pt-4 text-center">
        <h3 className="font-headline text-xl text-foreground transition-colors group-hover:text-primary">{product.name}</h3>
        {product.onSale && product.discountPrice ? (
            <p className="mt-1 font-body text-base font-medium">
                <span className="text-muted-foreground line-through mr-2">{product.price} TND</span>
                <span className="text-primary font-bold">{product.discountPrice} TND</span>
            </p>
        ) : (
            <p className="mt-1 font-body text-base font-medium text-primary">{product.price} TND</p>
        )}
      </div>
    </Link>
  );
}
