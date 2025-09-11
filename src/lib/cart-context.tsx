'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCartStorage } from '@/hooks/use-cart-storage';
import { showCartSuccess } from '@/lib/toast-service';
import { CartContextType, CartItem } from '@/types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const cartStorage = useCartStorage();

  // Wrap addItem to show toast notification
  const addItemWithToast = (item: Omit<CartItem, 'quantity'>) => {
    cartStorage.addItem(item);
    // Show success toast
    showCartSuccess(item.subtitle);
  };

  const contextValue: CartContextType = {
    items: cartStorage.items,
    itemCount: cartStorage.getCartCount(),
    totalPrice: cartStorage.getCartTotal(),
    addItem: addItemWithToast,
    removeItem: cartStorage.removeItem,
    updateQuantity: cartStorage.updateQuantity,
    clearCart: cartStorage.clearCart,
    getCartTotal: cartStorage.getCartTotal,
    getCartCount: cartStorage.getCartCount,
  };

  // Don't render children until cart is loaded from localStorage
  if (!cartStorage.isLoaded) {
    return null;
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}