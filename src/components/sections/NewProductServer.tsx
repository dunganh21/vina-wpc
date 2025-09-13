import { getProducts } from '@/data/services/content';
import { NewProduct } from './NewProduct';

export async function NewProductServer() {
  // Fetch products and get the first one as the featured/new product
  const products = await getProducts();
  const featuredProduct = products[0]; // Get the first product as the "new" product

  if (!featuredProduct) {
    // Return null or a fallback if no products are available
    return null;
  }

  return <NewProduct product={featuredProduct} />;
}