import { Metadata } from 'next';
import { ProductsHero, ProductList } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Sản phẩm - VINA WPC',
  description: 'Khám phá các sản phẩm gỗ nhựa WPC chất lượng cao, vật liệu tạo nên không gian sống đẳng cấp',
};

export default function ProductsPage() {
  return (
    <main>
      <ProductsHero />
      <ProductList />
    </main>
  );
}