import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden border-none bg-card/50 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
        <CardHeader className="p-0">
          <div className="aspect-[4/5] overflow-hidden">
            <Image
              src={product.mainImageUrl}
              alt={product.name}
              width={800}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={product.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <CardTitle className="font-headline text-2xl text-primary">{product.name}</CardTitle>
          <p className="mt-2 text-muted-foreground line-clamp-2">{product.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-6 pt-0">
          <div className="flex items-center gap-2">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className={cn(
                  "h-5 w-5 rounded-full border-2",
                  color.toLowerCase() === '#f9f4f0' ? 'border-border' : 'border-transparent'
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <p className="font-body font-bold text-lg text-primary">{product.price} TND</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
