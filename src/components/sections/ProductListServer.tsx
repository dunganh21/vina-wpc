import { getProducts } from '@/data/services/content';
import { ProductList } from './ProductList';

export async function ProductListServer() {
  // Fetch real product data from CMS via Server Component
  const cmsProducts = await getProducts();

  return <ProductList cmsProducts={cmsProducts} />;
}