import { CustomerReviews, ProductImageGallery } from '@/components/sections';
import { ProductDetailSection } from '@/components/sections/ProductDetailSection';
import { ProductSpecifications } from '@/components/sections/ProductSpecifications';
import { getProduct, getAllProductSlugs } from '@/data/services/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Force dynamic rendering to avoid static generation event handler issues
export const dynamic = 'force-dynamic';

// Generate static paths for all products
export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Sản phẩm không tìm thấy - VINA WPC',
    };
  }

  return {
    title: `${product.title} - VINA WPC`,
    description: product.description,
    openGraph: {
      title: `${product.title} - VINA WPC`,
      description: product.description,
      images: product.gallery?.[0] ? [product.gallery[0]] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Transform CMS product data for components - ensure plain objects only
  const defaultDimension = product.dimensions?.[0] || extractDimensions(product.specifications);
  const productData = {
    id: product.slug,
    name: product.title,
    category: `TRANG CHỦ/SẢN PHẨM/${product.collection?.toUpperCase() || 'SẢN PHẨM'}`,
    price: product.price ? parseInt(product.price.replace(/[^\d]/g, '')) : 0,
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
    sizes: (product.dimensions || [defaultDimension]).map(dimension => ({
      label: dimension,
      value: dimension,
    })),
    image: product.gallery?.[0] || '/images/prd-lg-1.jpg',
    gallery: [...(product.gallery || [])],
    features: [...(product.features || [])],
    rooms: [...(product.rooms || [])],
  };

  // Transform specifications for ProductSpecifications component
  const specifications = parseSpecifications(product.specifications);

  // Transform images for ProductImageGallery component
  const images = {
    main: {
      src: product.gallery?.[0] || '/images/prd-lg-1.jpg',
      alt: product.title,
    },
    secondary:
      product.gallery?.slice(1).map((img) => ({
        src: img,
        alt: product.title,
      })) || [],
  };

  return (
    <main>
      <ProductDetailSection productData={productData} />
      <ProductSpecifications specifications={specifications} />
      <ProductImageGallery images={images} />
      <CustomerReviews />
    </main>
  );
}

// Helper function to extract dimensions from specifications
function extractDimensions(specs: string): string {
  const match = specs.match(/Kích thước:\s*([^\n]+)/);
  return match ? match[1].trim() : '900×120×15mm';
}

// Helper function to parse specifications text into structured data
function parseSpecifications(specs: string) {
  const lines = specs.split('\n').filter((line) => line.trim());
  const specifications: { label: string; description: string }[] = [];

  // Add basic specifications
  lines.forEach((line) => {
    if (line.startsWith('-') && line.includes(':')) {
      // Remove the leading "- " and split by ":"
      const cleanLine = line.replace(/^-\s*/, '');
      const [label, description] = cleanLine.split(':').map((s) => s.trim());
      if (label && description) {
        specifications.push({ label, description });
      }
    }
  });

  return specifications;
}
