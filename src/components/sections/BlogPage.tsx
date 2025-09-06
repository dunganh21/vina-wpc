'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { NewsCard } from '@/components/ui/NewsCard';
import { Input } from '@/components/ui/Input';
import Pagination from '@/components/ui/Pagination';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
}

interface BlogPageProps {
  className?: string;
}

// Mock data - replace with actual data
const mockBlogPosts: BlogPost[] = Array.from({ length: 36 }, (_, i) => ({
  id: `${i + 1}`,
  title: 'Gỗ nhựa là gì? Ưu điểm vượt trội trong thiết kế hiện đại',
  excerpt:
    'Khám phá khái niệm gỗ nhựa (WPC), đặc tính nổi bật và lý do vì sao đây là vật liệu "xanh" được ưa chuộng hiện nay.',
  date: '08/08/2025',
  category: 'Gỗ Nhựa WPC',
  imageUrl: '/placeholder-blog.jpg',
}));

const filterCategories = [
  'Gỗ nhựa WPC',
  'Tin xuất khẩu',
  'Sự kiện',
  'Giải thưởng',
  'Hoạt động xã hội',
  'Lifestyle',
];

export function BlogPage({ className }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 12;
  const totalPages = Math.ceil(mockBlogPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Header Section */}
      <div className="page-container space-y-4 py-8 lg:space-y-4 lg:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-secondary">
          <span className="subtitle-2 text-primary">Trang chủ</span>
          <span className="subtitle-2 text-primary">/</span>
          <span className="subtitle-2 text-primary opacity-50">Blog</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl font-semibold text-neutral lg:text-[56px] lg:leading-[56px]">
          Blogs
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-none">
          <Input
            type="search"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <div className="h-6 w-6 flex-shrink-0">
                <Image
                  src="/icons/search.svg"
                  alt="Search"
                  width={24}
                  height={24}
                  className="h-full w-full opacity-70"
                />
              </div>
            }
            className="w-full max-w-none border-base-200 bg-white"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-1">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setActiveFilter(activeFilter === category ? '' : category)
              }
              className={cn(
                'flex cursor-pointer items-center justify-center border px-2.5 py-1.5 transition-all duration-200',
                activeFilter === category
                  ? 'border-primary bg-primary !text-white'
                  : 'border-base-200 bg-base-200 text-secondary hover:border-primary hover:bg-base-300'
              )}
            >
              <span className="body-3 text-inherit">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="page-container pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockBlogPosts
            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            .map((post) => (
              <NewsCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                imageUrl={post.imageUrl}
                className="h-full"
              />
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-start">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
            maxVisiblePages={6}
          />
        </div>
      </div>
    </div>
  );
}
