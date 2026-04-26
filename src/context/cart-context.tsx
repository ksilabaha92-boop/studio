'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (productId: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedColor: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = useCallback((itemToAdd: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.productId === itemToAdd.productId && item.selectedColor === itemToAdd.selectedColor
      );

      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map(item =>
          item.productId === itemToAdd.productId && item.selectedColor === itemToAdd.selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...itemToAdd, quantity }];
      }
    });
    toast({
        title: "Added to Cart",
        description: `${itemToAdd.name} is now in your cart.`,
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string, selectedColor: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.productId === productId && item.selectedColor === selectedColor))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, selectedColor: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId && item.selectedColor === selectedColor
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
