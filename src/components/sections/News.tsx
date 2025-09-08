'use client';

import { NewsCard } from '@/components/ui/NewsCard';
import { Button } from '@/components/ui/Button';
import { ButtonIcon, PageIndicator } from '../ui';

const selectedNews = [
  {
    id: 1,
    title: 'Xu hướng thiết kế nội thất với gỗ nhựa WPC năm 2024',
    excerpt:
      'Khám phá những xu hướng mới nhất trong thiết kế nội thất sử dụng vật liệu gỗ nhựa WPC. Từ màu sắc đến kiểu dáng, tất cả đều hướng đến sự bền vững và thẩm mỹ.',
    date: '15 Tháng 8, 2024',
    category: 'Xu hướng',
    imageUrl: '/images/prd-lg-1.jpg',
    readTime: '5 phút đọc',
  },
  {
    id: 2,
    title: 'Hướng dẫn lắp đặt sàn gỗ WPC cho người mới bắt đầu',
    excerpt:
      'Quy trình lắp đặt sàn gỗ WPC chi tiết từ A-Z. Những lưu ý quan trọng và mẹo hay giúp bạn có được kết quả hoàn hảo.',
    date: '10 Tháng 8, 2024',
    category: 'Hướng dẫn',
    imageUrl: '/images/prd-lg-2.png',
    readTime: '7 phút đọc',
  },
  {
    id: 3,
    title: 'So sánh gỗ nhựa WPC với gỗ tự nhiên: Ưu và nhược điểm',
    excerpt:
      'Phân tích chi tiết về ưu nhược điểm của gỗ nhựa WPC so với gỗ tự nhiên. Giúp bạn đưa ra lựa chọn phù hợp cho không gian của mình.',
    date: '5 Tháng 8, 2024',
    category: 'So sánh',
    imageUrl: '/images/prd-lg-3.png',
    readTime: '4 phút đọc',
  },
  {
    id: 4,
    title: 'Bảo dưỡng sàn gỗ WPC: Bí quyết giữ độ bền lâu dài',
    excerpt:
      'Những cách bảo dưỡng đơn giản nhưng hiệu quả để sàn gỗ WPC luôn như mới. Tăng tuổi thọ và duy trì vẻ đẹp cho sản phẩm.',
    date: '1 Tháng 8, 2024',
    category: 'Bảo dưỡng',
    imageUrl: '/images/prd-lg-4.png',
    readTime: '6 phút đọc',
  },
];

export function NewsSection() {
  return (
    <section className="pt-7 pb-18 lg:pt-9 lg:pb-22">
      <div className="page-container">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between lg:mb-5">
          <h2 className="h2">Tin tức</h2>
          <Button
            onClick={() => console.log('View all articles')}
            className="hidden px-8 lg:flex"
          >
            Xem tất cả
          </Button>
        </div>

        {/* News Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mb-12 lg:gap-8 xl:grid-cols-4">
          {selectedNews.map((article) => (
            <NewsCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              category={article.category}
              imageUrl={article.imageUrl}
              readTime={article.readTime}
              onReadMore={() =>
                console.log(`Reading article: ${article.title}`)
              }
            />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="flex justify-end lg:hidden">
          <Button
            onClick={() => console.log('View all articles')}
            className="px-8"
          >
            Xem tất cả
          </Button>
        </div>

        <div className="hidden items-center justify-between lg:flex">
          {/* Pagination Dots */}
          <PageIndicator
            currentPage={1}
            totalPages={4}
            onPageChange={(page) => console.log('Go to page:', page)}
            variant="dark"
          />

          {/* Navigation Arrows */}
          <div className="flex items-center gap-0.5">
            <ButtonIcon
              variant="button-outline"
              theme="light"
              icon="arrow-left.svg"
              onClick={() => console.log('Previous')}
              aria-label="Previous page"
            />
            <ButtonIcon
              variant="button-outline"
              theme="light"
              icon="arrow-right.svg"
              onClick={() => console.log('Next')}
              aria-label="Next page"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
