'use client';

import { Button } from '@/components/ui/Button';
import CollectionCard from '@/components/ui/CollectionCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useRouter } from 'next/navigation';

const categories = [
  {
    id: 'san-go-noi-that',
    title: 'Sàn gỗ nội thất',
    description:
      'Sàn gỗ mang lại cảm giác êm chân, ấm áp và thẩm mỹ cao, lý tưởng cho mọi không gian sống hiện đại.',
    productCount: 12,
    imageUrl: '/images/prd-lg-1.webp',
  },
  {
    id: 'tran-nha-trang-tri',
    title: 'Trần nhà & trần trang trí',
    description:
      'Sàn gỗ mang lại cảm giác êm chân, ấm áp và thẩm mỹ cao, lý tưởng cho mọi không gian sống hiện đại.',
    productCount: 12,
    imageUrl: '/images/prd-lg-2.webp',
  },
  {
    id: 'op-tuong-ngoai-that',
    title: 'Ốp tường ngoại thất',
    description:
      'Sàn gỗ mang lại cảm giác êm chân, ấm áp và thẩm mỹ cao, lý tưởng cho mọi không gian sống hiện đại.',
    productCount: 12,
    imageUrl: '/images/prd-lg-3.webp',
  },
  {
    id: 'san-ngoai-troi',
    title: 'Sàn ngoài trời',
    description:
      'Sàn gỗ mang lại cảm giác êm chân, ấm áp và thẩm mỹ cao, lý tưởng cho mọi không gian sống hiện đại.',
    productCount: 12,
    imageUrl: '/images/prd-lg-4.webp',
  },
];

export function ProductCategories() {
  const router = useRouter();

  // Animation refs - Reduced delays for better user experience
  const { ref: subtitleRef } = useScrollReveal<HTMLParagraphElement>({
    staggerDelay: 0,
    elementType: 'text',
  });
  const { ref: headingRef } = useScrollReveal<HTMLHeadingElement>({
    staggerDelay: 100,
    elementType: 'text',
  });
  const { ref: buttonRef } = useScrollReveal<HTMLDivElement>({
    staggerDelay: 200,
    elementType: 'ui',
  });

  // Individual animation refs for each category card - Much faster stagger
  const cardRefs = categories.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScrollReveal<HTMLDivElement>({
      animationClass: 'animate-product-card',
      staggerDelay: 100 + index * 50, // 100ms base delay + 50ms between cards
      elementType: 'card',
    })
  );

  return (
    <section className="bg-white py-7 lg:py-16">
      <div className="page-container">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-16">
            <p
              ref={subtitleRef}
              className="subtitle-2 animate-on-scroll lg:min-w-[368px] lg:pt-2"
            >
              Theo nhu cầu sử dụng
            </p>
            <h2
              ref={headingRef}
              className="h3 animate-on-scroll lg:max-w-[305px]"
            >
              Ứng dụng linh hoạt cho mọi không gian
            </h2>
          </div>

          {/* Desktop Button */}
          <div
            ref={buttonRef}
            className="animate-on-scroll mt-4 hidden lg:mt-0 lg:block lg:flex-shrink-0"
          >
            <Button
              variant="button"
              mode="light"
              onClick={() => router.push('/products')}
            >
              Xem tất cả
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              ref={cardRefs[index].ref}
              className="animate-product-card"
            >
              <CollectionCard
                title={category.title}
                description={category.description}
                productCount={category.productCount}
                imageUrl={category.imageUrl}
                onLearnMore={() => {
                  router.push(`/products`);
                }}
              />
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-8 lg:hidden">
          <Button
            variant="button"
            mode="light"
            onClick={() => router.push('/products')}
          >
            Xem tất cả
          </Button>
        </div>
      </div>
    </section>
  );
}
