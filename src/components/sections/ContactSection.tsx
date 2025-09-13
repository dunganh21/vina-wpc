'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Select } from '../ui/Select';
import { useCart } from '@/lib/cart-context';
import { showToast } from '@/lib/toast-service';

export function ContactSection() {
  const [formMode, setFormMode] = useState<0 | 1>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items: cartItems, itemCount, totalPrice } = useCart();

  // Form state for consultation form
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    product: '',
    phone: '',
    message: '',
  });

  // Form state for purchase form
  const [purchaseForm, setPurchaseForm] = useState({
    name: '',
    phone: '',
    message: '',
  });

  // Handle consultation form submission
  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!consultationForm.name || !consultationForm.phone) {
      showToast({
        title: 'Thông tin không đầy đủ',
        message: 'Vui lòng nhập đầy đủ họ tên và số điện thoại',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success toast
      showToast({
        title: 'Gửi yêu cầu thành công!',
        message: 'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất',
        type: 'success',
        duration: 3000,
      });

      // Reset form
      setConsultationForm({
        name: '',
        product: '',
        phone: '',
        message: '',
      });

    } catch {
      showToast({
        title: 'Có lỗi xảy ra',
        message: 'Không thể gửi yêu cầu. Vui lòng thử lại sau',
        type: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle purchase form submission
  const handlePurchaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!purchaseForm.name || !purchaseForm.phone) {
      showToast({
        title: 'Thông tin không đầy đủ',
        message: 'Vui lòng nhập đầy đủ họ tên và số điện thoại',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    if (cartItems.length === 0) {
      showToast({
        title: 'Giỏ hàng trống',
        message: 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt mua',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success toast
      showToast({
        title: 'Đặt hàng thành công!',
        message: `Đơn hàng ${itemCount} sản phẩm đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm nhất`,
        type: 'success',
        duration: 3000,
      });

      // Reset form
      setPurchaseForm({
        name: '',
        phone: '',
        message: '',
      });

    } catch {
      showToast({
        title: 'Có lỗi xảy ra',
        message: 'Không thể đặt hàng. Vui lòng thử lại sau',
        type: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-container bg-white">
      {/* 4-Column Flex Layout */}
      <div className="flex">
        {/* Column 1: Content (25%) */}
        <div className="w-full lg:min-h-screen lg:w-1/4">
          <div className="space-y-2 py-6 lg:space-y-6 lg:py-[81px]">
            {/* Breadcrumb */}
            <nav className="subtitle-2 flex items-center gap-0.5 text-secondary">
              <span>Trang chủ</span>
              <span>/</span>
              <span className="opacity-50">Liên hệ</span>
            </nav>

            {/* Page Title */}
            <div className="space-y-4">
              <h1 className="text-primary max-sm:text-[24px]">Liên hệ</h1>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                <button
                  className={cn(
                    'body-3 transform cursor-pointer px-2.5 py-1.5 transition-all duration-300 ease-in-out hover:scale-105',
                    formMode === 0
                      ? 'bg-secondary text-white shadow-lg'
                      : 'bg-base-200 text-primary hover:bg-gray-100'
                  )}
                  onClick={() => setFormMode(0)}
                >
                  Nhận tư vấn
                </button>
                <button
                  className={cn(
                    'body-3 transform cursor-pointer px-2.5 py-1.5 transition-all duration-300 ease-in-out hover:scale-105',
                    formMode === 1
                      ? 'bg-secondary text-white shadow-lg'
                      : 'bg-base-200 text-primary hover:bg-gray-100'
                  )}
                  onClick={() => setFormMode(1)}
                >
                  Mua hàng ({itemCount} sản phẩm trong giỏ hàng)
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div
              className={cn(
                'overflow-hidden transition-all duration-500 ease-in-out',
                formMode === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="space-y-4">
                <div className="border border-base-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="h5 text-primary">Giỏ hàng</h3>
                      {cartItems.length > 0 ? (
                        <div className="body-3 flex items-center gap-1 text-secondary">
                          <span>{itemCount} sản phẩm</span>
                          <div className="size-1 rounded-full bg-secondary" />
                          <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
                        </div>
                      ) : (
                        <div className="body-3 text-secondary">
                          Chưa có sản phẩm trong giỏ hàng
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="space-y-4">
              <div className="relative flex flex-col gap-3">
                {/* Consultation Form */}
                <form
                  onSubmit={handleConsultationSubmit}
                  className={cn(
                    'transition-all duration-500 ease-in-out',
                    formMode === 0
                      ? 'pointer-events-auto translate-x-0 opacity-100'
                      : 'pointer-events-none absolute inset-0 -translate-x-4 opacity-0'
                  )}
                >
                  <div className="flex flex-col gap-3">
                    {/* Name Input */}
                    <Input
                      placeholder="Họ tên"
                      className="w-full"
                      value={consultationForm.name}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />

                    {/* Product Dropdown */}
                    <Select
                      label="Bạn đang quan tâm đến sản phẩm nào?"
                      options={[
                        {
                          value: 'kitchen',
                          label: 'Sản phẩm nhà bếp',
                        },
                        {
                          value: 'bathroom',
                          label: 'Sản phẩm phòng tắm',
                        },
                        {
                          value: 'outdoor',
                          label: 'Sản phẩm ngoài trời',
                        },
                        {
                          value: 'interior',
                          label: 'Sản phẩm nội thất',
                        },
                      ]}
                      className="w-full"
                      value={consultationForm.product}
                      onChange={(value) => setConsultationForm(prev => ({ ...prev, product: value }))}
                    />

                    {/* Phone Input */}
                    <Input
                      type="tel"
                      placeholder="Số điện thoại"
                      className="w-full"
                      value={consultationForm.phone}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />

                    {/* Message TextArea */}
                    <TextArea
                      placeholder="Lời nhắn của bạn"
                      showCharacterCount={false}
                      className="w-full"
                      value={consultationForm.message}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, message: e.target.value }))}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Nhận tư vấn'}
                    </Button>
                  </div>
                </form>

                {/* Purchase Form */}
                <form
                  onSubmit={handlePurchaseSubmit}
                  className={cn(
                    'transition-all duration-500 ease-in-out',
                    formMode === 1
                      ? 'pointer-events-auto translate-x-0 opacity-100'
                      : 'pointer-events-none absolute inset-0 translate-x-4 opacity-0'
                  )}
                >
                  <div className="flex flex-col gap-3">
                    {/* Name Input */}
                    <Input
                      placeholder="Họ tên"
                      className="w-full"
                      value={purchaseForm.name}
                      onChange={(e) => setPurchaseForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />

                    {/* Phone Input */}
                    <Input
                      type="tel"
                      placeholder="Số điện thoại"
                      className="w-full"
                      value={purchaseForm.phone}
                      onChange={(e) => setPurchaseForm(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />

                    {/* Message TextArea */}
                    <TextArea
                      placeholder="Lời nhắn của bạn"
                      showCharacterCount={false}
                      className="w-full"
                      value={purchaseForm.message}
                      onChange={(e) => setPurchaseForm(prev => ({ ...prev, message: e.target.value }))}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Đặt mua'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Blank space (25%) - Desktop only */}
        <div className="hidden lg:block lg:w-1/4" />

        {/* Columns 3-4: Hero Image (50%) - Desktop only */}
        <div className="hidden lg:block lg:w-1/2">
          <div
            className="relative h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/images/blog-hero.jpg')` }}
          />
        </div>
      </div>

      {/* Mobile Background - Full Width */}
      <div className="absolute inset-0 -z-10 opacity-20 lg:hidden">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80')`,
          }}
        />
      </div>
    </section>
  );
}
