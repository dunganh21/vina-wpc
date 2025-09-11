'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  productImage?: string;
  onClose: (id: string) => void;
}

export function Toast({
  id,
  title,
  message,
  type = 'success',
  duration = 4000,
  productImage,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  }, [id, onClose]);

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setIsVisible(true), 10);

    // Auto close
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, handleClose]);

  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'info':
      default:
        return 'alert-info';
    }
  };

  const renderIcon = () => {
    if (type === 'success') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  };

  return (
    <div
      className={cn(
        'alert max-w-sm transition-all duration-300 ease-out',
        getAlertClass(),
        isVisible && !isLeaving
          ? 'translate-x-0 scale-100 opacity-100'
          : isLeaving
            ? 'translate-x-full scale-95 opacity-0'
            : 'translate-x-full scale-95 opacity-0'
      )}
    >
      {/* Product Image (if provided) */}
      {productImage && (
        <div className="avatar">
          <div className="w-8 rounded">
            <Image
              src={productImage}
              alt={title}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Icon */}
      {renderIcon()}

      {/* Text Content */}
      <div className="flex-1">
        <div className="font-bold">{title}</div>
        <div className="text-xs">{message}</div>
      </div>
    </div>
  );
}
