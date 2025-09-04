import {
  AboutIntro,
  ProductComposition,
  WhyChooseUs,
} from '@/components/sections';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutIntro />
      <WhyChooseUs />
      <ProductComposition />
    </main>
  );
}
