'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function ContactSection() {
  const [formMode, setFormMode] = useState<0 | 1>(0);


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
                  Mua hàng (1 sản phẩm trong giỏ hàng)
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
                      <div className="body-3 flex items-center gap-1 text-secondary">
                        <span>1 sản phẩm</span>
                        <div className="size-1 rounded-full bg-secondary" />
                        <span>34.000.000đ</span>
                      </div>
                    </div>
                    <div className="size-6">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-secondary"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="space-y-4">
              <form className="relative flex flex-col gap-3">
                {/* Consultation Form */}
                <div
                  className={cn(
                    'transition-all duration-500 ease-in-out',
                    formMode === 0
                      ? 'pointer-events-auto translate-x-0 opacity-100'
                      : 'pointer-events-none absolute inset-0 -translate-x-4 opacity-0'
                  )}
                >
                  <div className="flex flex-col gap-3">
                    {/* Name Input */}
                    <Input placeholder="Họ tên" className="w-full" />

                    {/* Product Dropdown */}
                    <Select
                      placeholder="Bạn đang quan tâm đến sản phẩm nào?"
                      options={[
                        {
                          value: 'san-pham-nha-bep',
                          label: 'Sản phẩm nhà bếp',
                        },
                        {
                          value: 'san-pham-phong-tam',
                          label: 'Sản phẩm phòng tắm',
                        },
                        {
                          value: 'san-pham-ngoai-troi',
                          label: 'Sản phẩm ngoài trời',
                        },
                        {
                          value: 'san-pham-noi-that',
                          label: 'Sản phẩm nội thất',
                        },
                      ]}
                      className="w-full"
                    />

                    {/* Phone Input */}
                    <Input
                      type="tel"
                      placeholder="Số điện thoại"
                      className="w-full"
                    />

                    {/* Message TextArea */}
                    <TextArea
                      placeholder="Lời nhắn của bạn"
                      showCharacterCount={false}
                      className="w-full"
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="w-full">
                      Nhận tư vấn
                    </Button>
                  </div>
                </div>

                {/* Purchase Form */}
                <div
                  className={cn(
                    'transition-all duration-500 ease-in-out',
                    formMode === 1
                      ? 'pointer-events-auto translate-x-0 opacity-100'
                      : 'pointer-events-none absolute inset-0 translate-x-4 opacity-0'
                  )}
                >
                  <div className="flex flex-col gap-3">
                    {/* Name Input */}
                    <Input placeholder="Họ tên" className="w-full" />

                    {/* Phone Input */}
                    <Input
                      type="tel"
                      placeholder="Số điện thoại"
                      className="w-full"
                    />

                    {/* Message TextArea */}
                    <TextArea
                      placeholder="Lời nhắn của bạn"
                      showCharacterCount={false}
                      className="w-full"
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="w-full">
                      Nhận tư vấn
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Column 2: Blank space (25%) - Desktop only */}
        <div className="hidden lg:block lg:w-1/4" />

        {/* Columns 3-4: Hero Image (50%) - Desktop only */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="relative h-full w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/images/blog-hero.jpg')` }} />
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
