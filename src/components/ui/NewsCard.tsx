import Image from 'next/image';
import { Button } from './Button';

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
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
  readTime = '3 phút đọc',
  onReadMore,
  className = '',
}: NewsCardProps) {
  return (
    <article
      className={`group cursor-pointer border border-black/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="space-y-1 p-4">
        {/* Category and Date */}
        <div className="flex items-center gap-1">
          <span className="subtitle-4">{category}</span>
          <div className="h-1 w-1 rounded-full bg-primary"></div>
          <time className="subtitle-4">{date}</time>
        </div>

        {/* Title */}
        <h5>{title}</h5>

        {/* Excerpt */}
        <p className="body-3">{excerpt}</p>
      </div>
    </article>
  );
}
