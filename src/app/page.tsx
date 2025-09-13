import {
  Hero,
  ProductCategories,
  ProductOverview,
} from '@/components/sections';
import { ProductPopularServer } from '@/components/sections/ProductPopularServer';
import { NewProductServer } from '@/components/sections/NewProductServer';
import { NewsServer } from '@/components/sections/NewsServer';
import { AboutIntroHero } from '@/components/sections/AboutIntroHero';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100">
      <Hero />

      <NewProductServer />

      <ProductPopularServer />

      <ProductOverview />

      <ProductCategories />

      <AboutIntroHero />

      <NewsServer />
    </main>
  );
}
