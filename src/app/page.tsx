import {
  Hero,
  ProductOverview,
  AboutIntro,
  NewProduct,
  ProductSection,
  ProductCategories,
  NewsSection,
} from '@/components/sections';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100">
      <Hero />

      <NewProduct />

      <ProductSection />

      <ProductOverview />

      <ProductCategories />
      <AboutIntro />

      <NewsSection />
    </main>
  );
}
