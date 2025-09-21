import {
  Hero,
  ProductCategories,
  ProductOverview,
} from '@/components/sections';
import { AboutIntroHero } from '@/components/sections/AboutIntroHero';
import { NewProductServer } from '@/components/sections/NewProductServer';
import { NewsServer } from '@/components/sections/NewsServer';
import { ProductPopularServer } from '@/components/sections/ProductPopularServer';

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
