'use client';

import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NewsCard } from '@/components/ui/NewsCard';
import { Input } from '@/components/ui/Input';
import { Pagination } from '@/components/ui/Pagination';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { BlogPost } from '@/types/product';

interface BlogPageProps {
  blogPosts: BlogPost[];
  className?: string;
}

// Dynamic filter categories based on available blog posts
const getFilterCategories = (posts: BlogPost[]) => {
  const categories = posts.map(post => post.category);
  return [...new Set(categories)].sort();
};

export function BlogPage({ blogPosts, className }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 12;
  const filterCategories = getFilterCategories(blogPosts);

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (activeFilter) {
      filtered = filtered.filter((post) => post.category === activeFilter);
    }

    return filtered;
  }, [blogPosts, searchTerm, activeFilter]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  // Animation refs
  const { ref: headerRef } = useScrollReveal<HTMLDivElement>({
    elementType: 'text',
    staggerDelay: 0
  });

  const { ref: searchRef } = useScrollReveal<HTMLDivElement>({
    elementType: 'ui',
    staggerDelay: 100
  });

  const { ref: filtersRef } = useScrollReveal<HTMLDivElement>({
    elementType: 'ui',
    staggerDelay: 200
  });

  const { ref: gridRef } = useScrollReveal<HTMLDivElement>({
    elementType: 'card',
    staggerDelay: 300
  });

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
        <div ref={headerRef} className="flex items-center gap-1 text-secondary animate-on-scroll">
          <span className="subtitle-2 text-primary">Trang chủ</span>
          <span className="subtitle-2 text-primary">/</span>
          <span className="subtitle-2 text-primary opacity-50">Blog</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl font-semibold text-neutral lg:text-[56px] lg:leading-[56px]">
          Blogs
        </h1>

        {/* Search Bar */}
        <div ref={searchRef} className="w-full max-w-none animate-on-scroll">
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
        <div ref={filtersRef} className="flex flex-wrap gap-1 animate-on-scroll">
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
      <div className="page-container pb-10 lg:pb-16">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-6xl opacity-30">📝</div>
            <div className="h6 mb-2 text-secondary">Không tìm thấy bài viết</div>
            <div className="body-3 text-secondary opacity-70">
              {searchTerm || activeFilter
                ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                : 'Chưa có bài viết nào được đăng'
              }
            </div>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-on-scroll">
            {filteredPosts
              .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
              .map((post) => (
                <NewsCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  category={post.category}
                  imageUrl={post.image}
                  slug={post.slug}
                  className="h-full"
                />
              ))}
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && totalPages > 1 && (
          <div className="mt-4 flex justify-start lg:mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onPrevious={handlePrevious}
              onNext={handleNext}
              maxVisiblePages={6}
            />
          </div>
        )}
      </div>
    </div>
  );
}
