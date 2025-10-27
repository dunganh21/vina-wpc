'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Button } from './Button';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';

interface ShoppingCartProps {
  showCart: boolean;
  onClose: () => void;
}

export function ShoppingCart({ showCart, onClose }: ShoppingCartProps) {
  const router = useRouter();
  const {
    items: cartItems,
    updateQuantity,
    removeItem,
    totalPrice,
  } = useCart();

  const handleUpdateQuantity = (id: string, change: number) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem) {
      const newQuantity = currentItem.quantity + change;
      updateQuantity(id, newQuantity); // Will auto-remove if quantity <= 0
    }
  };

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
    <dialog id="cart_modal" className="modal m-0 modal-top p-0 lg:modal-end">
      <div className="modal-box m-0 mt-0 h-auto max-h-[85vh] w-full rounded-none bg-white shadow-elevated lg:ml-auto lg:h-screen lg:max-h-screen">
        <div className="flex h-full flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-base-300 pb-4">
            <h3 className="h5">Giỏ hàng</h3>
            <form method="dialog">
              <button
                className="btn btn-circle cursor-pointer border-none btn-ghost btn-sm btn-primary hover:bg-white hover:text-primary hover:shadow-none"
                onClick={onClose}
              >
                ✕
              </button>
            </form>
          </div>
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 text-6xl opacity-30">🛒</div>
                <div className="h6 mb-2 text-secondary">Giỏ hàng trống</div>
                <div className="body-3 text-secondary opacity-70">
                  Hãy thêm sản phẩm vào giỏ hàng để tiếp tục
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div className="relative h-[125px] w-[114px] flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
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
                            <h6 className="text-primary">{item.collection}</h6>
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
                              onClick={() => handleUpdateQuantity(item.id, -1)}
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
                              onClick={() => handleUpdateQuantity(item.id, 1)}
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
                            {item.dimensions && (
                              <div className="body-3 text-secondary opacity-85">
                                {item.dimensions}
                              </div>
                            )}
                            <div className="h6 text-primary">
                              {(() => {
                                // Check if price is a contact price (non-numeric)
                                const priceMatch = item.price.match(/[\d,.]+/);
                                if (!priceMatch) {
                                  return item.price; // Return "Liên hệ" as is
                                }

                                const itemPrice = parseFloat(
                                  item.price.replace(/[^\d]/g, '')
                                );
                                const totalItemPrice =
                                  itemPrice * item.quantity;
                                return (
                                  totalItemPrice.toLocaleString('vi-VN') + 'đ'
                                );
                              })()}
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
            )}
          </div>

          {/* Total Section */}
          {cartItems.length > 0 && (
            <div className="border-t border-base-300 pt-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="h6">Tổng giá</div>
                  <div className="body-3 text-secondary">
                    Đã bao gồm thuế VAT
                  </div>
                </div>
                <div className="h5">{totalPrice.toLocaleString('vi-VN')}đ</div>
              </div>

              {/* Contact Button */}
              <Button 
                variant="button" 
                className="w-full" 
                icon="send.svg"
                onClick={() => {
                  onClose();
                  router.push('/contact?mode=purchase');
                }}
              >
                Liên hệ mua hàng
              </Button>
            </div>
          )}
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
