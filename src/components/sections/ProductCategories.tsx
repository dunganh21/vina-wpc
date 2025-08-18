import { Button } from '@/components/ui/Button';
import CollectionCard from '@/components/ui/CollectionCard';

const categories = [
  {
    id: 'san-go-noi-that',
    title: 'Sàn gỗ nội thất',
    description:
      'Sàn gỗ mang lại cảm giác êm chân, ấm áp và thẩm mỹ cao, lý tưởng cho mọi không gian sống hiện đại.',
    productCount: 12,
    imageUrl: '/images/prd-lg-1.jpg',
  },
  {
    id: 'tran-nha-trang-tri',
    title: 'Trần nhà & trần trang trí',
    description:
      'Sàn gỗ mang lại cảm giác êm chân, ấm áp và thẩm mỹ cao, lý tưởng cho mọi không gian sống hiện đại.',
    productCount: 12,
    imageUrl: '/images/prd-lg-2.png',
  },
  {
    id: 'op-tuong-ngoai-that',
    title: 'Ốp tường ngoại thất',
    description:
      'Sàn gỗ mang lại cảm giác êm chân, ấm áp và thẩm mỹ cao, lý tưởng cho mọi không gian sống hiện đại.',
    productCount: 12,
    imageUrl: '/images/prd-lg-3.png',
  },
  {
    id: 'san-ngoai-troi',
    title: 'Sàn ngoài trời',
    description:
      'Sàn gỗ mang lại cảm giác êm chân, ấm áp và thẩm mỹ cao, lý tưởng cho mọi không gian sống hiện đại.',
    productCount: 12,
    imageUrl: '/images/prd-lg-4.png',
  },
];

export function ProductCategories() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="page-container">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-16">
            <p className="subtitle-2 lg:min-w-[368px] lg:pt-2">
              Theo nhu cầu sử dụng
            </p>
            <h2 className="h3 lg:max-w-[305px]">
              Ứng dụng linh hoạt cho mọi không gian
            </h2>
          </div>

          {/* Desktop Button */}
          <div className="mt-4 hidden lg:mt-0 lg:block lg:flex-shrink-0">
            <Button variant="button" mode="light">
              Xem tất cả
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {categories.map((category) => (
            <CollectionCard
              key={category.id}
              title={category.title}
              description={category.description}
              productCount={category.productCount}
              imageUrl={category.imageUrl}
              onLearnMore={() => {
                console.log(`Learn more about ${category.title}`);
              }}
            />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-8 lg:hidden">
          <Button variant="button" mode="light">
            Xem tất cả
          </Button>
        </div>
      </div>
    </section>
  );
}
