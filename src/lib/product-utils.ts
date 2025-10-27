import type { Product } from '@/types/product';

/**
 * Centralized product utilities to eliminate code duplication
 */

// Extract dimensions from specifications text
export function extractDimensions(specs: string): string | undefined {
  const match = specs.match(/Kích thước:\s*([^\n]+)/);
  return match ? match[1].trim() : undefined;
}

// Format price: number → "850.000đ/m²" or string → "Liên hệ"
export function formatPrice(price: number | string | undefined): string {
  if (!price) return 'Liên hệ';
  if (typeof price === 'string') return price;
  return `${price.toLocaleString('vi-VN')}đ/m²`;
}

// Parse price for sorting and filtering
export function parsePrice(price: number | string): number {
  if (typeof price === 'string') return 0; // Contact prices go to the end
  return price;
}

// Check if price is a contact price (string)
export function isContactPrice(price: number | string | undefined): boolean {
  return typeof price === 'string';
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
  const extractedDimension = extractDimensions(product.specifications);
  const defaultDimension = product.dimensions?.[0] || extractedDimension;

  return {
    id: product.slug,
    name: product.title,
    category: `TRANG CHỦ/SẢN PHẨM/${product.collection?.toUpperCase() || 'SẢN PHẨM'}`,
    collection: product.collection, // Original collection name for cart
    price: product.price,
    unit: 'đ/m²',
    description: product.description,
    specifications: {
      size: defaultDimension || '',
      area: '4m²',
    },
    colors: product.colors.map((color, index) => ({
      id: `color-${index}`,
      color: color.hex,
      name: color.name || 'Màu mặc định',
    })),
    sizes: (product.dimensions || (defaultDimension ? [defaultDimension] : [])).map((dimension) => ({
      label: dimension,
      value: dimension,
    })),
    image: product.gallery?.[0] || '/images/prd-lg-1.jpg',
    gallery: [...(product.gallery || [])],
    features: [...(product.features || [])],
    rooms: [...(product.rooms || [])],
  };
}
