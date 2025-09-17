import { getProducts } from '@/data/services/content';
import { parsePrice } from '@/lib/product-utils';
import { matchesPriceRange } from '@/lib/filter-constants';
import { ProductList } from './ProductList';

interface FilterData {
  categories: string[];
  priceRanges: string[];
  rooms: string[];
}

interface ProductListServerProps {
  initialFilters: FilterData;
  initialPage: number;
  initialSort?: boolean;
}

export async function ProductListServer({
  initialFilters,
  initialPage,
  initialSort = true,
}: ProductListServerProps) {
  // Fetch real product data from CMS via Server Component
  const allProducts = await getProducts();

  // Server-side pre-filtering for SEO and performance
  const serverFilteredProducts = allProducts.filter((product) => {
    // Apply categories filter
    if (initialFilters.categories.length > 0) {
      const matchesCategory = initialFilters.categories.some(category =>
        product.collection.toLowerCase().includes(category.toLowerCase()) ||
        product.title.toLowerCase().includes(category.toLowerCase())
      );
      if (!matchesCategory) return false;
    }

    // Apply rooms filter
    if (initialFilters.rooms.length > 0) {
      if (!product.rooms || product.rooms.length === 0) return false;
      const matchesRoom = initialFilters.rooms.some(filterRoom =>
        product.rooms?.some(productRoom => {
          const normalizedFilterRoom = filterRoom.toLowerCase().replace(/\s+/g, '');
          const normalizedProductRoom = productRoom.toLowerCase().replace(/\s+/g, '');
          return normalizedProductRoom.includes(normalizedFilterRoom) ||
                 productRoom.toLowerCase().includes(filterRoom.toLowerCase());
        })
      );
      if (!matchesRoom) return false;
    }

    // Apply price ranges filter
    if (initialFilters.priceRanges.length > 0) {
      const priceNum = parsePrice(product.price);

      const matchesPrice = initialFilters.priceRanges.some(range =>
        matchesPriceRange(priceNum, range)
      );
      if (!matchesPrice) return false;
    }

    return true;
  });

  return (
    <ProductList
      cmsProducts={allProducts}
      serverFilteredProducts={serverFilteredProducts}
      initialFilters={initialFilters}
      initialPage={initialPage}
      initialSort={initialSort}
    />
  );
}