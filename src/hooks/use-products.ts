'use client';

import { useState, useEffect, useCallback } from 'react';
import { type Product } from '@/lib/types';
import { initialProducts } from '@/lib/data';

const STORAGE_KEY = 'tohfafino-products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      const storedProducts = item ? JSON.parse(item) : initialProducts;
      setProducts(storedProducts);
    } catch (error) {
      console.warn(`Error reading localStorage key “${STORAGE_KEY}”:`, error);
      setProducts(initialProducts);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      } catch (error) {
        console.warn(`Error setting localStorage key “${STORAGE_KEY}”:`, error);
      }
    }
  }, [products, isInitialized]);

  const addProduct = useCallback((newProduct: Product) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
  }, []);
  
  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts((prevProducts) => 
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  }, []);


  return { products, addProduct, removeProduct, updateProduct, isInitialized };
}
