'use client';

import { useCallback } from 'react';
import { type Product } from '@/lib/types';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, deleteField } from 'firebase/firestore';
import { 
  addDocumentNonBlocking, 
  deleteDocumentNonBlocking, 
  setDocumentNonBlocking,
  updateDocumentNonBlocking
} from '@/firebase/non-blocking-updates';

export function useProducts() {
  const { firestore } = useFirebase();

  const productsCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'products') : null),
    [firestore]
  );

  const { data: products, isLoading, error } = useCollection<Product>(productsCollectionRef);

  const addProduct = useCallback((newProductData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!productsCollectionRef) return;
    
    // Create a new document with an auto-generated ID.
    const newDocRef = doc(collection(firestore!, 'products'));
    
    const productWithTimestamp: Omit<Product, 'id'> = {
      ...newProductData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Use setDocumentNonBlocking with the new reference to ensure the ID is included.
    setDocumentNonBlocking(newDocRef, { ...productWithTimestamp, id: newDocRef.id }, { merge: false });

  }, [productsCollectionRef, firestore]);

  const removeProduct = useCallback((productId: string) => {
    if (!firestore) return;
    const productDocRef = doc(firestore, 'products', productId);
    deleteDocumentNonBlocking(productDocRef);
  }, [firestore]);
  
  const updateProduct = useCallback((updatedProduct: Product) => {
    if (!firestore || !updatedProduct.id) return;
    const productDocRef = doc(firestore, 'products', updatedProduct.id);
    
    // Create a mutable copy of the data to update, excluding fields that should not change.
    const { id, createdAt, ...dataToUpdate } = updatedProduct;

    const payload: { [key: string]: any } = { ...dataToUpdate };

    // Always set the update timestamp
    payload.updatedAt = serverTimestamp();

    // If 'onSale' is explicitly false, we must remove the 'discountPrice' field from Firestore.
    if (payload.onSale === false) {
      payload.discountPrice = deleteField();
    }
    
    // Use the specific non-blocking update function.
    updateDocumentNonBlocking(productDocRef, payload);
  }, [firestore]);

  if (error) {
    console.error("Error fetching products:", error);
  }

  return { 
    products: products || [], 
    addProduct, 
    removeProduct, 
    updateProduct, 
    isInitialized: !isLoading 
  };
}
