'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ColorOption } from '@/components/ui/ColorOption';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';

interface ProductData {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number | string;
  unit: string;
  description: string;
  specifications: {
    size: string;
    area: string;
  };
  colors: Array<{
    id: string;
    color: string;
    name?: string;
  }>;
  sizes: Array<{
    label: string;
    value: string;
  }>;
  image: string;
  gallery?: string[];
  features?: string[];
  rooms?: string[];
}

interface ProductDetailSectionProps {
  productData: ProductData;
}

export function ProductDetailSection({
  productData,
}: ProductDetailSectionProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(productData.colors[0].id);
  const [selectedSize, setSelectedSize] = useState(
    productData.specifications.size
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const isContactPrice = typeof productData.price === 'string';

  const handleAddToCart = () => {
    // Normalize ID to ensure consistency
    const normalizedId = productData.id.trim().toLowerCase();

    addItem({
      id: normalizedId,
      title: productData.name,
      price: (isContactPrice
        ? productData.price
        : `${((productData.price as number) * quantity).toLocaleString('vi-VN')}đ`) as string,
      dimensions: selectedSize,
      image: productData.image,
      slug: productData.id,
      collection: productData.collection,
      colors: productData.colors.map((c) => ({
        name: c.name || 'Default',
        hex: c.color,
      })),
    });
  };

  const totalPrice = isContactPrice ? productData.price : (productData.price as number) * quantity;

  return (
    <section className="bg-white">
      <div className="page-container py-6 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-43">
          {/* Product Image */}
          <div className="w-full max-w-lg flex-shrink-0 lg:w-1/3 lg:max-w-md">
            <div className="mx-auto aspect-[4/5]">
              <div className="relative h-full w-full overflow-hidden bg-base-200">
                <Image
                  src={productData.image}
                  alt={productData.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col gap-4 lg:w-1/3 lg:max-w-lg lg:gap-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-secondary">
              <Link href="/" className="transition-colors hover:text-primary">
                TRANG CHỦ
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="transition-colors hover:text-primary"
              >
                SẢN PHẨM
              </Link>
              <span>/</span>
              <span className="text-primary">SCANDINAVIAN LIGHT</span>
            </nav>

            {/* Product Title */}
            <div className="space-y-2">
              <h1 className="h2 text-primary">{productData.name}</h1>
              <p className="body-2 leading-relaxed text-secondary">
                {productData.description}
              </p>
            </div>

            {/* Product Variants */}
            <div className="mt-5 lg:mt-10">
              {/* Size Selection - Only show if sizes are available */}
              {productData.sizes && productData.sizes.length > 0 && (
                <Select
                  label="Kích thước"
                  options={productData.sizes}
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="max-w-full"
                />
              )}

              {/* Color Selection */}

              <div className={`flex min-h-14 w-full items-center justify-between border ${productData.sizes && productData.sizes.length > 0 ? 'border-t-0' : ''} border-base-300 bg-base-100 px-4 py-4`}>
                <div className="space-y-1">
                  <span className="body-2 font-semibold text-primary">
                    Màu sắc
                  </span>
                  <div className="body-3 text-secondary">
                    {productData.colors.find(c => c.id === selectedColor)?.name || 'Không xác định'}
                  </div>
                </div>
                <ColorOption
                  colors={productData.colors}
                  selectedColor={selectedColor}
                  handleColorSelect={setSelectedColor}
                />
              </div>

              {/* Quantity Selection */}

              <div className="flex min-h-14 w-full items-center justify-between border border-t-0 border-base-300 bg-base-100 px-4 py-4">
                <div className="space-y-1">
                  <span className="body-2 text-primary">Số m²</span>
                  <div className="body-3 text-secondary">{quantity}m</div>
                </div>
                <div className="flex items-center border border-base-300">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center border-r border-base-300 hover:bg-base-200"
                    disabled={quantity <= 1}
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
                    <span className="h7">{quantity}</span>
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center border-l border-base-300 hover:bg-base-200"
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
              </div>
            </div>

            {/* Price */}

            <div className="text-left">
              <div className="h3 text-primary">
                {isContactPrice
                  ? totalPrice
                  : `${(totalPrice as number).toLocaleString('vi-VN')}đ/m²`
                }
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="button"
                className="flex-1"
                icon="phone.svg"
                onClick={() => router.push('/contact')}
              >
                Liên hệ đặt hàng
              </Button>
              <Button
                variant="button-outline"
                className="flex-1"
                icon="shopping-cart.svg"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
