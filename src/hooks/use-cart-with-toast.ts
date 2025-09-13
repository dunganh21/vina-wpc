'use client';

import { useCart } from '@/lib/cart-context';
import { showCartSuccess } from '@/lib/toast-service';
import { CartItem } from '@/types/cart';

export function useCartWithToast() {
  const cart = useCart();

  const addItemWithToast = (item: Omit<CartItem, 'quantity'>) => {
    cart.addItem(item);
    
    // Show success toast using simple service
    showCartSuccess(item.collection);
  };

  return {
    ...cart,
    addItem: addItemWithToast,
  };
}