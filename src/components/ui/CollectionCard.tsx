import Image from 'next/image';
import { Button } from './Button';

interface CollectionCardProps {
  title: string;
  description: string;
  productCount: number;
  imageUrl: string;
  onLearnMore?: () => void;
}

export default function CollectionCard({
  title,
  description,
  productCount,
  imageUrl,
  onLearnMore,
}: CollectionCardProps) {
  return (
    <div className='relative w-full h-[559px] overflow-hidden'>
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className='object-cover'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />

      {/* Content Overlay */}
      <div className='absolute bottom-0 left-0 right-0'>
        <div className='flex items-end'>
          {/* Main Content */}
          <div className='bg-[#E6E6E6] px-[18px] py-4 space-y-3 w-[434px]'>
            {/* Header */}
            <div className='space-y-1.5'>
              <h3 className='h5 text-primary'>{title}</h3>
              <p className='body-3 text-primary'>{description}</p>
            </div>

            {/* Product Count */}
            <p className='h6 text-primary'>{productCount} sản phẩm</p>
          </div>

          {/* Button */}
          <Button variant='button' mode='light' onClick={onLearnMore}>
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    </div>
  );
}
