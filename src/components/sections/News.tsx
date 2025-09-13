'use client';

import { useRouter } from 'next/navigation';
import { NewsCard } from '@/components/ui/NewsCard';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { BlogPost } from '@/types/product';

interface NewsSectionProps {
  blogPosts: BlogPost[];
}

export function NewsSection({ blogPosts }: NewsSectionProps) {
  // Animation refs - Reduced delays for faster feel
  const { ref: headerRef } = useScrollReveal<HTMLDivElement>({
    staggerDelay: 0,
    elementType: 'text',
  });

  const router = useRouter();

  // Individual animation refs for each news card - Much faster stagger
  const cardRefs = blogPosts.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScrollReveal<HTMLDivElement>({
      staggerDelay: 100 + index * 80, // 100ms base delay + 80ms between cards
      elementType: 'card',
    })
  );

  return (
    <section className="pt-7 pb-18 lg:pt-9 lg:pb-22">
      <div className="page-container">
        {/* Header */}
        <div
          ref={headerRef}
          className="animate-on-scroll mb-4 flex items-center justify-between lg:mb-5"
        >
          <h2 className="h2">Tin tức</h2>
          <Button
            onClick={() => router.push('/blogs')}
            className="hidden px-8 lg:flex"
          >
            Xem tất cả
          </Button>
        </div>

        {/* News Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mb-12 lg:gap-8 xl:grid-cols-4">
          {blogPosts.map((post, index) => (
            <div
              key={post.slug}
              ref={cardRefs[index].ref}
              className="animate-on-scroll w-full"
            >
              <NewsCard
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                imageUrl={post.image}
                slug={post.slug}
              />
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="flex justify-end lg:hidden">
          <Button onClick={() => router.push('/blogs')} className="px-8">
            Xem tất cả
          </Button>
        </div>

        {/* <div
          ref={controlsRef}
          className="animate-on-scroll hidden items-center justify-between lg:flex"
        >
          <PageIndicator
            currentPage={1}
            totalPages={4}
            onPageChange={(page) => console.log('Go to page:', page)}
            variant="dark"
          />

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
        </div> */}
      </div>
    </section>
  );
}
