'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastProps } from '@/components/ui/Toast';

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => void;
  showCartSuccess: (productName: string, productImage?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    setIdCounter(prev => prev + 1);
    const id = `toast-${idCounter}`;
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: removeToast,
    };
    
    setToasts((prev) => [...prev, newToast]);
  };

  const showCartSuccess = (productName: string, productImage?: string) => {
    showToast({
      title: 'Đã thêm vào giỏ hàng',
      message: `${productName} đã được thêm vào giỏ hàng của bạn`,
      type: 'success',
      productImage,
      duration: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast, showCartSuccess }}>
      {children}
      
      {/* Toast Container - Using DaisyUI Toast */}
      <div className="toast toast-top toast-end z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}