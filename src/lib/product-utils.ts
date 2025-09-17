import type { Product } from '@/types/product';

/**
 * Centralized product utilities to eliminate code duplication
 */

// Extract dimensions from specifications text
export function extractDimensions(specs: string): string {
  const match = specs.match(/Kích thước:\s*([^\n]+)/);
  return match ? match[1].trim() : '900×120×15mm';
}

// Format price: number → "850.000đ/m²"
export function formatPrice(price: number | undefined): string {
  if (!price) return 'Liên hệ';
  return `${price.toLocaleString('vi-VN')}đ/m²`;
}

// Parse price for sorting and filtering
export function parsePrice(price: number): number {
  return price;
}

// Transform CMS Product data to ProductCard props format
export function transformProductForCard(product: Product) {
  const primaryImage = product.gallery?.[0] || '/images/prd-lg-1.jpg';

  return {
    id: product.slug,
    slug: product.slug,
    image: primaryImage,
    title: product.title,
    subtitle: product.collection,
    price: formatPrice(product.price),
    dimensions: extractDimensions(product.specifications),
  };
}

// Transform product for product detail page
export function transformProductForDetail(product: Product) {
  const defaultDimension =
    product.dimensions?.[0] || extractDimensions(product.specifications);

  return {
    id: product.slug,
    name: product.title,
    category: `TRANG CHỦ/SẢN PHẨM/${product.collection?.toUpperCase() || 'SẢN PHẨM'}`,
    price: product.price,
    unit: 'đ/m²',
    description: product.description,
    specifications: {
      size: defaultDimension,
      area: '4m²',
    },
    colors: product.colors.map((color, index) => ({
      id: `color-${index}`,
      color: color.hex,
      name: color.name || 'Màu mặc định',
    })),
    sizes: (product.dimensions || [defaultDimension]).map((dimension) => ({
      label: dimension,
      value: dimension,
    })),
    image: product.gallery?.[0] || '/images/prd-lg-1.jpg',
    gallery: [...(product.gallery || [])],
    features: [...(product.features || [])],
    rooms: [...(product.rooms || [])],
  };
}
