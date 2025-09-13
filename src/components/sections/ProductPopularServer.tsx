import { getProducts } from '@/data/services/content';
import { ProductPopular } from './ProductPopular';

export async function ProductPopularServer() {
  // Fetch real product data from CMS via Server Component
  const cmsProducts = await getProducts();

  return <ProductPopular cmsProducts={cmsProducts} />;
}