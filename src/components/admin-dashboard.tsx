'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductForm } from './product-form';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Trash2, Edit, PlusCircle } from 'lucide-react';
import { Separator } from './ui/separator';
import { AdminOrderList } from './admin-order-list';
import type { Product } from '@/lib/types';
import { Badge } from './ui/badge';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from './ui/scroll-area';

export function AdminDashboard() {
  const { products, addProduct, updateProduct, removeProduct, isInitialized } =
    useProducts();
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openAddForm = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    // A small delay to allow the dialog to close before resetting the product, prevents flickering
    setTimeout(() => {
      setProductToEdit(null);
    }, 300);
  };

  return (
    <div>
      <h1 className="font-headline text-4xl md:text-5xl text-primary mb-8">
        Admin Dashboard
      </h1>
      <div className="space-y-12">
        <AdminOrderList />

        <Separator />

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-3xl text-foreground">
              Manage Products
            </h2>
            <Button onClick={openAddForm}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>
          {isInitialized && products.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="flex items-center p-4 gap-4 bg-secondary/30"
                >
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
                        <Badge variant="destructive" className="mr-2">
                          SALE
                        </Badge>
                        <span className="text-muted-foreground line-through">
                          {product.price} TND
                        </span>
                        <span className="text-primary font-semibold ml-2">
                          {product.discountPrice} TND
                        </span>
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {product.price} TND
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditForm(product)}
                      aria-label={`Edit ${product.name}`}
                    >
                      <Edit className="h-5 w-5 text-primary" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProduct(product.id)}
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No products yet. Add one to get started.
            </p>
          )}
        </div>
      </div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-3xl text-foreground">
              {productToEdit ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <ProductForm
              onProductAdd={addProduct}
              onProductUpdate={updateProduct}
              productToEdit={productToEdit}
              onFormSubmit={closeForm}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
