'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { NewsCard } from '@/components/ui/NewsCard';

interface BlogPost {
  id: string;
  title: string;
  subject: string;
  image: string;
  content: string; // Rich text HTML from CMS
  date_created: string;
}

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
}

interface BlogDetailPageProps {
  post: BlogPost;
  relatedPosts?: RelatedPost[];
  className?: string;
}

const ShareButtons = ({
  variant = 'default',
}: {
  variant: 'default' | 'mobile';
}) => {
  return (
    <div
      className={cn(
        'flex-col gap-4',
        variant === 'default' ? 'hidden 2xl:flex' : 'flex'
      )}
    >
      <div className="flex items-center gap-2.5">
        <button
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
              '_blank'
            )
          }
          className="flex h-6 w-6 items-center justify-center text-neutral/20 transition-opacity hover:opacity-80"
        >
          <Image
            src="/icons/facebook-black.svg"
            alt="Share on Facebook"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          onClick={() => window.open(`https://www.instagram.com/`, '_blank')}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral/20 text-white transition-opacity hover:opacity-80"
        >
          <Image
            src="/icons/instagram-black.svg"
            alt="Share on Instagram"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${window.location.href}`,
              '_blank'
            )
          }
          className="flex h-6 w-6 items-center justify-center text-neutral/20 transition-opacity hover:opacity-80"
        >
          <Image
            src="/icons/x-black.svg"
            alt="Share on Twitter"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
      </div>
    </div>
  );
};

export function BlogDetailPage({
  post,
  relatedPosts = [],
}: BlogDetailPageProps) {
  return (
    <section className="w-full pt-6 lg:pt-44">
      {/* Blog Content Container - Max width 900px */}
      <div className="mx-auto mb-6 w-full max-w-[900px] space-y-2 lg:mb-14 lg:space-y-6">
        {/* 1. Breadcrumb */}
        <div className="flex max-w-[80%] items-center gap-1 text-secondary">
          <span className="subtitle-2 shrink-0 text-primary">Trang chủ</span>
          <span className="subtitle-2 text-primary">/</span>
          <span className="subtitle-2 text-primary">Blog</span>
          <span className="subtitle-2 text-primary">/</span>
          <span className="subtitle-2 truncate text-primary opacity-50">
            {post.title}
          </span>
        </div>

        {/* 2. Subject */}
        <div className="space-y-3 lg:space-y-4">
          <h1 className="h2">{post.subject}</h1>
        </div>
      </div>

      {/* 3. Image - Full Width with preserved aspect ratio */}
      <div className="mb-4 w-full 2xl:mb-15">
        <div className="aspect-[16/9] w-full overflow-hidden lg:aspect-[21/9]">
          <Image
            src={post.image}
            alt={post.subject}
            width={1920}
            height={800}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>

      {/* 3.1. Mobile share buttons */}
      <div className="mx-auto mb-8 flex w-full max-w-[900px] items-center justify-between px-4 2xl:hidden">
        <div className="subtitle-3 flex items-center gap-1">
          <span>Gỗ Nhựa WPC</span>
          <span className="inline-block h-1 w-1 bg-primary"></span>
          <span>
            {new Date(post.date_created).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </span>
        </div>

        <div>
          <ShareButtons variant="mobile" />
        </div>
      </div>

      {/* 4. Content - Back to constrained width */}
      <div className="flex">
        {/* date */}
        <div className="hidden 2xl:block">
          <div className="subtitle-3 flex items-center gap-1">
            <span>Gỗ Nhựa WPC</span>
            <span className="inline-block h-1 w-1 bg-primary"></span>
            <span>
              {new Date(post.date_created).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[900px] px-4">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Share buttons */}
        <ShareButtons variant="default" />
      </div>

      {/* Related Articles - Optional */}
      {relatedPosts.length > 0 && (
        <div className="mx-auto w-full max-w-[900px] py-18 lg:py-[200px]">
          <div className="space-y-6 lg:space-y-8">
            {/* Section Title */}
            <h2 className="text-2xl font-semibold text-neutral lg:text-[32px] lg:leading-[37px]">
              Bài viết liên quan
            </h2>

            {/* Related Posts Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedPosts.slice(0, 2).map((relatedPost) => (
                <NewsCard
                  key={relatedPost.id}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  date={relatedPost.date}
                  category={relatedPost.category}
                  imageUrl={relatedPost.imageUrl}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
