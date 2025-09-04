import { CustomerReviews, ProductImageGallery } from '@/components/sections';
import { ProductDetailSection } from '@/components/sections/ProductDetailSection';
import { ProductSpecifications } from '@/components/sections/ProductSpecifications';

export default function ProductDetailPage() {
  return (
    <main>
      <ProductDetailSection />
      <ProductSpecifications />
      <ProductImageGallery />
      <CustomerReviews />
    </main>
  );
}
