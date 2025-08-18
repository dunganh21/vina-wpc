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
    <div className="relative aspect-[3/4] w-full overflow-hidden lg:aspect-[4/3]">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="relative flex flex-col lg:flex-row lg:items-end">
          {/* Main Content */}
          <div className="w-full space-y-3 bg-gray px-4 py-4 lg:w-[434px] lg:px-[18px]">
            <div className="space-y-1.5">
              <h3 className="h5">{title}</h3>
              <p className="body-3">{description}</p>
            </div>
            <p className="h6">{productCount} sản phẩm</p>
          </div>

          {/* Button */}
          <div className="absolute right-0 bottom-full lg:static">
            <Button variant="button" mode="light" onClick={onLearnMore}>
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
