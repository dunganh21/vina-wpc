import { Metadata } from 'next';
import { ProductsHero } from '@/components/sections';
import { ProductListServer } from '@/components/sections/ProductListServer';
import { ROOM_URL_TO_DISPLAY } from '@/lib/filter-constants';

interface ProductsPageProps {
  searchParams: Promise<{
    rooms?: string;
    collection?: string;
    price?: string;
    page?: string;
    sort?: string;
  }>;
}

// Generate dynamic metadata based on filters for better SEO
export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  let title = 'Sản phẩm - VINA WPC';
  let description = 'Khám phá các sản phẩm gỗ nhựa WPC chất lượng cao';

  if (params.rooms) {
    const roomNames = params.rooms.split(',').map(room => {
      return ROOM_URL_TO_DISPLAY[room] || room;
    }).join(', ');
    title = `Sản phẩm WPC cho ${roomNames} - VINA WPC`;
    description = `Khám phá sản phẩm gỗ nhựa WPC chất lượng cao dành cho ${roomNames}`;
  }

  if (params.collection) {
    const collections = params.collection.split(',').join(', ');
    title = `${collections} - VINA WPC`;
    description = `Sản phẩm ${collections} từ VINA WPC`;
  }

  return { title, description };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  // Parse server-side filters for SEO and no FOUC
  const initialFilters = {
    categories: params.collection?.split(',') || [],
    rooms: params.rooms?.split(',').map(room => {
      return ROOM_URL_TO_DISPLAY[room.toLowerCase()] || room;
    }) || [],
    priceRanges: params.price?.split(',') || [],
  };

  const initialPage = parseInt(params.page || '1');
  const initialSort = params.sort === 'price-desc' ? false : true; // default to price-asc (true)

  return (
    <main>
      <ProductsHero />
      <ProductListServer
        initialFilters={initialFilters}
        initialPage={initialPage}
        initialSort={initialSort}
      />
    </main>
  );
}