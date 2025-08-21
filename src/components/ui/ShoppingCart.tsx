'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './Button';

interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  dimensions: string;
  quantity: number;
  totalPrice: string;
  imageUrl: string;
}

interface ShoppingCartProps {
  showCart: boolean;
  onClose: () => void;
  items?: CartItem[];
  onCartUpdate?: (itemCount: number) => void;
}

const defaultCartItems: CartItem[] = [
  {
    id: '1',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
    quantity: 40,
    totalPrice: '34.000.000đ',
    imageUrl: '/images/prd-lg-1.jpg',
  },
  {
    id: '2',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
    quantity: 40,
    totalPrice: '34.000.000đ',
    imageUrl: '/images/prd-lg-2.png',
  },
  {
    id: '3',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
    quantity: 40,
    totalPrice: '34.000.000đ',
    imageUrl: '/images/prd-lg-3.png',
  },
];

export function ShoppingCart({
  showCart,
  onClose,
  items = defaultCartItems,
  onCartUpdate,
}: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
      const totalItems = updated.reduce((sum, item) => sum + item.quantity, 0);
      onCartUpdate?.(totalItems);
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      const totalItems = updated.reduce((sum, item) => sum + item.quantity, 0);
      onCartUpdate?.(totalItems);
      return updated;
    });
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace(/[^\d]/g, ''));
    return total + itemPrice * item.quantity;
  }, 0);

  // Initialize cart count
  useEffect(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    onCartUpdate?.(totalItems);
  }, [cartItems.length, onCartUpdate]);

  useEffect(() => {
    const modal = document.getElementById('cart_modal') as HTMLDialogElement;
    if (!modal) return;

    if (showCart) {
      modal.showModal();
    } else {
      modal.close();
    }

    const handleClose = () => {
      onClose();
    };

    modal.addEventListener('close', handleClose);
    return () => {
      modal.removeEventListener('close', handleClose);
    };
  }, [showCart, onClose]);

  return (
    <dialog id="cart_modal" className="modal modal-top lg:modal-end">
      <div className="modal-box m-0 mt-0 h-auto max-h-[85vh] w-full rounded-none bg-white shadow-elevated lg:ml-auto lg:h-screen lg:max-h-screen">
        <div className="flex h-full flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-base-300 pb-4">
            <h3 className="h5">Giỏ hàng</h3>
            <form method="dialog">
              <button
                className="btn btn-circle cursor-pointer btn-ghost btn-sm btn-primary"
                onClick={onClose}
              >
                ✕
              </button>
            </form>
          </div>
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="relative h-[125px] w-[114px] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.subtitle}
                        fill
                        className="object-cover"
                        sizes="114px"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between py-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="subtitle-4">{item.title}</div>
                          <h6 className="text-primary">{item.subtitle}</h6>
                        </div>
                        {/* Remove Button */}
                        <button
                          className="cursor-pointer rounded p-1 hover:bg-base-200"
                          onClick={() => removeItem(item.id)}
                        >
                          <Image
                            src="/icons/remove_shopping_cart.svg"
                            alt="Remove from cart"
                            width={20}
                            height={20}
                            className="h-5 w-5 opacity-60 hover:opacity-100"
                          />
                        </button>
                      </div>

                      <div className="flex w-full items-end justify-between lg:w-auto lg:gap-15">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-base-300">
                          <button
                            className="flex h-9 w-9 cursor-pointer items-center justify-center border-r border-base-300 hover:bg-base-200"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Image
                              src="/icons/remove.svg"
                              alt="Decrease"
                              width={16}
                              height={16}
                              className="h-4 w-4"
                            />
                          </button>
                          <div className="flex h-9 w-9 items-center justify-center">
                            <span className="h7">{item.quantity}</span>
                          </div>
                          <button
                            className="flex h-9 w-9 cursor-pointer items-center justify-center border-l border-base-300 hover:bg-base-200"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Image
                              src="/icons/add.svg"
                              alt="Increase"
                              width={16}
                              height={16}
                              className="h-4 w-4"
                            />
                          </button>
                        </div>

                        {/* Price Info */}
                        <div className="text-right">
                          <div className="body-3 text-secondary opacity-85">
                            {item.price}
                          </div>
                          <div className="body-3 text-secondary opacity-85">
                            {item.dimensions}
                          </div>
                          <div className="h6 text-primary">
                            {item.totalPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <div className="mt-4 border-b border-base-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Total Section */}
          <div className="border-t border-base-300 pt-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="h6">Tổng giá</div>
                <div className="body-3 text-secondary">Đã bao gồm thuế VAT</div>
              </div>
              <div className="h5">{totalAmount.toLocaleString('vi-VN')}đ</div>
            </div>

            {/* Contact Button */}
            <Button variant="button" className="w-full" icon="send.svg">
              Liên hệ mua hàng
            </Button>
          </div>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose} className="cursor-pointer">
          close
        </button>
      </form>
    </dialog>
  );
}
