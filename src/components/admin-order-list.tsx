'use client';
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { type Order, type OrderItem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useProducts } from "@/hooks/use-products";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { format } from 'date-fns';

function OrderItems({ orderId }: { orderId: string }) {
    const { firestore } = useFirebase();
    const { products, isInitialized: productsInitialized } = useProducts();

    const orderItemsRef = useMemoFirebase(
        () => firestore ? collection(firestore, 'orders', orderId, 'orderItems') : null,
        [firestore, orderId]
    );
    const { data: orderItems, isLoading: itemsLoading } = useCollection<OrderItem>(orderItemsRef);

    if (itemsLoading || !productsInitialized) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        );
    }
    
    if (!orderItems || orderItems.length === 0) {
        return <p className="text-muted-foreground text-sm">No items found for this order.</p>
    }

    return (
        <div className="space-y-4">
            {orderItems.map(item => {
                const product = products.find(p => p.id === item.productId);
                return (
                    <div key={item.id} className="flex items-center gap-4 p-2 rounded-md bg-secondary/20">
                        {product && (
                            <Image 
                                src={product.mainImageUrl} 
                                alt={product.name} 
                                width={48} 
                                height={48}
                                className="rounded-md object-cover aspect-square"
                            />
                        )}
                        <div className="flex-grow">
                            <p className="font-semibold">{product?.name || 'Product not found'}</p>
                            <p className="text-sm text-muted-foreground">
                                Color: <span className="w-3 h-3 inline-block rounded-full" style={{backgroundColor: item.selectedColor}} /> {item.selectedColor}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">{item.unitPrice} TND</p>
                            <p className="text-sm text-muted-foreground text-right">Qty: {item.quantity}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export function AdminOrderList() {
  const { firestore } = useFirebase();
  const ordersQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'orders'), orderBy('orderDate', 'desc')) : null),
    [firestore]
  );
  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  return (
    <div>
        <h2 className="font-headline text-3xl text-foreground mb-6">
            Customer Orders
        </h2>

        {isLoading && (
            <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        )}

        {!isLoading && (!orders || orders.length === 0) && (
            <p className="text-muted-foreground">No orders have been placed yet.</p>
        )}

        {orders && orders.length > 0 && (
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                        {orders.map(order => (
                            <AccordionItem value={order.id} key={order.id}>
                                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/20">
                                    <div className="flex justify-between items-center w-full">
                                        <div>
                                            <p className="font-bold">{order.customerFullName}</p>
                                            <p className="text-sm text-muted-foreground">{order.customerPhoneNumber}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{format(new Date(order.orderDate as string), 'PPpp')}</p>
                                            <p className="text-xs text-muted-foreground">{order.status}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-4">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        <strong>Address:</strong> {order.customerAddress}
                                    </p>
                                    <OrderItems orderId={order.id} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
