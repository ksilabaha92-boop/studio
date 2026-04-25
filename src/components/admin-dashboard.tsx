'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductForm } from './product-form';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Trash2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { AdminOrderList } from './admin-order-list';
import type { Product } from '@/lib/types';
import { Badge } from './ui/badge';

export function AdminDashboard() {
  const { products, addProduct, removeProduct, isInitialized } = useProducts();

  return (
    <div>
      <h1 className="font-headline text-4xl md:text-5xl text-primary mb-8">
        Admin Dashboard
      </h1>
      <div className="space-y-12">
        <AdminOrderList />
        
        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl text-foreground mb-6">
              Manage Products
            </h2>
            {isInitialized && products.length > 0 ? (
              <div className="space-y-6">
                {products.map((product) => (
                  <Card key={product.id} className="flex items-center p-4 gap-4 bg-secondary/30">
                    <Image
                      src={product.mainImageUrl}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover aspect-square"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold">{product.name}</h3>
                      {product.onSale && product.discountPrice ? (
                        <p className="text-sm">
                          <Badge variant="destructive" className="mr-2">SALE</Badge>
                          <span className="text-muted-foreground line-through">{product.price} TND</span>
                          <span className="text-primary font-semibold ml-2">{product.discountPrice} TND</span>
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">{product.price} TND</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProduct(product.id)}
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No products yet. Add one to get started.</p>
            )}
          </div>
          <div>
            <Card className="sticky top-8 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-foreground">Add New Product</CardTitle>
              </CardHeader>
              <CardContent>
                  <ProductForm onProductAdd={addProduct} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
