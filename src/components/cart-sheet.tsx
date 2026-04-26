'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Separator } from './ui/separator';
import { CheckoutForm } from './checkout-form';

export function CartSheet() {
    const [open, setOpen] = useState(false);
    const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {cartCount}
                        </span>
                    )}
                    <span className="sr-only">Open shopping cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="font-headline text-3xl text-primary">Your Cart</SheetTitle>
                    <SheetDescription>
                        Review your items and proceed to checkout.
                    </SheetDescription>
                </SheetHeader>
                <Separator />
                {cartItems.length > 0 ? (
                    <>
                        <ScrollArea className="flex-grow my-4">
                            <div className="flex flex-col gap-6 pr-4">
                                {cartItems.map(item => (
                                    <div key={`${item.productId}-${item.selectedColor}`} className="flex items-center gap-4">
                                        <Image
                                            src={item.mainImageUrl}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="rounded-md object-cover aspect-square"
                                            data-ai-hint={item.imageHint}
                                        />
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.name}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>Color:</span>
                                                <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: item.selectedColor }} />
                                            </div>
                                            <p className="text-sm font-medium">{item.unitPrice.toFixed(2)} TND</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center">
                                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.productId, item.selectedColor, item.quantity - 1)}>
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    className="h-7 w-12 text-center"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.productId, item.selectedColor, parseInt(e.target.value) || 1)}
                                                    min="1"
                                                />
                                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.productId, item.selectedColor, item.quantity + 1)}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeFromCart(item.productId, item.selectedColor)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <Separator />
                        <CheckoutForm onOrderPlaced={() => setOpen(false)} />
                    </>
                ) : (
                    <div className="flex flex-grow flex-col items-center justify-center gap-4 text-center">
                        <ShoppingCart className="h-20 w-20 text-muted-foreground" />
                        <h3 className="font-headline text-2xl text-foreground">Your cart is empty</h3>
                        <p className="text-muted-foreground">Add some beautiful pottery to get started.</p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
