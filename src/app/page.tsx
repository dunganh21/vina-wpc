import {
  Hero,
  NewProduct,
  NewsSection,
  ProductCategories,
  ProductOverview,
} from '@/components/sections';
import { ProductPopularServer } from '@/components/sections/ProductPopularServer';
import { AboutIntroHero } from '@/components/sections/AboutIntroHero';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100">
      <Hero />

      <NewProduct />

      <ProductPopularServer />

      <ProductOverview />

      <ProductCategories />

      <AboutIntroHero />

      <NewsSection />
    </main>
  );
}
