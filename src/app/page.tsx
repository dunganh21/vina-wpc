import {
  Hero,
  ProductOverview,
  AboutIntro,
  NewProduct,
  ProductSection,
  ProductCategories,
  NewsSection,
} from '@/components/sections';
import { AboutIntroHero } from '@/components/sections/AboutIntroHero';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100">
      <Hero />

      <NewProduct />

      <ProductSection />

      <ProductOverview />

      <ProductCategories />

      <AboutIntroHero />

      <NewsSection />
    </main>
  );
}
