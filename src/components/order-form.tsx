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
import { Product } from '@/lib/types';
import { useFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';

const OrderFormSchema = z.object({
  customerFullName: z.string().min(3, { message: 'Full name is required' }),
  customerPhoneNumber: z.string().min(8, { message: 'A valid phone number is required' }),
  customerAddress: z.string().min(10, { message: 'A valid address is required' }),
});

type OrderFormProps = {
    product: Product;
    selectedColor: string;
    onOrderPlaced: () => void;
};

export function OrderForm({ product, selectedColor, onOrderPlaced }: OrderFormProps) {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof OrderFormSchema>>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      customerFullName: '',
      customerPhoneNumber: '',
      customerAddress: '',
    },
  });

  async function onSubmit(values: z.infer<typeof OrderFormSchema>) {
    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Database error",
            description: "Could not connect to the database. Please try again later.",
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

        // 2. Create a new orderItem sub-document
        const orderItemRef = doc(collection(firestore, 'orders', orderRef.id, 'orderItems'));
        batch.set(orderItemRef, {
            id: orderItemRef.id,
            orderId: orderRef.id,
            productId: product.id,
            quantity: 1, // Assuming quantity is always 1 for this UI
            selectedColor: selectedColor,
            unitPrice: product.price,
        });

        await batch.commit();

        toast({
            title: 'Order Placed!',
            description: "Thank you! We've received your order and will be in touch shortly.",
        });
        form.reset();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
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
              <FormControl><Input type="tel" placeholder="+216 12 345 678" {...field} /></FormControl>
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

        <Button type="submit" className="w-full btn-clay" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Confirm & Submit Order'}
        </Button>
      </form>
    </Form>
  );
}
