import { CustomerReviews, ProductImageGallery } from '@/components/sections';
import { ProductDetailSection } from '@/components/sections/ProductDetailSection';
import { ProductSpecifications } from '@/components/sections/ProductSpecifications';
import { getProduct, getAllProductSlugs } from '@/data/services/content';
import { transformProductForDetail } from '@/lib/product-utils';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all product slugs
export function generateStaticParams() {
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
  const productData = transformProductForDetail(product);

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
