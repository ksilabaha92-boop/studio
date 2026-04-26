'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useCart } from '@/context/cart-context';

const CheckoutFormSchema = z.object({
  customerFullName: z.string().min(3, { message: 'Full name is required' }),
  customerPhoneNumber: z.string().min(8, { message: 'A valid phone number is required' }),
  customerAddress: z.string().min(10, { message: 'A valid address is required' }),
});

type CheckoutFormProps = {
    onOrderPlaced: () => void;
};

export function CheckoutForm({ onOrderPlaced }: CheckoutFormProps) {
  const { firestore } = useFirebase();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof CheckoutFormSchema>>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      customerFullName: '',
      customerPhoneNumber: '',
      customerAddress: '',
    },
  });

  async function onSubmit(values: z.infer<typeof CheckoutFormSchema>) {
    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Database error",
            description: "Could not connect to the database. Please try again later.",
        });
        return;
    }
    if (cartItems.length === 0) {
        toast({
            variant: "destructive",
            title: "Empty Cart",
            description: "Your cart is empty. Add some products first.",
        });
        return;
    }

    setIsSubmitting(true);

    try {
        const batch = writeBatch(firestore);

        // 1. Create a new order document
        const orderRef = doc(collection(firestore, 'orders'));
        batch.set(orderRef, {
            id: orderRef.id,
            customerFullName: values.customerFullName,
            customerPhoneNumber: values.customerPhoneNumber,
            customerAddress: values.customerAddress,
            orderDate: serverTimestamp(),
            status: 'Pending'
        });

        // 2. Create orderItem sub-documents for each item in the cart
        cartItems.forEach(item => {
            const orderItemRef = doc(collection(firestore, 'orders', orderRef.id, 'orderItems'));
            batch.set(orderItemRef, {
                id: orderItemRef.id,
                orderId: orderRef.id,
                productId: item.productId,
                quantity: item.quantity,
                selectedColor: item.selectedColor,
                unitPrice: item.unitPrice,
            });
        });

        await batch.commit();

        toast({
            title: 'Order Placed!',
            description: "Thank you! We've received your order and will be in touch shortly.",
        });
        form.reset();
        clearCart();
        onOrderPlaced();

    } catch (error) {
        console.error("Error placing order:", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem placing your order. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="customerFullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerPhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl><Input type="tel" placeholder="48 140 022" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Address</FormLabel>
              <FormControl><Input placeholder="123 Clay St, Tunis" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='text-lg font-bold text-right pt-2'>
            Total: {totalPrice.toFixed(2)} TND
        </div>

        <Button type="submit" className="w-full btn-clay" disabled={isSubmitting || cartItems.length === 0}>
          {isSubmitting ? 'Submitting...' : 'Confirm & Submit Order'}
        </Button>
      </form>
    </Form>
  );
}
