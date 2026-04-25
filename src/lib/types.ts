import { Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  onSale?: boolean;
  discountPrice?: number;
  colors: string[];
  mainImageUrl: string;
  imageHint: string;
  available: boolean;
  createdAt: Timestamp | Date | string;
  updatedAt?: Timestamp | Date | string;
};

export type Order = {
    id: string;
    customerFullName: string;
    customerPhoneNumber: string;
    customerAddress: string;
    orderDate: Timestamp | Date | string;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
};

export type OrderItem = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    selectedColor: string;
    unitPrice: number;
};
