import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  slug?: string;
  readTime?: string;
  onReadMore?: () => void;
  className?: string;
}

export function NewsCard({
  title,
  excerpt,
  date,
  category,
  imageUrl,
  slug,
  onReadMore,
  className = '',
}: NewsCardProps) {
  const CardContent = (
    <article
      className={`group flex h-full cursor-pointer flex-col border border-black/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${className}`}
      onClick={onReadMore}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] h-full w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between space-y-1 p-4">
        <div className="space-y-1">
          {/* Category and Date */}
          <div className="flex items-center gap-1">
            <span className="subtitle-4">{category}</span>
            <div className="h-1 w-1 rounded-full bg-primary"></div>
            <time className="subtitle-4">{date}</time>
          </div>

          {/* Title */}
          <p className="h5 line-clamp-2 min-h-[2.5rem]">{title}</p>
        </div>

        {/* Excerpt - Fixed at bottom */}
        <p className="body-3 line-clamp-2 max-h-[2.5rem] min-h-[2.5rem]">
          {excerpt}
        </p>
      </div>
    </article>
  );

  if (slug) {
    return (
      <Link href={`/blog/${slug}`} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
